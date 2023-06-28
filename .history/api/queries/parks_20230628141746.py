import requests


class ParkQueries:
    def get_by_state(self, state: str):
        url = f`https://{state}`