from django.urls import path
from produtos.views import *

urlpatterns = [
    path('save_product/', save_product, name='save_product' ),
    path('soma-clientes/', SomaClientesView.as_view(), name='soma-clientes'),
    path('maior-valor/', MaiorValorDeVendaView.as_view(), name='maior-valor'),
    path('rendimento-total/', SomaRendimentoTotalView.as_view(), name='rendimento-total'),
]