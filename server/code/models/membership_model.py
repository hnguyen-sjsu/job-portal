from db import db
import datetime
from sqlalchemy.types import DateTime


class MembershipModel(db.Model):
    __tablename__ = 'memberships'
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(DateTime(timezone=True))
    expiration_date = db.Column(DateTime(timezone=True))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)  # foreign key to user id.

    def __repr__(self):
        return str({column.name: getattr(self, column.name) for column in self.__table__.columns})

    def __init__(self, start_date, expiration_date, user_id):
        self.start_date = start_date
        self.expiration_date = expiration_date
        self.user_id = user_id

    def to_dict(self):
        return {column.name: str(getattr(self, column.name)) for column in self.__table__.columns}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def remove_expired_memberships(self):
        expired_memberships = self.query.filter(
            self.expiration_date < datetime.datetime.now()).all()
        for membership in expired_memberships:
            membership.delete_from_db()

    @classmethod
    def find_all(cls):
        memberships = cls.query.all()

        return memberships

    @classmethod
    def find_all_by_uid(cls, user_id):
        memberships = cls.query.filter_by(user_id=user_id).first()

        return memberships

    @classmethod
    def find_by_membership_id(cls, membership_id):
        membership = cls.query.filter_by(id=membership_id).first()

        return membership

    @classmethod
    def update(cls, **kwargs):
        membership = cls.find_by_membership_id(kwargs['membership_id'])
        if membership:
            membership.start_date = kwargs['start_date']
            membership.expiration_date = kwargs['expiration_date']
            membership.save_to_db()
            return membership
        return None
