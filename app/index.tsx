import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Linking, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig.extra.APP_ID;

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface Park {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Index: React.FC = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const parks: Park[] = [
    { id: 1, name: 'Bayfront Park', latitude: 43.270365, longitude: -79.871871 },
    { id: 2, name: 'Gage Park', latitude: 43.241850, longitude: -79.837614 },
    { id: 3, name: 'Dundurn Park', latitude: 43.270217, longitude: -79.883681 },
    { id: 4, name: 'Pier 4 Park', latitude: 43.273064, longitude: -79.866806 },
    { id: 5, name: 'Cootes Paradise Sanctuary', latitude: 43.273642, longitude: -79.935204 },
    { id: 6, name: 'Sam Lawrence Park', latitude: 43.247989, longitude: -79.866009 },
    { id: 7, name: 'Royal Botanical Gardens (RBG) Arboretum', latitude: 43.289587, longitude: -79.897256 },
  ];

  // Get current location when the app loads
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  // Fetch weather data based on the park's location
  const fetchWeather = async (latitude: number, longitude: number): Promise<void> => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_ID}&units=metric`;

    try {
      const response = await axios.get(weatherApiUrl);
      setWeatherData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`Error fetching weather data: ${error.response?.status || 'Unknown error'}`);
      } else {
        console.log('An unexpected error occurred', error);
      }
    }
};

  // Handle "Find My Location" button
  const findLocation = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    fetchWeather(location.coords.latitude, location.coords.longitude);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  const openInGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`; // Google Maps URL with coordinates

    Linking.openURL(url).catch((err) => console.error('Error opening Google Maps:', err));
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <Image source={require('./../assets/images/logo.png')} style={styles.logo} />

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 43.2557,
          longitude: -79.8711,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={false}  // Disable auto-centering
      >
        {/* Add markers for all parks */}
        {parks.map((park) => (
          <Marker
            key={park.id}
            coordinate={{
              latitude: park.latitude,
              longitude: park.longitude,
            }}
            title={park.name}
            onPress={() => fetchWeather(park.latitude, park.longitude)}
          >
            {/* Callout with weather info inside Marker */}
            <Callout onPress={() => openInGoogleMaps(park.latitude, park.longitude)}>
              <View style={styles.calloutBox}>
                <Text style={styles.calloutTitle}>{park.name}</Text>
                <Text style={styles.calloutText}>Weather:</Text>
                <Text style={styles.calloutText}>
                  {weatherData?.main.temp}°C | {weatherData?.weather[0].description}
                </Text>
                
                <Text style={styles.calloutLink}>Open on Google Maps</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* User's location marker */}
        {location && (
          <Marker
            coordinate={location}
            title="Your Location"
            pinColor="blue"
          />
        )}
      </MapView>

      {/* Find My Location Button */}
      <Button title="Find My Location" onPress={findLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 600,
    borderRadius: 10,
    marginBottom: 20,
  },
  calloutBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: 200,
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 14,
    color: '#00796b',
  },
  calloutButton: {
    marginTop: 10,
  },
  calloutLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});

export default Index;
