

from django.conf.urls import url
from django.contrib.auth import views

from .views import home, handleLogin, getInfluencerFromInfluencerUsername, getClientsBasedOnInfluencers, getInfluencerDetails, deleteInfluencer, putInfluencer,handleRegisterInfluencer
from django.urls import reverse_lazy

urlpatterns = [
    url(r'login/', handleLogin, name='influencer_login'),
    url(r'home/',home,name='influencer_home'),
    url(r'logout/',views.LogoutView.as_view(),name='influencer_logut'),
    url(r'v1/(\d+)$', getInfluencerDetails, name='influencer_details'),
    url(r'v1/clients/(\d+)$', getClientsBasedOnInfluencers, name='influencer_clients'),
    # url(r'username/(\w+)', getInfluencerFromInfluencerUsername, name='influencer_details_username'),
    url(r'delete/(\d+)$', deleteInfluencer, name='influencer_delete'),
    url(r'put$', putInfluencer, name='insert_influencer'),
    url(r'register/', handleRegisterInfluencer, name='influencer_register'),
    url(r'loginTest', handleLogin, name='Handling_Login')
]
