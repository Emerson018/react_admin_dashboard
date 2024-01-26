from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from produtos.models import Produto, Loja1, Loja2, Loja3
from produtos.serializer import ProdutoSerializer, Loja1Serializer, Loja2Serializer, Loja3Serializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class Loja1ViewSet(viewsets.ModelViewSet):
    queryset = Loja1.objects.all()
    serializer_class = Loja1Serializer

class Loja2ViewSet(viewsets.ModelViewSet):
    queryset = Loja2.objects.all()
    serializer_class = Loja2Serializer

class Loja3ViewSet(viewsets.ModelViewSet):
    queryset = Loja3.objects.all()
    serializer_class = Loja3Serializer


def index(request):
    return render(request, 'produtos/index.html')