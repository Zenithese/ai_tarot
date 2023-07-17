from django.urls import path

from . import views

urlpatterns = [
    path("startserver", views.StartServer.as_view()),
    path("shuffle", views.Shuffle.as_view()),
]