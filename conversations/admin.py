from django.contrib import admin

# Register your models here.
from conversations.models import Messages

admin.site.register(Messages)