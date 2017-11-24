import React, { Component } from 'react';
import {
    Dimensions,
    Platform,  StyleSheet
} from 'react-native';

const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;

const isIOS = (Platform.OS === 'ios');

const isAndroid = (Platform.OS === 'android');

// 375

const XSMALL_FONT = (11*width)/375;

const SMALL_FONT = (12*width)/375;

const NORMAL_FONT = (15*width)/375;

const MEDIUM_FONT = (16*width)/375;

const TITLE_FONT = (20*width)/375;

const LARGE_FONT = (25*width)/375;

const XLARGE_FONT = (30*width)/375;


module.exports = {

    XLARGE  :   XLARGE_FONT ,
    LARGE   :   LARGE_FONT ,
    TITLE   :   TITLE_FONT ,
    MEDIUM  :   MEDIUM_FONT ,
    NORMAL  :   NORMAL_FONT,
    SMALL   :   SMALL_FONT,
    XSMALL  :   XSMALL_FONT,
};