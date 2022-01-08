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
    });
    const [allData, setAllData] = useState({
        allCoords: [],
        distance: 0,
        time: 0,
        speed: 0
    });

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);

    const getPosition = () => {
        Geolocation.getCurrentPosition(
            (c) => {
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
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
    const handleStart = () => {
        if (!status) {
            timerRef.current.start();
            setStatus(true)
        }
    };
    const handleFinish = () => {
        if (status) {
            timerRef.current.stop();
            setStatus(false)
        }
    }
    const handleEnd = (t) => {
        setAllData({
            ...allData,
            time: t
        })
    }
    const handleTimer = (t) => {
        console.log(t)
        if (t % 5 == 0) {
            getPosition()
        }
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (c) => {
                setAllData({
                    allCoords: [{
                        latitude: c.coords.latitude,
                        longitude: c.coords.longitude,
                    }],
                    distance: 0,
                    time: 0
                })
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
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

    useEffect(() => {
        const length = allData.allCoords.length - 1
        if (currentLocation.latitude != 0 && currentLocation.latitude != allData.allCoords[length].latitude) {
            setAllData({
                allCoords: [...allData.allCoords, currentLocation],
                distance: allData.distance + countDistance(allData.allCoords[length].latitude, allData.allCoords[length].longitude, currentLocation.latitude, currentLocation.longitude),
                time: 0
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
