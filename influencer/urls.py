

from django.conf.urls import url
from django.contrib.auth import views
from .views import home

urlpatterns = [
    url(r'login/', views.LoginView.as_view(), name='influencer_login'),
    url(r'home/',home,name='influencer_home')

]