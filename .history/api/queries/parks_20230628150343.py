import requests
import json
import os

NPS_KEY = "0ZeCSX4xelpjh1GHiMtKYhVDLXTe5u8z3mZ8vPR3"


class ParkQueries:
    def get_by_state(self, state: str):
        url = "https://developer.nps.gov/api/v1/parks/"
        headers = {"Authorization": NPS_KEY}
        params = {"query": stateCode}
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        return data
