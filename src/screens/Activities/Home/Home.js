import React from 'react'
import { View, Text } from 'react-native'

import HomeLayout from './HomeLayout'
import auth from "@react-native-firebase/auth";

export default function Home({ navigation }) {
    const user = auth().currentUser;

    const [userVar, setUserVar] = React.useState(false)
    function handleSignOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
    }

    return (
        <HomeLayout userName={user} signOut={handleSignOut} navigation={navigation} uservar={userVar} setUserVar={setUserVar} />
    )
}
