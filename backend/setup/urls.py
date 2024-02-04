from django.contrib import admin
from django.urls import path, include
from produtos.views import ProdutoViewSet, Loja1ViewSet, Loja2ViewSet, Loja3ViewSet, TestesViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='Produtos')
router.register(r'loja1', Loja1ViewSet, basename='Loja1')
router.register(r'loja2', Loja2ViewSet, basename='Loja2')
router.register(r'loja3', Loja3ViewSet, basename='Loja3')
router.register(r'testes', TestesViewSet , basename='testes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', include('produtos.urls')),
]
