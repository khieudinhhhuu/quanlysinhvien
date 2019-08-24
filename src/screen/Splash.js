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
} from "react-native";
import { NavigationActions, StackActions} from 'react-navigation';

export default class Splash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };

        setTimeout(() => {
            this.setState({
                timePassed: this.navigateLogin("Login")
            });
        }, 1500);

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

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <Image style={styles.image} source={require("../asset/image/splash.jpg")}/>
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
    image: {
        width: "100%",
        height: "100%",
    }
});
