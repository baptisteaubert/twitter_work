import time
from pymongo import MongoClient
import pandas as pd
import datetime
import sys

hashtag = sys.argv[1]


def init(hashtag):
    global db, collection_Tweets, collection_Sentiments, collection_Sentiments_Agg
    client = MongoClient('localhost', 27017)
    db = client['coucou']
    collection_Tweets = db[hashtag+'_Tweets']
    collection_Sentiments = db[hashtag+'_Sentiments']
    collection_Sentiments_Agg = db[hashtag+'_Sentiments_Agg']

def Aggregator(hashtag):
    now = datetime.datetime.now()
    test = True
    i = 0
    while test == True:
        cursor = collection_Tweets.find()
        df =  pd.DataFrame(list(cursor))
        df['date'] = pd.to_datetime(df['created_at'],  infer_datetime_format=True)
        df_temp = df.loc[(df['date'] > datetime.datetime.now() + datetime.timedelta(seconds = -10)) & (df['date'] < datetime.datetime.now())]
        if 1 in df_temp['sentiment'].unique():
            pos_count = df_temp['sentiment'].value_counts()[1]
        else:
            pos_count =0
        if 0 in df_temp['sentiment'].unique():
            neut_count = df_temp['sentiment'].value_counts()[0]
        else:
            neut_count =0
        if -1 in df_temp['sentiment'].unique():
            neg_count = df_temp['sentiment'].value_counts()[-1]
        else:
            neg_count =0
        timing =  datetime.datetime.now()
        to_insert = {'Time':str(timing),
                'Positive':str(pos_count),
                'Neutral':str(neut_count),
                'Negative':str(neg_count)}

        collection_Sentiments_Agg.insert_one(to_insert)
        i += 1
        if i % 2 == 0 :
            print('Aggregate Packages ' + str(i))
        time.sleep(5)

init(hashtag)
Aggregator(hashtag)
