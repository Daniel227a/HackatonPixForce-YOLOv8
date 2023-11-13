import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { ModelsProvider } from './contexts/ModelsContext';
import { DownloadProvider } from './contexts/DownloadContexts';

import Navigate from './navigate'
import Auth from './views/Auth'
import Modelo from './views/Modelo';
import Foto from './views/Foto';

const Stack = createStackNavigator();


export default function () {
    return(
        <DownloadProvider>
            <ModelsProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Auth' 
                        screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name='Auth' component={Auth}/>
                        <Stack.Screen name='Navigate' component={Navigate} />
                        <Stack.Screen name='Modelo' component={Modelo} />
                        <Stack.Screen name='Foto' component={Foto} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ModelsProvider>
        </DownloadProvider>
        
    ) 
}
