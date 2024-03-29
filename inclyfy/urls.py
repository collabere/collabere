"""inclyfy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from .views import login, redirectSocial

from rest_framework.authtoken import views as rest_framework_views

# from rest_framework_jwt.views import obtain_jwt_token



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^api/auth/', include('knox.urls')),
    # url(r'^accounts/', include('allauth.urls')),
    url(r'^api/login', login),
    url(r'^api/social_redirect', redirectSocial),
    url(r'^messages/', include('conversations.urls')),
    url(r'^influencer/',include('influencer.urls')),
    url(r'^client/',include('client.urls')),
    url(r'^project/',include('project.urls')),
    url(r'^', TemplateView.as_view(template_name="index.html")),
    url(r'^get_auth_token/$', rest_framework_views.obtain_auth_token, name='get_auth_token')
]