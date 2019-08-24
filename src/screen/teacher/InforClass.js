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

export default class InforClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            curentClass: "",
        };

    }

    componentDidMount() {
        const item = this.props.navigation.state.params.item;
        console.log("item88: " + JSON.stringify(item));
        this.setState({
            curentClass: item,
        });
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
                    <Text style={styles.titleHeader}>Thông Tin Lớp</Text>
                    <View style={styles.iconAdd}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.avatar}>
                        <Image style={styles.imageAvatar} source={require("../../asset/image/class.png")}/>
                    </View>
                    {console.log("curentClass11: " + JSON.stringify(this.state.curentClass))}
                    {console.log("curentClass23: " + this.state.curentClass.mamonhoc)}
                    <TouchableOpacity style={styles.edit} onPress={() => navigate("EditClass",
                        {
                            mamonhoc: this.state.curentClass.mamonhoc,
                            tenmonhoc: this.state.curentClass.tenmonhoc,
                            tenlop: this.state.curentClass.tenlop,
                            tengiangvien: this.state.curentClass.tengiangvien,
                            phonghoc: this.state.curentClass.phonghoc,
                            cahoc: this.state.curentClass.cahoc,
                            thu: this.state.curentClass.thu,
                        }
                    )}>
                        <Icon4 style={styles.iconEdit} name="edit" size={px2dp(30)} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.textMasv}>- Mã môn học: {item.mamonhoc}</Text>
                        <Text style={styles.textTensv}>- Tên môn học: {item.tenmonhoc}</Text>
                        <Text style={styles.textEmail}>- Tên lớp: {item.tenlop}</Text>
                        <Text style={styles.textNganh}>- Tên giảng viên: {item.tengiangvien}</Text>
                        <Text style={styles.textPhone}>- Phòng học: {item.phonghoc}</Text>
                        <Text style={styles.textNganh}>- Ca học: {item.cahoc}</Text>
                        <Text style={styles.textPhone}>- {item.thu}</Text>
                    </View>
                </View>
                {/*<TouchableOpacity onPress={() => navigate("ListStudentOfClass")} style={styles.btnDanhsachsvlop}>*/}
                {/*    <Text style={styles.textDSsvlop}>Danh sách sinh viên trong lớp</Text>*/}
                {/*</TouchableOpacity>*/}
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
        //height: "50%",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        //flexDirection: 'row',
        paddingTop: 10,
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
    edit: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "pink",
        position: "absolute",
        top: 40,
        right: 70,
    },
    iconEdit: {

    },
    content: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 10,
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
    btnDanhsachsvlop: {
        width: "90%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 30
    },
    textDSsvlop: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
});