from db import db
from sqlalchemy.orm import defer
from helpers import dict_to_camel_case
from models.education_model import EducationModel
from models.user_model import UserModel
from models.skill_model import SkillModel
from models.work_experience_model import WorkExperienceModel


class CandidateModel(db.Model):
    __tablename__ = 'candidates'
    id = db.Column(db.Integer(), primary_key=True)
    full_name = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    bio = db.Column(db.Text(), nullable=False)
    resume_url = db.Column(db.String(), nullable=False)

    # Foreign key that references to the user id in the users table.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    # Constructor
    def __init__(self, user_id, full_name="", location="", phone_number="", bio="", resume_url=""):
        self.full_name = full_name
        self.location = location
        self.phone_number = phone_number
        self.bio = bio
        self.resume_url = resume_url
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
    def find_by_user_id_for_recruiter(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @ classmethod
    def update(cls, _id, **kwargs):
        # find candidate
        candidate = cls.query.filter_by(id=_id).first()
        if candidate:
            for key, value in kwargs.items():
                setattr(candidate, key, value)

            candidate.save_to_db()
            return candidate

    @classmethod
    def find_candidate_profile(cls, user_id):
        # get users email
        email = UserModel.find_by_id(user_id).email
        # get candidate's profile
        profile = CandidateModel.find_by_user_id_for_recruiter(user_id)
        profile = dict_to_camel_case(profile.to_dict())
        profile['email'] = email

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

        # return a dictionary of candidate's profile, education, work experience, and skills
        return {'profile': profile, 'educations': educations, 'workExperiences': work_experiences, 'skills': skills}
    # @classmethod
    # def delete_by_user_id(cls, user_id):
    #     user = cls.query.filter_by(user_id=user_id).first()
    #     db.session.delete(user)
    #     db.session.commit()
