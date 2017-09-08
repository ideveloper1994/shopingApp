/**
 * Created by LaNet on 9/6/17.
 */
/*
//activate agency

 <TouchableHighlight onPress={()=> this.props.agentActivate(!this.props.isActive)}
 underlayColor={"transparent"}>

 <View style={styles.activeView}>
 <MaterialCommunityIcons name={(this.props.isActive) ? 'checkbox-marked' : 'checkbox-blank-outline'}
 size={35}
 color={'gray'}/>
 <Text style={styles.formTextLabel}>{" Active (activate user if payment is done)"}</Text>
 </View>
 </TouchableHighlight>

 <View style={styles.outerView}>
 <Text style={styles.formTextLabel}>User Name</Text>
 <TextInput  ref="txtUserName"
 value={this.props.userName}
 placeholder={"UserName"}
 style={ styles.textBox }
 autoCapitalize="none"
 autoCorrect={false}
 returnKeyType={'next'}
 onChangeText={(text) => {this.props.usernameChanged(text)}}
 onSubmitEditing={() => this.focusNextField('txtPassword')}
 underlineColorAndroid={Constant.transparent}
 />
 </View>


* */