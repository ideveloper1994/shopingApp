import React from 'react';
import { StyleSheet, Text, View, StatusBar,AsyncStorage } from 'react-native';
import navigationContext from './../navigationHelper/customNavigationContext';
import Router from './../navigationHelper/router'
import { NavigationProvider,StackNavigation,NavigationStyles } from '@expo/ex-navigation';
import * as Animatable from 'react-native-animatable';
import Spinner from '../helper/loader'
import { connect } from 'react-redux';
let isLogin = 'login';
import Constant from '../helper/constant';
import {
    loginUser,
} from '../actions/userAction';

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
                        isLogin='welcome';
                        this.setState({isAppLoading:true});
                    })
                    .catch((err)=>{
                        this.setState({isAppLoading:true});
                    });
            }else{
                this.setState({isAppLoading:true});
            }
        }).catch((err)=>{
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
                    <View style={{flex:1}}>
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
                                {this.props.balance.toString()}
                            </Text>
                        </Animatable.View>
                    </View> :
                    <Spinner visible={this.props.isLoading} />
                }
            </NavigationProvider>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const mapStateToProps = state => {
    return {
        balance: (state.user.userDetail.Balance) ? state.user.userDetail.Balance : '',
        password: state.user.password,
        isLoading: state.user.isLoading,
    };
};

export default connect(mapStateToProps, {
    loginUser
})(AppNavigation);