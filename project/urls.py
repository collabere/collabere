from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'byClientId/(\d+)$', views.getAllProjectsByClientId, name='project_details_by_clientid'),
    url(r'byInfluencerUserName/(\w+)$', views.getAllProjectsByInfluencerUserName, name='project_details_by_influencerid'),
    url(r'influencerUserName/(\w+)/clientId/(\d+)', views.getAllProjectsByClientIdAndInfluencerUserName, name='project_details_by_influencerId_clientId'),
    url(r'put$', views.insertProject, name='insert_project'),
    url(r'^delete_project$', views.deleteProject,name='influencer_delete'),
    url(r'^change_project_completion_status$', views.HandleProjectCompletedStatus.as_view(), name='complete_project'),

]
