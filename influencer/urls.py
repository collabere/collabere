

from django.conf.urls import url
from django.contrib.auth import views
from django.views.decorators.csrf import csrf_exempt

from .views import handleLogin, getClientsBasedOnInfluencers, getInfluencerDetails, deleteInfluencer, putInfluencer,handleRegisterInfluencer, usernameFetch,saveClientMappingWithInfluencer


urlpatterns = [
    url(r'login/', handleLogin, name='influencer_login'),
    url(r'logout/',views.LogoutView.as_view(),name='influencer_logut'),
    url(r'v1/clients', getClientsBasedOnInfluencers, name='influencer_clients'),
    url(r'username', usernameFetch, name='influence_username_fetch'),
    url(r'user_details', getInfluencerDetails, name='influencer_details'),
    url(r'delete/(\d+)$', deleteInfluencer, name='influencer_delete'),
    url(r'put$', putInfluencer, name='insert_influencer'),
    url(r'register/', handleRegisterInfluencer, name='influencer_register'),
    url(r'save_client_mapping/', saveClientMappingWithInfluencer, name='save_client_influencer_mapping'),
]
