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
import _ from 'lodash';

import {
    getAllStates,
    getAllZones,
    getAllBranches,
    stateChanged,
    branchChanged,
    zoneChanged,
  getBalance,getAgencies
} from '../../actions/agentRegistration';
import { isEmpty } from '../../helper/appHelper';

class AgentLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateName: '',
            zone: '',
            agentBranch: '',
            selectedOptionState: '--Select State--',
            selectedOptionZone: "--Select Zone--",
            selectedOptionBranch: "--Select Branch--",
            views: [],
            opened: false,
            selectedField: 'state',
            selectedStateId: '',
            selectedZoneId: '',
            selectedBranchId: '',
            zoneList: [],
            branchList: []
        };
    }

    componentWillMount(){
        if(Constant.IOS) {
            this.props.getAllStates();
            this.props.getAllZones();
            this.props.getAllBranches();
        }else {
            this.props.getAllStates().then(res => {
                if (!Constant.IOS) {
                    if (this.props.stateName.length > 0) {
                        this.props.stateChanged(this.props.stateName[0]);
                    }
                }
                this.props.getAllZones().then(res => {
                    if (!Constant.IOS) {
                        this.setSelectedZone(this.props.selectedState._id || 0);
                    }
                    this.props.getAllBranches().then(res => {
                        if (!Constant.IOS) {
                            this.setSelectedBranch(this.props.selectedZone._id || 0);
                        }
                    });
                });
            });
        }
    }
  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()));
    this.props.getAgencies().then(res => {}).catch(err => {})

  }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onNextButtonPress = () => {
        if(Object.keys(this.props.selectedState).length == 0 ||
            Object.keys(this.props.selectedBranch).length == 0 ||
            Object.keys(this.props.selectedZone).length == 0) {
            showAlert('Please select location detail.');
        }else{
            this.props.navigator.push('agentDocuments');
        }
        // if(isEmpty(this.props.stateName) &&
        //     isEmpty(this.props.zone) &&
        //     isEmpty(this.props.agentBranch) ) {
        //     this.props.navigator.push('agentDocuments');
        // }else{
        //     showAlert('Enter Data in all fields.');
        // }
        // this.props.navigator.push('agentDocuments');
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

    onSelectOption = (src, type) => {
        switch (type) {
            case 'state':
                let state = _.find(this.props.stateName, {_id: src});
                let zoneList =  _.filter(this.props.zone, {stateId: src});
                this.props.stateChanged(state);
                this.setState({selectedOptionState: state.name, zoneList: zoneList,
                    selectedOptionZone: '--Select Zone--',
                    selectedOptionBranch: '--Select Branch--'});
                this.setState({branchList: []});
                if(Constant.IOS){
                    this.setSelectedBranch({});
                }else{

                    this.setSelectedZone(src);
                }
                break;
            case 'zone':
                let zone = _.find(this.props.zone, {_id: src});
                this.props.zoneChanged(zone);
                let branchList =  _.filter(this.props.agentBranch, {zoneId: src});
                this.setState({selectedOptionZone: zone.name, branchList: branchList, selectedOptionBranch: '--Select Branch--'});
                this.setSelectedBranch(src);
                break;
            case 'branch':
                let branch = _.find(this.props.agentBranch, {_id: src});
                this.props.branchChanged(branch);
                this.setState({selectedOptionBranch: branch.name});
                break;
        }
    };

    setSelectedZone = (stateId) => {
        let zoneList =  _.filter(this.props.zone, {stateId: stateId});
        this.setState({zoneList: zoneList});
        if(zoneList.length > 0){
            this.props.zoneChanged(zoneList[0]);
            this.props.branchChanged({});
        }
    };

    setSelectedBranch = (zoneId) => {
        let branchList =  _.filter(this.props.agentBranch, {zoneId: zoneId});
        this.setState({branchList: branchList});
        if(branchList.length > 0){
            this.props.branchChanged(branchList[0]);
        }
    };

    renderPicker = () => {
        switch (this.state.selectedField) {
            case 'state':
                return(
                    <Picker style={{marginBottom: 0}} mode={Picker.MODE_DIALOG}
                            selectedValue={this.props.selectedState._id || ''}
                            onValueChange={(src)=>this.onSelectOption(src,'state')}>
                        {
                            this.props.stateName.map(function (item, index) {
                                return <Picker.Item key={item._id}
                                                    label={item.name}
                                                    value={item._id}/>
                            })
                        }
                    </Picker>
                );
            case 'zone':
                return(
                    <Picker style={{marginBottom: 0}}
                            mode={Picker.MODE_DIALOG}
                            selectedValue={this.props.selectedZone._id || ''}
                            onValueChange={(src)=>this.onSelectOption(src,'zone')}>
                        {
                            this.state.zoneList.map(function (src, index) {
                                return <Picker.Item key={src._id}
                                                    label={src.name}
                                                    value={src._id}/>
                            })
                        }
                    </Picker>
                );
            case 'branch':
                return(
                    <Picker style={{marginBottom: 0}}
                            mode={Picker.MODE_DIALOG}
                            selectedValue={this.props.selectedBranch._id || ''}
                            onValueChange={(src)=>this.onSelectOption(src,'branch')}>
                        {
                            this.state.branchList.map(function (src, index) {
                                return <Picker.Item key={src._id}
                                                    label={src.name}
                                                    value={src._id}/>
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
                            <View>
                                <View style={{flexDirection:'row', paddingLeft:'5%', marginTop: 15}}>
                                    <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                                    <Text style={{flex: 1, fontSize:15}}>
                                        Select State
                                    </Text>
                                </View>
                                <View style={{backgroundColor: 'white',
                            borderWidth: 0.5,borderColor:'gray',
                            width: '90%', alignSelf:'center', margin:5, borderRadius: 5,
                            height: 45, justifyContent: 'center' }}>
                                    <Picker mode={Picker.MODE_DROPDOWN}
                                            selectedValue={this.props.selectedState._id || ''}
                                            onValueChange={(src)=>this.onSelectOption(src,'state')}
                                            underlineColorAndroid={Constant.transparent}
                                            style={{height:30}}>
                                        {
                                            this.props.stateName.map(function (src, index) {
                                                return <Picker.Item label={src.name} value={src._id}/>
                                            })
                                        }
                                    </Picker>
                                </View></View>
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

                            <View>
                                <View style={{flexDirection:'row', paddingLeft:'5%', marginTop: 15}}>
                                    <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                                    <Text style={{flex: 1, fontSize:15}}>
                                        Select Zone
                                    </Text>
                                </View>

                                <View style={{backgroundColor: 'white',
                            borderWidth: 0.5,borderColor:'gray',
                            width: '90%', alignSelf:'center', margin:5, borderRadius: 5,
                            height: 45, justifyContent: 'center' }}>
                                    <Picker mode={Picker.MODE_DROPDOWN}
                                            selectedValue={this.props.selectedZone._id || ''}
                                            onValueChange={(src)=>this.onSelectOption(src,'zone')}
                                            underlineColorAndroid={Constant.transparent}
                                            style={{height:30}}>
                                        {
                                            this.state.zoneList.map(function (src, index) {
                                                return <Picker.Item label={src.name}
                                                                    value={src._id}/>
                                            })
                                        }
                                    </Picker>
                                </View>
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
                            <View>
                                <View style={{flexDirection:'row', paddingLeft:'5%', marginTop: 15}}>
                                    <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                                    <Text style={{flex: 1, fontSize:15}}>
                                        Select Branch
                                    </Text>
                                </View>

                                <View style={{backgroundColor: 'white',
                            borderWidth: 0.5,borderColor:'gray',
                            width: '90%', alignSelf:'center', margin:5, borderRadius: 5,
                            height: 45, justifyContent: 'center' }}>
                                    <Picker mode={Picker.MODE_DROPDOWN}
                                            selectedValue={this.props.selectedBranch._id || ''}
                                            onValueChange={(src)=>this.onSelectOption(src,'branch')}
                                            underlineColorAndroid={Constant.transparent}
                                            style={{height:30}}>
                                        {
                                            this.state.branchList.map(function (src, index) {
                                                return <Picker.Item label={src.name} value={src._id}/>
                                            })
                                        }
                                    </Picker>
                                </View></View>
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
        selectedState: state.agent.selectedState,
        selectedBranch: state.agent.selectedBranch,
        selectedZone: state.agent.selectedZone
    };
};

export default connect(mapStateToProps, {
    getAllStates, getAllZones, getAllBranches,
    stateChanged,
    branchChanged,
    zoneChanged,
  getBalance,getAgencies
})(AgentLocation);