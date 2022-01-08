import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from "./NewActivityLayout.style";
import Button from "../../../../components/Button"
import { Timer } from 'react-native-element-timer';

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

export default function ActivityLayout({ handleStart, handleFinish, timerRef, handleTimer, initialLocation, currentLocation, allData, handleEnd }) {

    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }} />
                <Polyline
                    coordinates={allData.allCoords}
                    strokeColor="#FF0D10" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={4}
                />
            </MapView>
            <Timer
                ref={timerRef}
                style={styles.timer}
                textStyle={styles.timerText}
                onTimes={e => { handleTimer(e) }}
                onPause={e => { }}
                onEnd={e => handleEnd(e)}
            />
            <Text style={{ color: "black" }}>distance: {allData.distance}</Text>
            <Text style={{ color: "black" }}>speed: {allData.speed}</Text>
            <Text style={{ color: "black" }}>alldata time: {allData.time}</Text>
            <Button onPress={() => handleStart()} title="Start" />
            <Button onPress={() => handleFinish()} title="Finish" />

        </View>
    )
}
