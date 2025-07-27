import requests
import time
import csv
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variable
API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

# Define search locations for 3 key Tokyo districts
TOKYO_SEARCH_AREAS = [
    {"name": "Harajuku", "lat": 35.6699, "lng": 139.7066, "radius": 2000},
    {"name": "Nakano", "lat": 35.7074, "lng": 139.6658, "radius": 1500},
    {"name": "Akihabara", "lat": 35.6987, "lng": 139.7732, "radius": 1500}
]

all_places = []
seen_place_ids = set()

for area in TOKYO_SEARCH_AREAS:
    print(f"\n🔍 Searching in {area['name']}...")
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{area['lat']},{area['lng']}",
        "radius": area["radius"],
        "keyword": "designer toy",
        "key": API_KEY
    }

    while True:
        res = requests.get(url, params=params)
        data = res.json()

        if "results" in data:
            for place in data["results"]:
                place_id = place.get("place_id")
                if place_id and place_id not in seen_place_ids:
                    seen_place_ids.add(place_id)
                    all_places.append(place)
        else:
            print("⚠️ No results or error in response.")
            break

        if "next_page_token" in data:
            time.sleep(2)
            params = {
                "pagetoken": data["next_page_token"],
                "key": API_KEY
            }
        else:
            break

# 💾 Save results to CSV
with open("toy_stores_tokyo.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Address", "Lat", "Lng"])
    for place in all_places:
        name = place.get("name", "")
        address = place.get("vicinity", "")
        lat = place["geometry"]["location"]["lat"]
        lng = place["geometry"]["location"]["lng"]
        writer.writerow([name, address, lat, lng])

print(f"\n✅ Finished: {len(all_places)} total unique toy stores saved to toy_stores_tokyo.csv")
