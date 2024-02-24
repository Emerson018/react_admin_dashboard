from django.urls import path
from produtos.views import save_product, SomaClientesView

urlpatterns = [
    path('save_product/', save_product, name='save_product' ),
    path('soma-clientes/', SomaClientesView.as_view(), name='soma_clientes'),
]