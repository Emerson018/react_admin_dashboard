from django.urls import path
from produtos.views import salva_produto

urlpatterns = [
    path('salva_produto/', salva_produto, name='salva_produto'),
]