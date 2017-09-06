import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import navigationContext from './../navigationHelper/customNavigationContext';
import Router from './../navigationHelper/router'
import { NavigationProvider,StackNavigation } from '@expo/ex-navigation';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

let isLogin = false;

class AppNavigation extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <NavigationProvider router={Router} context={navigationContext}>
                <StatusBar
                    hidden={false}
                    barStyle="light-content"
                />
                <StackNavigation initialRoute={Router.getRoute('login')}
                                 defaultRouteConfig={{
                                             navigationBar: {
                                                 visible: false,
                                             }
                                         }}/>

                <Animatable.View  animation="zoomIn" iterationCount={'infinite'}
                                  alternate={true}
                                  style={{position:'absolute', top: 25, right: 20, backgroundColor:'transparent'}}>
                    <Text style={{fontSize:17, fontWeight: '600',color:'#FFF'}}>
                        {this.props.balance}
                    </Text>
                </Animatable.View>

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

})(AppNavigation);