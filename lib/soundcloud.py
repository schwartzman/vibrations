import json
import re
import requests


def get(uid, api_key):
    payload = {'client_id': api_key}
    url = 'https://api.soundcloud.com/users/{}/tracks'.format(uid)
    try:
        r = requests.get(url, params=payload)
        r.raise_for_status()
    except requests.exceptions.HTTPError:
        return None
    return r.json()


def parse(sounds):
    res = []
    for s in sounds:
        d = s['description']

        geo_pat = r'(?P<lat>-?\d{1,3}\.\d+),\s?(?P<lon>-?\d{1,3}\.\d+)'
        try:
            geo = re.search(geo_pat, d).groupdict()
        except AttributeError:
            continue
        if not (
           -90 <= float(geo['lat']) <= 90 and
           -180 <= float(geo['lon']) <= 180):
            continue

        sound = {
            'id': str(s['id']),
            'title': s['title'],
            'slug': s['permalink'],
            'lat': geo['lat'],
            'lon': geo['lon']
        }
        when = {
            'date': r'(\d{4}-\d{2}-\d{2})',
            'time': r'(\d{1,2}:\d{2})'
        }
        for k, v in when.items():
            try:
                sound[k] = re.search(v, d).group()
            except AttributeError:
                sound[k] = ''

        res.append(sound)
    return res


def soundcloud_get(uid, api_key):
    res = get(uid, api_key)
    if res is None:
        return None
    res = parse(res)
    return json.dumps(res)
