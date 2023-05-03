"""
Error Codes
"""
from werkzeug.exceptions import HTTPException

class AccessError(HTTPException):
    """
    Forbidden Request Error
    
    Args:
        HTTPException: exception
    """
    code = 403
    message = 'Access Error'

class InputError(HTTPException):
    """
    Bad Request Error
    
    Args:
        HTTPException: exception
    """
    code = 400
    message = 'Input Error'
    