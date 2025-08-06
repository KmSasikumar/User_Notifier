// app/path-explorer.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PathExplorer() {
    const [searchText, setSearchText] = useState('');
    // Explicitly type location as LocationObject or null
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    // Use 'any' for destination since expo-location doesn't export GeocodedLocation
    const [destination, setDestination] = useState<any>(null);

    // Request location permission and get user’s current location
    const handleGetLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission not granted');
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            if (loc && loc.coords) {
                setLocation(loc);
                const reverse = await Location.reverseGeocodeAsync(loc.coords);
                if (reverse && reverse.length > 0) {
                    const addr = reverse[0];
                    const addressString = `${addr.street ?? ''}, ${addr.city ?? ''}`;
                    setSearchText(addressString.trim());
                } else {
                    setSearchText(`${loc.coords.latitude}, ${loc.coords.longitude}`);
                }
            } else {
                Alert.alert('Error', 'Could not retrieve location');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not get location');
        }
    };

    // Function to forward geocode the destination search text
    const handleDestinationSearch = async () => {
        try {
            const results = await Location.geocodeAsync(searchText);
            if (results && results.length > 0) {
                setDestination(results[0]);
                Alert.alert('Destination Found', `Destination set to: ${searchText}`);
            } else {
                Alert.alert('Error', 'No location found for that address.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to process destination location');
        }
    };

    // Request location on mount
    useEffect(() => {
        handleGetLocation();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar (with location pin on the right) */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search here"
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleDestinationSearch}
                />
                {/* Red pin button on the right corner */}
                <TouchableOpacity style={styles.locationButton} onPress={handleGetLocation}>
                    <Text style={styles.locationButtonIcon}>📍</Text>
                </TouchableOpacity>
            </View>

            {/* Actual Map (middle of the screen) */}
            {location ? (
                <MapView
                    style={styles.mapContainer}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <Marker
                        coordinate={location.coords}
                        title="You are here"
                    />
                    {destination && (
                        <Marker
                            coordinate={{
                                latitude: destination.latitude,
                                longitude: destination.longitude,
                            }}
                            title="Destination"
                            pinColor="blue"
                        />
                    )}
                </MapView>
            ) : (
                <View style={styles.mapContainer}>
                    <Text style={styles.mapText}>Fetching location...</Text>
                </View>
            )}

            {/* Diamond Button at Bottom-Right */}
            <TouchableOpacity style={styles.floatingButtonDiamond}>
                <Text style={styles.buttonIcon}>🔷</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>UserNotifier</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD', // Light background, adjust if needed
    },

    /* SEARCH BAR */
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 8,
    },
    locationButton: {
        marginLeft: 8,
        padding: 6,
    },
    locationButtonIcon: {
        fontSize: 20,
        color: 'red', // Red pin icon
    },

    /* MAP CONTAINER */
    mapContainer: {
        flex: 1,
        backgroundColor: '#E2E8F0', // Fallback color
        margin: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    mapText: {
        color: '#555',
        fontSize: 18,
    },

    /* DIAMOND BUTTON */
    floatingButtonDiamond: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 50,
        height: 50,
        backgroundColor: '#00C58E',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonIcon: {
        fontSize: 20,
        color: '#fff',
    },

    /* FOOTER */
    footer: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#F8F9FD',
    },
    footerText: {
        fontSize: 16,
        color: '#000',
    },
});
