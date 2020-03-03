from django.conf.urls import url
from django.contrib.auth import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token

from .views import handleLogin, getClientsBasedOnInfluencers, getInfluencerDetails, deleteInfluencer, putInfluencer, \
    usernameFetch, saveClientMappingWithInfluencer, CreateUserAPIView, LogoutUserAPIView, changePasswordInboundUsername, \
    sendEmailToResetPassword, getInfluencerPublicDetails, updateInfluencerPublicDetails, getInfluencerWithEmail, ProfilePictureUploadView, \
        getAccessToken

urlpatterns = [
    url(r'login/', handleLogin, name='influencer_login'),
    url(r'logout/', views.LogoutView.as_view(), name='influencer_logut'),
    url(r'v1/clients', getClientsBasedOnInfluencers, name='influencer_clients'),
    url(r'username', usernameFetch, name='influence_username_fetch'),
    url(r'user_details', getInfluencerDetails, name='influencer_details'),
    url(r'user_fetch_email', getInfluencerWithEmail, name='influencer_fetch_email'),
    url(r'delete/(\d+)$', deleteInfluencer, name='influencer_delete'),
    url(r'^get_public_details$', getInfluencerPublicDetails, name='get_influencer_public_details'),
    url(r'^update_public_details$', updateInfluencerPublicDetails, name='update_influencer_public_details'),
    url(r'updateDetails$', putInfluencer, name='update_influencer'),
    url(r'save_client_mapping/', saveClientMappingWithInfluencer, name='save_client_influencer_mapping'),
    url(r'^auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    url(r'^auth/change_password/$',
        changePasswordInboundUsername,
        name='change_password'),
    url(r'^auth/send_email_to_reset_password/$',
        sendEmailToResetPassword,
        name='reset_password'),
    url(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),
    url(r'^update_profile_pic$',
        ProfilePictureUploadView.as_view(),
        name='profile_pic_upload'),
    url(r'^fetch_access_token$', getAccessToken, name="fetch_access_token")

]
