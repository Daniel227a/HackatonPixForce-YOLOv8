import React, { useState } from "react"
import {Text, StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import DropdownComponent from "../components/DropdownComponent";

export default () => {
    const [imgURL, setImgURL] = useState('')
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.view}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Classi1ficar</Text>
                </View>
            </View>
            <View style={styles.mainView}>
                <Text style={styles.text}>Você acertou 15/50</Text>
                
                
                <Image
                    style={styles.imagem}
                    source={require('../../public/images/result.png')}
                    resizeMode="contain"
                />
                
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} 
                        onPress={() => {navigation.navigate('Foto')}}
                        >
                        <Text style={styles.textButton}>Gabarito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                        onPress={() => {navigation.navigate('Foto')}}
                        >
                        <Text style={styles.textButton}>Resposta</Text>
                    </TouchableOpacity>
                </View>
                
                
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    view: {
        borderBottomColor: '#a0a0a0',
        borderBottomWidth: 1,
    },
    viewTitle: {
        padding: 15,
        alignItems: 'center',
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5cc6ba'
    },
    text: {
        fontSize: 25,
        lineHeight:58,
        fontWeight: 'bold',
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#5CC6BA',
        marginVertical: 5,
        padding: 15,
        width: '40%',
        borderRadius: 15,
        alignItems: 'center',
    },
    textButton: {
        fontSize: 20,
        color: '#FFF'
    },
    text: {
        fontSize: 20,
        color: '#5cc6ba'
    },
    input: {
        backgroundColor: '#E1E5E4',
        marginVertical: 5,
        padding: 15,
        width: '90%',
        fontSize: 20,
        borderRadius: 30
    },
    cameraPosition: {
        position: 'absolute',
        top: 75,
        left: 25,
    },
    galeriaPosition: {
        position: 'absolute',
        top: 75,
        right: 25,
    },
    imagem: {
        width: '95%',
        height: 350,
        alignSelf: 'center',
        marginTop: 50,
    }
})