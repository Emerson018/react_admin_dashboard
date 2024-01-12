from django.contrib import admin
from produtos.models import Produto

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('lm', 'titulo', 'preco')
    list_display_links = ('lm', 'titulo')
    search_fields = ('lm', 'titulo')
    list_per_page = 10

admin.site.register(Produto, ProdutoAdmin)