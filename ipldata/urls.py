from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('batting/',views.batting, name="batting"),
    path('bowling/',views.bowling,name='bowling'),
    path('match/',views.match, name='match'),
    path('predictions/',views.predictions,name='predictions'),
    path('result/',views.result,name='result')
]
