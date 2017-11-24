import {
    Dimensions,
    Platform
} from 'react-native';

module.exports = {

    screen: Dimensions.get('window'),
    screenHeight:  Dimensions.get('window').height,
    screenWidth:  Dimensions.get('window').width,

    IOS: Platform.OS === 'ios',
    ANDROID: Platform.OS === 'android',

    alertTitle: "Alert",
    appColor : 'rgb(29,98,169)',
    backColor: '#003e53', //003e53 //old Back 01536d
    lightTheamColor: '#709baa',
    transparent: 'transparent',

};