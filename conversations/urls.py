

from django.conf.urls import url
from .views import getAllMessagesByInfluencerUsernameAndClientId,getAll, deleteMessages, insertMessages
urlpatterns = [
    url(r'chat_messages', getAllMessagesByInfluencerUsernameAndClientId,name='messages_by_influencer_username_and_client_id'),
    url(r'^v1/',getAll),
    url(r'delete/(\d+)/(\d+)$', deleteMessages, name='delete_messages'),
    url(r'put$', insertMessages, name='insert_messages')
]