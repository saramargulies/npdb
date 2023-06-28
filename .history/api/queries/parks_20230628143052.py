import requests
import json
import os
PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]
OPEN_WEATHER_API_KEY = os.environ["OPEN_WEATHER_API_KEY"]

class ParkQueries:
    def get_by_state(self, state: str):
        url = f'https://developer.nps.gov/api/v1/parks/{state}'
        headers = {"Authorization": NPS_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        return data