import tweepy
import json
from pymongo import MongoClient
from textblob import TextBlob
import re
import sys
#API SET UP
CONSUMER_KEY    = 'u9oTn95Tyx7PeKqaVoQOr4zIg'
CONSUMER_SECRET = 'DsH1mYSYyQOKOlUkvVvtV0YBBiWdaSyVleEAOhJbNmJYF2VaI6'

# Access:
ACCESS_TOKEN  = '936220490246557696-cansWdvPlCC0HAOzXL3CxU3b7M1XrKJ'
ACCESS_SECRET = 'lZtJmEHxC88gVZ1hcQPLCslwVjS8ZjDy45IVyaqrwFrdk'


global hashtag, count
hashtag = sys.argv[1]
print(hashtag)
count = 0
#print('on va bien taper ' , hashtag+'_Tweets')

def twitter_setup(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET):
    """
    Utility function to setup the Twitter's API
    with our access keys provided.
    """
    # Authentication and access using keys:
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

    # Return API with authentication:
    api = tweepy.API(auth)
    return api

api = twitter_setup(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET)

def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

def analize_sentiment_en(tweet):
    analysis = TextBlob(clean_tweet(tweet))
    if analysis.sentiment.polarity > 0:
        return 1
    elif analysis.sentiment.polarity == 0:
        return 0
    else:
        return -1


class StreamListener(tweepy.StreamListener):

    def on_connect(self):
        print("You are now connected to the streaming API.")

    def on_status(self,status):
        global count
        #print("New Tweet ! ")
        clean = clean_tweet(status.text)
        sentiment = analize_sentiment_en(clean)
        #Send Trump Tweet to MongoDB
        tweet = {'created_at':str(status.created_at),
                'text':clean,
                'sentiment':sentiment}
        collection_Tweets.insert_one(tweet)

        #print('On Database')
        #print("---------------------------------")
        count += 1
        print('Tweets streamed : ', count)

    def on_limit(self, track):
        print("Limite Atteinte !")

    def on_error(self, status_code):
        if status_code == 420:
            return False

def init(hashtag):
    global db, collection_Tweets, collection_Sentiments
    client = MongoClient('localhost', 27017)
    db = client['coucou']
    collection_Tweets = db[hashtag+'_Tweets']
    collection_Sentiments = db[hashtag+'_Sentiments']

init(hashtag)
stream_listener = StreamListener()
stream = tweepy.Stream(auth=api.auth, listener=stream_listener).filter(track=[hashtag],languages=["en"])
