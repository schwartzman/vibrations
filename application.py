import boto3
import json

from flask import Flask
from flask import render_template
from werkzeug.contrib.fixers import ProxyFix
from yaml import load

from lib.soundcloud import soundcloud_get

with open('conf/config.yaml') as f:
    conf = load(f)

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)


def get_locations():
    s3 = boto3.resource('s3')
    cache = s3.Object(conf['s3']['bucket'], 'cache/locations.json')
    try:
        locs = cache.get()['Body'].read().decode()
    except s3.meta.client.exceptions.NoSuchKey:
        sc = conf['soundcloud']
        locs = soundcloud_get(sc['user_id'], sc['api_key'])
        if locs:
            cache.put(Body=locs)
    return locs or []


@app.context_processor
def build_ctx():
    ctx = {'conf': conf['google']}
    with open('revision.txt') as f:
        ctx.update({'bust': f.readline()})
    with open('package.json') as f:
        ctx.update({'jq_version': json.load(f)['dependencies']['jquery'][1:]})
    ctx.update({'locations': get_locations()})
    return ctx


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.j2')
