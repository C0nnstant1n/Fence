from rest_framework import routers
from django.urls import include, path
from .views import PostView

router = routers.DefaultRouter()
router.register(r'post', PostView)

urlpatterns = [
    path('api/', include(router.urls)),
    ]