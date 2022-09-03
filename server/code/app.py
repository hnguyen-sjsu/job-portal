import os
from db import db
from flask import Flask
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask_restful import Api
from flask_cors import CORS
from resources.users.user import User
from resources.users.register import Register
from resources.users.login import Login
from resources.users.private import Protected
from resources.users.logout import Logout
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies


app = Flask(__name__)
api = Api(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)


# create the tables if not exists
@app.before_first_request
def create_tables():
    db.create_all()


# Using an `after_request` callback, we refresh any token that is within 30
# minutes of expiring. Change the timedeltas to match the needs of your application.
@app.after_request
def refresh_expiring_jwts(response):

    try:
        # Expiration time of the current token
        exp_timestamp = get_jwt()["exp"]

        now = datetime.now(timezone.utc)
        # Current time + x (mins)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=0.5))

        # Refresh the token if Current time > Expiration time
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)

        return response
    except (RuntimeError, KeyError):
        # If Expiration time > Current time that means the token is no longer valid.
        # The user must login again to get a new valid token.
        return response


# Customize error message when no token is present
@jwt.unauthorized_loader
def my_expired_token_callback(response):
    return {"message": "Please provide a valid token"}, 401


# API endpoints
api.add_resource(User, '/hello')  # http://127.0.0.1:5000/hello
api.add_resource(Register, '/register')  # http://127.0.0.1:5000/hello
api.add_resource(Login, '/login')  # http://127.0.0.1:5000/login
api.add_resource(Logout, '/logout')  # http://127.0.0.1:5000/logout
api.add_resource(Protected, '/protected')  # http://127.0.0.1:5000/protected


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
