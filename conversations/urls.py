

from django.conf.urls import url
from .views import getAllMessagesByInfluencerUsernameAndClientId,getAll, deleteMessages, insertMessages,getMessagesPertainingToAProject,insertMessageFromClientEamil,FileUploadView
urlpatterns = [
    url(r'chat_messages', getMessagesPertainingToAProject,name='messages_for_a_project'),
    url(r'^v1/',getAll),
    url(r'delete/(\d+)/(\d+)$', deleteMessages, name='delete_messages'),
    url(r'insert_message', insertMessages, name='save_incomming_message'),
    url(r'insert_client_reply', insertMessageFromClientEamil, name='save_incomming_message'),
    url(r'^file_upload', FileUploadView.as_view(),name='file_upload_and_send')

]