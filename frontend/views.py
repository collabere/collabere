from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'static/frontend/index.html')

def home(request):
    print(request)
    return render(request, 'HomePage')
    
