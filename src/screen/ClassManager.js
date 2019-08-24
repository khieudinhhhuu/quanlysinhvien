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
import {firebaseApp} from '../component/firebase/Realtimedb';
import {StackActions, NavigationActions} from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'ClassManager'})],
});

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export default class ClassManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
        };

        thisState = this;

    }

    componentDidMount() {
        this.listenForItems(firebaseApp.database());
    }

    listenForItems() {
        let array = [];
        firebaseApp.database().ref('school').child('class').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    mamonhoc: childData.mamonhoc,
                    tenmonhoc: childData.tenmonhoc,
                    tenlop: childData.tenlop,
                    tengiangvien: childData.tengiangvien,
                    phonghoc: childData.phonghoc,
                    cahoc: childData.cahoc,
                    thu: childData.thu,
                });
            });
            thisState.setState({
                data: array,
                isLoading: false,
            });
        });
        firebaseApp.database().ref('school').child('class').on('child_removed', (snapshot) => {
            array = array.filter((x) => x.id !== snapshot.key);
            thisState.setState({
                data: array,
            });
        });
    }

    removeClass(item) {
        Alert.alert(
            'Remove Class ',
            'Do you want to delete class !',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {text: 'OK', onPress: () => this.remove(item)},
            ],
            {cancelable: false}
        );
    };

    remove(item){
        firebaseApp.database().ref('school').child('class').child(item.id).remove();
        this.listenForItems(firebaseApp.database());
        this.props.navigation.dispatch(resetAction)
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
                    <Text style={styles.titleHeader}>Danh Sách Lớp</Text>
                    <Icon5 onPress={() => navigate("AddClass")} style={styles.iconAdd} name="add" size={px2dp(33)} />
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <View style={styles.content} >
                                <View style={styles.viewImage}>
                                    <Image style={styles.avatar} source={require("../asset/image/class.png")}/>
                                </View>
                                <TouchableOpacity style={styles.viewText} onPress={() => navigate("InforClass", {item: item})}>
                                    <Text style={styles.textCodeClass} numberOfLines={1}>{item.mamonhoc}</Text>
                                    <Text style={styles.textNameClass} numberOfLines={1}>{item.tenmonhoc}</Text>
                                    <Text style={styles.textNameTeacher} numberOfLines={1}>{item.tenlop}</Text>
                                </TouchableOpacity>
                                <View style={styles.viewBottom}>
                                    <Icon4 onPress={() => this.removeClass(item)} style={styles.iconRemove} name="delete" size={px2dp(23)}/>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.id}
                    />
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
    },
    body: {
        width: '95%',
        paddingBottom: 70,
    },
    content: {
        width: '100%',
        height: 100,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "#fff"
    },
    viewImage: {
        width: "25%",
        height: "92%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 85,
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#26ffd5",
        marginLeft: 5,
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 85,
    },
    viewText: {
        width: '62%',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 7,
        paddingTop: 5,
        justifyContent: "space-between",
    },
    textCodeClass: {
        fontSize: 20,
        color: "#666",
    },
    textNameClass: {
        fontSize: 20,
        color: "#666",
    },
    textNameTeacher: {
        fontSize: 20,
        color: "#666",
    },
    viewBottom: {
        width: "10%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    iconEdit: {
        marginBottom: 22,
        color: "#000",
    },
    iconRemove: {
        color: "#000",
    }
});