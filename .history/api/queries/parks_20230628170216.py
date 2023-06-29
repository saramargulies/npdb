import requests
import json
import os

NPS_KEY = "0ZeCSX4xelpjh1GHiMtKYhVDLXTe5u8z3mZ8vPR3"


class ParkQueries:
    def get_by_state(self, state: str):
        url = f"https://developer.nps.gov/api/v1/parks/?stateCode={state}"
        print("THIS IS A PRINT STATEMENT:", url)
        params = {"api_key": NPS_KEY}
        response = requests.get(url, params=params)
        data = response.json()
        return data

    def get_one_by_code(self, code: str):
        url = f"https://developer.nps.gov/api/v1/parks/?parkCode={code}"
        print("THIS IS A PRINT STATEMENT:", url)
        params = {"api_key": NPS_KEY}
        response = requests.get(url, params=params)
        data = response.json()
        return data
