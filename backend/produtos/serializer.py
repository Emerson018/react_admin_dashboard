from rest_framework import serializers
from produtos.models import Produto, Loja1, Loja2, Loja3, Testes

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class Loja1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Loja1
        fields = '__all__'

class Loja2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Loja2
        fields = '__all__'

class Loja3Serializer(serializers.ModelSerializer):
    class Meta:
        model = Loja3
        fields = '__all__'

class TestesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testes
        fields = '__all__'