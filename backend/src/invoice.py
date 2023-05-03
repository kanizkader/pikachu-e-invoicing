"""
Invoice Functions
"""

from io import StringIO
from io import BytesIO
import os
import pathlib
from flask import render_template, Response, send_file
from flask_api import status
from translate import Translator
from xhtml2pdf import pisa
import pycountry
import flatdict

class Invoice():
	"""
	Invoice Class
	"""

	flattened_dict: dict = {}

	def __init__ (self, xml_dict, language, template):
		self.xml_dict = xml_dict
		self.language = language
		self.template = template


	def sanitize_dict(self, original: dict):
		"""
		Sanitizes a dict by removing all - chars
		"""
		result = {}
		for key, value in original.items():
			new_key = key.replace('-', '')
			result[new_key] = value
		return result

	def flatten_dict(self):
		"""
		Flattens a dict and sanitizes output

		Params:
		xml_dict(dict): Dict to be flattened

		Returns:
		modified_dict(dict): A flattened dict
		"""
		flattend_dict: dict = dict(flatdict.FlatDict(self.xml_dict, delimiter='-'))
		#Sanitize dict
		modified_dict = self.sanitize_dict(flattend_dict)
		return modified_dict

	def dict_to_html_response(self, language: str, template: str) -> Response:
		"""
		Given an XML dict, converts it to an HTML response.
	
		A base HTML template exists, and is extended by blocks indicating the customer, payment 
		and company information. This is then rendered into a response object and returned.

		Params: 
		xml(str): An XML file 

		Returns
		html(str): An HTML file
		"""
		sanitized_dict = self.flatten_dict()
		# Resolving country name from ISO3166-1: Alpha 2 code
		supplier_country = pycountry.countries.get(
      		alpha_2 =
        	sanitized_dict['InvoiceAccountingSupplierPartyPartyPostalAddressCountryIdentificationCode']
        )
		sanitized_dict['suppliercountryname'] = supplier_country.name

		customer_country = pycountry.countries.get(
      		alpha_2 =
        	sanitized_dict['InvoiceAccountingCustomerPartyPartyPostalAddressCountryIdentificationCode']
        )
		sanitized_dict['customercountryname'] = customer_country.name
		invoice_elements = []
		if 'InvoiceInvoiceLine' not in sanitized_dict:
			tax_total = round(float(sanitized_dict
			   ['InvoiceInvoiceLineItemClassifiedTaxCategoryPercent'])/100*
		     float(sanitized_dict['InvoiceLegalMonetaryTotalTaxExclusiveAmount']))
			invoice_elements.append({
				'ID': sanitized_dict['InvoiceInvoiceLineID'],
				'InvoicedQuantity': sanitized_dict['InvoiceInvoiceLineInvoicedQuantity'],
				'InvoicedQuantityunitCode': sanitized_dict['InvoiceInvoiceTypeCode'],
				'ItemName': sanitized_dict['InvoiceInvoiceLineItemName'],
				'PricePriceAmount': sanitized_dict['InvoiceInvoiceLinePricePriceAmount'],
				'PricePriceAmountcurrencyID': sanitized_dict['InvoiceInvoiceLinePricePriceAmountcurrencyID'],
				'LineExtensionAmount': sanitized_dict['InvoiceLegalMonetaryTotalTaxExclusiveAmount'],
				'LineExtensionAmountcurrencyID': sanitized_dict[
					'InvoiceLegalMonetaryTotalTaxExclusiveAmountcurrencyID'
				],
				'ItemClassifiedTaxCategoryPercent': sanitized_dict[
					'InvoiceInvoiceLineItemClassifiedTaxCategoryPercent'
				],
				'InvoiceLineTaxTotal': f"{tax_total}".format(tax_total)
			})
		else:
			for element in sanitized_dict['InvoiceInvoiceLine']:
				element = flatdict.FlatDict(element, '-')
				element = self.sanitize_dict(element)
				tax_total = round(int(element['ItemClassifiedTaxCategoryPercent'])
		      		/100*float(element['PricePriceAmount']))
				element['InvoiceLineTaxTotal'] = f"{tax_total}".format(tax_total)
				invoice_elements.append(element)

		# Translating invoice note
		translator = Translator(to_lang = language)
		translated_note = translator.translate(sanitized_dict['InvoicePaymentTermsNote'])
		sanitized_dict.pop('InvoicePaymentTermsNote')
		sanitized_dict['InvoicePaymentTermsNote'] = translated_note
		sanitized_dict['InvoicedElements'] = invoice_elements
		# Error handling for templates
		try:
			template_name = self.invoice_get_template()
		except ValueError as error:
			if str(error) == 'Template does not exist':
				return "Template does not exist", status.HTTP_400_BAD_REQUEST
			if str(error) == 'Language is not supported':
				return 'Language is not supported', status.HTTP_400_BAD_REQUEST
		response = render_template(template_name + ".html", **sanitized_dict)
		return response

	def invoice_render_pdf(self):
		rendered_template = self.dict_to_html_response(self.language, self.template)
		if isinstance(rendered_template, tuple):
			return rendered_template[0], status.HTTP_400_BAD_REQUEST
		pdf = BytesIO()
		pisa.CreatePDF(StringIO(rendered_template), pdf)
		return pdf.getvalue()

	def invoice_get_template(self):
		"""
		Given a template and language string, checks if a template in that language exists.
		Throws value error excpetions if template or language does not exist.
		Params: 
		template(str): Name of the template to be used
		language(str): Language to be used

		Returns:
		template_name(str): Full name of template
		
		"""
		# Getting path to templates folder
		template_list = os.listdir(pathlib.Path(__file__).parent / 'templates')

		# Checking if template exists
		template_exists = any(self.template in substr for substr in template_list)
		if not template_exists:
			raise ValueError('Template does not exist')
		# Check if language is supported
		language_exists = any(self.language in substr for substr in template_list)
		if not language_exists:
			raise ValueError('Language is not supported')
		return self.template + '_' + self.language

	def invoice_get_image(self, image):
		"""
		Given a a path to an image file, returns the image as a response object
		Params:
		image(str): get image path
		Returns:
		response(response): returns an object that holds the image
		
		"""

		default_image_path = "/default/image.jpeg"
		if os.path.exists(image):
			image_path = image
		else:
			image_path = default_image_path
		return send_file(image_path, mimetype='image/jpeg')
