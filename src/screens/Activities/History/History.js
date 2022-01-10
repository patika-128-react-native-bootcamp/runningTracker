import React from 'react'
import { View, Text } from 'react-native'
import HistoryLayout from './HistoryLayout'


export default function History({ navigation, route }) {

    const userData = route.params;

    return (
        <HistoryLayout userData={userData} navigation={navigation} />
    )
}
