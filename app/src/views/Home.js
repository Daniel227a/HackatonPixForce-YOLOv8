import React, { useContext, useState } from "react"
import { SafeAreaView, View, StyleSheet, TextInput, ScrollView, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native';

import Header from '../components/Header'
import Models from '../components/Models'

export default props => {

    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const [filtro, setFiltro] = useState({
        nome: '',
        x: true,
        y: false,
    })
    
    return (
    <SafeAreaView style={styles.safeArea}>
        <Header style={styles.header}/>
        <View style={styles.scrollView}>
            <Text style={styles.textSearch}>Bem vindo!</Text>
        </View>
        <View style={styles.View}>
            <Text style={styles.text}>Para realizar a correção entre na camera abaixo, tire foto do gabarito e em seguida tire foto do simulado que deve ser corrigido.</Text>
        </View>
        
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    safeArea:{ 
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    header: {
        borderBottomColor: '#E1E5E4',
        borderBottomWidth: 1
    },
    viewSearch: {
        backgroundColor: '#E1E5E4',
        flexDirection: 'row',
        marginTop: 30,
        width: '90%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    textSearch: {
        color: '#5cc6ba',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 46,
        marginTop: 10,
    },
    text: {
        color: '#4F4F4F',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 10,
        textAlign: 'justify',
        marginHorizontal: 20,
    },
    mrgin: {
        marginBottom: 20,
    },
    scrollView: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        marginTop: 10,
    },
    View: {
        width: '90%',
        height: '80%',
        alignItems: 'center',
    }
})