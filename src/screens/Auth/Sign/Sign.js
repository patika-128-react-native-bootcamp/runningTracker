import React from "react";
import { View, Text, Alert, Image } from "react-native";
import styles from "./Sign.style"
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useKeyboard } from "../../../hooks/KeyboardListen";
import firestore from "@react-native-firebase/firestore"


const Sign = ({ navigation }) => {
    const isKeyBoardOpen = useKeyboard();
    const initialForm = {
        username: "",
        usermail: "",
        password: ""
    };

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, 'Too Short!')
            .required('Required'),
        username: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        usermail: Yup.string().email('Invalid email').required('Required'),
    });

    const handleSignUp = async (formValues) => {
        try {
            await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.password)
            const update = {
                displayName: formValues.username,
            };

            await auth().currentUser.updateProfile(update);


            await firestore().collection("users").doc(auth().currentUser.uid).set({
                userName: formValues.username,
                totalDistance: 0,
                totalTime: 0,
                activities: []

            })
            navigation.navigate("Login")
        } catch (error) {

            Alert.alert(
                "Alert",
                `${error}`
            );
        }
    }

    return (
        <View style={styles.container}>

            <Text style={[styles.header, isKeyBoardOpen ? { marginTop: 5 } : { marginTop: 50 }]}>Running Tracker</Text>
            <Formik
                initialValues={initialForm}
                onSubmit={values => handleSignUp(values)}
                validationSchema={SignupSchema}
            >
                {({ handleSubmit, values, handleChange, errors, touched, isValid, setFieldTouched }) => (
                    <View>
                        <Input
                            placeholder="Username"
                            onChangeText={handleChange('username')}
                            value={values.username}
                            onBlur={() => setFieldTouched('username')}
                        />
                        {touched.usermail && errors.usermail &&
                            <Text style={styles.warn}>{errors.username}</Text>
                        }
                        <Input
                            placeholder="E-Mail"
                            onChangeText={handleChange('usermail')}
                            value={values.usermail}
                            onBlur={() => setFieldTouched('usermail')}
                        />
                        {touched.usermail && errors.usermail &&
                            <Text style={styles.warn}>{errors.usermail}</Text>
                        }
                        <Input
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            isSecure={true}
                            onBlur={() => setFieldTouched('password')}
                        />
                        {touched.password && errors.password &&
                            <Text style={styles.warn}>{errors.password}</Text>
                        }

                        <View style={styles.buttonContainer}>
                            <Button testID="signin-button" title="Kayıt Ol" onPress={handleSubmit} disabled={isValid} />
                            <Button testID="signup-button" title="Giriş Yap" onPress={() => navigation.navigate("Login")} disabled={false} theme="secondary" />
                        </View>

                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Sign;




