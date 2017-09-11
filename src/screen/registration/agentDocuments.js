import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    Image,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';

import {
    agentAddressProofType,
    agentImages
} from '../../actions/agentRegistration';

let ImagePicker = require('react-native-image-picker');
import { showAlert } from '../../services/apiCall';

console.disableYellowBox = true;
class AgentDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            pancardSrc: '',
            addressSrc: '',
            profileSrc: '',
            arrList: ["Aadhar card", "Voting card","Driving licence", "Ration card", "Electricity bill"],
            opened: false,
            views: [],
            addressImage: null,
            pancardImage: null,
            profileImage: null,
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onNextButtonPress = () => {
        // console.log(this.state);

        if(this.state.addressImage != null && this.state.pancardImage != null){
            this.props.agentImages({
                addressImage: this.state.addressImage,
                pancardImage: this.state.pancardImage,
                profileImage: this.state.profileImage,
            });
            this.props.navigator.push('agentBankDetail');
        }else{
            showAlert('Please upload your documents');
        }

    };

    onSelectImage = (type) => {
        let options = {
            quality: 0.2,
            noData: true,
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                switch (type) {
                    case 'panCard' :
                        this.setState({
                            pancardSrc: source,
                            pancardImage: response
                        });
                        break;
                    case 'addressProof' :
                        this.setState({
                            addressSrc: source,
                            addressImage: response
                        });
                        break;
                    case 'profile' :
                        this.setState({
                            profileSrc: source,
                            profileImage: response
                        });
                        break;
                }
            }
        });
    };


    onPressSelectSource = () => {
        if (this.state.opened == false) {
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
        }else{
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
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
                        <Picker style={{marginBottom: 0}} mode={Picker.MODE_DIALOG}
                                selectedValue={this.props.addressProofType}
                                onValueChange={(src) => this.props.agentAddressProofType(src)}>
                            {
                                this.state.arrList.map(function (src, index) {
                                    return <Picker.Item key={index}
                                                        label={src.toString()} value={src.toString()}/>
                                })
                            }
                        </Picker>
                    </View>
                </View>
            )}

        return (
            <View style={{flex:1}}>
                <NavigationBar title="Documents"
                               onBackButtonPress={this.onBackButtonPress}
                />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{flexDirection: 'row', marginTop: 30, justifyContent:'space-around'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>
                                {"* "}
                            </Text>
                            <Text style={{fontSize:15}}>
                                Pan Card
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onSelectImage('panCard')}>
                            <View style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                         justifyContent: 'center',
                         alignItems: 'center',
                        backgroundColor: Constant.backColor}}>
                                <Text style={{fontSize:30,color:'#FFF'}}>+</Text>
                            </View>

                            <Image source={this.state.pancardSrc}
                                   style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                                   position:'absolute'
                                   }}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:13, paddingTop:20, width:'90%', alignSelf:'center'}}>
                            For address proof you can select any one option.
                        </Text>
                    </View>

                    <View>
                        {(Constant.IOS)?
                            <TouchableHighlight style={{flex: 1,borderColor: 'gray',
                                borderWidth: 0.5,backgroundColor:'white',
                                height:45, borderRadius: 5,
                                flexDirection: 'row', width:'90%', alignSelf:'center', marginTop:10, marginBottom: 10}}
                                                elevation={3}
                                                onPress={this.onPressSelectSource}
                                                underlayColor='transparent'>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:"center"}}>
                                    <Text style={{flex: 1, paddingLeft:10}}>
                                        {this.props.addressProofType}
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

                            <View style={{backgroundColor: 'white',
                            borderWidth: 0.5,borderColor:'gray',
                            width: '90%', alignSelf:'center', margin:5, borderRadius: 5,
                            height: 45, justifyContent: 'center' }}>
                                <Picker mode={Picker.MODE_DROPDOWN}
                                        selectedValue={this.props.addressProofType}
                                        onValueChange={(src) => this.props.agentAddressProofType(src)}
                                        underlineColorAndroid={Constant.transparent}
                                        style={{height:30}}>
                                    {
                                        this.state.arrList.map(function (src, index) {
                                            return <Picker.Item label={src.toString()}
                                                                value={src.toString()}/>
                                        })
                                    }
                                </Picker>
                            </View>
                        }
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent:'space-around'}}>
                        <Text style={{fontSize:15}}>
                            Address Proof
                        </Text>
                        <TouchableOpacity onPress={()=>this.onSelectImage('addressProof')}>
                            <View style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                         justifyContent: 'center',
                         alignItems: 'center',
                        backgroundColor: Constant.backColor}}>
                                <Text style={{fontSize:30,color:'#FFF'}}>+</Text>
                            </View>

                            <Image source={this.state.addressSrc}
                                   style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                                   position:'absolute'
                                   }}/>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30, justifyContent:'space-around'}}>
                        <Text style={{fontSize:15}}>
                            Profile Image
                        </Text>
                        <TouchableOpacity onPress={()=>this.onSelectImage('profile')}>
                            <View style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                         justifyContent: 'center',
                         alignItems: 'center',
                        backgroundColor: Constant.backColor}}>
                                <Text style={{fontSize:30,color:'#FFF'}}>+</Text>
                            </View>

                            <Image source={this.state.profileSrc}
                                   style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                                   position:'absolute'
                                   }}/>
                        </TouchableOpacity>
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
        addressProofType: state.agent.addressProofType,
        agentImages: state.agent.agentImages
    };
};

export default connect(mapStateToProps, {
    agentAddressProofType,
    agentImages
})(AgentDocument);