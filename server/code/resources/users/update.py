from flask_restful import Resource, reqparse
from models.user_model import UserModel
from security import hash_password
from flask_jwt_extended import get_jwt_identity, jwt_required


class UpdateProfile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email",
                        type=str,
                        required=True,
                        help="email cannot be left blank")

    parser.add_argument("new_password",
                        type=str,
                        required=True,
                        help="new_password cannot be left blank")

    @classmethod
    @jwt_required()
    def put(cls):
        data = UpdateProfile.parser.parse_args()

        user = UserModel.find_by_id(get_jwt_identity().get('user_id'))

        # Check if user exists
        if user is None:
            return {"message": "User not found"}, 404

        # --------If the user only wants to update either email or password, then the other field will be left as empty string ("")--------

        # Check if the user wants to change the email
        if data.email != "":
            # Check if email is already taken
            email = UserModel.find_by_email(data["email"])
            if email:
                return {"message": "Email already taken"}, 400
            # Update user's email
            user.email = data["email"]
            user.save_to_db()

        # Check if the user wants to change the password
        if data.new_password != "":
            # Update user password
            user.password = hash_password(data['new_password'])
            user.save_to_db()

        return {"message": "User updated successfully"}, 201
