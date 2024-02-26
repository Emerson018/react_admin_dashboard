from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.response import Response
from datetime import datetime
from rest_framework.views import APIView
from django.db.models import Sum, Max


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
        total_clientes = self.calcular_soma_clientes()
        return Response({'total_clientes': total_clientes})
    
    def calcular_soma_clientes(self):
        total_clientes = 0
        lojas = [Loja1, Loja2, Loja3]

        for loja in lojas:
            dados = loja.objects.aggregate(soma_clientes=Sum('clientes_total'))
            soma_clientes = dados.get('soma_clientes')
            if soma_clientes is not None:
                total_clientes += soma_clientes

        return total_clientes

class MaiorValorDeVendaView(APIView):
    def get(self, request):
        maior_valor = self.calcular_maior_valor()
        
        if maior_valor is not None:
            return Response({'maior_valor_venda': maior_valor})
        else:
            return Response({'message': 'Não há dados disponíveis.'}, status=status.HTTP_404_NOT_FOUND)

    def calcular_maior_valor(self):
        maiores_vendas = []
        lojas = [Loja1, Loja2, Loja3]  # Adicione outras lojas conforme necessário

        for valor in lojas:
            dados = valor.objects.aggregate(max_venda=Max('maior_venda'))
            max_venda = dados.get('max_venda')
            if max_venda is not None:
                maiores_vendas.append(max_venda)

        if maiores_vendas:
            return max(maiores_vendas)
        else:
            return None
        
class SomaRendimentoTotalView(APIView):
    def get(self, request):
        soma_rendimento_total = self.calcular_soma_rendimento_total()
        return Response({'soma_rendimento_total': soma_rendimento_total})
    
    def calcular_soma_rendimento_total(self):
        soma_total = 0
        lojas = [Loja1, Loja2, Loja3]  # Adicione outras lojas conforme necessário

        for loja_cls in lojas:
            dados = loja_cls.objects.aggregate(soma_rendimento=Sum('rendimento_mensal'))
            soma_rendimento = dados.get('soma_rendimento')
            if soma_rendimento is not None:
                soma_total += soma_rendimento

        return soma_total
