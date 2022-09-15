from flask_restful import Resource
from response_message_code import response_message_code
from models.user_model import UserModel
from flask import jsonify


class User(Resource):

    @classmethod
    def get(cls):
        users = UserModel.find_all()
        return {"users": [user.to_dict() for user in users]}, 200
