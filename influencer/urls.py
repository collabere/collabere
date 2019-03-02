

from django.conf.urls import url
from django.contrib.auth import views

from .views import home, getClientsBasedOnInfluencers, getInfluencerDetails, deleteInfluencer, putInfluencer,signup_success
from django.urls import reverse_lazy


from .views import home, getClientsBasedOnInfluencers, getInfluencerDetails,SignUp

urlpatterns = [
    url(r'login/', views.LoginView.as_view(), name='influencer_login'),
    url(r'home/',home,name='influencer_home'),
    url(r'logout/',views.LogoutView.as_view(),name='influencer_logut'),
    url(r'v1/(\d+)$', getInfluencerDetails, name='influencer_details'),
    url(r'v1/clients/(\d+)$', getClientsBasedOnInfluencers, name='influencer_clients'),
    url(r'delete/(\d+)$', deleteInfluencer, name='influencer_delete'),
    url(r'put$', putInfluencer, name='insert_influencer'),
    url(r'register/', SignUp.as_view(), name='influencer_register'),
    url(r'signup_success',signup_success,name='signup_success')
]