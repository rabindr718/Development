
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from django.http import HttpResponse
from django.views import View

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HomeView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse("Welcome to the homepage!")


class UserLoginView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Additional views for Text Completion and Image Recognition APIs
def text_completion(request):
    # Your logic to use Text Completion API
    pass

def image_recognition(request):
    # Your logic to use Image Recognition API
    pass
