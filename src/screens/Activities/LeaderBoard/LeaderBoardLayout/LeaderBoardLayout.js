import React from 'react'
import { View, Text, FlatList } from 'react-native'
import LeaderBoardCard from '../../../../components/LeaderBoardCard'
import styles from "./LeaderBoardLayout.style"
import uuid from 'react-native-uuid';

export default function LeaderBoardLayout({ allData }) {
    const renderItem = ({ item, index }) => (<LeaderBoardCard data={item} index={index} />)
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Rank</Text>
                <Text style={styles.title}>User</Text>
                <Text style={styles.title}>Distance</Text>
            </View>
            <FlatList
                data={allData}
                renderItem={renderItem}
                keyExtractor={() => uuid.v4()}
            />
        </View>
    )
}
