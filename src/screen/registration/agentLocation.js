import React, { Component } from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    Alert,
    AsyncStorage,
    View, Image,
    Keyboard,
    TextInput, Picker,
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
            stateList: ["Gujarat", "Karnataka","Rajasthan", "Kerala", "Delhi"],
            selectedOptionState: "Gujarat",
            zoneList: ["Zone 1", "Zone 2","Zone 3", "Zone 4", "Zone 5"],
            selectedOptionZone: "Zone",
            branchList: ["branch 1", "branch 2","branch 3", "branch 4", "branch 5"],
            selectedOptionBranch: "Branch",
            views: [],
            opened: false,
            selectedField: 'state'
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onNextButtonPress = () => {
        // if(isEmpty(this.props.stateName) &&
        //     isEmpty(this.props.zone) &&
        //     isEmpty(this.props.agentBranch) ) {
        //     this.props.navigator.push('agentDocuments');
        // }else{
        //     showAlert('Enter Data in all fields.');
        // }

        this.props.navigator.push('agentDocuments');
    };


    onPressSelectSource = (selectedType) => {
        if (this.state.opened) {
            this.setState({opened: false, selectedField: selectedType});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }else{
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true, selectedField: selectedType});
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    onSelectOption = (src) => {
        switch (this.state.selectedField){
            case 'state':
                this.props.stateChanged(src);
                this.setState({selectedOptionState: src});
                break;
            case 'zone':
                this.props.zoneChanged(src);
                this.setState({selectedOptionZone: src});
                break;
            case 'branch':
                this.props.branchChanged(src);
                this.setState({selectedOptionBranch: src});
                break;
        }

    };


    renderPicker = () => {
        switch (this.state.selectedField){
            case 'state':
                return(
                    <Picker style={{marginBottom: 0}} mode={Picker.MODE_DIALOG}
                            selectedValue={this.state.selectedOptionState}
                            onValueChange={this.onSelectOption}>
                        {
                            this.state.stateList.map(function (src, index) {
                                return <Picker.Item key={index}
                                                    label={src.toString()} value={src.toString()}/>
                            })
                        }
                    </Picker>
                );
            case 'zone':
                return(
                    <Picker style={{marginBottom: 0}} mode={Picker.MODE_DIALOG}
                            selectedValue={this.state.selectedOptionZone}
                            onValueChange={this.onSelectOption}>
                        {
                            this.state.zoneList.map(function (src, index) {
                                return <Picker.Item key={index}
                                                    label={src.toString()} value={src.toString()}/>
                            })
                        }
                    </Picker>
                );
            case 'branch':
                return(
                    <Picker style={{marginBottom: 0}} mode={Picker.MODE_DIALOG}
                            selectedValue={this.state.selectedOptionBranch}
                            onValueChange={this.onSelectOption}>
                        {
                            this.state.branchList.map(function (src, index) {
                                return <Picker.Item key={index}
                                                    label={src.toString()} value={src.toString()}/>
                            })
                        }
                    </Picker>
                );
        }
    };

    render() {
        if(Constant.IOS) {
            views = this.state.views.map((view, i) =>
                <View key={i} style={{ flex:1,
                    flexDirection:'column',
                    marginBottom:10,
                    justifyContent: 'flex-end',
                }}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{height: 0.8, backgroundColor:'rgb(230,230,230)'}}>
                        </View>
                        <View style={{width:Constant.screenWidth, backgroundColor:'#FFF',
                            height: 40}}>
                            <TouchableHighlight style={{
                                flex: 1,padding: 5,justifyContent:'center', alignItems:'center'
                            }}
                                                onPress={this.onPressRemoveView}
                                                underlayColor='transparent'>
                                <Text>Done</Text>
                            </TouchableHighlight>

                        </View>
                        <View style={{height: 0.8, backgroundColor:'rgb(230,230,230)'}}>
                        </View>
                    </View>
                    <View>
                        {this.renderPicker()}
                    </View>
                </View>
            )}

        return (
            <View style={{flex:1}}>
                <NavigationBar title="Location Detail" onBackButtonPress={this.onBackButtonPress}/>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View>
                        {(Constant.IOS)?
                            <TouchableHighlight style={{flex: 1,borderColor: 'gray',
                                borderWidth: 0.5,backgroundColor:'white',
                                height:45, borderRadius: 5,
                                flexDirection: 'row', width:'90%', alignSelf:'center', marginTop:10, marginBottom: 10}}
                                                elevation={3}
                                                onPress={()=>this.onPressSelectSource('state')}
                                                underlayColor='transparent'>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:"center"}}>
                                    <Text style={{flex: 1, paddingLeft:10}}>
                                        {this.state.selectedOptionState}
                                    </Text>
                                    <View style={{height: 30, width: 23, backgroundColor: 'white'}}>
                                        <Image style = {{height: 10, width: 10, marginLeft:7,marginTop: 7,
                                            backgroundColor: 'white',tintColor: 'gray'}}
                                               source={require('../../assets/images/expandArrow.png')}>
                                        </Image>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            :

                            <View style={{backgroundColor: 'white',borderWidth: 0.5,borderColor:'gray'}} elevation={3}>
                                <Picker mode={Picker.MODE_DROPDOWN}
                                        selectedValue={this.state.selectedOptionState}
                                        onValueChange={this.onSelectOption}
                                        style={{height:30}}>
                                    {
                                        this.state.stateList.map(function (src, index) {
                                            return <Picker.Item label={src.toString()} value={src.toString()}/>
                                        })
                                    }
                                </Picker>
                            </View>
                        }
                    </View>

                    <View>
                        {(Constant.IOS)?
                            <TouchableHighlight style={{flex: 1,borderColor: 'gray',
                                borderWidth: 0.5,backgroundColor:'white',
                                height:45, borderRadius: 5,
                                flexDirection: 'row', width:'90%', alignSelf:'center', marginTop:10, marginBottom: 10}}
                                                elevation={3}
                                                onPress={()=>this.onPressSelectSource('zone')}
                                                underlayColor='transparent'>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:"center"}}>
                                    <Text style={{flex: 1, paddingLeft:10}}>
                                        {this.state.selectedOptionZone}
                                    </Text>
                                    <View style={{height: 30, width: 23, backgroundColor: 'white'}}>
                                        <Image style = {{height: 10, width: 10, marginLeft:7,marginTop: 7,
                                            backgroundColor: 'white',tintColor: 'gray'}}
                                               source={require('../../assets/images/expandArrow.png')}>
                                        </Image>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            :

                            <View style={{backgroundColor: 'white',borderWidth: 0.5,borderColor:'gray'}} elevation={3}>
                                <Picker mode={Picker.MODE_DROPDOWN}
                                        selectedValue={this.state.selectedOptionZone}
                                        onValueChange={this.onSelectOption}
                                        style={{height:30}}>
                                    {
                                        this.state.zoneList.map(function (src, index) {
                                            return <Picker.Item label={src.toString()} value={src.toString()}/>
                                        })
                                    }
                                </Picker>
                            </View>
                        }
                    </View>

                    <View>
                        {(Constant.IOS)?
                            <TouchableHighlight style={{flex: 1,borderColor: 'gray',
                                borderWidth: 0.5,backgroundColor:'white',
                                height:45, borderRadius: 5,
                                flexDirection: 'row', width:'90%', alignSelf:'center', marginTop:10, marginBottom: 10}}
                                                elevation={3}
                                                onPress={()=>this.onPressSelectSource('branch')}
                                                underlayColor='transparent'>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:"center"}}>
                                    <Text style={{flex: 1, paddingLeft:10}}>
                                        {this.state.selectedOptionBranch}
                                    </Text>
                                    <View style={{height: 30, width: 23, backgroundColor: 'white'}}>
                                        <Image style = {{height: 10, width: 10, marginLeft:7,marginTop: 7,
                                            backgroundColor: 'white',tintColor: 'gray'}}
                                               source={require('../../assets/images/expandArrow.png')}>
                                        </Image>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            :

                            <View style={{backgroundColor: 'white',borderWidth: 0.5,borderColor:'gray'}} elevation={3}>
                                <Picker mode={Picker.MODE_DROPDOWN}
                                        selectedValue={this.state.selectedOptionBranch}
                                        onValueChange={this.onSelectOption}
                                        style={{height:30}}>
                                    {
                                        this.state.branchList.map(function (src, index) {
                                            return <Picker.Item label={src.toString()} value={src.toString()}/>
                                        })
                                    }
                                </Picker>
                            </View>
                        }
                    </View>

                    <Button title="Next"
                            backColor={Constant.backColor}
                            color="#FFF"
                            otherStyle={{marginBottom:20}}
                            onPress={this.onNextButtonPress}/>

                </ScrollView>

                {(Constant.IOS)?
                    <View style={{flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        position: 'absolute',
                        marginTop:(Constant.IOS) ? Constant.screenHeight-230 : Constant.screenHeight-130,
                        backgroundColor: 'white'}}>
                        {views}
                    </View>
                    :
                    <View/>
                }
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