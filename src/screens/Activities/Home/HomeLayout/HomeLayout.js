import React from 'react'
import { View, Text } from 'react-native'

import styles from "./HomeLayout.style"
import Button from '../../../../components/Button'

export default function HomeLayout({ userName, signOut, navigation, uservar, setUserVar }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} >
                    Welcome
                </Text>
                <Text style={styles.title}>
                    {userName.displayName}
                </Text>
                <Text style={styles.title}>{uservar}</Text>
            </View>

            <Button title="Go Activity" onPress={() => navigation.navigate("Activity")} />
            <Button title="Go LeaderBoard" onPress={() => navigation.navigate("LeaderBoard")} />
            <Button title="SignOut" onPress={() => setUserVar("oğuzhan")} />
        </View>
    )
}
