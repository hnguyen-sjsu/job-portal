from db import db
import datetime


class PasswordRecovery(db.Model):
    __tablename__ = 'password_recovery'
    id = db.Column(db.Integer(), primary_key=True)
    reset_token = db.Column(db.String(80), nullable=False)
    time_expire = db.Column(db.DateTime(timezone=True))

    def __init__(self, reset_token):
        self.reset_token = reset_token
        self.time_expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_token(cls, token):
        return cls.query.filter_by(reset_token=token).first()

    @classmethod
    def remove_expired_tokens(cls):
        cls.query.filter(cls.time_expire < datetime.datetime.utcnow()).delete()
        db.session.commit()
