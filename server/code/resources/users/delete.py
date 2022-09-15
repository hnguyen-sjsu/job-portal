from flask_restful import Resource
from models.user_model import UserModel
from flask_jwt_extended import get_jwt_identity, jwt_required
from response_message_code import response_message_code


class Delete(Resource):

    @classmethod
    @jwt_required()
    def delete(cls):
        user_id = get_jwt_identity()
        try:
            UserModel.delete_by_id(user_id)
            return response_message_code("User deleted", 200)
        except:
            return response_message_code("User not found", 404)
