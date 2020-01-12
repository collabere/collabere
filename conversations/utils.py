import boto3
from inclyfy import settings


def uploadToAwsBucket(file):
    s3 = boto3.resource('s3',
                        aws_access_key_id=settings.AWS_ACCESS_KEY,
                        aws_secret_access_key=settings.AWS_SECRET_KEY)
    print('Uploading the file ' + file.name + ' to aws bucket ....')
    s3.Bucket(settings.S3_BUCKET_NAME).upload_file(
        Filename=file.name, Key=file.name)

def uploadToAwsProfilePicBucket(file):
    s3 = boto3.resource('s3',
                        aws_access_key_id=settings.AWS_ACCESS_KEY,
                        aws_secret_access_key=settings.AWS_SECRET_KEY)
    print('Uploading the file ' + file.name + ' to aws bucket ....')
    s3.Bucket(settings.S3_PROFILE_PIC_BUCKET_NAME).upload_file(
        Filename=file.name, Key=file.name)
