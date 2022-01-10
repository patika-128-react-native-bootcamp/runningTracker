import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./ModalCardStyle"
import Modal from "react-native-modal";
import Button from "../Button";
import Share from "react-native-share"
import { captureRef } from "react-native-view-shot";

const ModalCard = ({ visible, onClose, onSend, viewRef, allData }) => {


    const fun = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: "png",
                quality: 0.7,
            })
            await Share.open({ url: uri })
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Modal
            style={styles.modal}
            isVisible={visible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            swipeDirection="down"
        >
            <View style={styles.container}>
                <Text style={{ color: "black" }}>Distance: {allData.distance} km</Text>
                <Text style={{ color: "black" }}>Speed: {allData.speed} km/h</Text>
                <Text style={{ color: "black" }}>Time: {allData.time}</Text>
                <Button title="Share" onPress={() => fun()} />
            </View>
        </Modal>
    )
};

export default ModalCard;