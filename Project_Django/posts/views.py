# _*_ coding: utf-8 _*_
from django.shortcuts import render, redirect
import re
import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from colorama import init, Fore, Style




# Create your views here.
# 맞춤법 검사 함수
def spellchecker(sentence):
    url = "https://m.search.naver.com/p/csearch/ocontent/spellchecker.nhn"
    headers = {
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }

    params = {
        '_callback':'window.mycallback',
        'q': sentence
    }

    response = requests.get(url, params=params, headers = headers).text
    response = response.replace(params['_callback']+'(', '')
    response = response.replace(');','')
    response = json.loads(response)
    # response = response['message']['result']['notag_html']
    response1 = response['message']['result']['html']
    # response = response.replace('<br>', '\n')
    return response1

def correct(sentence):
    sentence = sentence
    total_length = len(sentence)
    howmany = (total_length)//500 + 1
    correct_sentence = ''
    for i in range(howmany):  # 500자씩 잘라서 검사
        if 500*(i+1) > total_length:
            sentence_part = sentence[ 500*i :: ]
        else:
            sentence_part = sentence[500*i : 500*(i+1)]
        correct_sentence += spellchecker(sentence_part)
    return correct_sentence


# views
@csrf_exempt
def test(request):
    sentence = request.POST.get('sentence', '뭐해')
    # sentence = '아버지가방에들어가신다 외안되 골치거리 ㅎㅎ'
    check = correct(sentence)
    
    # if request.method == 'POST':
    #     print('포스트댱')
    # print(request.POST)
    # print(request.POST.get('sentence', '뭐해'))
    return HttpResponse(check)

def spellchecker2(sentence):
    result = None

    url = "https://m.search.naver.com/p/csearch/ocontent/spellchecker.nhn"
    headers = {
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }

    params = {
        '_callback':'window.mycallback',
        'q': sentence
    }

    response = requests.get(url, params=params, headers = headers).text

    matched = re.search(r'.*?\((.*)\);', response)
    if matched :
        obj = json.loads(matched.group(1))
        result = obj['message']['result']
        print('err : {}'. format(result['errata_count']))
        html = result['html']
        html = re.sub(r"<span class='green_text'>", Fore.GREEN, html)
        html = re.sub(r"<span class='red_text'>", Fore.RED, html)
        html = re.sub(r"<span class='violet_text'>", Fore.MAGENTA, html)
        html = re.sub(r"<span class='blue_text'>", Fore.BLUE, html)
        html = re.sub(r'<\/?.*?>', Style.RESET_ALL, html)
        print('before : ' + sentence)
        print('after : ' + html)
        
       
    else:
        print('no result')
    
    return html