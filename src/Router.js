// In App.js in a new projec
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Auth/Login';
import Sign from './screens/Auth/Sign';
import ForgetPassword from './screens/Auth/ForgetPassword';

//import Splash from './screens/Splash';
import Activity from './screens/Activities/Activity';
import Home from './screens/Activities/Home';
import LeaderBoard from './screens/Activities/LeaderBoard';

import auth from "@react-native-firebase/auth"

const Stack = createNativeStackNavigator();

function App() {
    const [user, setUser] = React.useState(false);

    React.useEffect(() => {
        auth().onAuthStateChanged(users => {
           
                if (users) {
                    console.log("user var")
                    setUser(true)
                } else {
                    console.log("yok")
                    setUser(false)
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
                        <Stack.Screen name="Activity" component={Activity} />
                        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
                </Stack.Navigator>
            )
            }

        </NavigationContainer>
    );
}

export default App;