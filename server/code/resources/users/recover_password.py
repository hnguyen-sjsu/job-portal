from flask_restful import Resource, reqparse
from models.user_model import UserModel, PasswordRecovery
from itsdangerous import URLSafeSerializer
from dotenv import load_dotenv
from flask_mail import Message
from email_to_user import mail
import os
import datetime
from security import hash_password

load_dotenv()


class RecoverPasswordURL(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email",
                        type=str,
                        required=True,
                        help="email cannot be left blank")

    @classmethod
    def get(cls):
        # check if email exists
        data = RecoverPasswordURL.parser.parse_args()
        email = UserModel.find_by_email(data["email"])
        if email is None:
            return {"message": "Email does not exist"}, 400

        # generate reset token and send email
        reset_token = URLSafeSerializer(
            os.getenv("URLSafeSerializer_SECRET_KEY")).dumps(data["email"])

        msg = Message("You have requested a password reset",
                      recipients=[data["email"]])
        link = f"http://localhost:3000/reset-password?token={reset_token}"
        msg.html = "Please click on this link to reset your password: <br>" + \
            f"<a href='{link}'>{link}</a>" + \
            "<br> This link will expire in 30 minutes."
        try:
            mail.send(msg)
        except:
            return {"message": "Something went wrong"}, 500

        # save user_id to password_reset table with 30 minute expiry if token is not already exists
        token = PasswordRecovery.find_by_token(reset_token)
        # if token is already exists, update the expiry time
        if token:
            token.time_expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            token.save_to_db()
        else:
            new_token = PasswordRecovery(reset_token)
            new_token.save_to_db()

        # return the link with reset_token to the client
        return {"message": link}, 200


class ResetPassword(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("reset_token",
                        type=str,
                        required=True,
                        help="reset_token cannot be left blank")
    parser.add_argument("new_password",
                        type=str,
                        required=True,
                        help="new_password cannot be left blank")

    @classmethod
    def post(cls):
        data = ResetPassword.parser.parse_args()

        # check if token is valid
        reset_token = PasswordRecovery.find_by_token(data["reset_token"])

        if reset_token is None:
            return {"message": "Invalid reset_token"}, 400

        # check if token is expired
        if reset_token.time_expire < datetime.datetime.utcnow():
            return {"message": "Token has expired"}, 400

        # get email from token
        email = URLSafeSerializer(
            os.getenv("URLSafeSerializer_SECRET_KEY")).loads(data["reset_token"])

        # find the user with this email
        user = UserModel.find_by_email(email)

        # check if email exists
        if user is None:
            return {"message": "Email does not exist"}, 400

        # update the password
        user.password = hash_password(data["new_password"])
        user.save_to_db()

        # delete the token from password_reset table
        reset_token.delete_from_db()

        return {"message": "Password has been updated"}, 200
