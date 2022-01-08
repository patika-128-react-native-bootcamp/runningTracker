import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import HomeLayout from './HomeLayout'
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ navigation }) {
    const user = auth().currentUser;
    const dispatch = useDispatch();
    function handleSignOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        dispatch({ type: "SET_USER", payload: false });
    }
    //userDashboardu yaratma
    useEffect(() => {

    }, [])
    return (
        <HomeLayout userName={user} signOut={handleSignOut} navigation={navigation} />
    )
}
