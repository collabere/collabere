from django.contrib import admin

# Register your models here.
from influencer.models import Influencer, ClientMapping

admin.site.register(Influencer)
admin.site.register(ClientMapping)