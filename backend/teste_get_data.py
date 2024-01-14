import requests
from bs4 import BeautifulSoup

url = 'https://www.leroymerlin.com.br/ladrilho-hidraulico-hexagonal-preto-20x20cm-oficina-yby_89867204'


def requisition(url):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
    req = requests.get(url,headers=headers)
    html_content = req.text
    soup = BeautifulSoup(html_content,"html.parser")

    return soup

html_element = requisition(url).find('h1', class_='product-title align-left color-text')

def get_title_and_lm(url,title_element):
    title = title_element.text.replace('\n', '').replace('&','e').replace('+', ' plus')
    html_code = requisition(url).find('div', class_='badge product-code badge-product-code').text
    lm = ''
    for caractere in html_code:
        if caractere.isdigit():
            lm += caractere

    return title, lm 

def find_image_src(url):
    img_tag = requisition(url).find('img')

    img_url = img_tag['src']

    return img_url


title, lm = get_title_and_lm(url, html_element)

print(title, lm)

img_data = find_image_src(url)

print(f'IMAGEM: {img_data}')

