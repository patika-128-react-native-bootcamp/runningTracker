import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './ButtonStyle'

const Button = ({ title, onPress, loading, theme = "primary" }) => {
    return (
        <TouchableOpacity style={styles[theme].container} onPress={onPress} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={styles[theme].title}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;