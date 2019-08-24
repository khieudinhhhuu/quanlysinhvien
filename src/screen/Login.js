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
    CheckBox,
    AsyncStorage,
    NetInfo,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {firebaseApp} from '../component/firebase/Realtimedb';
import { NavigationActions, StackActions} from 'react-navigation';

const deviceW = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
            email: "",
            password: "",
            loading: true,
            authenticated: false,
            checked: false,
        };

    }


    Login() {
        if (this.state.email.trim() === '' || this.state.password.trim() === '') {
            Alert.alert('Please enter email and password');
            return
        }

        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.navigateLogin('MenuTeacher');
                this.setState({
                    email: '',
                    password: ''
                });
            })
            .catch(function (error) {
                Alert.alert(
                    'Alert Title',
                    'login failed please try again',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            });

    }

    navigateLogin = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screen })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#fff"
                    translucent={false}
                />
                <ScrollView style={styles.body}>
                    <View style={styles.fake}>
                        <Text style={styles.title}>Login</Text>
                        <View style={styles.loginForm}>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="envelope" size={px2dp(20)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Email"
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        onChangeText={email => this.setState({email})}
                                        value={this.state.textInputEmail}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(22)} color="#666" />
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder= "Password"
                                        keyboardType="default"
                                        returnKeyType="go"
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={input => (this.passwordInput = input)}
                                        onChangeText={password => this.setState({password})}
                                        value={this.state.TextInputPass}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnSignin} onPress={() => this.Login()}>
                                <Text style={styles.textSignin}>Login</Text>
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
    body: {
        width: '100%',
        height: '100%',
    },
    fake: {
        width: '100%',
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70,
    },
    title: {
        fontSize: 40,
        color: "#000",
        fontWeight: "bold",
        marginTop: 150
    },
    loginForm: {
        width: "85%",
        height: 130,
        marginTop: 50,
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
        width: "85%",
        height: 70,
        alignItems: "center",
        marginTop: 20
    },
    btnSignin: {
        width: "100%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35
    },
    textSignin: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
});
