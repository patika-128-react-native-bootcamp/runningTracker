import React, { useState, useEffect, useRef } from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

import ActivityLayout from "./NewActivityLayout"

import Geolocation from '@react-native-community/geolocation';

import countDistance from "../../../services/countDistance"

import axios from "axios";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Activity({ navigation, route }) {
    const timerRef = useRef(null);
    const { totalDistance, totalTime, activities, userName } = route.params;
    const base = "https://api.openweathermap.org/data/2.5/weather?";
    const key = "3ddfa2bc4b532c1cd5f12c113b3dd8d6";
    const [weatherData, setWeatherData] = useState()
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        time: 0
    });
    const [allData, setAllData] = useState({
        allCoords: [],
        distance: 0,
        time: 0,
        speed: 0,
        date: new Date(),
    });

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);

    const getPosition = (t) => {
        Geolocation.getCurrentPosition(
            (c) => {
                setCurrentLocation({
                    latitude: c.coords.latitude,
                    longitude: c.coords.longitude,
                    time: parseInt(t)
                });

            },
            (error) => setError(error),
            {
                accuracy: {
                    android: "high",
                },
                enableHighAccuracy: true,
            }
        );
    }
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
    const handleEnd = async (t) => {

        //we get user info from route and update his/her values in firebase using old data
        await firestore().collection("users").doc(auth().currentUser.uid).update({
            totalDistance: totalDistance + allData.distance,
            totalTime: parseInt(totalTime) + parseInt(allData.totalTime),
            activities: [...activities, allData]
        })
        // we clean alldata after activity finished
    }
    //works every second and call getposition function every minute
    const handleTimer = (t) => {
        if (t % 5 == 0) {
            getPosition(t)
        }
    };
    console.log("console", allData)

    const fetchData = async (latitude, longitude) => {
        try {
            const { data } = await axios.get(`${base}lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
            setWeatherData(data);
            setLoading(false)
        } catch (error) {
            setError(error.message);

        }
    };
    // when current location taken set this into allData with useEffect, 
    //I used this way beacause when I set it in geolocation function, I got some errors
    useEffect(() => {
        const length = allData.allCoords.length - 1
        const speed = allData.time > 0 ? allData.distance / allData.time : 0
        if (length > -1) {
            setAllData({
                allCoords: [...allData.allCoords, {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }],
                distance: allData.distance + countDistance(allData.allCoords[length].latitude, allData.allCoords[length].longitude, currentLocation.latitude, currentLocation.longitude),
                time: currentLocation.time,
                speed: speed,
                date: new Date(),
            })
        }
    }, [currentLocation])

    useEffect(() => {
        //first coordinates taken
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
                fetchData(c.coords.latitude, c.coords.longitude)
            },
            (error) => setError(error),
            {
                enableHighAccuracy: true,
            },
        );


    }, []);

    console.log("weatherData", weatherData)
    if (loading) {
        return <ActivityIndicator />
    };
    if (error) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

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
            weatherData={weatherData}
        />
    )
}
