"""
Module contains black box tests for invoice/render endpoint
"""
import pytest
from flask import Flask
import xmltodict
from src import invoice

xmls = ['test.xml', 'old_test.xml']
names = {
		'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2': None, 
		'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2': None,
		'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2': None,
		'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2': None,
		}

class TestUnitInvoice:
    """
    Black box testing on invoice.py functions
    """
    def test_get_template_success(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
		attr_prefix="", cdata_key=""
		)
        test_invoice = invoice.Invoice(xml_dict, 'en', 'default')
        result = invoice.Invoice.invoice_get_template(test_invoice)
        assert result == 'default_en'

    def test_get_template_template_fail(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
		attr_prefix="", cdata_key=""
		)
        test_invoice = invoice.Invoice(xml_dict, 'default', 'asdasda')

        with pytest.raises(ValueError) as e_info:
            invoice.Invoice.invoice_get_template(test_invoice)
        assert str(e_info.value) == 'Template does not exist'

    def test_get_template_language_fail(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'asdasdasd', 'en')

        with pytest.raises(ValueError) as e_info:
            invoice.Invoice.invoice_get_template(test_invoice)
        assert str(e_info.value) == 'Language is not supported'

    def test_flatten_dict(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
            xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'asdasdasd', 'en')
        result = invoice.Invoice.flatten_dict(test_invoice)
        assert(result is not None)

class TestInvoiceDictToHTML:
    """
    Tests for dict_to_html_response
    """
    app = Flask(__name__, template_folder='../src/templates')
    app.config['SERVER_NAME'] = 'localhost'
    app.app_context().push()
    def test_dict_to_html_response_success_simple(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        print('testst')
        test_invoice = invoice.Invoice(xml_dict, 'en', 'default')
        result = invoice.Invoice.dict_to_html_response(test_invoice, 'en', 'default')
        assert bool(result)

    def test_dict_to_html_response_fail_language(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(
            xml, process_namespaces = True, namespaces = names, attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'asdasdasd', 'en')
        result =invoice.Invoice.dict_to_html_response(test_invoice, 'asdasdasd', 'default')
        print('!!!!!')
        print(result)
        assert str(result[0]) == 'Language is not supported'

    def test_dict_to_html_response_fail_template(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'en', 'asdasda')
        result =invoice.Invoice.dict_to_html_response(test_invoice, 'en', 'asdasd')
        assert str(result[0]) == 'Template does not exist'

    def test_dict_to_html_response_success_extended(self):
        with open('./tests/extended.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'en', 'default')
        result = invoice.Invoice.dict_to_html_response(test_invoice, 'en', 'default')
        assert bool(result)

class TestInvoicePDFRender:
    """
    Tests for invoice_render_pdf
    """
    def test_invoice_render_pdf(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'en', 'default')
        result = test_invoice.invoice_render_pdf()
        assert(result is not None)

    def test_invoice_render_pdf_invalid_template(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'en', 'asdasdasd')
        result = test_invoice.invoice_render_pdf()
        assert str(result[0]) == 'Template does not exist'

    def test_invoice_render_pdf_invalid_language(self):
        with open('./tests/simple.xml') as file:
            xml = file.read()
        xml_dict = xmltodict.parse(xml, process_namespaces = True, namespaces = names,
        attr_prefix="", cdata_key=""
        )
        test_invoice = invoice.Invoice(xml_dict, 'asdasdasd', 'default')
        result = test_invoice.invoice_render_pdf()
        assert str(result[0]) == 'Language is not supported'
