import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/config';
import navigationContext from './navigationHelper/customNavigationContext';
import Router from './navigationHelper/router'
import { NavigationProvider,StackNavigation } from '@expo/ex-navigation';
import * as Animatable from 'react-native-animatable';
import Navigation from './screen/navigation'
let isLogin = false;

export default class main extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Navigation/>
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


