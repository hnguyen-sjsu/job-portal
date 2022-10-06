from flask_restful import Resource
from models.user_model import UserModel
from flask_jwt_extended import get_jwt_identity, jwt_required


class Delete(Resource):

    @classmethod
    @jwt_required()
    def delete(cls):
        user_id = get_jwt_identity().get('user_id')
        try:
            UserModel.delete_by_id(user_id)
            return {"message": "User deleted successfully"}, 200
        except:
            return {"message": "User not found"}, 404
