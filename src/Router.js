// In App.js in a new projec
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Auth/Login';
import Sign from './screens/Auth/Sign';
import ForgetPassword from './screens/Auth/ForgetPassword';

import NewActivity from './screens/Activities/NewActivity';
import Home from './screens/Activities/Home';
import LeaderBoard from './screens/Activities/LeaderBoard';

import auth from "@react-native-firebase/auth"

import SplashScreen from 'react-native-splash-screen'


const Stack = createNativeStackNavigator();

function App() {
    const [user, setUser] = React.useState(false);

    React.useEffect(() => {
        auth().onAuthStateChanged(users => {
           
                if (users) {
                    console.log("user var")
                    setUser(true)
                    SplashScreen.hide();
                } else {
                    console.log("yok")
                    setUser(false)
                    SplashScreen.hide();
                }
        })
    }, [])



    return (
        <NavigationContainer>

           {user == false ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} options={{ presentation: "fullScreenModal" }} />
                    <Stack.Screen name="Sign" component={Sign} options={{ presentation: "fullScreenModal" }} />
                    <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ presentation: "fullScreenModal" }} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="NewActivity" component={NewActivity} />
                        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
                </Stack.Navigator>
            )
            }

        </NavigationContainer>
    );
}

export default App;