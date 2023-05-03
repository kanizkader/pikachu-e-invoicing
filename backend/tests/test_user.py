"""
Module contains black box tests for invoice/render endpoint
"""
from flask import Flask
from src.user import UserDatabase as u

app = Flask(__name__, template_folder='../src/templates')
app.config['SERVER_NAME'] = 'localhost'
app.app_context().push()

def test_user_register_valid():
    '''
    Testing that the first and last name is made of letters only
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')

def test_user_register_invalid_email():
    '''
    Testing for invalid first name when user tries to register
    '''
    user_database = u()
    user_database.db_reset()
    result = user_database.register('exam.com','password')
    assert str(result[0]) == "Email is not valid"

def test_user_register_duplicate_email():
    '''
    Testing for invalid last name when user tries to register
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password2')
    result = user_database.register('example@gmail.com','password2')
    assert str(result[0]) == "Email already has an associated user"

def test_user_valid_login():
    '''
    Testing for valid user login
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')
    token = user_database.login('example@gmail.com','password')
    assert token is not None

def test_user_login_invalid_email():
    '''
    Testing for invalid u_id user login
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')
    result = user_database.login('asdasdad@gmail.com', 'password')
    assert str(result[0]) == 'Email or password is incorrect'

def test_user_login_invalid_password():
    '''
    Testing for invalid password
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')
    result = user_database.login('example@gmail.com', 'asdasd')
    assert str(result[0]) == "Email or password is incorrect"

def test_user_invalid_login_already_logged_in():
    '''
    Testing for a user already logged in for user login
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')
    user_database.login('example@gmail.com', 'password')
    result = user_database.login('example@gmail.com', 'password')
    assert str(result[0]) == "User is already logged in"

def test_user_valid_logout():
    '''
    Testing for valid user logout
    '''
    user_database = u()
    user_database.db_reset()
    user_database.register('example@gmail.com','password')
    token = user_database.login('example@gmail.com', 'password')
    user_database.logout(token)
