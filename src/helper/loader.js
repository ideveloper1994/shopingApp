
import React, { Component } from 'react';
import { ActivityIndicator,
    View, Image, StatusBar }
    from 'react-native';
import Constant from '../helper/constant'

export default class Loader extends Component{

    render(){
        return( (this.props.visible) ?
                <View style={{ position:'absolute', backgroundColor: Constant.backColor,
                    height: Constant.screenHeight, width:Constant.screenWidth,
                    alignItems:'center', justifyContent:'center'}}>
                    <StatusBar
                        hidden={false}
                        barStyle="light-content"
                    />
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color={'#FFF'}
                    />
                </View>
                : null
        );
    }
}

