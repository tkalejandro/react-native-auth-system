import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import jwtDecode from "jwt-decode"

const DashboardScreen = (props) => {
    const [user, setUser] = useState({ email: "", fullName: "", _id: "" })
    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        if (!token) {
            //? Lets redirect to Login
            props.navigation.navigate('Login')
        }
        const decoded = jwtDecode(token)
        setUser({
            email: decoded.email,
            fullName: decoded.fullName,
            _id: decoded._id
        })
        console.log(decoded)

    }
    const logout = () => {
        AsyncStorage.removeItem('token')
        .then(() => {
            //? Cant go back!
            props.navigation.replace('Login')
        } )
        .catch(err => console.log(err))
    }
    useEffect(() => {
        loadProfile()
    }, [])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Welcome {user.fullName}</Text>
            </View>
            <View>
                <Text style={styles.text}>This is your email: {user.email}</Text>
            </View>
            <View>
                <Text style={styles.text}>This is your ID: {user._id}</Text>
            </View>
            <View>
                <Button title="LogOut"
                    onPress={logout}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 40,
    },
    text: {
        textAlign: "center",
        fontSize: 20,
    }
})

export default DashboardScreen

