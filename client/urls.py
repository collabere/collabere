from django.conf.urls import url
from .views import  getClientInfoFromClientId, deleteClientInfo, insertClient

urlpatterns = [
    url(r'^v1/(\d+)$', getClientInfoFromClientId,name='client_details'),
    url(r'delete/(\d+)$', deleteClientInfo, name='influencer_delete'),
    url(r'put$', insertClient, name='insert_influencer')
]