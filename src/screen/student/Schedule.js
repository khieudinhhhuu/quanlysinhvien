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
import {firebaseApp} from '../../component/firebase/Realtimedb';
import {StackActions, NavigationActions} from 'react-navigation';

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export default class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataStudent: [],
            dataClass: "",
        };

        thisState = this;

    }

    componentDidMount() {
        const {navigation} = this.props;
        const mamonhoc = navigation.getParam('mamonhoc', "");
        console.log("mamonhoc444: " + mamonhoc);


        firebaseApp.database().ref('school').child('class').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                console.log("childData: " + JSON.stringify(childData));
                if (childData.mamonhoc === mamonhoc) {
                    thisState.setState({
                        isLoading: true,
                        dataClass: childData,
                    }, () => {
                        console.log("dataClass: " + JSON.stringify(childData));
                        console.log("dataClass_mamonhoc: " + childData.mamonhoc);
                    })
                }
            });
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
                    <Text style={styles.titleHeader}>Lịch Học Sinh Viên</Text>
                    <View style={styles.iconAdd} />
                </View>
                <View style={styles.body}>
                    <Text style={styles.textCodeClass}>- Mã môn học: {this.state.dataClass.mamonhoc}</Text>
                    <Text style={styles.textCodeClass}>- Tên môn học: {this.state.dataClass.tenmonhoc}</Text>
                    <Text style={styles.textCodeClass}>- Tên lớp: {this.state.dataClass.tenlop}</Text>
                    <Text style={styles.textCodeClass}>- Tên giảng viên: {this.state.dataClass.tengiangvien}</Text>
                    <Text style={styles.textCodeClass}>- Phòng học: {this.state.dataClass.phonghoc}</Text>
                    <Text style={styles.textCodeClass}>- Ca học: {this.state.dataClass.cahoc}</Text>
                    <Text style={styles.textCodeClass}>- {this.state.dataClass.thu}</Text>
                </View>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#e8e8e8"
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
        marginRight: 15,
    },
    body: {
        width: '95%',
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 5,
        padding: 5,
    },
    textCodeClass: {
        fontSize: 20,
        color: "#000",
        marginBottom: 3,
    },
});