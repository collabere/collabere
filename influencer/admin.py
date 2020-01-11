from django.contrib import admin

# Register your models here.
from influencer.models import Influencer, ClientMapping, InfluencerPublicProfileDetails, InstagramAuthModel

admin.site.register(Influencer)
admin.site.register(ClientMapping)
admin.site.register(InfluencerPublicProfileDetails)
admin.site.register(InstagramAuthModel)