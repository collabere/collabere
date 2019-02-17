

from django.conf.urls import url
from .views import getMessagesByResponderIdAndReciverId,getAll
urlpatterns = [
    url(r'^v1/(\d+)/(\d+)$', getMessagesByResponderIdAndReciverId,name='messages_by_reciver_responder_id'),
    url(r'^v1/',getAll),

]