from rest_framework.exceptions import APIException

class FileNotFound(APIException):
    status_code = 400
    default_detail = 'Required file doesnt exist, probably due to saving error. Try to upload again.'