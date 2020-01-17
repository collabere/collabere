from django.conf.urls import url
from .views import getClientByEmail, getClientInfoFromClientId, deleteClientInfo, insertClient, insertHomePageIntoEmail, getAllHomePageIntroEmails,checkExistenceOfClient, ValidatePassPhrase

urlpatterns = [
    url(r'^v1/(\d+)$', getClientInfoFromClientId,name='client_details'),
    url(r'delete/(\d+)$', deleteClientInfo, name='influencer_delete'),
    url(r'put$', insertClient, name='insert_influencer'),
    url(r'intro_email$', insertHomePageIntoEmail, name='insert_messages'),
    url(r'all_emails$', getAllHomePageIntroEmails),
    url(r'byClientEmail/(\w+)$', getClientByEmail),
    url(r'clientEmail', checkExistenceOfClient, name='check_client_email_existence'),
    url(r'^test$', ValidatePassPhrase.as_view(), name='validate_update_pass_phrase'),

]
