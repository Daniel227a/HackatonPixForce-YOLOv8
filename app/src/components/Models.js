import React, { useContext } from "react"
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ModelsContext } from "../contexts/ModelsContext";

const gerarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function geraModel (item, props) {
    if(props.text === "Sua Biblioteca"){
        if(item.downloaded) {
            return (
                String(item.nome).toLocaleLowerCase().includes(String(props.filtro.nome).toLocaleLowerCase()) &&
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('Modelo', item)}}>
                    <View style={styles.modelo}>
                        <Image source={item.imagem}/>
                        <Text style={styles.textModels}>{item.nome}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    } else {
        return (
            String(item.nome).toLocaleLowerCase().includes(String(props.filtro.nome).toLocaleLowerCase()) &&
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Modelo', item)}}>
                <View style={styles.modelo}>
                    <Image source={item.imagem}/>
                    <Text style={styles.textModels}>{item.nome}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default props => {
    const { modelos } = useContext(ModelsContext)
    return(
        <View style={[styles.container, props.style]}>
            <View style={styles.viewStore}>
                <Ionicons name={props.nomeIcon} color='#5CC6BA' size={50}/>
                <Text style={styles.textStore}>{props.text}</Text>
            </View>
            <View style={styles.displayModels}>
                <FlatList 
                style={styles.viewModels}
                showsHorizontalScrollIndicator={false}
                data={ modelos }
                keyExtractor={(item) => String(`${item.nome}${gerarNumeroAleatorio(1, 500)}`)}
                horizontal
                renderItem={({item}) => geraModel(item, props)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        width: '100%',
        height: '50%',
    },
    viewStore: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    textStore: {
        fontSize: 20,
        color: '#000',
        marginLeft: 10
    },
    displayModels: {
        backgroundColor: '#E1E5E4',
        height: 160,
        flex: 1,
        width: '100%',
        borderRadius: 20
    },
    viewModels: {
        flex: 1,
        flexDirection: 'row',
    },
    modelo: {
        flex: 1,
        margin: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textModels: {
        color: '#4F4F4F',
        fontSize: 18,
        lineHeight: 28,
        fontWeight: 'bold',
    }
})