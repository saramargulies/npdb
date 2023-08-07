import requests
import os


NPS_API_KEY = os.environ.get()"NPS_API_KEY"]


class ParkQueries:
    def get_by_state(self, state: str):
        url = f"https://developer.nps.gov/api/v1/parks/?stateCode={state}"
        params = {"api_key": NPS_API_KEY}
        response = requests.get(url, params=params)
        data = response.json()
        return data

    def get_one_by_code(self, code: str):
        url = f"https://developer.nps.gov/api/v1/parks/?parkCode={code}"
        params = {"api_key": NPS_API_KEY}
        response = requests.get(url, params=params)
        data = response.json()
        return data
