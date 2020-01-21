from django.conf.urls import url
from .views import getClientByEmail, getClientInfoFromClientId, deleteClientInfo, insertClient, insertHomePageIntoEmail, getAllHomePageIntroEmails,checkExistenceOfClient, ValidatePassPhrase, updateClient

urlpatterns = [
    url(r'^v1/(\d+)$', getClientInfoFromClientId,name='client_details'),
    url(r'delete/(\d+)$', deleteClientInfo, name='influencer_delete'),
    url(r'insert_client$', insertClient, name='insert_client'),
    url(r'update_client$', updateClient, name='update_client'),
    url(r'intro_email$', insertHomePageIntoEmail, name='insert_messages'),
    url(r'all_emails$', getAllHomePageIntroEmails),
    url(r'byClientEmail/(\w+)$', getClientByEmail),
    url(r'clientEmail', checkExistenceOfClient, name='check_client_email_existence'),
    url(r'^validate_update_pass_phrase$', ValidatePassPhrase.as_view(), name='validate_update_pass_phrase'),
]
