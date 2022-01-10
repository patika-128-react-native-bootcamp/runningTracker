import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from "./HistoryCard.style"

export default function HistoryCard({ data, navigation, index }) {
    console.log("historycard", data)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ActivityDetail", data)}
            style={styles.container}>
            <Text style={styles.text}>{index}.</Text>
            <Text style={styles.text}>{Date(data.date.nanoseconds).toString().split(" ").slice(0, 4).join(" ")}</Text>
            <Text style={styles.text}>{data.distance.toFixed(2)} km</Text>

        </TouchableOpacity>
    )
}
