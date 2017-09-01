import {
    Dimensions,
    Platform
} from 'react-native';

module.exports = {

    screen: Dimensions.get('window'),
    screenHeight:  Dimensions.get('window').height,
    screenWidth:  Dimensions.get('window').width,

    isIOS: Platform.OS === 'ios',
    isANDROID: Platform.OS === 'android',

    alertTitle: "Alert",
    appColor : 'rgb(29,98,169)',
    backColor: '#003e53', //003e53 //old Back 01536d
    lightTheamColor: '#709baa',
    transparent: 'transparent',
    lightBlueColor: '#05c3f9',
    orangeProgressBarColor: '#f26747',
    blueProgressBarColor: '#5bc4bd',
    orangeColor: '#fbb043',
    greenColor: '#77e26d',
    transparentBackColor: '#1b657c',
    verColor:'#55c1bc',
    darkVerColor:'#147585',
    darkVerOrange:'#b48578',
    verOrangeColor:'#f46b46',
    backColor2: 'rgb(26,100,125)',
    activeColor:'rgb(37,215,76)',
    backProgressBarColor: '#01536d',
    grayBackground: 'rgb(239,239,244)',

};