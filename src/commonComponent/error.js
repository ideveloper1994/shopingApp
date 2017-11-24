import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default  class Error extends Component {

    render() {
        return (
            <Text style={styles.titleText}>
                {"* " + this.props.errorMessage}
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    titleText:{
        fontSize: 13,
        color: '#F00',
        flex:1,
        fontWeight: '500',
        paddingTop: 10,
    },
});