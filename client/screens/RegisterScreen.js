
import React from "react"
import { Formik } from "formik"
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native"
import logo from "../assets/hotel.jpeg"
import * as yup from 'yup'

const formSchema = yup.object({
    fullName: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})
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
                validationSchema={formSchema}
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
                                value={props.values.fullName}
                                onBlur={props.handleBlur('fullName')}
                            />
                            <Text style={styles.error}>{props.touched.fullName && props.errors.fullName}</Text>
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
    },
    error: {
        color: "red"
    }
})

export default RegisterScreen

