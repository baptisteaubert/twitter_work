from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
import tweepy
import json
from pymongo import MongoClient
from textblob import TextBlob
import re
import os
import datetime
import time
import subprocess

# django project name is adleads, replace adleads with your project name
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adleads.settings")
from .tools import positivity_negativity

# from .streamer import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET #Staff Dependant
# from .streamer import twitter_setup, clean_tweet, analize_sentiment_en #Staff Invariant
# from .streamer import StreamListener, init #Technology Dependant
# from .Aggregate_LIVE import Aggregator
global hashtag, proc_stream, proc_aggreg
def home(request):
    global hashtag, proc_stream, proc_aggreg
    if (request.method == "POST"):
        hashtag = request.POST['filter']
        hashtag = hashtag[1:]
        #RUN BACKEND STREAMER and AGGREGATOR
        proc_stream = subprocess.Popen(["python", "/Users/baptisteaubert/Desktop/Perso/twitter_container/twitter_app/twitter_nlp/streamer.py", hashtag])
        time.sleep(3)
        proc_aggreg = subprocess.Popen(["python", "/Users/baptisteaubert/Desktop/Perso/twitter_container/twitter_app/twitter_nlp/Aggregate_LIVE.py", hashtag])
        time.sleep(3)
        return redirect("main/")
        #RUN BACKEND AGGREGATOR
        #return render(request, 'twitter_nlp/main.html', context)
    return render(request, 'twitter_nlp/home.html')

def main(request):
    global hashtag, proc_stream, proc_aggreg
    child_stream_pid = proc_stream.pid
    child_aggreg_pid = proc_aggreg.pid
    context = {'hashtag': hashtag, 'child_stream_pid': child_stream_pid, 'child_aggreg_pid':child_aggreg_pid}
    return render(request, 'twitter_nlp/main.html', context)

def positive_negative(request):
    global hashtag
    data = positivity_negativity(hashtag)
    return JsonResponse(data,safe=False)
