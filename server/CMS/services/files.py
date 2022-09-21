import hashlib
import hmac
import uuid

from ..settings import settings

import pyuploadcare as uploadcare


class ImageService:
    def __init__(self):
        uploadcare.conf.pub_key = settings.uploadcare_public_key
        uploadcare.conf.secret = settings.uploadcare_secret_key

    @staticmethod
    def get_url(uuid: str) -> str:
        return f"{uploadcare.conf.cdn_base}{uuid}"

    @staticmethod
    def validate_webhook(payload: bytes, hash: str) -> bool:
        generated_hash = (
            'v1='
            + hmac.new(
                settings.uploadcare_secret_key.encode("utf-8"),
                payload,
                hashlib.sha256
            ).hexdigest()
        )

        if hash != generated_hash:
            return False

        return True

    def upload(self, image: any) -> str:
        file_uuid: str = str(uuid.uuid4())
        file = uploadcare.File(file_uuid)
        file = file.upload(image, store=True)

        return file.cdn_url

    def delete(self, url: str) -> None:
        file = uploadcare.File(url)
        file.delete()
