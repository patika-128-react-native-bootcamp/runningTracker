import React from 'react'
import { View, Text } from 'react-native'
import ActivityDetailLayout from './ActivityDetailLayout'

export default function ActivityDetail({ navigation, route }) {

    return (
        <ActivityDetailLayout activityData={route.params} navigation={navigation} />
    )
}
