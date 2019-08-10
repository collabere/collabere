

from django.conf.urls import url
from .views import getAllMessagesByInfluencerUsernameAndClientId,getAll, deleteMessages, insertMessages,getMessagesPertainingToAProject
urlpatterns = [
    url(r'chat_messages', getMessagesPertainingToAProject,name='messages_for_a_project'),
    url(r'^v1/',getAll),
    url(r'delete/(\d+)/(\d+)$', deleteMessages, name='delete_messages'),
    # url(r'put$', insertMessages, name='insert_messages'),
    url(r'insert_message', insertMessages, name='save_incomming_message')
]