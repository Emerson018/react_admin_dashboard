from django.contrib import admin
from produtos.models import Produto, Loja1, Loja2, Loja3, Testes

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('lm', 'titulo', 'preco')
    list_display_links = ('lm', 'titulo')
    search_fields = ('lm', 'titulo')
    list_per_page = 10

admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Loja1)
admin.site.register(Loja2)
admin.site.register(Loja3)
admin.site.register(Testes)