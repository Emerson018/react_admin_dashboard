from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


ELETRONICO = 'E'
MODA = 'M'
ALIMENTO = 'A'
OUTROS = 'O'
JOGOS = 'J'

TIPO_PRODUTO_CHOICES = [
    (ELETRONICO, 'Eletrônico'),
    (MODA, 'Moda'),
    (ALIMENTO, 'Alimento'),
    (OUTROS, 'Outros'),
    (JOGOS, 'Jogos'),
]

class Produto(models.Model):
    lm = models.CharField(max_length=20, primary_key=True, null=False, blank=False)
    titulo = models.CharField(max_length=130, null=False, blank=False)
    preco = models.FloatField(max_length=10, null=False, blank=False)
    link = models.CharField(max_length=250, null=False, blank=False)
    avaliacoes = models.IntegerField(null=False, blank=False)
    media_avaliacoes = models.FloatField(max_length=4, null=False, blank=False)
    data_produto = models.DateField(null=False, blank=False)
    foto = models.CharField(max_length=500, null=False, blank=False)
    info_produto = models.CharField(max_length=1000, null=False, blank=False)

    usuario = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
        related_name="user",
    )

    def __str__(self):
        return f"{self.lm}"
    
class Loja1(models.Model):
    data = models.DateField(null=False, blank=False)
    porc_variacao_anual = models.FloatField(max_length=4, null=False, blank=False)
    rendimento_mensal = models.FloatField(max_length=4, null=False, blank=False)
    clientes_cpf = models.IntegerField(null=False, blank=False)
    clientes_cnpj = models.IntegerField(null=False, blank=False)
    clientes_total = models.IntegerField(null=False, blank=False)
    maior_venda = models.FloatField(max_length=10, null=False, blank=False)
    menor_venda = models.FloatField(max_length=10, null=False, blank=False)
    tipo_produto = models.CharField(max_length=1, choices=TIPO_PRODUTO_CHOICES, null=False, blank=False)
    qtd_produtos = models.IntegerField(null=False, blank=False)

class Loja2(models.Model):
   

    data = models.DateField(null=False, blank=False)
    porc_variacao_anual = models.FloatField(max_length=4, null=False, blank=False)
    rendimento_mensal = models.FloatField(max_length=4, null=False, blank=False)
    clientes_cpf = models.IntegerField(null=False, blank=False)
    clientes_cnpj = models.IntegerField(null=False, blank=False)
    clientes_total = models.IntegerField(null=False, blank=False)
    maior_venda = models.FloatField(max_length=10, null=False, blank=False)
    menor_venda = models.FloatField(max_length=10, null=False, blank=False)
    tipo_produto = models.CharField(max_length=1, choices=TIPO_PRODUTO_CHOICES, null=False, blank=False)
    qtd_produtos = models.IntegerField(null=False, blank=False)

class Loja3(models.Model):
    data = models.DateField(null=False, blank=False)
    porc_variacao_anual = models.FloatField(max_length=4, null=False, blank=False)
    rendimento_mensal = models.FloatField(max_length=4, null=False, blank=False)
    clientes_cpf = models.IntegerField(null=False, blank=False)
    clientes_cnpj = models.IntegerField(null=False, blank=False)
    clientes_total = models.IntegerField(null=False, blank=False)
    maior_venda = models.FloatField(max_length=10, null=False, blank=False)
    menor_venda = models.FloatField(max_length=10, null=False, blank=False)
    tipo_produto = models.CharField(max_length=1, choices=TIPO_PRODUTO_CHOICES, null=False, blank=False)
    qtd_produtos = models.IntegerField(null=False, blank=False)

class Testes(models.Model):
    code = models.CharField(max_length=20, primary_key=True, null=False, blank=False)
    titulo = models.CharField(max_length=130, null=False, blank=False)