# FindMyPark (React Native + OpenWeather API)

## Overview

FindMyPark is a mobile app built with React Native that helps users locate parks in Hamilton, Ontario, Canada. The app displays predefined parks on a map, allows users to find their current location, and fetches weather data for any selected park. Users can view details such as temperature and weather description, and the app also provides links to open park locations in Google Maps for easy navigation. The weather data is retrieved dynamically through the OpenWeather API based on each park's coordinates.

## Features

- **Interactive Map**: Displays a map with predefined parks in Hamilton, Ontario.
- **User Location**: Find and display the user’s current location.
- **Weather Information**: Fetch and display real-time weather data for selected parks.
- **Google Maps**: Open selected park locations on Google Maps.
- **Markers & Callouts**: Tap a park to see weather details and a navigation link.

## Tech Stack

- **Frontend**:
  - **React Native** for mobile app development.
  - **Expo Location** for obtaining the user’s location.
  - **React Native Maps** for displaying parks and navigation features.
  - **Axios** for making API requests.

- **APIs**:
  - **OpenWeather API**: Retrieves real-time weather data based on park coordinates.

## UI Overview
![WhatsApp Image 2025-02-06 at 00 19 11](https://github.com/user-attachments/assets/e7c08d2b-3586-420e-9089-f2ee51291651)

## Installation

To get started with this app, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/danilonakai/findmypark_reactnative.git
    cd findmypark_reactnative
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the app on your device or emulator:
    ```bash
    npm start
    ```
    
4. **Add your OpenWeather API Key (APP_ID):**
   To access the OpenWeather API, you'll need to add your API key to the project:

   - First, [sign up for an API key](https://openweathermap.org/appid) at OpenWeather.
   - Once you have your API key, open your project’s `app.json`.
   - Add the key in the `"extra"` section like this:

   ```json
   {
     ...
   
     "extra": {
       "APP_ID": "your-app-id-here"
     }
   }

The app should now be running on your device or emulator.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

