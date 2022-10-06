from models.job_model import JobModel
from models.password_recovery import PasswordRecovery


def remove_expired_jobs():
    try:
        JobModel.remove_expired_jobs()
    except:
        return "Error removing expired jobs"

    return "Successfully removed expired jobs"


def remove_expired_tokens():
    try:
        PasswordRecovery.remove_expired_tokens()
    except:
        return "Error removing expired tokens"

    return "Successfully removed expired tokens"
