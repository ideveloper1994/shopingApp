import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Animated,
    AsyncStorage
} from 'react-native';
import Constant from '../helper/constant';
import Button from '../commonComponent/button';
import { connect } from 'react-redux';

class Welcome extends Component {

    constructor(props){
        super(props);
        debugger
        this.state = {
            isWelcome: false,
            isFullScreen: false,
            imageWidth: 29.5,
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
                    toValue: {x:0, y:0}, duration:300
                }).start();
            }, 1000);
        })
    }

    onAddAgentPress = () => {
        this.props.navigator.push('agentDetail');
    };


    renderBottom = () => {
        return(
            <Animated.View style={this.position2.getLayout()}>
                <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={[styles.descriptionText, {paddingTop:30}]}>
                        Lets Start With Shopkul
                    </Text>
                </View>

                <View>
                    <Button title="Agency Detail"
                            backColor="#FFF"
                            color={Constant.backColor}
                            otherStyle={{marginBottom:40}}
                            onPress={this.onAddAgentPress}/>
                </View>
            </Animated.View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    (this.state.isWelcome) ?
                        <View style={{top:0, left:0,
                              right:0, bottom:0,
                              position: 'absolute',
                              justifyContent: 'center', alignItems:'center'}}>
                            <Animated.View style={this.position.getLayout()}>
                                <Image source={require('../assets/images/image-welcome.png')}
                                       style={{ width: (Constant.screenWidth*this.state.imageWidth)/100 }}
                                       resizeMode='contain'
                                       ref="welcome"/>
                            </Animated.View>
                        </View> :
                        null
                }
                {
                    this.renderBottom()
                }
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {
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
});