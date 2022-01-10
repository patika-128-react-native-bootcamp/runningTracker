import React from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from "./HistoryLayout.style"
import HistoryCard from '../../../../components/HistoryCard'
import uuid from 'react-native-uuid';

export default function HistoryLayout({ userData, navigation }) {
    const sortedData = userData.activities.sort((a, b) => a.date < b.date)

    const renderItem = ({ item, index }) => (<HistoryCard data={item} navigation={navigation} index={index} />)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.title}>Distance</Text>
            </View>

            <FlatList
                ListEmptyComponent={<Text style={{ color: "black" }}>You don't have any activity</Text>}
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={() => uuid.v4()}
            />
        </View>
    )
}
