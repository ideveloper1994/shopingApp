import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard,
    TextInput,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import { showAlert } from '../../services/apiCall';

import {
    stateChanged,
    zoneChanged,
    branchChanged
} from '../../actions/agentRegistration';
import { isEmpty } from '../../helper/appHelper';

class AgentLocation extends Component {

    constructor(props){
        super(props);
        this.state = {
            stateName: '',
            zone: '',
            agentBranch: '',
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onNextButtonPress = () => {
        if(isEmpty(this.props.stateName) &&
            isEmpty(this.props.zone) &&
            isEmpty(this.props.agentBranch) ) {
            this.props.navigator.push('agentDocuments');
        }else{
            showAlert('Enter Data in all fields.');
        }

        // this.props.navigator.push('agentDocuments');
    };

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar title="Location Detail"
                               onBackButtonPress={this.onBackButtonPress}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>State</Text>
                        <TextInput  ref="txtState"
                                    value={this.props.stateName}
                                    placeholder={"State"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.focusNextField('txtZone')}
                                    onChangeText={(text) => {this.props.stateChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Zone</Text>
                        <TextInput  ref="txtZone"
                                    value={this.props.zone}
                                    placeholder={"Zone"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.zoneChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtBranch')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Branch</Text>
                        <TextInput  ref="txtBranch"
                                    value={this.props.agentBranch}
                                    placeholder={"Branch name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {this.props.branchChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <Button title="Next"
                            backColor={Constant.backColor}
                            color="#FFF"
                            otherStyle={{marginBottom:20}}
                            onPress={this.onNextButtonPress}/>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    outerView:{
        width: "90%",
        alignSelf: 'center',
        paddingTop: 20
    },
    formTextLabel:{
        color: 'gray',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 5,
    },
    textBox: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 0,
        height: 45,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
    }
});

const mapStateToProps = state => {
    return {
        stateName: state.agent.stateName,
        zone: state.agent.zone,
        agentBranch: state.agent.agentBranch,
    };
};

export default connect(mapStateToProps, {
    stateChanged,
    zoneChanged,
    branchChanged
})(AgentLocation);