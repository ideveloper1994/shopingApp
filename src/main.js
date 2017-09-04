import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/config';
import navigationContext from './navigationHelper/customNavigationContext';
import Router from './navigationHelper/router'
import { NavigationProvider,StackNavigation } from '@expo/ex-navigation';

export default class main extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
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
                        <View style={{position:'absolute', top: 20, right: 20, backgroundColor:'transparent'}}>
                            <Text style={{fontSize:17, fontWeight: '600',color:'#F00'}}>3434</Text>
                        </View>
                    </NavigationProvider>
                </Provider>
            </View>
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