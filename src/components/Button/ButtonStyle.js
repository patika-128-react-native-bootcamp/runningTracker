import { StyleSheet } from "react-native";
const base_style = StyleSheet.create({
    container: {
        padding: 10,
        width: "80%",
        marginTop: 10,
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        opacity: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,

    },
})
export default {
    primary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: "#3688FA",
        },
        title: {
            ...base_style.title,
            color: "white"
        },

    }),
    secondary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: "white",
            borderColor: "#3688FA",
            borderWidth: 2,

        },
        title: {
            ...base_style.title,
            color: "#3688FA"
        },

    })
}