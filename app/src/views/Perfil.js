import React, { useState } from "react"
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native'

initialSenha = {
    novaSenha: '',
    confirmNovaSenha: '',
}

export default () => {
    const navigation = useNavigation()
    const [redefinirSenha, setRedefinirSenha] = useState(false)

    const [senhaState, setSenhaState] = useState(initialSenha)

    const validForm = senhaState.novaSenha === senhaState.confirmNovaSenha && senhaState.novaSenha.length >= 6 ? true : false

    return (   
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <View>
                    <View>
                        <View style={styles.view}>
                            <View style={styles.viewTitle}>
                                <Text style={styles.textTitle}>Meu Perfil</Text>
                            </View>
                        </View>
                        
                        <View style={styles.view}>
                            <View style={{margin: 15}}>
                                <Text style={styles.text}>Nome</Text>
                                <Text style={styles.textInfo}>lucas nardelli</Text>
                            </View>
                        </View>

                        <View style={styles.view}>
                            <View style={{margin: 15}}>
                                <Text style={styles.text}>E-mail</Text>
                                <Text style={styles.textInfo}>lucas@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View>
                        { redefinirSenha && 
                            <View style={styles.viewInput}>
                                <TextInput placeholder='Digite sua nova senha' style={styles.input}
                                onChangeText={novaSenha => setSenhaState({ ...senhaState, novaSenha })} 
                                secureTextEntry={true}
                                />
                                <TextInput placeholder='Confirme sua nova senha' style={styles.input}
                                onChangeText={confirmNovaSenha => setSenhaState({ ...senhaState, confirmNovaSenha })} 
                                secureTextEntry={true}
                                />
                            </View>
                        }
                    </View>
                
                </View>
            </ScrollView>
            <View style={styles.viewButton}>

                { !redefinirSenha ?
                <>
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                    navigation.navigate('Auth')}}>
                        <Text style={styles.textButton}>Sair da conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => setRedefinirSenha(!redefinirSenha)}>
                        <Text style={styles.textButton}>Alterar senha</Text>
                    </TouchableOpacity>
                </>
                :
                <TouchableOpacity style={[styles.button, {width: '70%'}, validForm? {} : {backgroundColor: '#AAA'}]}
                        onPress={() => setRedefinirSenha(!redefinirSenha)}
                        disabled={!validForm}>
                        <Text style={styles.textButton}>Confirmar Alteração</Text>
                </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
        
        
)}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',

    },
    view: {
        borderBottomColor: '#a0a0a0',
        borderBottomWidth: 1,
    },
    viewTitle: {
        padding: 15,
        alignItems: 'center',
    },
    textTitle: {
        color: '#4A4A4A',
        fontSize: 30,
        lineHeight: 45,
        fontWeight: 'bold',
        color: '#5cc6ba'
    },
    text: {
        color: '#4A4A4A',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textInfo: {
        color: '#4A4A4A',
        fontSize: 20,
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
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    input: {
        color: '#4A4A4A',
        backgroundColor: '#E1E5E4',
        marginVertical: 5,
        padding: 15,
        width: '90%',
        fontSize: 20,
        borderRadius: 30
    },
    viewInput: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 30,
    },
})