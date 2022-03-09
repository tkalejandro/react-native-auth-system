import { Formik } from "formik"
import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import logo from "../assets/hotel.jpeg"
import * as yup from 'yup'
import * as authAction from "../redux/actions/authAction"
import { useDispatch } from "react-redux"

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})
const LoginScreen = navData => {
    const dispatch = useDispatch()

    return (

        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    dispatch(authAction.loginUser(values))
                        .then(async result => {
                            if (result.success) {
                                try{
                                    await AsyncStorage.setItem('token', result.token)
                                    navData.navigation.navigate('Dashboard')
                                } catch(err) {
                                    console.log(err)
                                    
                                }
                                
                            } else {
                                Alert.alert(result.message)
                            }

                        })
                        .catch(err => console.log(err))
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image style={styles.image} source={logo} />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#fff"
                                keyboardType="email-address"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                            />
                            <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                            />
                            <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={props.handleSubmit}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Dont have an account?</Text>
                            <TouchableOpacity
                                //? NAV DATA is here because props i already declared.
                                onPress={() => navData.navigation.navigate('Register')}
                                style={styles.registerButton}>
                                <Text >Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff'
    },
    logo: {
        alignItems: "center",
        marginBottom: 40
    },
    image: {
        width: 250,
        height: 150
    },
    input: {
        width: 300,
        backgroundColor: "#b6bfc4",
        borderRadius: 25,
        padding: 16,
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#738289',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: '#ffffff',
        textAlign: "center",
    },
    registerContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: "row"
    },
    registerText: {
        color: "#738289",
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerButton: {
        fontSize: 16,
    },
    error: {
        color: "red"
    }
})

export default LoginScreen

