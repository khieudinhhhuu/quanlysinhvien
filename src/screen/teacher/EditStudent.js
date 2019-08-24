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
import {Picker, Item} from 'native-base';
import DropdownComponent from "../../core/dropdownComponent";
import {StackActions, NavigationActions} from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'StudentManager'})],
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

//khi dung cac ham filter, map
//loi do underfine thi co the data k co du lieu or data k dung dang mang

const getValueValidityPicker2 = (dataArray2, id) => {
    console.log("dataArray2: " + JSON.stringify(dataArray2));
    let result2 = dataArray2.filter(obj => {
        console.log("obj2" + JSON.stringify(obj));
        return obj.key === id
    });
    return result2[0]['label'];
};

const specialized = [
    {
        label: 'Chọn chuyên ngành: ',
        key: 'key0'
    },
    {
        label: 'Lập trình máy tính, thiết bị di động',
        key: 'key1'
    },
    {
        label: 'Ứng dụng phần mềm',
        key: 'key2'
    },
    {
        label: 'Lập trình website',
        key: 'key3'
    },
    {
        label: 'Thiết kế đồ họa',
        key: 'key4'
    },
    {
        label: 'Digital marketing',
        key: 'key5'
    },
    {
        label: 'Kỹ sư an ninh mạng',
        key: 'key6'
    }
];

export default class EditStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            masv: "",
            displayName: "",
            tenlop: "",
            nganh: "",
            phoneNumber: "",
            email: "",
            password: "",
            type: "student",
            uid: "",

            validity: "",
            validity2: "",
            selectedValidity2: "",

            dataClass: []
        };

        thisState = this;

    }

    componentDidMount() {
        const {navigation} = this.props;
        const masv = navigation.getParam('masv', "Mã sinh viên");
        const displayName = navigation.getParam('displayName', "Tên sinh viên");
        const tenlop = navigation.getParam('tenlop', "Tên lớp");
        const nganh = navigation.getParam('nganh', "Chuyên ngành");
        const phoneNumber = navigation.getParam('phoneNumber', "Số điện thoại");
        const email = navigation.getParam('email', "Email");
        const password = navigation.getParam('password', "Mật khẩu");
        const type = navigation.getParam('type', "type");
        const uid = navigation.getParam('uid', "uid");

        console.log("uid: " + uid);
        thisState.setState({
            masv: masv,
            displayName: displayName,
            tenlop: tenlop,
            nganh: nganh,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            type: type,
            uid: uid,
        }, () => {
            console.log("uid222: " + this.state.uid);
        });


        let array = [];
        let classArray = [];
        firebaseApp.database().ref('school').child('class').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                classArray.push({
                    label: childData.tenlop,
                    key: childData.mamonhoc,
                });
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
            console.log("Class_Array" + JSON.stringify(classArray));
            thisState.setState({
                data: array,
                dataClass: classArray,
                isLoading: false,

            });
        });


    }

    onUpdate(){
        // if (this.state.masv.trim() === '' || this.state.displayName.trim() === '' ||
        //     this.state.phoneNumber.trim() === '' || this.state.email.trim() === '' || this.state.password.trim() === '' ) {
        //     Alert.alert('Please enter email and password');
        //     return
        // }

        const {masv, displayName, validity2, validity, phoneNumber, email, password } = this.state;
        if(inValidateText(masv)){
            alert(`Chưa nhập mã sinh viên`)
        }
        else if(inValidateText(displayName)){
            alert(`Chưa nhập tên sinh viên`)
        }
        else if(inValidateText(validity2)){
            alert(`Chưa chọn lớp`)
        }
        else if(inValidateText(validity)){
            alert(`Chưa chọn chuyên ngành`)
        }
        else if(inValidateText(phoneNumber)){
            alert(`Chưa nhập số điện thoại`)
        }
        else if(inValidateText(email)){
            alert(`Chưa nhập email`)
        }
        else if(inValidateText(password)){
            alert(`Chưa nhập mật khẩu`)
        }

        else {
            console.log("uid333: " + this.state.uid);
            firebaseApp.database().ref('school').child('student/' + this.state.uid).update({
                masv: this.state.masv,
                displayName: this.state.displayName,
                mamonhoc: this.state.selectedValidity2,
                tenlop: this.state.validity2,
                nganh: this.state.validity,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                uid: this.state.uid,
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
        const validity = getValueValidityPicker(specialized, key);
        this.setState({
            validity: getValueValidityPicker(specialized, key),
            selectedValidity: key,
        });
        console.log('Label_specialized: ' + validity);
        console.log('Key_specialized: ' + key)
    }

    renderItemPicker2() {
        let quantities = [];
        this.state.dataClass.map((item, i) => {
            quantities.push(
                <Item key={i} label={item.label} value={item.key}/>
            );
        });
        return quantities;
    }

    onItemChange2(key) {
        const validity2 = getValueValidityPicker2(this.state.dataClass, key);
        // const validity = getValueValidityPicker2(JSON.stringify(this.state.dataClass), key);
        this.setState({
            validity2: getValueValidityPicker2(this.state.dataClass, key),
            selectedValidity2: key,
        });
        console.log('Label_dataClass: ' + validity2);
        console.log('Key_dataClass: ' + key)
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
                    <Text style={styles.titleHeader}>Sửa Thông Tin Sinh Viên</Text>
                    <View style={styles.iconRight}  />
                </View>
                <ScrollView style={styles.keyboardView}>
                    <View style={styles.fake}>
                        <View style={styles.information}>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Mã sinh viên"
                                    editable={false}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.textInputName.focus()}
                                    onChangeText={(masv) => this.setState({masv})}
                                    value={this.state.masv}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Tên sinh viên"
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputName = input}
                                    //onSubmitEditing={() => this.textInputNganh.focus()}
                                    onChangeText={(displayName) => this.setState({displayName})}
                                    value={this.state.displayName}
                                />
                            </View>
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker2(this.state.dataClass)}
                                onValueChange={this.onItemChange2.bind(this)}
                                selectedValue={'' + this.state.selectedValidity2}
                            />
                            <DropdownComponent
                                style={styles.dropdown}
                                iosHeader="Validity"
                                renderList={this.renderItemPicker(specialized)}
                                onValueChange={this.onItemChange.bind(this)}
                                selectedValue={'' + this.state.selectedValidity}
                            />
                            {/*<View style={styles.content}>*/}
                            {/*    <TextInput*/}
                            {/*        style={styles.textInput}*/}
                            {/*        placeholder= "Chuyên ngành"*/}
                            {/*        returnKeyType="next"*/}
                            {/*        keyboardType="default"*/}
                            {/*        autoCorrect={false}*/}
                            {/*        autoCapitalize="none"*/}
                            {/*        ref={(input) => this.textInputNganh = input}*/}
                            {/*        onSubmitEditing={() => this.textInputPhone.focus()}*/}
                            {/*        onChangeText={(specialized) => this.setState({specialized})}*/}
                            {/*    />*/}
                            {/*</View>*/}
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Số điện thoại"
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    //ref={(input) => this.textInputPhone = input}
                                    onSubmitEditing={() => this.textInputEmail.focus()}
                                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                    value={this.state.phoneNumber}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Email"
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputEmail = input}
                                    onSubmitEditing={() => this.textInputPass.focus()}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= "Mật khẩu"
                                    returnKeyType="go"
                                    keyboardType="default"
                                    secureTextEntry
                                    autoCorrect={false}
                                    ref={(input) => this.textInputPass = input}
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                />
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnAdd} onPress={() => this.onUpdate()}>
                                <Text style={styles.textAdd}>CẬP NHẬT</Text>
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