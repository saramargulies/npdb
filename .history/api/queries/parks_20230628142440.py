import requests


class ParkQueries:
    def get_by_state(self, state: str):
        url = f'https://developer.nps.gov/api/v1/parks/{state}'
        headers = {"Authorization": }
        response = requests.get(url)
        data = response.json()
        return data