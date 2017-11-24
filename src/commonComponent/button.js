import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Constant from '../helper/constant';

export default class Button extends Component {

    render() {
        return (
            <TouchableHighlight onPress={()=>this.props.onPress()}
                                style={[styles.btnLogin,{backgroundColor: this.props.backColor},
                                 (this.props.otherStyle) ? this.props.otherStyle: {}]}
                                underlayColor={ this.props.backColor }>
                <View>
                    <Text style={[styles.btnFont, {color: this.props.color}]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btnLogin:{
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'center',
        width: Constant.screenWidth - 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding:17,
        borderRadius: 35,
        paddingTop: 20,
        paddingBottom: 20,
    },
    btnFont:{
        fontSize: 17,
        fontFamily: Constant.font700,
    }
});