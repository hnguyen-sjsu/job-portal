from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


class Protected(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        return {"user": get_jwt_identity()}, 200
