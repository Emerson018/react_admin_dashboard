from django.urls import path
from produtos.views import save_product

urlpatterns = [
    path('save_product/', save_product, name='save_product' ),
]