import requests
from NPDB..env import NPS_KEY

class ParkQueries:
    def get_by_state(self, state: str):
        url = f'https://developer.nps.gov/api/v1/parks/{state}'
        headers = {"Authorization": NPS_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        return data