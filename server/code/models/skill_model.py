from db import db
from sqlalchemy.types import Date
from sqlalchemy import or_, and_, all_, any_


class SkillModel(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    # Foreign key to user id.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_the_last_skill(cls):
        return SkillModel.query.order_by(SkillModel.id.desc()).first()

    @classmethod
    def delete_from_db(cls, _id):
        db.session.delete(cls.query.filter_by(id=_id).first())
        db.session.commit()

    @classmethod
    def delete_all_by_uid(cls, user_id):
        db.session.query(cls).filter_by(user_id=user_id).delete()
        db.session.commit()

    @classmethod
    def find_all(cls):
        skills = cls.query.all()

        return skills

    @classmethod
    def find_all_by_user_id(cls, user_id):
        skills = cls.query.filter_by(user_id=user_id).all()

        return skills

    # This method returns a set of skills of the user.
    @classmethod
    def find_all_skills_by_uid(cls, user_id):
        skills = db.session.query(
            SkillModel.name).filter_by(user_id=user_id).all()

        return set(skill[0].lower() for skill in skills)

    @classmethod
    def find_by_skill_id(cls, skill_id):
        skill = cls.query.filter_by(id=skill_id).first()

        return skill

    @classmethod
    def find_all_by_skill_names(cls, skills):

        like_clauses = [cls.name.like(f'%{skill}%') for skill in skills]

        results = cls.query.filter(or_(*like_clauses)).all()
        candidate_ids = set(result.user_id for result in results)
        return candidate_ids

    @ classmethod
    def update(cls, **kwargs):
        skill = cls.find_by_skill_id(kwargs['skill_id'])
        if skill:
            for key, value in kwargs.items():
                setattr(skill, key, value)

            skill.save_to_db()
            return skill

        return None
