import React from 'react';
import { StyleSheet, Text, View, StatusBar, NetInfo } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/config';
import Navigation from './screen/navigation';

export default class main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isConnected: true,
        }
    }

    componentDidMount() {
        const dispatchConnected = isConnected => this.setState({isConnected});
        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('change', dispatchConnected);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Navigation/>
                </Provider>
                {
                    !(this.state.isConnected) &&
                    <View style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 70,
                  height: 25,
                  width: 170,
                  backgroundColor: 'black',
                  opacity: 1,borderRadius:5
                }}>
                        <Text style={{margin: 5,fontSize: 13,color: 'white',fontWeight: '500', textAlign: 'center'}}>
                            No Internet connection
                        </Text>
                    </View>
                    ||
                    null
                }
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


