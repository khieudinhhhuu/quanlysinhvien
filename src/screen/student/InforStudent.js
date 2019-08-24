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
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {firebaseApp} from "../../component/firebase/Realtimedb";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export default class InforStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentUser: '',
        };

        thisState = this;

    }

    componentDidMount() {
        const user = firebaseApp.auth().currentUser;
        console.log("user: " + JSON.stringify(user));
        firebaseApp.database().ref('school').child('student').on('value', function (snapshot) {
            console.log("snapshot: " + JSON.stringify(snapshot));
            //đây là hàm để lặp toàn bộ object trong mảng accounts
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    thisState.setState({
                        isLoading: true,
                        currentUser: childData,
                    }, () => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_displayName: " + childData.displayName);
                    })
                }
            });

            //Log tat ca data tu mang
            // console.log("array2: " + JSON.stringify(array2));
            //
            // log 1 phan tu nho
            // console.log("array2_displayName: " + array2[0].displayName);
        });
    }


    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(29)}/>
                    <Text style={styles.titleHeader}>Thông Tin Sinh Viên</Text>
                    <View style={styles.iconAdd}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.avatar}>
                        <Image style={styles.imageAvatar} source={require("../../asset/image/user.png")}/>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.textMasv}>Mã sinh viên: {this.state.currentUser.masv}</Text>
                        <Text style={styles.textTensv}>Tên sinh viên: {this.state.currentUser.displayName}</Text>
                        <Text style={styles.textEmail}>Email: {this.state.currentUser.email}</Text>
                        <Text style={styles.textNganh}>Chuyên ngành: {this.state.currentUser.nganh}</Text>
                        <Text style={styles.textPhone}>Số điện thoại: {this.state.currentUser.phoneNumber}</Text>
                        <Text style={styles.textPhone}>Mật khẩu: {this.state.currentUser.password}</Text>
                    </View>
                </View>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    header: {
        width: "100%",
        height: 70,
        backgroundColor: "#368fc7",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: "#fff",
        paddingLeft: 2,
    },
    titleHeader: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
    },
    iconAdd: {
        marginTop: 20,
        color: "#fff",
    },
    body: {
        width: "100%",
        height: "40%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: 'row',
        paddingTop: 10
    },
    avatar: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 85,
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#26ffd5",
        margin: 10,
    },
    imageAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    content: {
        width: "70%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10
    },
    textMasv: {
        fontSize: 20,
        color: "#666",
    },
    textTensv: {
        fontSize: 20,
        color: "#666",
    },
    textEmail: {
        fontSize: 20,
        color: "#666",
    },
    textNganh: {
        fontSize: 20,
        color: "#666",
    },
    textPhone: {
        fontSize: 20,
        color: "#666",
    },
});