import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from "./ActivityLayout.style";
import Button from "../../../../components/Button"
import { Timer } from 'react-native-element-timer';

import MapView, { PROVIDER_GOOGLE, Marker, LatLng, Polyline } from 'react-native-maps';

export default function ActivityLayout({ coords, handleStart, handleFinish, timerRef, handleTimer, initial, currentLocation }) {
    console.log(coords)
    return (
        <View style={styles.container}>

                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: initial.latitude,
                        longitude: initial.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                <Marker coordinate={currentLocation} />
                    <Polyline
                        coordinates={coords}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                        ]}
                        strokeWidth={6}
                    />

            </MapView> 

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
