from django.conf.urls import url
from .views import  getClientInfoFromClientId

urlpatterns = [
    url(r'^v1/(\d+)$', getClientInfoFromClientId,name='client_details'),
]