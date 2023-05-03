"""
Server Routes
"""

from flask import Flask, request, send_file
from flask_api import status
import xmltodict
import src.invoice
import src.user as u
app = Flask(__name__)

# #################################
#  Helper function
# #################################
def xml_to_dict(xmldata: bytes) -> dict:
	"""
	Converts XML located in response to a python dictionary
	using xmltodict.

	Params:
	xmldata(bytes): XML data extracted from request 

	Returns:
	xmldict(dict): Dictionary containing XML data
	"""
	xml_dict = xmltodict.parse(xmldata, process_namespaces = True, namespaces = {
	'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2': None, 
	'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2': None,
	'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2': None,
	'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2': None,
	},
	attr_prefix="", cdata_key=""
	)
	return xml_dict

# #################################
# ENDPOINTS
# #################################
@app.route('/invoice/render', methods = ['GET', 'POST'])
@app.route('/render/html', methods = ['GET', 'POST'])
def invoice_render():
	"""
	Renders the invoice page
 
	Returns: 
 	- Response 
	"""

	if request.method == 'GET':
		return send_file('./frontend/index.html')

	# Getting request data
	language = request.args['language']
	template = request.args['template']
	xmldata = request.data
	# Ignoring the namespace...
	try:
		xml_dict = xml_to_dict(xmldata)
	except Exception:
		return "Malformed XML", status.HTTP_400_BAD_REQUEST

	# Initialising invoice object
	i = src.invoice.Invoice(xml_dict, language, template)
	# Generating HTML file and creating a response object
	response = i.dict_to_html_response(language, template)
	return response

@app.route('/invoice/render/pdf', methods = ['GET', 'POST'])
@app.route('/render/pdf', methods = ['GET', 'POST'])
def invoice_render_pdf():
	"""
	Renders the invoice in a pdf 
	"""
	if request.method == 'GET':
		return send_file('./frontend/index.html')
	language = request.args['language']
	template = request.args['template']
	xmldata = request.data
	try:
		xml_dict = xml_to_dict(xmldata)
	except Exception:
		return "Malformed XML", status.HTTP_400_BAD_REQUEST
	i = src.invoice.Invoice(xml_dict, language, template)
	pdf = i.invoice_render_pdf()
	if isinstance(pdf, tuple):
		return pdf
	headers = {
		'content-type': 'application/pdf',
		'content-disposition': 'attachment; filename=rendered_e-invoice.pdf'
	}
	return pdf, 200, headers

@app.route('/invoice/render/json', methods = ['GET', 'POST'])
@app.route('/render/json', methods = ['GET', 'POST'])
def invoice_render_json():
	"""
	Supports client side rendering. Requests a body containing XML data 
	conforming to UBL 2.0 format. Responds with a JSON object containing 
	all data in the XML. Generates keys by concatentating keys and parent 
	keys.

	Params:
	flattened(bool): 
	"""
	if request.method == 'GET':
		return send_file('./frontend/index.html')
	# Get XML from request body
	xml_data = request.data
	# Generate dict
	try:
		xml_dict = xml_to_dict(xml_data)
	except Exception:
		return "Malformed XML", status.HTTP_400_BAD_REQUEST
	is_flattened = request.args.get('flattened', False)
	if is_flattened:
		i = src.invoice.Invoice(xml_dict, None, None)
		return i.flatten_dict()
	return xml_dict

@app.route('/login', methods = ['GET', 'POST'])
def user_login():
    """
    Logs in as the user associated with u_id
    Returns:
    - None
    """
    if request.method == 'GET':
        return send_file('./frontend/index.html')
    email = request.args['email']
    password = request.args['password']
    user_database = u.UserDatabase()
    response = user_database.login(email, password)
    return response

@app.route('/register', methods = ['GET', 'POST'])
def user_register():
    """
    Registers a user using first and last name
    Returns:
    - None
	"""
    if request.method == 'GET':
        return send_file('./frontend/index.html')
    email = request.args['email']
    password = request.args['password']
    user_database = u.UserDatabase()
    response = user_database.register(email, password)
    return response

@app.route('/logout', methods = ['GET', 'POST'])
def user_logout():
    """
    Logs out the current logged in user
    Returns:
    - None
    """
    if request.method == 'GET':
        return send_file('./frontend/index.html')
    token = request.args['token']
    user_database = u.UserDatabase()
    response = user_database.logout(token)
    return response

@app.route('/clear', methods = ['DELETE'])
def clear():
    """
    Clears database
    Returns:
    - None
    """
    user_database = u.UserDatabase()
    user_database.db_reset()
    return {}

@app.route('/test')
def test_route():
	xml_file = open('test.xml', "r")
	xmldata = xml_file.read()

	# Check for malformed XML, will throw exceptino if xmltodict.parse throws exception
	try:
		xml_dict = xmltodict.parse(xmldata, process_namespaces = True, namespaces = {
		'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2': None, 
		'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2': None,
		'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2': None,
		'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2': None,
		},
		attr_prefix="", cdata_key=""
		)
	except Exception:
		return "Malformed XML", status.HTTP_400_BAD_REQUEST
	language = 'en'
	template = 'default'
	# Initialising invoice object
	i = src.invoice.Invoice(xml_dict, language, template)
	# Generating HTML file and creating a response object
	response = i.dict_to_html_response(language, template)
	return response

@app.route('/')
def status_check():
	return "Success!"

if __name__ == "__main__":
	app.run()
