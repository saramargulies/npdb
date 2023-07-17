from fastapi.testclient import TestClient
from main import app
from queries.parks import ParkQueries
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "1234", "username": "fakeuser"}


class FakeParkQueries:
    def get_by_state(self, state: str):
        return {
            "data": [
                {
                    "id": "D44FE5CB-71B4-4B7C-A52A-41BE9D9211B3",
                    "url": "https://www.nps.gov/wapa/index.htm",
                    "fullName": "War In The Pacific National Historical Park",
                    "parkCode": "wapa",
                    "description": "War in the Pacific National Historical Park was established to commemorate the bravery and sacrifice of those participating in the campaigns of the Pacific Theater of World War II and to conserve and interpret outstanding natural, scenic, and historic values and objects of the island of Guam.",  # noqa
                    "activities": [
                        {
                            "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
                            "name": "Astronomy",
                        },
                        {
                            "id": "3EBF7EAC-68FC-4754-B6A4-0C38A1583D45",
                            "name": "Snorkeling",
                        },
                        {
                            "id": "C8F98B28-3C10-41AE-AA99-092B3B398C43",
                            "name": "Museum Exhibits",
                        },
                    ],
                    "states": "GU",
                    "images": [
                        {
                            "title": "Asan Beach Overlook",
                            "altText": "Mountain view down toward beach.",
                            "url": "https://www.nps.gov/common/uploads/structured_data/3C84E1DA-1DD8-B71B-0B51C510B3B8336F.jpg",  # noqa
                        },
                        {
                            "title": "Memorial Day Flag Honors at Asan Beach",
                            "altText": "Night view of light up US flags.",
                            "url": "https://www.nps.gov/common/uploads/structured_data/3C84E351-1DD8-B71B-0BDBBD15FE0FC3C5.jpg",  # noqa
                        },
                        {
                            "title": "Apaca point",
                            "altText": "Calm water beach at sunset.",
                            "url": "https://www.nps.gov/common/uploads/structured_data/3C84E4CE-1DD8-B71B-0B99E1F20C5F2041.jpg",  # noqa
                        },
                    ],
                }
            ]
        }


def get_one_by_code(self, parkCode: str):
    return {
        [
            {
                "id": "C08AD828-98FF-478E-A63C-614E7534274B",
                "url": "https://www.nps.gov/alca/index.htm",
                "fullName": "Alcatraz Island",
                "parkCode": "alca",
                "description": "Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. We invite you to explore Alcatraz's complex history and natural beauty.",  # noqa
                "activities": [
                    {
                        "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
                        "name": "Food",
                    },
                    {
                        "id": "0B685688-3405-4E2A-ABBA-E3069492EC50",
                        "name": "Wildlife Watching",
                    },
                    {
                        "id": "5A2C91D1-50EC-4B24-8BED-A2E11A1892DF",
                        "name": "Birdwatching",
                    },
                    {
                        "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                        "name": "Shopping",
                    },
                    {
                        "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                        "name": "Bookstore and Park Store",
                    },
                ],
                "states": "CA",
                "images": [
                    {
                        "title": "Alcatraz Island",
                        "altText": "View of the Alcatraz Lighthouse and Island from the water",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/2514A14F-D5E3-BB31-4A0C4175BF61216A.jpg",  # noqa
                    },
                    {
                        "title": "Alcatraz Cellhouse",
                        "altText": "A corridor extends between two rows and three tiers of cells. Skylights let in light from overhead.",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/5482A294-DB42-56E0-FCCCD03C986AE1DC.jpg",  # noqa
                    },
                    {
                        "title": "Alcatraz Rangers and Firetruck",
                        "altText": "Alcatraz Rangers and Firetruck",
                        "url": "https://www.nps.gov/common/uploads/structured_data/A5C1D012-1DD8-B71B-0BA00C730D46F141.jpg",  # noqa
                    },
                    {
                        "title": "Army Prisoners in the Stockade, 1902",
                        "altText": "Army Prisoners in the Stockade, 1902",
                        "url": "https://www.nps.gov/common/uploads/structured_data/A61F4F58-1DD8-B71B-0B981C552798242B.jpg",  # noqa
                    },
                    {
                        "title": "Serving the Christmas Meal, c 1951",
                        "altText": "Cook serving Christmas dinner with menu posted above.",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/A64B4FF8-1DD8-B71B-0B63B232325C8081.jpg",  # noqa
                    },
                ],
            }
        ]
    }


def test_get_park_by_code():
    app.dependency_overrides[ParkQueries] = ParkQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    result = client.get("/api/parks/code/alca")
    data = result.json()
    print(result, result.status_code, data)
    assert result.status_code == 200
    assert data == {
        "data": [
            {
                "id": "C08AD828-98FF-478E-A63C-614E7534274B",
                "url": "https://www.nps.gov/alca/index.htm",
                "fullName": "Alcatraz Island",
                "parkCode": "alca",
                "description": "Alcatraz reveals stories of American incarceration, justice, and our common humanity. This small island was once a fort, a military prison, and a maximum security federal penitentiary. In 1969, the Indians of All Tribes occupied Alcatraz for 19 months in the name of freedom and Native American civil rights. We invite you to explore Alcatraz's complex history and natural beauty.",  # noqa
                "activities": [
                    {
                        "id": "1DFACD97-1B9C-4F5A-80F2-05593604799E",
                        "name": "Food",
                    },
                    {
                        "id": "0B685688-3405-4E2A-ABBA-E3069492EC50",
                        "name": "Wildlife Watching",
                    },
                    {
                        "id": "5A2C91D1-50EC-4B24-8BED-A2E11A1892DF",
                        "name": "Birdwatching",
                    },
                    {
                        "id": "24380E3F-AD9D-4E38-BF13-C8EEB21893E7",
                        "name": "Shopping",
                    },
                    {
                        "id": "467DC8B8-0B7D-436D-A026-80A22358F615",
                        "name": "Bookstore and Park Store",
                    },
                ],
                "states": "CA",
                "images": [
                    {
                        "title": "Alcatraz Island",
                        "altText": "View of the Alcatraz Lighthouse and Island from the water",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/2514A14F-D5E3-BB31-4A0C4175BF61216A.jpg",  # noqa
                    },
                    {
                        "title": "Alcatraz Cellhouse",
                        "altText": "A corridor extends between two rows and three tiers of cells. Skylights let in light from overhead.",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/5482A294-DB42-56E0-FCCCD03C986AE1DC.jpg",  # noqa
                    },
                    {
                        "title": "Alcatraz Rangers and Firetruck",
                        "altText": "Alcatraz Rangers and Firetruck",
                        "url": "https://www.nps.gov/common/uploads/structured_data/A5C1D012-1DD8-B71B-0BA00C730D46F141.jpg",  # noqa
                    },
                    {
                        "title": "Army Prisoners in the Stockade, 1902",
                        "altText": "Army Prisoners in the Stockade, 1902",
                        "url": "https://www.nps.gov/common/uploads/structured_data/A61F4F58-1DD8-B71B-0B981C552798242B.jpg",  # noqa
                    },
                    {
                        "title": "Serving the Christmas Meal, c 1951",
                        "altText": "Cook serving Christmas dinner with menu posted above.",  # noqa
                        "url": "https://www.nps.gov/common/uploads/structured_data/A64B4FF8-1DD8-B71B-0B63B232325C8081.jpg",  # noqa
                    },
                ],
            }
        ]
    }


def test_get_parks_by_state():
    app.dependency_overrides[ParkQueries] = FakeParkQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    result = client.get("/api/parks/GU")
    data = result.json()
    print(result)
    assert result.status_code == 200
    assert data == {
        "data": [
            {
                "id": "D44FE5CB-71B4-4B7C-A52A-41BE9D9211B3",
                "url": "https://www.nps.gov/wapa/index.htm",
                "fullName": "War In The Pacific National Historical Park",
                "parkCode": "wapa",
                "description": "War in the Pacific National Historical Park was established to commemorate the bravery and sacrifice of those participating in the campaigns of the Pacific Theater of World War II and to conserve and interpret outstanding natural, scenic, and historic values and objects of the island of Guam.",  # noqa
                "activities": [
                    {
                        "id": "13A57703-BB1A-41A2-94B8-53B692EB7238",
                        "name": "Astronomy",
                    },
                    {
                        "id": "3EBF7EAC-68FC-4754-B6A4-0C38A1583D45",
                        "name": "Snorkeling",
                    },
                    {
                        "id": "C8F98B28-3C10-41AE-AA99-092B3B398C43",
                        "name": "Museum Exhibits",
                    },
                ],
                "states": "GU",
                "images": [
                    {
                        "title": "Asan Beach Overlook",
                        "altText": "Mountain view down toward beach.",
                        "url": "https://www.nps.gov/common/uploads/structured_data/3C84E1DA-1DD8-B71B-0B51C510B3B8336F.jpg",  # noqa
                    },
                    {
                        "title": "Memorial Day Flag Honors at Asan Beach",
                        "altText": "Night view of light up US flags.",
                        "url": "https://www.nps.gov/common/uploads/structured_data/3C84E351-1DD8-B71B-0BDBBD15FE0FC3C5.jpg",  # noqa
                    },
                    {
                        "title": "Apaca point",
                        "altText": "Calm water beach at sunset.",
                        "url": "https://www.nps.gov/common/uploads/structured_data/3C84E4CE-1DD8-B71B-0B99E1F20C5F2041.jpg",  # noqa
                    },
                ],
            }
        ]
    }
