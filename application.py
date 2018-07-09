import boto3

from flask import Flask
from flask import render_template
from importlib_resources import read_text
from werkzeug.contrib.fixers import ProxyFix
from yaml import load

from lib.soundcloud import soundcloud_get

conf = load(read_text('conf', 'config.yaml'))

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)


def get_locations():
    """Retrieve and cache sounds & metadata from SoundCloud.

    Returns:
        string -- JSON array of sound & metadata objects
        None   -- on failure
    """
    s3 = boto3.resource('s3')
    cache = s3.Object(conf['s3']['bucket'], 'cache/locations.json')
    try:
        locs = cache.get()['Body'].read().decode()
    except s3.meta.client.exceptions.NoSuchKey:
        sc = conf['soundcloud']
        locs = soundcloud_get(sc['user_id'], sc['api_key'])
        if locs:
            cache.put(Body=locs)
    return locs


@app.context_processor
def build_ctx():
    ctx = {'conf': conf['google']}
    with open('revision.txt') as f:
        ctx.update({'bust': f.readline()})
    return ctx


@app.route('/cache/locations.js')
def cache():
    return render_template('locations.js.j2', locations=get_locations())


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.j2')
