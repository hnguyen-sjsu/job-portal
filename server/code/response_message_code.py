from flask import make_response, Response
import json


def response_message_code(dict, status_code=None):
    return Response(
        response=json.dumps({
            "message": dict,
        }),
        status=status_code,
        mimetype="application/json"
    )


def response_custom_message(message, data, status_code=None):
    return make_response({message: str(data)}, status_code)
