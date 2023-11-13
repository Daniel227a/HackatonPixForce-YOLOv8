import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../views/Home'
import Classificar from '../views/Classificar'
import Perfil from '../views/Perfil'


const Tab = createBottomTabNavigator()

export default () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
            headerShown: false,
            tabBarActiveTintColor: '#A0A0A0',
            tabBarInactiveTintColor: '#E1E5E4'
        })}>
        <Tab.Screen name="Home" component={Home} 
        options={{tabBarShowLabel: false, tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={35} />
        )}}/>
        
        <Tab.Screen name="Classificar" component={Classificar}
        options={{tabBarShowLabel: false, tabBarIcon: ({ color }) => (
            <Ionicons name="camera" color={color} size={40} />
        )}}/>
        
        <Tab.Screen name="Perfil" component={Perfil}
        options={{tabBarShowLabel: false, tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={35} />
        )}}/>
    </Tab.Navigator>
)