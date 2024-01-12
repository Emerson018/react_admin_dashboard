from django.shortcuts import render
from rest_framework import viewsets
from produtos.models import Produto
from produtos.serializer import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

def index(request):
    return render(request, 'produtos/index.html')