from flask_restful import Resource, reqparse
from models.user_model import UserModel
from security import hash_password
from flask_jwt_extended import get_jwt_identity, jwt_required


class UpdateProfile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("password",
                        type=str,
                        required=True,
                        help="password cannot be left blank")

    parser.add_argument("new_password",
                        type=str,
                        required=True,
                        help="new_password cannot be left blank")

    parser.add_argument("full_name",
                        type=str,
                        required=True,
                        help="full_name cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        data = UpdateProfile.parser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        if user is None:
            return {"message": "User not found"}, 404

        if user.password == hash_password(data['password']):
            user.password = hash_password(data['new_password'])
            user.full_name = data['full_name']
            user.save_to_db()
            return {"message": "User Updated Successfully"}, 201

        return {"message": "Wrong password"}, 400
