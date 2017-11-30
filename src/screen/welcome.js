import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Animated,
    AsyncStorage,
    Platform,
    Alert,
    Linking,ScrollView,
    Dimensions
} from 'react-native';
import Constant from '../helper/constant';
import Button from '../commonComponent/button';
import { connect } from 'react-redux';
var DeviceInfo = require('react-native-device-info');
import { checkUpdate } from '../actions/userAction'
import {
    getProfile,
} from '../actions/agentRegistration'
const {width, height} = Dimensions.get('window');

class Welcome extends Component {

    constructor(props){
        super(props);
        this.state = {
            isWelcome: false,
            isFullScreen: false,
            imageWidth: 29.5,
            isNeedtoUpdate: false,
            btntitle:'Continue',
            btnVisible:true,
            firstName: (this.props.userDetail.firstName)?this.props.userDetail.firstName:'N/A',
            lastName:(this.props.userDetail.lastName)?this.props.userDetail.lastName:'N/A',
            email: (this.props.userDetail.email)?this.props.userDetail.email:'N/A',
            mobile: (this.props.userDetail.mobileNo)?this.props.userDetail.mobileNo:'N/A',
            profile:{}
        };
        this.position = new Animated.ValueXY(0,0);
        this.position2 = new Animated.ValueXY(0,0);
        Animated.timing(this.position2, {
            toValue: {x:0, y: Constant.screenHeight*2}, duration:0
        }).start();
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({isWelcome: true}, () => {
            this.setState({imageWidth: 35});
            setTimeout(() => {
                Animated.timing(this.position, {
                    toValue: {x:0, y:-150}, duration:400
                }).start();
                Animated.timing(this.position2, {
                    toValue: {x:0, y:0}, duration:500
                }).start();
            }, 1000);
        })
        this.props.getProfile().then((res)=>{
            debugger
            this.setState({profile:res})
            console.log('email..',this.state.profile.UserDetail.firstName)}
        ).catch((err)=>{
            debugger
            console.log(err)
        }  );
        this.renderBottom()
        //this.props.getProfile().then().catch();

        // AsyncStorage.getItem('userch_role').then((value) => {
        //     //alert(value);
        //     if(value === '"do"'){
        //         this.setState({btntitle:'Agency Detail'})
        //     }
        //     else if(value === '"agn"' || value === '"agency"'){
        //         this.setState({btntitle:'Customer Detail'})
        //     }
        //     else{
        //         this.setState({btnVisible:false})
        //     }
        // }).done();
    }

    onAddAgentPress = () => {

        AsyncStorage.getItem('userch_role').then((value) => {
            //alert(value)

            if(value === '"do"'){
                this.props.navigator.push('agentDetail');
            }
            else if(value === '"agn"' || value === '"agency"'){
                this.props.navigator.push('customerDetail');
            }
            else{
                this.props.navigator.push('customerDetail');
            }
        }).done();
        //this.props.navigator.push('agentDetail');
    };


    renderBottom = () => {
        debugger
        console.log("PROFILE:::",this.state.profile)
        if(this.state.profile.UserDetail){
            return(
                <Animated.View style={this.position2.getLayout()}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                        <Image source={require('../assets/images/image-welcome.png')}
                               style={{ width: (Constant.screenWidth*this.state.imageWidth)/100 }}
                               resizeMode='contain'
                               ref="welcome"/>
                    </View>
                    <View style={styles.listItem}>
                        <View style={{alignItems:'center', margin:10}}>
                            <Image source={require('../assets/images/avatar-male.png')}
                                   style={{width:width/3.5, height:width/3.5, borderRadius:width/7 }} />
                        </View>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Name:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.firstName + ' ' + this.state.profile.UserDetail.lastName}</Text>
                        </View>
                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Email:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.email}</Text>
                        </View>

                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Mobile:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.mobileNo}</Text>
                        </View>
                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Date of Joining:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.createdAt}</Text>
                        </View>
                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Date of Birth:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.birthDate}</Text>
                        </View>
                        <View style={styles.proView}>
                            <Text style={styles.fieldText}>{"Designation:  "}</Text>
                            <Text style={styles.detailText}>{this.state.profile.UserDetail.Role.name}</Text>
                        </View>
                    </View>
                    </ScrollView>
                    {
                        (this.state.btnVisible) &&
                        <View style={{justifyContent:'flex-end',backgroundColor:Constant.backColor,paddingBottom:10,position:'absolute',bottom:0,left:0,right:0}}>
                            <Button title={this.state.btntitle}
                                    backColor="#FFF"
                                    color={Constant.backColor}
                                    otherStyle={{

                                    }}
                                    onPress={this.onAddAgentPress}

                            />
                        </View>
                        || null
                    }

                </Animated.View>
            );
        }
        else{
            return(
                <View></View>
            )
        }

    };

    render() {

       // console.log('user welcome--->',this.state.profile.UserDetail.firstName)
        return (
            <View style={styles.container}>
                {this.renderBottom()}
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        userDetail: state.user.userDetail
    };
};

export default connect(mapStateToProps, {
    checkUpdate,
    getProfile,

})(Welcome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.backColor,
        justifyContent: 'center',
        alignItems:'center'
    },
    descriptionText:{
        fontSize:17,
        color:'white',
        fontWeight: '500',
        textAlign: 'center',
        marginLeft: "10%",
        marginRight: "10%",
        lineHeight: 25
    },
    btnLogin:{
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'center',
        backgroundColor: '#FFFF',
        width: Constant.screenWidth - 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding:17,
        borderRadius: 30
    },
    btnFont:{
        color: '#fbb043',
        fontSize: 17,
        fontFamily: Constant.font700,
    },
    listItem:{
        padding:10,
        // borderBottomColor:'lightgray',
        // borderBottomWidth: 0.7

    },
    listItemText:{
        fontSize: 17
    },
    proView: {
        flexDirection: 'row',
       // alignItems:'center',
        paddingLeft:30,
        paddingBottom:20
        // borderBottomColor:'lightgray',
        // borderBottomWidth: 0.7
    },
    fieldText:{
        color:'#FFF',
        fontWeight:'800',
       // width:100
    },
    detailText:{
        color:'#FFF'
    }
});