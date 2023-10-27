from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('date')
    serializer_class = PostSerializer
