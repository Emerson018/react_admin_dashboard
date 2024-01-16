# populate_data.py
from produtos.models import Loja1, Loja2, Loja3
import random
from faker import Faker
from datetime import date


fake = Faker()

# Função para gerar dados fictícios
def gerar_dados_ficticios():
    while True:
        data = fake.date_this_decade()
        if not Loja1.objects.filter(data=data).exists() and \
              not Loja2.objects.filter(data=data).exists() and \
                not Loja3.objects.filter(data=data).exists():
            break

    return {
        'data': data,
        'porc_variacao_anual': random.uniform(0, 100),
        'rendimento_mensal': random.uniform(1000, 10000),
        'clientes_cpf': random.randint(1000, 9999),
        'clientes_cnpj': random.randint(1000, 9999),
        'clientes_total': random.randint(100, 1000),
        'maior_venda': random.uniform(100, 1000),
        'menor_venda': random.uniform(50, 500),
        'tipo_produto': random.choice(['E', 'M', 'A', 'O', 'J']),
        'qtd_produtos': random.randint(1, 100),
    }

# Criar até 12 instâncias com dados fictícios
for _ in range(12):
    dados = gerar_dados_ficticios()
    Loja1.objects.create(**dados)
    Loja2.objects.create(**dados)
    Loja3.objects.create(**dados)
