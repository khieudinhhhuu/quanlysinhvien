import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Animated,
    ImageBackground,
    Dimensions,
    FlatList,
    AppRegistry,
    Modal,
    AsyncStorage,
    NetInfo,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import {firebaseApp} from '../component/firebase/Realtimedb';

const deviceW = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
            displayName: "",
            phoneNumber: "",
            email: "",
            password: "",
            masv: "",
            nganh: "",
        };

    }


    Signup() {
        if (this.state.displayName.trim() === '' || this.state.phoneNumber.trim() === '' || this.state.email.trim() === '' || this.state.password.trim() === '') {
            Alert.alert('Please enter email and password');
            return
        }

        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.id = firebaseApp.auth().getUid();
                firebaseApp.database().ref('school').child('student').child(this.id).set({
                    displayName: this.state.displayName,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    password: this.state.password,
                    masv: this.state.masv,
                    nganh: this.state.nganh,
                    uid: this.id,
                });
                Alert.alert(
                    'Alert Title',
                    'Signup Success\n' + this.state.email,
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {
                            text: 'OK', onPress: () => {
                                this.props.navigation.navigate('Login')
                            }
                        },
                    ],
                    {cancelable: false},
                );
                this.setState({
                    displayName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                });
            })
            .catch(function (error) {
                Alert.alert(
                    'Alert Title',
                    'Registration failed',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            });

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#FAFAFA"
                    translucent={false}
                />
                <ScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Signup</Text>
                        <View style={styles.signupForm}>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="user" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Name"
                                        returnKeyType='next'
                                        keyboardType='name-phone-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onSubmitEditing={() => this.textInputPhone.focus()}
                                        onChangeText={displayName => this.setState({displayName})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon2 style={styles.icon} name="phone" size={px2dp(18)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Phone"
                                        returnKeyType='next'
                                        keyboardType='number-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        ref={(input) => this.textInputPhone = input}
                                        onSubmitEditing={() => this.textInputEmail.focus()}
                                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="envelope" size={px2dp(22)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Email"
                                        returnKeyType='next'
                                        keyboardType='email-address'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        ref={(input) => this.textInputEmail = input}
                                        onSubmitEditing={() => this.textInputPassword.focus()}
                                        onChangeText={email => this.setState({email})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Pass"
                                        keyboardType="default"
                                        returnKeyType='next'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={(input) => this.textInputPassword = input}
                                        onChangeText={password => this.setState({password})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "ma sv"
                                        returnKeyType='next'
                                        keyboardType='name-phone-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={masv => this.setState({masv})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "nganh"
                                        returnKeyType='next'
                                        keyboardType='name-phone-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        ref={(input) => this.textInputPassword = input}
                                        onChangeText={nganh => this.setState({nganh})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnSignup} onPress={() => this.Signup()}>
                                <Text style={styles.textSignup}>Signup</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSignup} onPress={() => this.props.navigation.goBack()}>
                                <Text style={styles.textSignup}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    keyboardView: {
        width: '100%',
        height: '100%',
    },
    body: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70,
    },
    title: {
        fontSize: 20,
        color: "#000",
        fontWeight: "600",
        marginTop: 50
    },
    signupForm: {
        width: "80%",
        height: 400,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: "100%",
        height: 45,
        marginBottom: 20,
        borderRadius: 35,
        borderWidth: 1.5,
        borderColor: "#666",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 10,
        marginRight: 7
    },
    content2: {
        width: "85%",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    textInput: {
        width: "100%",
        fontSize: 15,
        textAlign: "left",
        paddingRight: 7
    },
    btn: {
        width: "80%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    btnSignup: {
        width: "100%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35
    },
    textSignup: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
});