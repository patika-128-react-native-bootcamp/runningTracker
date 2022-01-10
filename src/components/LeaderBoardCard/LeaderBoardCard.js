import React from 'react'
import { View, Text } from 'react-native'
import styles from "./LeaderBoardCard.style"

export default function LeaderBoardCard({ data, index }) {

    return (
        <View style={styles.container}>


            <Text style={styles.title}>{index + 1}.</Text>
            <Text style={styles.title}>{data.data.userName}</Text>
            <Text style={styles.title}>{data.data.totalDistance.toFixed(2)} km</Text>

        </View>
    )
}
