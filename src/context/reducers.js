import AsyncStorage from '@react-native-async-storage/async-storage';

export default function (state, action) {
    switch (action.type) {
        case "SET_USER":
            AsyncStorage.setItem("@USER", JSON.stringify(action.payload))
            return { ...state, user: action.payload }
        default:
            return state;
    }
}