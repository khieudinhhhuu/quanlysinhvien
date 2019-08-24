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

export default class MenuStudent extends Component {

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
        console.log("data: " + JSON.stringify(this.state.data));
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Text style={styles.titleHeader}>TRANG CHỦ</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btnQuanlylop} onPress={() => navigate("InforStudent")}>
                        <Text style={styles.textQuanlylop}>Thông Tin Sinh Viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnQuanlylop} onPress={() => navigate("Schedule", {mamonhoc: this.state.currentUser.mamonhoc} )}>
                        <Text style={styles.textQuanlylop}>Lịch Học</Text>
                    </TouchableOpacity>
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleHeader: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
    },
    btn: {
        width: "80%",
        height: 240,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 150,
    },
    btnQuanlylop: {
        width: "100%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 25
    },
    textQuanlylop: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
});