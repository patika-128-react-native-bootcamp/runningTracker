import React from "react";
import { View, Text, Alert, Image } from "react-native";
import styles from "./Login.style"
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useKeyboard } from "../../../hooks/KeyboardListen";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {
    const isKeyBoardOpen = useKeyboard();
    const dispatch = useDispatch();
    const initialForm = {
        usermail: "",
        password: ""
    };

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, 'Too Short!')
            .required('Required'),
        usermail: Yup.string().email('Invalid email').required('Required'),
    });

    const handleLogin = async (formValues) => {
        try {
            await auth().signInWithEmailAndPassword(formValues.usermail, formValues.password)
            dispatch({ type: "SET_USER", payload: true });
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Alert",
                "Sign In Failed"
            );
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={[styles.image, isKeyBoardOpen ? { marginTop: 5 } : { marginTop: 25 }]}
                source={require('../../../assets/running.png')}
                resizeMode="contain"
            />
            <Formik
                initialValues={initialForm}
                onSubmit={values => handleLogin(values)}
                validationSchema={SignupSchema}
            >
                {({ handleSubmit, values, handleChange, errors, touched, isValid, setFieldTouched }) => (
                    <View>
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
                            <Button testID="signin-button" title="Giriş Yap" onPress={handleSubmit} disabled={isValid} />
                            <Button testID="signup-button" title="Kayıt Ol" onPress={() => navigation.navigate("Sign")} disabled={false} theme="secondary" />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login;





// const signIn = () => {
//     auth()
//         .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
//         .then((res) => {
//             //console.log(res);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }
// const signOut = () => {
//     auth()
//         .signOut()
//         .then((res) => {
//             //console.log(res);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// };