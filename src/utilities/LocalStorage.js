import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log('saving error')
        console.log(e)
    }
}

export const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
        if (jsonValue === null) {
            console.log('I AM NULL')
            return []
        } else {
            console.log('I AM SOME VAL')
            return JSON.parse(jsonValue)
        }
    } catch (e) {
        console.log('reading error')
        console.log(e)
    }
}
