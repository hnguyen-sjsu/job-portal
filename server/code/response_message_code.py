from flask import jsonify, make_response


def response_message_code(message, status_code=None):
    return make_response(jsonify({"message": message}), status_code)
