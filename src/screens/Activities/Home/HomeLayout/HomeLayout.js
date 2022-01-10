import React from 'react'
import { View, Text } from 'react-native'

import styles from "./HomeLayout.style"
import Button from '../../../../components/Button'

export default function HomeLayout({ userName, signOut, navigation, userData }) {
    console.log("homelayout", userData)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} >
                    Welcome
                </Text>
                <Text style={styles.title}>
                    {userName.displayName}
                </Text>
                <Text style={styles.title}>
                    Total Distance: {userData.totalDistance.toFixed(2)} km
                </Text>
                <Text style={styles.title}>
                    Total Time: {userData.totalTime}
                </Text>

            </View>

            <Button title="New Activity" onPress={() => navigation.navigate("NewActivity", userData)} />
            <Button title="Go LeaderBoard" onPress={() => navigation.navigate("LeaderBoard")} />
            <Button title="Go History" onPress={() => navigation.navigate("History", userData)} />
            <Button title="SignOut" onPress={() => signOut()} />
        </View>
    )
}
