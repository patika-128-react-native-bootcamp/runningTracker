import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import ActivityLayout from "./ActivityLayout"

import Geolocation from '@react-native-community/geolocation';

import countDistance from "../../../services/countDistance"

export default function Activity() {

    const timerRef = useRef(null);


    const [coords, setCoords] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState(true);
    const [initial, setInitial] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [status, setStatus] = useState(false)
    const [allData, setAllData] = useState({
        allCoords: [],
        distance: 0,
        time: 0
    })

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
    const handleTimer = (t) => {
        console.log(t)
        if (t % 5 == 0) {
            getPosition()
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (c) => {
                setInitial({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                })
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                })
                setCoords([{
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                }])
                setLoading(false)
            },

            (error) => console.log(error),
            {
                enableHighAccuracy: true,
            },
        );
    }, [])

    useEffect(() => {
        if (currentLocation.latitude != 0) {

            setCoords([...coords, currentLocation])
        }
    }, [currentLocation])

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <ActivityLayout
            coords={coords}
            loading={loading}
            handleStart={handleStart}
            handleFinish={handleFinish}
            timerRef={timerRef}
            handleTimer={handleTimer}
            initial={initial}
            currentLocation={currentLocation}
        />
    )
}
