"""
User Functions
"""

import sqlite3
from sqlite3 import Connection
import hashlib
import pprint
from email_validator import validate_email, EmailSyntaxError
from flask_api import status

class UserDatabase:
    """
    Class containing methods to operate on user database
    """
    def __init__(self) -> None:
        con = self.get_connection()
        cur = con.cursor()
        cur.execute('''CREATE TABLE IF NOT EXISTS users
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                email              TEXT NOT NULL,
                password               TEXT NOT NULL,
                UNIQUE(email));
                ''')
        cur.execute('''
            CREATE TABLE IF NOT EXISTS sessions(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE,
                token TEXT UNIQUE,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );''')
        con.commit()
        cur.close()

    def get_connection(self):
        return sqlite3.connect('user_data.db')

    def register(self, email: str, password: str):
        con = self.get_connection()
        cur = con.cursor()
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        try:
            validate_email(email)
        except EmailSyntaxError:
            con.close()
            print(email)
            return "Email is not valid", status.HTTP_400_BAD_REQUEST

        try:
            cur.execute('''
                INSERT INTO users(email, password) VALUES(?,?) 
            ''', (email, hashed_password))
            con.commit()
            con.close()
        except sqlite3.IntegrityError:
            con.close()
            return "Email already has an associated user", status.HTTP_400_BAD_REQUEST
        return "success", status.HTTP_200_OK

    def get_session(self, email: str, password: str, con: Connection) -> int:
        cur = con.cursor()
        cur.execute('''
            SELECT id FROM users WHERE email = ? and password = ?
        ''', (email, password))
        user_id = cur.fetchone()
        if user_id is None:
            raise ValueError
        return user_id[0]

    def login(self, email: str, password: str) -> str:
        con = self.get_connection()
        cur = con.cursor()
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        try:
            user_id = self.get_session(email, hashed_password, con=con)
        except ValueError:
            con.close()
            return "Email or password is incorrect", status.HTTP_400_BAD_REQUEST
        secret = 'asodijasiod'
        token = str(user_id) + secret
        hashed_token = hashlib.sha256(token.encode('utf-8')).hexdigest()

        try:
            cur.execute('''
            INSERT INTO sessions(user_id, token) VALUES(?,?)
            ''', [user_id, hashed_token])
        except sqlite3.IntegrityError:
            con.close()
            return "User is already logged in", status.HTTP_400_BAD_REQUEST
        con.commit()
        con.close()
        return hashed_token

    def logout(self, token: str) -> None:
        con = self.get_connection()
        cur = con.cursor()
        cur.execute('''DELETE FROM sessions WHERE token = ?''', (token,))
        con.commit()
        con.close()
        return {}

    def db_reset(self):
        con = self.get_connection()
        cur = con.cursor()
        cur.execute('''DROP TABLE IF EXISTS users;''')
        cur.execute('''DROP TABLE IF EXISTS sessions''')
        cur.execute('''CREATE TABLE IF NOT EXISTS users
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                email              TEXT NOT NULL,
                password               TEXT NOT NULL,
                UNIQUE(email));
                ''')
        cur.execute('''
            CREATE TABLE IF NOT EXISTS sessions(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE,
                token TEXT UNIQUE,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );''')
        con.commit()
        con.close()

    def db_print(self):
        con = self.get_connection()
        cur = con.cursor()
        cur.execute('''SELECT * FROM users;''')
        users_result = cur.fetchall()
        pprint.pprint(users_result)
        cur.execute('''SELECT * FROM sessions;''')
        sessions_result = cur.fetchall()
        pprint.pprint(sessions_result)
