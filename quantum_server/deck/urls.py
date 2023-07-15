from django.urls import path

from . import views

urlpatterns = [
    path("shuffle", views.Shuffle.as_view()),
]