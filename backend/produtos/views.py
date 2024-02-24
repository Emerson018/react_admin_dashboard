from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.response import Response
from datetime import datetime
from rest_framework.views import APIView


from produtos.models import Produto, Loja1, Loja2, Loja3, Testes
from produtos.serializer import ProdutoSerializer, Loja1Serializer, Loja2Serializer, Loja3Serializer, TestesSerializer

from produtos.validators import *

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

def save_product(request):
    url = request.GET.get('url', '')

    if not url:
        return JsonResponse({'message': 'URL não fornecida.'})
    
    html_element = requisition(url).find('h1', class_='product-title align-left color-text')
    if html_element:
        title, code = get_title_and_lm(url, html_element)
    
        try:
            existing_product = Produto.objects.get(lm=code)
            return JsonResponse({'message': 'Produto já existe no banco de dados.'})
        except Produto.DoesNotExist:

            html_price = requisition(url).find('div',class_='product-price-tag')

            formated_price = find_price(html_price)
            preco = format_real(formated_price)
            preco = float(preco)

            review, average_review = get_review(code)

            foto = get_image(url)

            produtos = Produto(
                lm=code,
                titulo=title,
                preco=preco,
                link=url,
                avaliacoes=review,
                media_avaliacoes=average_review,
                data_produto=datetime.now(),
                foto=foto
            )
            produtos.save()

            return JsonResponse({'message': 'Produto salvo com sucesso!'})
    else:
        return JsonResponse({'message': 'Falha ao obter os dados da URL'})
    
class SomaClientesView(APIView):
    def get(self, request):
        dados = Loja1.objects.all()
        dados_formatados = []
        for dado in dados:
            soma_clientes = dado.clientes_cpf + dado.clientes_cnpj
            dados_formatado = {
                'xValue' : soma_clientes,
                
            }
            dados_formatados.append(dados_formatado)
        return Response(dados_formatados)