from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from produtos.models import Produto, Loja1, Loja2, Loja3, Testes
from produtos.serializer import ProdutoSerializer, Loja1Serializer, Loja2Serializer, Loja3Serializer, TestesSerializer

from datetime import datetime

from bs4 import BeautifulSoup
import requests

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

class TestesViewSet(viewsets.ModelViewSet):
    queryset = Testes.objects.all()
    serializer_class = TestesSerializer

def requisition(url):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
    req = requests.get(url,headers=headers)
    html_content = req.text
    soup = BeautifulSoup(html_content,"html.parser")

    return soup

def get_title_and_code(url,title_element):
    title = title_element.text.replace('\n', '').replace('&','e').replace('+', ' plus')
    html_code = requisition(url).find('div', class_='badge product-code badge-product-code').text
    code = ''
    for caractere in html_code:
        if caractere.isdigit():
            code += caractere

    return title, code 

def salva_produto(request):
    url = request.GET.get('url', '')

    if not url:
        return JsonResponse({'message': 'URL não fornecida'})

    html_element = requisition(url).find('h1', class_='product-title align-left color-text')
    if html_element:
        title, code = get_title_and_code(url, html_element)

        existing_produto = get_object_or_404(Testes, code=code)
        if existing_produto:
            return JsonResponse({'message': 'Produto já existe no banco de dados'})

        produtos = Testes(
            code=code,
            titulo=title
        )
        produtos.save()
        return JsonResponse({'message': 'Produto salvo com sucesso'})
    else:
        return JsonResponse({'message': 'Falha ao obter dados da URL'})

