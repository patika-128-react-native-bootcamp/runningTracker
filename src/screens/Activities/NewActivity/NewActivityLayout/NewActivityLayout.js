import React, { useRef } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import styles from "./NewActivityLayout.style";
import Button from "../../../../components/Button"
import { Timer } from 'react-native-element-timer';
import ModalCard from '../../../../components/ModalCard';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { BarChart } from "react-native-chart-kit";
export default function ActivityLayout({
    handleStart,
    handleFinish,
    timerRef,
    handleTimer,
    initialLocation,
    currentLocation,
    allData,
    handleEnd,
    weatherData,
    modalVisible,
    handleModal,
    barGraphData
}) {
    const viewRef = useRef()
    const chartConfig = {
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }

    return (
        <View style={styles.container} ref={viewRef}>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                region={
                    {
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                }
                showsMyLocationButton={true}
            >
                <Marker coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }} />
                <Polyline
                    coordinates={allData.allCoords}
                    strokeColor="#FF0D10" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={4}
                />
            </MapView>
            <ScrollView style={{ flex: 0.6 }}>
                <Button onPress={() => handleStart()} title="Start" />
                <Button onPress={() => handleFinish()} title="Finish" />
                <View style={styles.innerContainer}>
                    <View style={styles.row}>
                        <Text style={styles.time}>Time: </Text>
                        <Timer
                            ref={timerRef}
                            style={styles.timer}
                            textStyle={styles.timerText}
                            onTimes={e => { handleTimer(e) }}
                            onPause={e => { }}
                            onEnd={e => handleEnd(e)}
                        />
                    </View>
                    <Text style={styles.title}>Distance: {allData.distance.toFixed(2)} km</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Speed: {allData.speed.toFixed(2)} km/h</Text>
                    <Text style={styles.title}>Temperature: {weatherData.main.temp}°C</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                        }}
                    />
                    <Text style={styles.title}>Humidity: {weatherData.main.humidity}%</Text>
                </View>

                <BarChart
                    style={styles.barChart}
                    data={barGraphData}
                    width={320}
                    height={220}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                />
                <ModalCard visible={modalVisible} onClose={() => handleModal()} viewRef={viewRef} allData={allData} />

            </ScrollView>
        </View>
    )
}
