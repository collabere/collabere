
from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from .models import Influencer


class InfluencerForm(forms.ModelForm):
    class Meta:
        model = Influencer
        fields = ('name', 'email', 'handle', 'dob','gender','city','country')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Save person'))