from pymongo import MongoClient
import pymongo
import pandas as pd
from geotext import GeoText
import pycountry
import pandas as pd
import numpy as np
import os
import json



def positivity_negativity(hashtag):
    client = MongoClient('localhost', 27017)
    db = client['coucou']
    collection_name = str(hashtag)+'_Sentiments_Agg'
    collection = db[collection_name]
    data = pd.DataFrame(list(collection.find()))
    client.close()
    print('XXXXXXXXXXXX')
    data = data.reset_index()
    print(data.head(2))
    data = data.drop(['_id','index'], axis=1)
    data['Time'] = pd.to_datetime(data['Time'], infer_datetime_format=True)
    data['cumul'] = data[["Negative","Positive"]].applymap(int).sum(axis=1)
    data['Negative'] = np.ceil((data['Negative'].astype(int)/data['cumul'])*100)
    # data['Neutral'] = np.ceil((data['Neutral'].astype(int)/data['cumul'])*100)
    data['Positive'] = np.ceil((data['Positive'].astype(int)/data['cumul'])*100)
    return data[["Time","Positive","Negative"]].drop_duplicates('Time').dropna().to_json(orient="records")
