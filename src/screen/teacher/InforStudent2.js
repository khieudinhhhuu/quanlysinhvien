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

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export default class InforStudent2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };

    }


    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
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
                        <Text style={styles.textMasv}>Mã sinh viên: {item.masv}</Text>
                        <Text style={styles.textTensv}>Tên sinh viên: {item.displayName}</Text>
                        <Text style={styles.textEmail}>Email: {item.email}</Text>
                        <Text style={styles.textNganh}>Tên lớp: {item.tenlop}</Text>
                        <Text style={styles.textNganh}>Chuyên ngành: {item.nganh}</Text>
                        <Text style={styles.textPhone}>Số điện thoại: {item.phoneNumber}</Text>
                        <Text style={styles.textPhone}>Mật khẩu: {item.password}</Text>
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