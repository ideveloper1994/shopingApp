import React from 'react';
import { StyleSheet, Text, View, StatusBar,AsyncStorage,Platform } from 'react-native';
import navigationContext from './../navigationHelper/customNavigationContext';
import Router from './../navigationHelper/router'
import { NavigationProvider,StackNavigation,NavigationStyles } from '@expo/ex-navigation';
import * as Animatable from 'react-native-animatable';
import Spinner from '../helper/loader'
import { connect } from 'react-redux';
import Constant from '../helper/constant';
import {
    loginUser,
    checkUpdate
} from '../actions/userAction';
var DeviceInfo = require('react-native-device-info');

let isLogin = 'login';

class AppNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isAppLoading:false,
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('user').then((value) => {
            if(value!=null) {
                let userDetail = JSON.parse(value);
                this.props.loginUser(userDetail.email.trim(), userDetail.password.trim())
                    .then(()=>{
                       // let version = DeviceInfo.getVersion();
                       //  let version = "1.1";

                        let os = "";
                        if(Platform.OS === 'ios'){
                            os = 'IOS'
                        } else {
                            os = 'ANDROID'
                        }
                        let uri = DeviceInfo.getVersion() + "/" + os + '/checkForUpdate';
                        debugger;
                        this.props.checkUpdate(uri).then(res => {
                            debugger
                            if(res)
                            {
                              if(Platform.OS === 'android') {
                                isLogin = 'update';
                              }else {
                                isLogin='welcome';
                              }
                            }
                            else
                                isLogin='welcome';
                            this.setState({isAppLoading:true});
                        }).catch(err => {
                            isLogin='welcome';
                            this.setState({isAppLoading:true});
                        });

                    })
                    .catch((err)=>{
                        debugger;
                        this.setState({isAppLoading:true});
                    });
            }else{
                debugger;
                this.setState({isAppLoading:true});
            }
        }).catch((err)=>{
            debugger;
            this.setState({isAppLoading:true});
        });
    }

    render() {
        return (
            <NavigationProvider router={Router} context={navigationContext}>
                <StatusBar
                    hidden={false}
                    barStyle="light-content"
                    backgroundColor={Constant.backColor}
                />
                {(this.state.isAppLoading) ?
                    <View style={styles.container}>
                        <StackNavigation initialRoute={Router.getRoute(isLogin)}
                                         defaultRouteConfig={{
                                             navigationBar: {
                                                 visible: false,
                                             },
                                             styles: {
                                                  ...NavigationStyles.SlideHorizontal}
                                         }}/>

                        <Animatable.View animation="zoomIn" iterationCount={'infinite'}
                                         alternate={true}
                                         style={{position:'absolute', top: 25, right: 20, backgroundColor:'transparent'}}>
                            <Text style={{fontSize:17, fontWeight: '600',color:'#FFF'}}>
                                {this.props.balance}
                            </Text>
                        </Animatable.View>
                    </View> :
                    <View style={styles.container}>
                    <Spinner visible={this.props.isLoading} />
                    </View>
                }
            </NavigationProvider>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003e53',

    },
});

const mapStateToProps = state => {
    return {
        balance: (state.user.userDetail.Balance) ? "Rs. " + state.user.userDetail.Balance.toString() :
            (state.user.userDetail.Balance == 0) ? 'Rs. 0' : '',
        password: state.user.password,
        isLoading: state.user.isLoading,
    };
};

export default connect(mapStateToProps, {
    loginUser,checkUpdate
})(AppNavigation);