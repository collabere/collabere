
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from influencer import service



class InfluencerSignupForm(UserCreationForm):
    name = forms.CharField()
    dob = forms.DateField()
    gender = forms.CharField()
    email = forms.CharField(max_length=50, required = True)
    city= forms.CharField()
    country=forms.CharField()


    class Meta:
        model = User
        fields = ("username", "password1", "password2")

    # def clean_username(self):
    #     to_check_email = self.cleaned_data["username"]
    #
    #     validate_email(to_check_email)
    #
    #     if to_check_email:
    #         to_check_email = to_check_email.strip().lower()
    #
    #     if User.objects.filter(Q(email__iexact=to_check_email) | Q(username__iexact=to_check_email)).exists():
    #         raise ValidationError("a user with email %(email)s already exists", params={"email": to_check_email})
    #
    #     return to_check_email
    #
    # def clean_mobile_number(self):
    #     if mobile_number_service.mobile_number_exists(self.cleaned_data["mobile_number"]):
    #         raise ValidationError("a user with mobile number %(mobile_number)s already exists", params={"mobile_number": self.cleaned_data["mobile_number"]})
    #
    #     return self.cleaned_data["mobile_number"]

    def save(self, commit=True):
        return service.influencer_signup(
            self.cleaned_data["name"],
            self.cleaned_data["email"],
            self.cleaned_data["username"],
            self.cleaned_data["dob"],
            self.cleaned_data["gender"],
            self.cleaned_data["city"],
            self.cleaned_data["country"],
            self.cleaned_data["password1"]

        )
