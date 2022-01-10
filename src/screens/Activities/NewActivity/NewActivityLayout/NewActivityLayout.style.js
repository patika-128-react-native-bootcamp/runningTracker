import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'

    },
    time: {
        //backgroundColor: "red",
        //width: 40,
        color: "black",
        fontSize: 20
    },
    timerText: {
        fontSize: 20,
    },
    tinyLogo: {
        width: 50,
        height: 50
    },
    innerContainer: {
        marginTop: 5,
        flexDirection: "row"
    },
    title: {
        color: "black",
        fontSize: 20,
        marginHorizontal: 5
    },
    row: {
        flexDirection: "row",
        marginHorizontal: 5
    },
    barChart: {
        margin: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'coral',
    }

})