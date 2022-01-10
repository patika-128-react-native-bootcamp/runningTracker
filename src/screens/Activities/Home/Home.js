import React, { useEffect, useState } from 'react'

import HomeLayout from './HomeLayout'
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from 'react-native';

export default function Home({ navigation }) {

    const user = auth().currentUser;

    const dispatch = useDispatch();

    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(true)
    //user signout both from firebase and local storage
    function handleSignOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        dispatch({ type: "SET_USER", payload: false });
    }


    //userDashboardu verileri çekme
    useEffect(() => {
        firestore().collection("users").doc(user.uid).onSnapshot((snap) => {
            setUserData(snap._data)
            setLoading(false)
        })
    }, [])


    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <HomeLayout
            userName={user}
            signOut={handleSignOut}
            navigation={navigation}
            userData={userData}

        />
    )
}
