[![codecov](https://codecov.io/github/cseteaching-unsw-edu-au/se2021-23t1-einvoicing-api-f10a-pikachu-rendering-api/branch/main/graph/badge.svg?token=71FFT0HLKQ)](https://codecov.io/github/cseteaching-unsw-edu-au/se2021-23t1-einvoicing-api-f10a-pikachu-rendering-api)

## Swagger
https://app.swaggerhub.com/apis-docs/BB81GNATHAN_1/F10A_PIKACHU/1.0.0

## Installation

Run `pip install -r requirements.txt` to install all necessary requirements.

## Features

* Conversion of XML e-Invoice in UBL 2.0 format to HTML or JSON
* Support for both server side and client side rendering
* Support for 7 languages, including German, English, Spanish, French, Hindi, Russian and Chinese
* Three styled templates 
* Error handling for invalid parameters

## Documentation

| Route Name           | Decription                                                                                                          | Parameters and Return Values                                                                                                                                       | Exceptional Flows                                                                                                      |
|----------------------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `/invoice/render` | Generates a prerendered <br>HTML file with attached <br>CSS style page for the user <br>to view<br>on their browser | Input: An XML file conforming <br>to UBL specifications,<br>a language and template specifier.<br>Output: Contains an HTML file and <br>a success code.            | 200 - Success<br>400 - Invalid template<br>400 - Invalid language<br>400 - Malformed XML<br>500 - Other internal error |                                                    |
| `/login`         | Given a u_id, logs in as the user associated with the u_id.                         | Input: A u_id which is an unique integer that identifies a specific user. <br>Output: None | 200 - Success<br>400 - User already logged in<br>400 - U_id is not an integer<br>400 - U_id does not exist in the database<br>500 - Other internal error     |
| `/register`      | Given a first and last name, register user into the database and gives them a u_id. | Input: First and last name which is used to register the user.<br>Output: None             | 200 - Success<br>400 - First name has a character that is not a letter<br>400 - Last name has a character that is not a letter<br>500 - Other internal error |
| `/logout`        | Logs out the current logged in user.                                                | Input: None<br>Output: None                                                                | 200 - Success<br>500 - Other internal error                                                                                                                  |
| `/clear`         | Clears the database.                                                                | Input: None<br>Output: None                                                                | 200 - Success<br>500 - Other internal error                                                                                                                  |
| `/database`      | Lists the database.                                                                 | Input: None<br>Output: None                                                                | 200 - Success<br>500 - Other internal error                                                                                                                  |
## Examples

Example API call to generate a pre rendered HTML file using python, the requests library
and an XML file named example.xml stored in the working directory.
```
import requests

with open('example.xml') as file:
    xml_data = file.read()
params = {
    'language': 'en',
    'template': 'default'
}
headers = {'Content-Type': 'xml'}
requests.post('.../invoice/render/html', data = xml_data, params = params, headers = headers)
```

## Run Pylint
Run `pylint $(git ls-files '*.py')` in root folder, to run pylint on all files.

## Run Testing
Run `coverage run -m src.app` in one terminal, to start the server. Then in another terminal, run `pytest --cov=src` in root folder, to run all tests.

The local host can be modified in the `src/url.py` file.

## Deploy
The folder `deploy` currently contains our deployed code at this root URL: 
http://pikachurenderingapi4-env.eba-pbs3up24.us-east-1.elasticbeanstalk.com/.
