
import React from "react"
import { Formik } from "formik"
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native"
import logo from "../assets/hotel.jpeg"
const RegisterScreen = (navData) => {
    return (
        <ScrollView
        contentContainerStyle={styles.container}
        >
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    password: ""
                }}
                onSubmit={(values) => {
                    console.log(values)
                    navData.navigation.navigate('Dashboard')
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image style={styles.image} source={logo}/>
                        </View>
                        <View>
                        <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor="#fff"
                                onChangeText={props.handleChange('fullName')}
                                value={props.values.email}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#fff"
                                keyboardType="email-address"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>
                        <TouchableOpacity 
                         onPress={props.handleSubmit}
                        style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Have an account?</Text>
                            <TouchableOpacity 
                            onPress={() => navData.navigation.navigate('Login')}
                            style={styles.registerButton}>
                                <Text >Login</Text>
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
    }
})

export default RegisterScreen

