from models.job_model import Job


def remove_expired_jobs():
    try:
        Job.remove_expired_jobs()
    except:
        return "Error removing expired jobs"

    return "Successfully removed expired jobs"
