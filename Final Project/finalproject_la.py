import requests
import time
import csv
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variable
API_KEY = os.getenv('GOOGLE_MAPS_API_KEY') 

query = "designer toy store in Los Angeles"
base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
params = {
    "query": query,
    "key": API_KEY
}

all_places = []

while True:
    response = requests.get(base_url, params=params)
    data = response.json()

    if "results" in data:
        all_places.extend(data["results"])
    else:
        print("No results found or an error occurred.")
        break

    if "next_page_token" in data:
        time.sleep(2)
        params = {
            "pagetoken": data["next_page_token"],
            "key": API_KEY
        }
    else:
        break

# Print preview
print("\n✅ Places Retrieved:")
for place in all_places:
    name = place.get("name", "N/A")
    address = place.get("formatted_address", "N/A")
    lat = place["geometry"]["location"]["lat"]
    lng = place["geometry"]["location"]["lng"]
    print(f"{name} | {address} | ({lat}, {lng})")

# Save to CSV
with open("losangeles_toy_stores.csv", "w", newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Address", "Lat", "Lng"])
    for place in all_places:
        name = place.get("name", "")
        address = place.get("formatted_address", "")
        lat = place["geometry"]["location"]["lat"]
        lng = place["geometry"]["location"]["lng"]
        writer.writerow([name, address, lat, lng])

print("\n✅ CSV saved: losangeles_toy_stores.csv")
