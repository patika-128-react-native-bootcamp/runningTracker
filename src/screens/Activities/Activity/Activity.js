import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import Geolocation from '@react-native-community/geolocation';


import ActivityLayout from "./ActivityLayout"

export default function Activity() {

    const timerRef = useRef(null);


    const [coords, setCoords] = useState([]);
    const [coord, setCoord] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState(true);
    const [initial, setInitial] = useState({
        latitude: 0,
        longitude: 0,
    })


    const getPosition = () => {
        Geolocation.getCurrentPosition(
            (c) => {
                setCoord({
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
        timerRef.current.start();
    };
    const handleFinish = () => {
        timerRef.current.stop();
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
        if (coord.latitude != 0) {

            setCoords([...coords, coord])
        }
    }, [coord])

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
            coord={coord}
        />
    )
}
