import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: "bold"
    },
    titleContainer: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 120,
        paddingRight: 25,
        borderBottomWidth: 1,
        marginBottom: 10
    }
})