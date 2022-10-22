from db import db
from sqlalchemy.types import Date


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
    def delete_by_id(cls, _id):
        db.session.delete(cls.query.filter_by(id=_id).first())
        db.session.commit()

    @classmethod
    def find_all(cls):
        skills = cls.query.all()

        return skills

    @classmethod
    def find_by_uid(cls, user_id):
        skills = cls.query.filter_by(user_id=user_id).all()

        return skills

    @classmethod
    def find_by_skill_id(cls, skill_id):
        skill = cls.query.filter_by(id=skill_id).first()

        return skill

    @classmethod
    def update(cls, **kwargs):
        skill = cls.find_by_skill_id(kwargs['skill_id'])
        if skill:
            for key, value in kwargs.items():
                setattr(skill, key, value)

            skill.save_to_db()
            return skill

        return None
