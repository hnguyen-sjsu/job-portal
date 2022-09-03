from flask_restful import Resource, reqparse
from flask import jsonify, make_response
from models.user_model import UserModel
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from response_message_code import response_message_code


class Logout(Resource):

    @classmethod
    def post(cls):
        response = response_message_code("Logout successful", 200)
        unset_jwt_cookies(response)
        return response
