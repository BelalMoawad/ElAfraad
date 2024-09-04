from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_soldier/', include('api_soldier.urls')),
    path('api_officer/', include('api_officer.urls')),
    path('userapi/', include('base.api.urls')),
]
