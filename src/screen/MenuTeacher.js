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
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {firebaseApp} from '../component/firebase/Realtimedb';
import MenuStudent from "./student/MenuStudent";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class MenuTeacher extends Component {

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
        firebaseApp.database().ref('school').child('teacher').on('value', function (snapshot) {
            // console.log("snapshot: " + JSON.stringify(snapshot));
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                //console.log("childData: " + JSON.stringify(childData));
                if (childData.uid === user.uid) {
                    thisState.setState({
                        loading: false,
                        currentUser: childData,
                    }, () => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_Type: " + childData.type);
                    })
                }

            });
        });

        //const user = firebaseApp.auth().currentUser;
        //console.log("user: " + JSON.stringify(user));
        firebaseApp.database().ref('school').child('student').on('value', function (snapshot) {
            // console.log("snapshot: " + JSON.stringify(snapshot));
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                //console.log("childData: " + JSON.stringify(childData));
                if (childData.uid === user.uid) {
                    thisState.setState({
                        loading: false,
                        currentUser: childData,
                    }, () => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_Type: " + childData.type);
                    })
                }

            });
        });


    }


    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        console.log("Teacher1111: " + JSON.stringify(this.state.currentUser));
        console.log("Teacher_Type3333: " + this.state.currentUser.type);
        if (this.state.loading) {
            return <ActivityIndicator size="large"/>
        }else{
            if (this.state.currentUser.type === "teacher") {
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
                            <TouchableOpacity style={styles.btnQuanlylop} onPress={() => navigate("InforTeacher")}>
                                <Text style={styles.textQuanlylop}>Thông Tin Giảng Viên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnQuanlylop} onPress={() => navigate("ClassManager")}>
                                <Text style={styles.textQuanlylop}>Quản Lý Lớp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnQuanlylop} onPress={() => navigate("StudentManager")}>
                                <Text style={styles.textQuanlylop}>Quản Lý Sinh Viên</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <MenuStudent navigation={this.props.navigation} />
                );
            }
        }
      

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
        width: "85%",
        height: 250,
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
});