from flask_restful import Resource, reqparse
from models.user_model import UserModel
from models.candidate_model import CandidateModel
from models.recruiter_model import RecruiterModel
from security import hash_password


class Register(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email",
                        type=str,
                        required=True,
                        help="email cannot be left blank")

    parser.add_argument("password",
                        type=str,
                        required=True,
                        help="password cannot be left blank")

    parser.add_argument("role",
                        type=str,
                        required=True,
                        help="role cannot be left blank")

    @classmethod
    def post(cls):

        data = Register.parser.parse_args()

        # Check if email already exists in users table.
        if UserModel.find_by_email(data['email']):
            return {'message': 'Opps! Email already in use'}, 400

        # Hash password before saving into database
        data['password'] = hash_password(data['password'])

        # Validate role
        data['role'] = data['role'].lower()
        if data['role'] not in ['candidate', 'recruiter']:
            return {'message': 'Role must be either candidate or recruiter'}, 400

        # Instantiate an UserModel object to save to database
        user = UserModel(**data)
        user.save_to_db()
        # Create a candidate or recruiter object
        if data['role'] == 'candidate':
            candidate = CandidateModel(user_id=user.id)
            candidate.save_to_db()
        else:
            recruiter = RecruiterModel(user_id=user.id)
            recruiter.save_to_db()
        return {"message": "User created successfully"}, 201
