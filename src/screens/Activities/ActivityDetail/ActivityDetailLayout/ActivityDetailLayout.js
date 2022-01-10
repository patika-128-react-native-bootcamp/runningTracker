import React from 'react'
import { View, Text } from 'react-native'
import styles from "./ActivityDetailLayout.style"
import Button from '../../../../components/Button'

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';


export default function ActivityDetailLayout({ activityData, navigation }) {
    const initialLocation = activityData.allCoords[0]
    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Polyline
                    coordinates={activityData.allCoords}
                    strokeColor="#FF0D10" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={4}
                />
            </MapView>
            <View style={styles.titleContainer}>

                <Text style={styles.title}>
                    Date: {Date(activityData.date.nanoseconds).toString().split(" ").slice(0, 4).join(" ")}
                </Text>
                <Text style={styles.title}>
                    Total Distance: {activityData.distance.toFixed(2)} km
                </Text>
                <Text style={styles.title}>
                    Speed: {activityData.speed.toFixed(2)} km/h
                </Text>
                <Text style={styles.title}>
                    Total Time: {activityData.time}
                </Text>

            </View>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    )
}
