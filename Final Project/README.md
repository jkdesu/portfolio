# Mapping Hype - Final Project

This project explores designer toy stores across major cities using Google Maps API.

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r ../requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory (one level up from this folder) with your Google Maps API key:

```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important**: Never commit your `.env` file to version control. It's already added to `.gitignore`.

### 3. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Places API" and "Maps JavaScript API"
4. Create credentials (API Key)
5. Add the API key to your `.env` file

### 4. Run the Scripts

Each script will generate a CSV file with toy store data for different cities:

```bash
python finalproject          # Manhattan toy stores
python finalproject_la.py    # Los Angeles toy stores
python finalproject_tokyo.py # Tokyo toy stores
python finalproject_shanghai.py # Shanghai toy stores
```

### 5. View the Interactive Map

Open `index.html` in your browser to see the interactive map visualization.

## Security Notes

- ✅ API keys are stored in environment variables
- ✅ `.env` file is ignored by git
- ✅ No hardcoded secrets in the code
- ✅ Safe to share on GitHub

## File Structure

```
Final Project/
├── finalproject              # Manhattan data collection
├── finalproject_la.py        # LA data collection
├── finalproject_tokyo.py     # Tokyo data collection
├── finalproject_shanghai.py  # Shanghai data collection
├── main.js                   # Interactive map logic
├── index.html               # Map visualization
├── *.geojson               # Geographic data files
├── *.png                   # Icon files
└── README.md               # This file
```
