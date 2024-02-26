from django.urls import path
from produtos.views import save_product, SomaClientesView, MaiorValorDeVendaView, SomaRendimentoTotalView

urlpatterns = [
    path('save_product/', save_product, name='save_product' ),
    path('soma-clientes/', SomaClientesView.as_view(), name='soma_clientes'),
    path('maior-valor/', MaiorValorDeVendaView.as_view(), name='maior-valor'),
    path('rendimento/', SomaRendimentoTotalView.as_view(), name='rendimento'),
]