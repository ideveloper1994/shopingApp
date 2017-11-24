import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import Constant from '../helper/constant';

export default  class NavigationBar extends Component {

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: Constant.backColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        paddingTop: (Constant.IOS) ? 15 : 0,
    },
    titleText:{
        fontSize: 15,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },
});