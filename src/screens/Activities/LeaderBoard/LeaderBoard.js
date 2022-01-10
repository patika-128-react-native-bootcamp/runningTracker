import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import LeaderBoardLayout from './LeaderBoardLayout'
import firestore from "@react-native-firebase/firestore";

export default function LeaderBoard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allData, setAllData] = useState();

    useEffect(() => {
        try {
            firestore().collection("users").limit(20).onSnapshot((snap) => {
                setAllData(snap.docs.map((user) => ({ data: user._data })).sort((a, b) => a.data.totalDistance < b.data.totalDistance))
                setLoading(false)
            })
        } catch (error) {
            setError(error)
        }
    }, [])
    if (loading) {
        return <ActivityIndicator />
    }
    if (error) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }
    return (
        <LeaderBoardLayout allData={allData} />
    )
}
