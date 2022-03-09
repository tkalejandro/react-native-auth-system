import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";



const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    //? For some reason NULL wasnt working, so i went with an empty <Text>
    return(
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerLeft: () => <Text></Text>}}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator