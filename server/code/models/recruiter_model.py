from db import db
from models.candidate_model import CandidateModel
from models.user_model import UserModel
from models.skill_model import SkillModel
from models.education_model import EducationModel
from models.work_experience_model import WorkExperienceModel
from helpers import dict_to_camel_case


class RecruiterModel(db.Model):
    __tablename__ = 'recruiters'
    id = db.Column(db.Integer(), primary_key=True)
    company_name = db.Column(db.String(), nullable=False)
    company_size = db.Column(db.String(), nullable=False)
    industry = db.Column(db.String(), nullable=False)
    company_logo_url = db.Column(db.Text(), nullable=False)

    # Foreign key that references to the user id in the users table.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)
    # job = db.relationship('Job', backref='recruiters',
    #                       lazy=True, cascade='all, delete-orphan')

    # membership = db.relationship('Membership', backref='recruiters',
    #                              lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    # Constructor
    def __init__(self, user_id, company_name="", company_size="", industry="", company_logo_url=""):
        self.company_name = company_name
        self.company_size = company_size
        self.industry = industry
        self.company_logo_url = company_logo_url
        self.user_id = user_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def update(cls, _id, **kwargs):
        # find recruiter
        recruiter = cls.query.filter_by(id=_id).first()
        if recruiter:
            for key, value in kwargs.items():
                setattr(recruiter, key, value)

            recruiter.save_to_db()
            return recruiter

    @classmethod
    def find_logo_by_uid(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first().company_logo_url

    @classmethod
    def find_all_candidates(cls):
        results = []
        candidates_users = UserModel.query.filter_by(role='candidate').all()
        for candidate_user in candidates_users:
            user_id = candidate_user.id
            # get candidate's profile
            profile = CandidateModel.find_by_user_id(user_id)
            profile = dict_to_camel_case(profile.to_dict())
            # get candidate's education
            educations = EducationModel.find_all_by_user_id(user_id)
            educations = [dict_to_camel_case(
                education.to_dict()) for education in educations]
            # get candidate's work experience
            work_experiences = WorkExperienceModel.find_all_by_user_id(user_id)
            work_experiences = [dict_to_camel_case(
                work_experience.to_dict()) for work_experience in work_experiences]
            # get candidate's skills
            skills = SkillModel.find_all_by_user_id(user_id)
            skills = [dict_to_camel_case(skill.to_dict()) for skill in skills]
            results.append({'profile': profile, 'educations': educations,
                           'work_experiences': work_experiences, 'skills': skills})
        return results
