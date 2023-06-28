import requests
import json
import os

NPS_KEY = "0ZeCSX4xelpjh1GHiMtKYhVDLXTe5u8z3mZ8vPR3"


class ParkQueries:
    def get_by_state(self, state: str):
        


        url = f"https://developer.nps.gov/api/v1/parks/{state}"
        headers = {"Authorization": NPS_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        return data


