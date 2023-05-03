"""
Module contains black box tests for invoice/render endpoint
"""
import requests
import pytest
from src.url import URL

xmls = ['test.xml', 'old_test.xml']

class TestSystemInvoiceHTML:
    """
    Class containing tests
    """
    @pytest.mark.parametrize('config', ['simple.xml', 'extended.xml'])
    def test_valid_template(self, config):
        params = {
            'language': 'en',
            'template': 'default'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/' + config) as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 200

    def test_invalid_template(self):
        params = {
            'language': 'en',
            'template': 'gibberish'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400
        assert res.reason == 'BAD REQUEST'

    def test_invalid_language(self):
        params = {
            'language': 'qweqwe',
            'template': 'detailed'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400
        assert res.reason == 'BAD REQUEST'

    def test_invalid_xml(self):
        params = {
            'language': 'de',
            'template': 'detailed'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/malformed.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render',
                data = xml, headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400
        assert res.reason == 'BAD REQUEST'

    def test_status(self):
        res = requests.get(
            URL + '/',
            timeout=10
        )
        assert res.status_code == 200

class TestSystemInvoiceJSON:
    """
    Tests for invoice/render/json 
    """
    def test_valid_xml_flattened(self):
        params = {
            'flattened': True
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/json',
                data = xml,
                headers = headers,
                params = params,
                timeout=10
            )
        assert res.status_code == 200

    def test_valid_xml_unflattened(self):
        params = {
            'flattened': False
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/json',
                data = xml,
                headers = headers,
                params = params,
                timeout=10
            )
        assert res.status_code == 200

    def test_invalid_xml_flattened(self):
        params = {
            'flattened': True
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/malformed.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/json',
                data = xml,
                headers = headers,
                params = params,
                timeout=10
            )
        assert res.status_code == 400
        assert res.reason == 'BAD REQUEST'

    def test_invalid_xml_unflattened(self):
        params = {
            'flattened': False
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/malformed.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/json',
                data = xml,
                headers = headers,
                params = params,
                timeout=10
            )
        assert res.status_code == 400
        assert res.reason == 'BAD REQUEST'

class TestSystemInvoicePDF:
    """
    Tests for /invoice/render/pdf
    """
    def test_success(self):
        params = {
            'language': 'en',
            'template': 'default'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/pdf',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 200

    def test_invalid_template(self):
        params = {
            'language': 'en',
            'template': 'asdasdasdasd'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/pdf',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400

    def test_invalid_language(self):
        params = {
            'language': 'asdasdasd',
            'template': 'default'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/simple.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/pdf',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400

    def test_invalid_xml(self):
        params = {
            'language': 'en',
            'template': 'default'
        }
        headers = {'Content-Type': 'text/xml'}
        with open('tests/malformed.xml') as file:
            xml = file.read()
            res = requests.post(
                URL + 'invoice/render/pdf',
                data = xml,
                headers=headers,
                params=params,
                timeout=10
            )
        assert res.status_code == 400
        