import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from "./ActivityLayout.style";
import Button from "../../../../components/Button"
import { Timer } from 'react-native-element-timer';

import MapView, { PROVIDER_GOOGLE, Marker, LatLng, Polyline } from 'react-native-maps';

export default function ActivityLayout({ coords, loading, handleStart, handleFinish, timerRef, handleTimer }) {
    console.log(coords)
    return (
        <View style={styles.container}>
            {loading ?
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker coordinate={coords[0]} />
                    <Polyline
                        coordinates={coords}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />

                </MapView> :
                <ActivityIndicator />}
            <Timer
                ref={timerRef}
                style={styles.timer}
                textStyle={styles.timerText}
                onTimes={e => { handleTimer(e) }}
                onPause={e => { }}
                onEnd={e => { }}
            />
            <Button onPress={() => handleStart()} title="Start" />
            <Button onPress={() => handleFinish()} title="Finish" />

        </View>
    )
}
