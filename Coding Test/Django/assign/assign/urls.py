"""assign URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.urls import path
from .views import HomeView, UserRegistrationView, UserLoginView, text_completion, image_recognition
urlpatterns = [
    path('api/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/text-completion/', text_completion, name='text-completion'),
    path('api/image-recognition/', image_recognition, name='image-recognition'),
    path('', HomeView.as_view(), name='home'), 
    path('login/', UserLoginView.as_view(), name='login'),
    path('registration/', UserRegistrationView.as_view(), name='registration'),

]

