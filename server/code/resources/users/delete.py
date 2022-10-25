from flask_restful import Resource
from models.user_model import UserModel
from flask_jwt_extended import get_jwt_identity, jwt_required, unset_jwt_cookies
from flask_smorest import abort
from helpers import response_message_code


class Delete(Resource):

    @classmethod
    @jwt_required()
    def delete(cls):
        user_id = get_jwt_identity().get('user_id')
        try:
            UserModel.delete_by_id(user_id)
            response = response_message_code(
                'Account deleted and logged out successfully', 200)
            unset_jwt_cookies(response)
            return response
        except:
            abort(500, message='An error occurred while deleting the user')
