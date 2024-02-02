from django.shortcuts import render
from rest_framework import viewsets
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


def index(request):
    url = 'https://www.leroymerlin.com.br/cabo-flexivel--2,5mm-100m-azul-750v-sil-fios_86839655?region=grande_sao_paulo&gad_source=1&gclid=Cj0KCQiAn-2tBhDVARIsAGmStVl7FODR9Z4jQUlbAZSUb7-hH7NH7xrXxNlMpc-e9gaYzW23Y6SyHoIaAshSEALw_wcB'

    html_element = requisition(url).find('h1', class_='product-title align-left color-text')
    if html_element:
        title, code = get_title_and_code(url, html_element)
        produtos = Testes(
            code=code,
            title=title
        )

        produtos.save()

    return render(request, 'produtos/index.html')

