import React from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import styles from './InputStyle'

const Input = ({ placeholder, onChangeText, value, iconName, isSecure, onBlur }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={isSecure}
                onBlur={onBlur}
                placeholderTextColor={"rgba(54,136,250,0.3)"}
            />
        </SafeAreaView>
    );
};

export default Input;