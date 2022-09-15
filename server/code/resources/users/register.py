from flask_restful import Resource, reqparse
from models.user_model import UserModel
from security import hash_password


class Register(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email",
                        type=str,
                        required=True,
                        help="Email cannot be left blank")

    parser.add_argument("password",
                        type=str,
                        required=True,
                        help="Password cannot be left blank")

    parser.add_argument("full_name",
                        type=str,
                        required=True,
                        help="Full name cannot be left blank")

    parser.add_argument("role",
                        type=str,
                        required=True,
                        help="role cannot be left blank")

    @classmethod
    def post(cls):

        data = Register.parser.parse_args()

        # Check if email/username already exists
        if UserModel.find_by_email(data['email']):
            return {'message': 'Opps! Email Already In Use'}, 400

        # Hash password before saving into database
        data['password'] = hash_password(data['password'])

        # Validate role
        data['role'] = data['role'].lower()
        if data['role'] not in ['employer', 'applicant']:
            return {'message': 'Role must be either employer or applicant'}, 400

        # Instantiate an UserModel object to save to database
        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User Created Successfully"}, 201
