/**
 * Created by Developer49 on 19/07/17.
 */
import { Alert } from 'react-native';

export function showAlert(alertText) {
    Alert.alert("Demo APP",
    alertText,
        [   {text: 'OK', onPress: () => console.log('OK Pressed')} ],
        { cancelable: false }
)}