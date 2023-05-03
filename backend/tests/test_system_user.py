"""
Module contains black box tests for user endpoints
"""
import requests
import pytest
from src.url import URL

@pytest.fixture(autouse=True)
def setup_teardown():
    requests.delete( URL + 'clear', timeout=10)
    params = {
        'email': 'email@gmail.com',
        'password': 'password'
    }
    requests.post(
        URL + 'register',
        params=params,
        timeout=10
    )

def test_user_register_valid():
    params = {
        'email': 'testemail@gmail.com',
        'password': 'password'
    }
    res = requests.post(
        URL + 'register',
        params=params,
        timeout=10
    )
    assert res.status_code == 200

def test_user_register_invalid_email():
    params = {
        'email': 'emacom',
        'password': 'password'
    }
    res = requests.post(
        URL + 'register',
        params=params,
        timeout=10
    )
    assert res.status_code == 400

def test_user_register_duplicate_email():
    params = {
        'email': 'email@gmail.com',
        'password': 'password'
    }
    requests.post(
        URL + 'register',
        params=params,
        timeout=10
    )
    res = requests.post(
        URL + 'register',
        params=params,
        timeout=10
    )
    assert res.status_code == 400

def test_user_login_success():
    params = {
        'email': 'email@gmail.com',
        'password': 'password'
    }
    res = requests.post(
        URL + 'login',
        params=params,
        timeout=10
    )
    assert res.status_code == 200

def test_user_login_invalid_email():
    params = {
        'email': 'test@gmail.com',
        'password': 'password'
    }
    res = requests.post(
        URL + 'login',
        params=params,
        timeout=10
    )
    assert res.status_code == 400

def test_user_login_invalid_password():
    params = {
        'email': 'email@gmail.com',
        'password': 'password123'
    }
    res = requests.post(
        URL + 'login',
        params=params,
        timeout=10
    )
    assert res.status_code == 400

def test_user_login_duplicate():
    params = {
        'email': 'email@gmail.com',
        'password': 'password'
    }
    res = requests.post(
        URL + 'login',
        params=params,
        timeout=10
    )
    res = requests.post(
        URL + 'login',
        params=params,
        timeout=10
    )
    assert res.status_code == 400

def test_user_logout_success():
    params = {
        'token': '512ec00d97c11bb13a4e16cac0e7522c6152fbd7d14f2e224e45cba6a95b7cf5',
    }
    res = requests.post(
        URL + 'logout',
        params=params,
        timeout=10
    )
    assert res.status_code == 200
