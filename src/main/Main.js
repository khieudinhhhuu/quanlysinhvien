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
    Modal
} from "react-native";
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import * as firebase from "firebase";
import Splash from "../screen/Splash";
import MenuTeacher from "../screen/MenuTeacher";
import ClassManager from "../screen/ClassManager";
import AddClass from "../screen/AddClass";
import EditClass from "../screen/EditClass";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import MenuStudent from "../screen/student/MenuStudent";
import InforStudent from "../screen/student/InforStudent";
import StudentManager from "../screen/teacher/StudentManager";
import AddStudent from "../screen/teacher/AddStudent";
import InforClass from "../screen/teacher/InforClass";
import ListStudentOfClass from "../screen/teacher/ListStudentOfClass";
import InforTeacher from "../screen/teacher/InforTeacher";
import InforStudent2 from "../screen/teacher/InforStudent2";
import EditStudent from "../screen/teacher/EditStudent";
import Schedule from "../screen/student/Schedule";

class App extends Component {

    render() {
        return <View style={styles.container}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});

const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        }
    },
    MenuTeacher: {
        screen: MenuTeacher,
        navigationOptions: {
            header: null
        }
    },
    InforTeacher: {
        screen: InforTeacher,
        navigationOptions: {
            header: null
        }
    },
    ClassManager: {
        screen: ClassManager,
        navigationOptions: {
            header: null
        }
    },
    StudentManager: {
        screen: StudentManager,
        navigationOptions: {
            header: null
        }
    },
    InforStudent2: {
        screen: InforStudent2,
        navigationOptions: {
            header: null
        }
    },
    AddClass: {
        screen: AddClass,
        navigationOptions: {
            header: null
        }
    },
    EditStudent: {
        screen: EditStudent,
        navigationOptions: {
            header: null
        }
    },
    InforClass: {
        screen: InforClass,
        navigationOptions: {
            header: null
        }
    },
    ListStudentOfClass: {
        screen: ListStudentOfClass,
        navigationOptions: {
            header: null
        }
    },
    AddStudent: {
        screen: AddStudent,
        navigationOptions: {
            header: null
        }
    },
    EditClass: {
        screen: EditClass,
        navigationOptions: {
            header: null
        }
    },
    MenuStudent: {
        screen: MenuStudent,
        navigationOptions: {
            header: null
        }
    },
    InforStudent: {
        screen: InforStudent,
        navigationOptions: {
            header: null
        }
    },
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            header: null
        }
    },
});

// console.disableYellowBox = true;
// StatusBar.setHidden(true);

export default createAppContainer(AppNavigator);