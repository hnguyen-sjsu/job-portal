from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from models.job_model import JobModel


class Protected(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        jobs = JobModel.get_joined_table(get_jwt_identity().get('user_id'))
        results_list = {}
        results = {'jobs': []}

        # Unpack the job_company tuple

        def unpack(job_company):
            # unpack the job_company tuple
            job, company, application = job_company
            if len(results) != 0:
                # check if job id is in results
                job_id_in_results = int(job.id) in [int(job['id'])
                                                    for job in results.get('jobs')]
                # if job id is in results, append the application to the current application list of that job.
                if job_id_in_results:
                    # Add application to the current application list
                    for j in results.get('jobs'):
                        if int(j['id']) == int(job.id):
                            j['applications'].append(application.to_dict())
                            break
                    return results
            # convert company to camel case and add to dict as company
            company = {'company': company.to_dict()}
            application = application.to_dict()
            # convert job to camel case
            job = job.to_dict()
            # add company to job
            job.update(company)
            # add applications list to job with key applications
            job.update({'applications': [application]})
            # add job to results list
            results['jobs'].append(job)
            return results

        for job in jobs:
            results_list.update(unpack((job)))

        return results_list
