import React, { useState, useEffect, useRef } from 'react'
import { View, Text } from 'react-native'

import Geolocation from '@react-native-community/geolocation';


import ActivityLayout from "./ActivityLayout"

export default function Activity() {

    const timerRef = useRef(null);


    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCoordination = (c) => {
        setCoords([...coords, {
            latitude: c.coords.latitude,
            longitude: c.coords.longitude,
        }]);


    };
    const getPosition = () => {
        Geolocation.getCurrentPosition(
            (c) => handleCoordination(c),

            (error) => console.log(error),
            {
                enableHighAccuracy: true,
            },
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
        if (t % 10 == 0) {
            getPosition()
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (c) => {
                handleCoordination(c);
                setLoading(true)
            },

            (error) => console.log(error),
            {
                enableHighAccuracy: true,
            },
        );
    }, [])

    return (
        <ActivityLayout
            coords={coords}
            loading={loading}
            handleStart={handleStart}
            handleFinish={handleFinish}
            timerRef={timerRef}
            handleTimer={handleTimer}
        />
    )
}
