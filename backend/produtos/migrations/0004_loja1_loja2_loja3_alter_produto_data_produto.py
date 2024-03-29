# Generated by Django 5.0.1 on 2024-01-16 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produtos', '0003_alter_produto_data_produto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Loja1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField()),
                ('porc_variacao_anual', models.FloatField(max_length=4)),
                ('rendimento_mensal', models.FloatField(max_length=4)),
                ('clientes_cpf', models.IntegerField()),
                ('clientes_cnpj', models.IntegerField()),
                ('clientes_total', models.IntegerField()),
                ('maior_venda', models.FloatField(max_length=10)),
                ('menor_venda', models.FloatField(max_length=10)),
                ('tipo_produto', models.CharField(max_length=50)),
                ('qtd_produtos', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Loja2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField()),
                ('porc_variacao_anual', models.FloatField(max_length=4)),
                ('rendimento_mensal', models.FloatField(max_length=4)),
                ('clientes_cpf', models.IntegerField()),
                ('clientes_cnpj', models.IntegerField()),
                ('clientes_total', models.IntegerField()),
                ('maior_venda', models.FloatField(max_length=10)),
                ('menor_venda', models.FloatField(max_length=10)),
                ('tipo_produto', models.CharField(max_length=50)),
                ('qtd_produtos', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Loja3',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField()),
                ('porc_variacao_anual', models.FloatField(max_length=4)),
                ('rendimento_mensal', models.FloatField(max_length=4)),
                ('clientes_cpf', models.IntegerField()),
                ('clientes_cnpj', models.IntegerField()),
                ('clientes_total', models.IntegerField()),
                ('maior_venda', models.FloatField(max_length=10)),
                ('menor_venda', models.FloatField(max_length=10)),
                ('tipo_produto', models.CharField(max_length=50)),
                ('qtd_produtos', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='produto',
            name='data_produto',
            field=models.DateField(),
        ),
    ]
