# urls.py

from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('test/', views.test, name='test')
]