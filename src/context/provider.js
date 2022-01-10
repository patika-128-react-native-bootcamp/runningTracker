import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'

const Provide = ({ children }) => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("@USER").then(user => {
            if (user) {

                setUser(true)

            } else {

                setUser(false)

            }
            SplashScreen.hide();
        })
    }, [])

    const store = createStore(reducers, { user })
    return <Provider store={store}>{children}</Provider>
};

export default Provide;