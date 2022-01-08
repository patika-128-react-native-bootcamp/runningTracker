import React, { useState, useEffect, useRef } from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

import ActivityLayout from "./NewActivityLayout"

import Geolocation from '@react-native-community/geolocation';

import countDistance from "../../../services/countDistance"

import useFetch from "../../../hooks/useFetch";

export default function Activity() {

    const timerRef = useRef(null);
    const base = "https://api.openweathermap.org/data/2.5/weather?";
    const key = "3ddfa2bc4b532c1cd5f12c113b3dd8d6";
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        time: 0
    });
    const [allData, setAllData] = useState({
        allCoords: [],
        distance: 0,
        time: 0,
        speed: 0
    });

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);

    const getPosition = (t) => {
        Geolocation.getCurrentPosition(
            (c) => {
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                    time: t
                });

            },
            (error) => console.log(error),
            {
                accuracy: {
                    android: "high",
                },
                enableHighAccuracy: true,
            }
        );
    }
    console.log("current", currentLocation)
    //used for starting timer
    const handleStart = () => {
        if (!status) {
            timerRef.current.start();
            setStatus(true)
        }
    };
    // used to finish timer
    const handleFinish = () => {
        if (status) {
            timerRef.current.stop();
            setStatus(false)
        }
    }
    // works when timer finished
    const handleEnd = (t) => {
        setAllData({
            ...allData,
            time: t,
        })
    }
    //works every second
    const handleTimer = (t) => {
        if (t % 5 == 0) {
            getPosition(t)
        }
    };
    console.log("console", allData)

    //first coordinates taken
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (c) => {
                setAllData({
                    allCoords: [{
                        latitude: c.coords.latitude,
                        longitude: c.coords.longitude,
                    }],
                    distance: 0,
                    time: 0,
                    speed: 0
                })
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                    time: 0
                })

                // const {
                //     loading: loadingWeather,
                //     error: errorWeather,
                //     data: dataWeather
                // } = useFetch(`${base}lat=${c.coords.latitude}&lon=${c.coords.longitude}&appid=${key}`);
                setLoading(false)
            },
            (error) => console.log(error),
            {
                enableHighAccuracy: true,
            },
        );
    }, []);

    // when current location taken set this into allData with useEffect, I used this way beacause when I set it in geolocation function, I get some errors
    useEffect(() => {
        const length = allData.allCoords.length - 1
        const speed = allData.time > 0 ? allData.distance / allData.time : 0

        console.log(length)
        if (length > -1) {
            setAllData({
                allCoords: [...allData.allCoords, {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }],
                distance: allData.distance + countDistance(allData.allCoords[length].latitude, allData.allCoords[length].longitude, currentLocation.latitude, currentLocation.longitude),
                time: currentLocation.time,
                speed: speed
            })
        }
    }, [currentLocation])

    if (loading) {
        return <ActivityIndicator />
    };

    return (
        <ActivityLayout
            loading={loading}
            handleStart={handleStart}
            handleFinish={handleFinish}
            timerRef={timerRef}
            handleTimer={handleTimer}
            initialLocation={allData.allCoords[0]}
            currentLocation={currentLocation}
            allData={allData}
            handleEnd={handleEnd}
        />
    )
}
