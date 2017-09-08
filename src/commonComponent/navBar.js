import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import Constant from '../helper/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default  class NavigationBar extends Component {

    render() {
        return (
            <View style={styles.mainView}>
                <TouchableHighlight onPress={ () => this.props.onBackButtonPress() }
                                    underlayColor={Constant.transparent}>
                    <View style={ styles.backIcon }>
                        <Ionicons name='ios-arrow-back'
                                  size={35}
                                  color="rgba(255,255,255,0.8)"/>
                    </View>
                </TouchableHighlight>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <Text style={[styles.textTitle, {color: Constant.transparent}]}>{"Save"}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: Constant.backColor,
        flexDirection:'row',
        alignItems: 'center',
        height: 64,
        paddingTop: (Constant.IOS) ? 15 : 0,
    },
    backIcon:{
        paddingLeft:10,
        paddingRight: 40,
        paddingTop:5,
        paddingBottom:5
    },
    titleText:{
        alignSelf: 'center',
        fontSize: 15,
        color: '#FFF',
        textAlign: 'center',
        flex:1,
        fontWeight: '700'
    },
    textTitle:{
        padding:10,
        color: 'rgba(255,255,255,0.9)',
        textAlign:'right',
        fontSize: 15,
        fontWeight: '700'
    }
});