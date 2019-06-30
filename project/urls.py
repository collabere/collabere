from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'byClientId/(\d+)$', views.getAllProjectsByClientId, name='project_details_by_clientid'),
    url(r'byInfluencerUserName/(\w+)$', views.getAllProjectsByInfluencerUserName, name='project_details_by_influencerid'),
    url(r'influencerUserName/(\w+)/clientId/(\d+)', views.getProjectsByInfluencerUserNameAndClientId, name='project_details_by_influencerId_clientId'),
    url(r'put$', views.insertProject, name='insert_project')
]
