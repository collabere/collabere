

from django.conf.urls import url
from .views import getMessagesByResponderIdAndReciverId,getAll, deleteMessages, insertMessages
urlpatterns = [
    url(r'^v1/(\d+)/(\d+)$', getMessagesByResponderIdAndReciverId,name='messages_by_reciver_responder_id'),
    url(r'^v1/',getAll),
    url(r'delete/(\d+)/(\d+)$', deleteMessages, name='delete_messages'),
    url(r'put$', insertMessages, name='insert_messages')
]