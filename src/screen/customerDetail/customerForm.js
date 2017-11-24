import React, {Component} from "react";
import {StyleSheet, Text,TouchableHighlight,Image,Picker, Alert, AsyncStorage, View, Keyboard, TextInput, ScrollView} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../commonComponent/navBar";
import Constant from "../../helper/constant";
import Button from "../../commonComponent/button";
import ErrorView from "../../commonComponent/error";
import { showAlert } from '../../services/apiCall';
import {
    fnameChanged,
    lnameChanged,
    mobileChanged,
    emailChanged,
    passwordChanged,
    usernameChanged,
    agentBirthDate,
    getBalance,
    getAllStates,
    getAllZones,
    getAllBranches,
    stateChanged,
    branchChanged,
    zoneChanged,
    getAgencies,
    genderChanged,
    addressChanged,
    registerAgency,
    addCustomer,
    getCustomer
} from "../../actions/agentRegistration";
import {emailValidate, phoneValidate, } from "../../actions/userAction";
import DatePicker from "../../helper/datepicker";
import moment from "moment";
import { isEmpty, isValidEmail, isOnlyAlphabets, isValidMobileNo } from '../../helper/appHelper';
import _ from 'lodash';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
];
class AgencyForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedDate: '',
            isValidEmail: true,
            isValidPhoneNo: true,
            emailError: '',
            mobileError: '',
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
            branchList: [],
            gender:'',
            address:'',
            value: 0,
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
                    console.log('all zone-->',res)
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
        this.props.getCustomer().then(res => {console.log('all customer---',res)}).catch(err => {})
    }

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
                console.log('state--',zoneList)
                this.props.stateChanged(state);
                this.setState({selectedOptionState: state.name, zoneList: zoneList,
                    selectedOptionZone: '--Select Zone--',
                    selectedOptionBranch: '--Select Branch--'});
                this.setState({branchList: []});
                // if(Constant.IOS){
                //     this.setSelectedBranch({});
                // }else{

                    this.setSelectedZone(src);
                //}
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
        }else {
            this.setState({
                selectedOptionZone: 'zone not available',
                selectedOptionBranch: 'branch not available'
            });
        }
    };

    setSelectedBranch = (zoneId) => {
        let branchList =  _.filter(this.props.agentBranch, {zoneId: zoneId});
        this.setState({branchList: branchList});
        if(branchList.length > 0){
            this.props.branchChanged(branchList[0]);
        }else {
            this.setState({
                selectedOptionBranch: 'branch not available'
            });
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


    onNextButtonPress = () => {

        // if(isEmpty(this.props.firstName) &&
        //     isEmpty(this.props.lastName) &&
        //     isEmpty(this.props.mobileNo) &&
        //     isEmpty(this.props.email) &&
        //     isEmpty(this.props.password) ) {
        //     if(this.state.isValidPhoneNo && this.state.isValidEmail){
        //         if(!isOnlyAlphabets(this.props.firstName) || !isOnlyAlphabets(this.props.lastName)) {
        //             showAlert('Enter valid name');
        //         }else{
        //             this.props.navigator.push('agentLocation');
        //         }
        //     }else{
        //         showAlert('Enter Data in all fields.');
        //     }
        // }else{
        //     showAlert('Enter Data in all fields.');
        // }
    //     this.props.addCustomer().then((response) => {
    //         debugger
    //         this.setState({
    //             isLoading: false
    //         })
    //
    //         this.props.navigator.push('customerDetail');
    //     }).catch((err) => {
    //         debugger
    //         this.setState({
    //             isLoading: false
    //         })
    // })
        if(isEmpty(this.props.firstName) &&
            isEmpty(this.props.lastName) &&
            isEmpty(this.props.mobileNo) &&
            isEmpty(this.props.email) &&
            isEmpty(this.props.password) &&
            isEmpty(this.props.birthDate) &&
            isEmpty(this.props.address)
        ){
            if(Object.keys(this.props.selectedState).length == 0 ||
            Object.keys(this.props.selectedBranch).length == 0 ||
            Object.keys(this.props.selectedZone).length == 0){
                console.log('Please select location detail.');
            }else{
                console.log('called.....');
                    this.props.addCustomer().then((response) => {
                        debugger
                        this.setState({
                            isLoading: false
                        })

                        this.props.navigator.push('customerDetail');
                    }).catch((err) => {
                        debugger
                        this.setState({
                            isLoading: false
                        })
                })
            }
        }
        else{
            debugger
            showAlert('Please Fill all Details');
        }


    }



    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };


    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onPhoneNoValid = () => {
        if(isEmpty(this.props.mobileNo)) {
            if(isValidMobileNo(this.props.mobileNo)){
                this.props.phoneValidate(this.props.mobileNo.trim()).then(res => {
                    this.setState({isValidPhoneNo: true, mobileError: ''});
                }).catch(err => {
                    this.setState({isValidPhoneNo: false, mobileError: "Mobile number already exists"});
                });
            }else{
                this.setState({isValidPhoneNo: false, mobileError: "Enter valid phone number"});
            }
        }else{
            this.setState({isValidPhoneNo: false, mobileError: "Enter valid phone number"});
        }
    };

    onEmailValid = () => {
        if(isValidEmail(this.props.email)){
            this.props.emailValidate(this.props.email.trim()).then(res => {
                this.setState({isValidEmail: true, emailError: ''});
            }).catch(err => {
                this.setState({isValidEmail: false, emailError: 'Email already exists'});
            });
        }else{
            this.setState({isValidEmail: false, emailError: 'Enter valid Email Address'});
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
                <NavigationBar title="Personal Detail" onBackButtonPress={this.onBackButtonPress}/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>First Name</Text>
                        </View>
                        <TextInput  ref="txtFname"
                                    value={this.props.firstName}
                                    placeholder={"First Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.fnameChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtLname')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Last Name</Text>
                        </View>
                        <TextInput  ref="txtLname"
                                    value={this.props.lastName}
                                    placeholder={"Last Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.lnameChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtEmail')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Email Id</Text>
                        </View>

                        <TextInput  ref="txtEmail"
                                    keyboardType={'email-address'}
                                    value={this.props.email}
                                    placeholder={"Email"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.emailChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtPhone')}
                                    underlineColorAndroid={Constant.transparent}
                                    onEndEditing={(text) => this.onEmailValid(text)}
                        />
                        {
                            (!this.state.isValidEmail)?
                                <ErrorView errorMessage={this.state.emailError}/>
                                :null
                        }

                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Mobile No</Text>
                        </View>

                        <TextInput  ref="txtPhone"
                                    keyboardType={'numeric'}
                                    value={this.props.mobileNo}
                                    placeholder={"Mobile No."}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    maxLength={10}
                                    onChangeText={(text) => {this.props.mobileChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}
                                    onEndEditing={(text) => this.onPhoneNoValid(text)}
                                    onSubmitEditing={() => this.focusNextField('txtPassword')}

                        />
                        {
                            (!this.state.isValidPhoneNo)?
                                <ErrorView errorMessage={this.state.mobileError}/>
                                :null
                        }

                    </View>
                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Password</Text>
                        </View>
                        <TextInput  ref="txtPassword"
                                    value={this.props.password}
                                    placeholder={"Password"}
                                    style={ styles.textBox }
                                    secureTextEntry={true}
                                    returnKeyType={'next'}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.focusNextField('txtAddress')}
                                    onChangeText={(text) => {this.props.passwordChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}/>
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Address</Text>
                        </View>
                        <TextInput  ref="txtAddress"
                                    value={this.props.address}
                                    placeholder={"Address"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    returnKeyType={'next'}
                                    autoCorrect={false}
                                    onChangeText={(text) => {this.props.addressChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Birth Date</Text>
                        </View>
                        <DatePicker
                            style={{
                                width: '100%',
                                paddingBottom: 0,
                                height: 45,
                                paddingLeft: 10,
                                borderWidth: 0.5,
                                borderColor: 'gray',
                                borderRadius: 5}}
                            date={this.props.birthDate}
                            mode='date'
                            maxDate={moment().format("DD MMM YYYY")}
                            placeholder='Select Date'
                            format='YYYY-MM-DD'
                            iconSource={require('../../assets/images/expandArrow.png')}
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            onDateChange={(date) => {
                                this.props.agentBirthDate(date)
                            }}
                        />
                    </View>



                    <View style={{flexDirection:'row', width: "90%",alignSelf: 'center', paddingTop: 20,paddingBottom:5}}>
                        <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                        <Text style={styles.formTextLabel}>Gender</Text>
                            <RadioForm
                                formHorizontal={true}
                                animation={true}

                            >
                                {radio_props.map((obj, i) => {
                                    return(
                                        <RadioButton labelHorizontal={true} key={i} >
                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                onPress={(value) => {this.setState({value:value});this.props.genderChanged(obj.label)}}
                                                isSelected={this.state.value === i}
                                                borderWidth={1}
                                                buttonInnerColor={'rgb(0,61,82)'}
                                                buttonOuterColor={'#000'}
                                                buttonSize={7}
                                                buttonOuterSize={15}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{marginLeft: 20,marginTop:5}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                onPress={(value) => {this.setState({value:value})}}
                                                labelHorizontal={true}
                                                labelStyle={{fontSize: 15, color: 'rgb(0,61,82)'}}
                                                labelWrapStyle={{marginTop:5}}
                                            />
                                        </RadioButton>)
                                })}

                            </RadioForm>

                    </View>



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

                    <Button title="Add"
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
        firstName: state.agent.firstName,
        lastName: state.agent.lastName,
        mobileNo: state.agent.mobileNo,
        email: state.agent.email,
        password: state.agent.password,
        birthDate: state.agent.birthDate,
        stateName: state.agent.stateName,
        agentBranch: state.agent.agentBranch,
        selectedState: state.agent.selectedState,
        selectedBranch: state.agent.selectedBranch,
        selectedZone: state.agent.selectedZone,
        gender:state.agent.gender,
        address:state.agent.address,
        zone: state.agent.zone,
    };
};

export default connect(mapStateToProps, {
    fnameChanged,
    lnameChanged,
    mobileChanged,
    emailChanged,
    passwordChanged,
    usernameChanged,
    agentBirthDate,
    getAgencies,
    emailValidate,
    phoneValidate,
    getBalance,
    getAllStates,
    getAllZones,
    getAllBranches,
    stateChanged,
    branchChanged,
    zoneChanged,
    addressChanged,
    genderChanged,
    registerAgency,
    addCustomer,
    getCustomer
})(AgencyForm);