from flask_restful import Resource
from response_message_code import response_message_code


class User(Resource):

    @classmethod
    def get(cls):
        return response_message_code("hello", 200)
