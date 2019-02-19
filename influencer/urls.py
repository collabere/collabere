

from django.conf.urls import url
from django.contrib.auth import views
from .views import home, getClientsBasedOnInfluencers, getInfluencerDetails

urlpatterns = [
    url(r'login/', views.LoginView.as_view(), name='influencer_login'),
    url(r'home/',home,name='influencer_home'),
    url(r'v1/(\d+)$', getInfluencerDetails, name='influencer_details'),
    url(r'v1/clients/(\d+)$', getClientsBasedOnInfluencers, name='influencer_clients')
]