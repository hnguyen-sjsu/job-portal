from flask_restful import Resource
from models.user_model import UserModel
from security import hash_password
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_smorest import abort
from flask import request
from marshmallow import Schema, fields
from email_validator import validate_email, EmailNotValidError


class UpdateProfileSchema(Schema):
    email = fields.Str(required=True)
    new_password = fields.Str(required=True)


class UpdateProfile(Resource):

    @classmethod
    @jwt_required()
    def put(cls):
        errors = UpdateProfileSchema().validate(request.get_json())
        if errors:
            abort(400, message=errors)
        data = request.get_json()
        print(data)
        user = UserModel.find_by_id(get_jwt_identity().get('user_id'))

        # Check if user exists
        if user is None:
            abort(404, message='User not found')

        # --------If the user only wants to update either email or password, then the other field will be left as empty string ('')--------

        # Check if the user wants to change the email
        if data['email'] != '':
            # Validate email
            try:
                validate_email(data['email'])
            except EmailNotValidError as e:
                print(e)
                abort(400, message='Invalid email')

            # Check if email is already taken
            email = UserModel.find_by_email(data['email'])
            if email:
                abort(400, message='Email already taken')
            # Update user's email
            user.email = data['email']
            user.save_to_db()

        # Check if the user wants to change the password
        if data['new_password'] != '':
            print("Change password")
            # Update user password
            user.password = hash_password(data['new_password'])
            user.save_to_db()

        return {'message': 'User updated successfully'}, 201
