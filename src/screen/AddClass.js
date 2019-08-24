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
import {Picker, Item} from 'native-base';
import DropdownComponent from "../core/dropdownComponent";
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

const inValidateText = (text) => {
    return text === '' || text === null ||
        text === 'null' || text === 'undefined' ||
        text === undefined
};

const getValueValidityPicker = (dataArray, id) => {
    let result = dataArray.filter(obj => {
        return obj.key === id
    });
    return result[0]['label'];
};

const phonghoc = [
    {
        label: 'Chọn phòng học: ',
        key: 'key0'
    },
    {
        label: 'D401',
        key: 'key1'
    },
    {
        label: 'D402',
        key: 'key2'
    },
    {
        label: 'D403',
        key: 'key3'
    },
    {
        label: 'D404',
        key: 'key4'
    },
    {
        label: 'D405',
        key: 'key5'
    },
    {
        label: 'D406',
        key: 'key6'
    },
    {
        label: 'D407',
        key: 'key7'
    },
    {
        label: 'D408',
        key: 'key8'
    },
    {
        label: 'D409',
        key: 'key9'
    },
    {
        label: 'D410',
        key: 'key10'
    },
];

const cahoc = [
    {
        label: 'Chọn ca học: ',
        key: 'key0'
    },
    {
        label: 'Ca 1',
        key: 'key1'
    },
    {
        label: 'Ca 2',
        key: 'key2'
    },
    {
        label: 'Ca 3',
        key: 'key3'
    },
    {
        label: 'Ca 4',
        key: 'key4'
    },
    {
        label: 'Ca 5',
        key: 'key5'
    },
    {
        label: 'Ca 6',
        key: 'key6'
    }
];

const thu = [
    {
        label: 'Chọn thứ: ',
        key: 'key0'
    },
    {
        label: 'Thứ: 2 - 4 - 6',
        key: 'key1'
    },
    {
        label: 'Thứ: 3 - 5 - 7',
        key: 'key2'
    },
    {
        label: 'Thứ: 2 - 3 - 4',
        key: 'key3'
    },
    {
        label: 'Thứ: 5 - 6 - 7',
        key: 'key4'
    },
    {
        label: 'Thứ: 2 - 6 - 7',
        key: 'key5'
    },
    {
        label: 'Thứ: 3 - 4 - 5',
        key: 'key6'
    }
];

export default class AddClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentUser: '',
            mamonhoc: "",
            tenmonhoc: "",
            tenlop: "",
            tengiangvien: "",
            displayName: "",

            validity: "",
            validity2: "",
            validity3: "",
        };

        thisState = this;

    }

    componentDidMount() {
        const user = firebaseApp.auth().currentUser;
        console.log("user: " + JSON.stringify(user));
        firebaseApp.database().ref('school').child('teacher').on('value', function (snapshot) {
            console.log("snapshot: " + JSON.stringify(snapshot));
            //đây là hàm để lặp toàn bộ object trong mảng accounts
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    thisState.setState({
                        loading: false,
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

    onPost(){
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        const {mamonhoc, tenmonhoc, tenlop, tengiangvien, validity, validity2, validity3 } = this.state;
        if(inValidateText(mamonhoc)){
            alert(`Chưa nhập mã môn học`)
        }
        else if(inValidateText(tenmonhoc)){
            alert(`Chưa nhập tên môn học`)
        }
        else if(inValidateText(tenlop)){
            alert(`Chưa nhập tên lớp`)
        }
        else if(inValidateText(validity)){
            alert(`Chưa chọn phòng học`)
        }
        else if(inValidateText(validity2)){
            alert(`Chưa chọn ca học`)
        }
        else if(inValidateText(validity3)){
            alert(`Chưa chọn thứ`)
        }

        // if (this.state.mamonhoc.trim() === '' || this.state.tenmonhoc.trim() === '' || this.state.tenlop.trim() === '' ||
        //     this.state.tengiangvien.trim() === '' ) {
        //     Alert.alert('Error !!!', 'Please enter Text Content');
        //     return;
        //
        // }

        else {
            firebaseApp.database().ref('school').child('class/' + this.state.mamonhoc).set({
                mamonhoc: this.state.mamonhoc,
                tenmonhoc: this.state.tenmonhoc,
                tenlop: this.state.tenlop,
                tengiangvien: this.state.currentUser.displayName,
                phonghoc: this.state.validity,
                cahoc: this.state.validity2,
                thu: this.state.validity3,
            });

            this.props.navigation.dispatch(resetAction);

        }
    }

    renderItemPicker(data) {
        let quantities = [];
        data.map((item, i) => {
            quantities.push(
                <Item key={i} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange(key) {
        const validity = getValueValidityPicker(phonghoc, key);
        this.setState({
            validity: getValueValidityPicker(phonghoc, key),
            selectedValidity: key,
        });
        console.log('Label_phonghoc: ' + validity);
        console.log('Key_phonghoc: ' + key)
    }

    renderItemPicker2(data) {
        let quantities = [];
        data.map((item, index) => {
            quantities.push(
                <Item key={index} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange2(key) {
        const validity2 = getValueValidityPicker(cahoc, key);
        this.setState({
            validity2: getValueValidityPicker(cahoc, key),
            selectedValidity2: key,
        });
        console.log('Label_cahoc: ' + validity2);
        console.log('Key_cahoc: ' + key)
    }

    renderItemPicker3(data) {
        let quantities = [];
        data.map((item, index) => {
            quantities.push(
                <Item key={index} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange3(key) {
        const validity3 = getValueValidityPicker(thu, key);
        this.setState({
            validity3: getValueValidityPicker(thu, key),
            selectedValidity3: key,
        });
        console.log('Label_thu: ' + validity3);
        console.log('Key_thu: ' + key)
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
                    <Text style={styles.titleHeader}>Thêm Lớp</Text>
                    <View style={styles.iconRight}  />
                </View>
                <ScrollView style={styles.keyboardView}>
                    <View style={styles.fake}>
                        <View style={styles.information}>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Mã môn học"
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.textInputTenmon.focus()}
                                    onChangeText={(mamonhoc) => this.setState({mamonhoc})}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Tên môn học"
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputTenmon = input}
                                    onSubmitEditing={() => this.textInputTenlop.focus()}
                                    onChangeText={(tenmonhoc) => this.setState({tenmonhoc})}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Tên lớp"
                                    returnKeyType="go"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputTenlop = input}
                                    onSubmitEditing={() => this.textInputTenGV.focus()}
                                    onChangeText={(tenlop) => this.setState({tenlop})}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Tên giảng viên"
                                    editable={false}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputTenGV = input}
                                    onChangeText={(tengiangvien) => this.setState({tengiangvien})}
                                    value={this.state.currentUser.displayName}
                                />
                            </View>
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker(phonghoc)}
                                onValueChange={this.onItemChange.bind(this)}
                                selectedValue={'' + this.state.selectedValidity}
                            />
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker2(cahoc)}
                                onValueChange={this.onItemChange2.bind(this)}
                                selectedValue={'' + this.state.selectedValidity2}
                            />
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker3(thu)}
                                onValueChange={this.onItemChange3.bind(this)}
                                selectedValue={'' + this.state.selectedValidity3}
                            />
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnAdd} onPress={() => this.onPost()}>
                                <Text style={styles.textAdd}>THÊM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.goBack()}>
                                <Text style={styles.textCancel}>HỦY</Text>
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
        marginLeft: 5,
    },
    titleHeader: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
    },
    iconRight: {
        marginTop: 20,
        color: "#fff",
        marginRight: 25
    },
    keyboardView: {
        width: "100%",
        height: "100%"
    },
    fake: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    information: {
        width: "90%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        height: 45,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#666",
        backgroundColor: "#fff"
    },
    textInput: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    },
    dropdown: {
        marginBottom: 20,
    },
    btn: {
        width: "90%",
        height: 110,
        alignItems: "center",
        marginTop: 20,
    },
    btnAdd: {
        width: "100%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 15
    },
    textAdd: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    btnCancel: {
        width: "100%",
        height: 45,
        backgroundColor: "#0099ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    textCancel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
});