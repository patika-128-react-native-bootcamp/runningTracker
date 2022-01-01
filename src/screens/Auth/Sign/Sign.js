import React from "react";
import { View, Text, Alert, Image } from "react-native";
import styles from "./Sign.style"
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useKeyboard } from "../../../hooks/KeyboardListen";



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

    const handleSign = async (formValues) => {
        try {
            await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.password)
            const update = {
                displayName: formValues.username,
            };
            //await auth().signInWithEmailAndPassword(formValues.usermail, formValues.password)
            await auth().currentUser.updateProfile(update);
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Alert",
                "Sign Up Failed"
            );
        }
    }

    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.image}
                source={require('../../assets/chat3.png')}
                resizeMode="contain"
            /> */}
            <Text style={[styles.header, isKeyBoardOpen ? { marginTop: 5 } : { marginTop: 50 }]}>Running Tracker</Text>
            <Formik
                initialValues={initialForm}
                onSubmit={values => handleSign(values)}
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