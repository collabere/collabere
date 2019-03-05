

from django.conf.urls import url
from django.contrib.auth import views

from .views import home, getClientsBasedOnInfluencers, getInfluencerDetails, CreateInfluencerView, deleteInfluencer, putInfluencer
from django.urls import reverse_lazy


from .views import home, getClientsBasedOnInfluencers, getInfluencerDetails,CreateInfluencerView,SignUp

urlpatterns = [
    url(r'', CreateInfluencerView.as_view(), name='default_home_page'),
    url(r'login/', views.LoginView.as_view(), name='influencer_login'),
    url(r'home/',home,name='influencer_home'),
    url(r'logout/',views.LogoutView.as_view(),name='influencer_logut'),
    url(r'v1/(\d+)$', getInfluencerDetails, name='influencer_details'),
    url(r'v1/clients/(\d+)$', getClientsBasedOnInfluencers, name='influencer_clients'),
    url(r'delete/(\d+)$', deleteInfluencer, name='influencer_delete'),
    url(r'put$', putInfluencer, name='insert_influencer'),
    url(r'additional_info/' ,CreateInfluencerView.as_view(success_url=reverse_lazy('influencer_home')),name='influencer_additional_info'),
    url(r'signup/', SignUp.as_view(), name='influencer_register')
]
