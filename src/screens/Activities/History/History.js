import React from 'react'
import { View, Text } from 'react-native'
import HistoryLayout from './HistoryLayout'


export default function History({ navigation, route }) {
    console.log("history", route.params)
    const userData = route.params;

    return (
        <HistoryLayout userData={userData} navigation={navigation} />
    )
}
