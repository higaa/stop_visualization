import requests

FEEDS_URL = 'https://api.gtfs-data.jp/v2/feeds'

def download_stop(organization_id, feed_id):

    url = f'https://api.gtfs-data.jp/v2/organizations/{organization_id}/feeds/{feed_id}/files/stops.geojson'

    print(f'downloading {url}')
    response = requests.get(url)
    if response.status_code != 200:
        print('error')
        return

    with open(f'geojson/stops_{organization_id}_{feed_id}.geojson', mode='wb') as f:
        f.write(response.content)



def download_stops():
    response = requests.get(FEEDS_URL)
    if response.status_code != 200:
        return

    feeds = response.json()['body']

    for feed in feeds:
        organization_id = feed['organization_id']
        feed_id = feed['feed_id']
        download_stop(organization_id, feed_id)

def main():
    download_stops()

if __name__ == '__main__':
    main()