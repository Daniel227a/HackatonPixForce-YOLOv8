import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const initialState = {
    name: 'Lucas',
    email: 'lucas@gmail.com',
    password: '123456',
    confirmPassword: '123456',
    stageNew: false
}

// const initialState = {
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     stageNew: false
// }

function checkNome (state) {
    if (state.name.length < 3){
        return (
            <View style={styles.viewCheck}>
                <Ionicons name="alert-circle-outline" color='#EFB004' size={22}/>
                <Text style={styles.textCheck}>O nome precisa ter pelo menos 3 caracteres</Text>
            </View>
        )
    }
}

function checkEmail (state) {
    if (!state.email.includes('@')){
        return (
            <View style={styles.viewCheck}>
                <Ionicons name="alert-circle-outline" color='#EFB004' size={22}/>
                <Text style={styles.textCheck}>Insira um e-mail válido</Text>
            </View>
        )
    }
}

function checkPassword (state) {
    if (state.password.length < 6) {
        return (
            <View style={styles.viewCheck}>
                <Ionicons name="alert-circle-outline" color='#EFB004' size={22}/>
                <Text style={styles.textCheck}>A senha previsa ter pelo menos 6 caracteres</Text>
            </View>
        )
    }
}

function checkConfirmPassword (state) {
    if(state.password !== state.confirmPassword){
        return (
            <View style={styles.viewCheck}>
                <Ionicons name="alert-circle-outline" color='#EFB004' size={22}/>
                <Text style={styles.textCheck}>As senhas precisam ser iguais</Text>
            </View>
        )
    }
}

export default (props) => {
    const navigation = useNavigation()

    const [state, setState] = useState(initialState)

    const validations = []
    validations.push(state.email && state.email.includes('@'))
    validations.push(state.password && state.password.length >= 6)

    if(state.stageNew) {
        validations.push(state.name && state.name.trim().length >= 3)
        validations.push(state.password === state.confirmPassword)
    }

    const validForm = validations.reduce((total, atual) => total && atual) 
    return( 
        <SafeAreaView style={styles.safeArea}>
                <Header/>
                <View style={styles.viewAuth}>
                    {state.stageNew &&
                    <TextInput placeholder='Nome' style={styles.input}
                        value={state.name} 
                        onChangeText={name => setState({ ...state,  name })}
                    />
                    }
                    <View style={styles.checks}>
                    {
                        state.stageNew && checkNome(state)
                    }
                    </View>
                    <TextInput placeholder='E-mail' style={styles.input}  
                        value={state.email} 
                        onChangeText={email => setState({ ...state, email })}
                    />
                    <View style={styles.checks}>
                    {
                        state.stageNew && checkEmail(state)
                    }
                    </View>
                    <TextInput placeholder='Senha' style={styles.input}
                        value={state.password} 
                        onChangeText={password => setState({ ...state, password })}
                        secureTextEntry={true}
                    />
                    <View style={styles.checks}>
                    {
                        state.stageNew && checkPassword(state)
                    }
                    </View>
                    {state.stageNew &&
                    <TextInput placeholder='Confirme sua senha' style={styles.input}
                        value={state.confirmPassword} 
                        onChangeText={confirmPassword => setState({ ...state, confirmPassword })}
                        secureTextEntry={true}
                    />
                    }
                    <View style={styles.checks}>
                    {
                        state.stageNew && checkConfirmPassword(state)
                    }
                    </View>

                    <TouchableOpacity style={[styles.button, validForm? {} : {backgroundColor: '#AAA'}]}
                        disabled={!validForm} onPress={() => {
                            navigation.navigate('Navigate')}}>
                        <Text style={styles.textButton}>{state.stageNew ? 'Registrar' : 'Acessar'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.viewFooter} onPress={() => setState({ ...state, stageNew: !state.stageNew })}>
                    <Text style={styles.footer}>{state.stageNew ?'Já possui conta?' : 'Não tenho uma conta. Toque para criar uma agora'}</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    safeArea:{ 
        flex: 1,
        display: 'flex'
    },
    viewAuth: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',        
    },
    input: {
        backgroundColor: '#E1E5E4',
        color: '#000',
        marginVertical: 5,
        padding: 15,
        width: '90%',
        fontSize: 20,
        borderRadius: 30
    },
    button: {
        backgroundColor: '#5CC6BA',
        marginVertical: 5,
        padding: 15,
        width: '90%',
        borderRadius: 30,
        alignItems: 'center'
    },
    textButton: {
        color: '#000',
        fontSize: 20,
        color: '#FFF'
    },
    checks: {
        alignItems: 'flex-start',
        width: '90%',
    },
    viewCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textCheck: {
        color: '#000',
        marginLeft: 5,
        fontSize: 15,
    },
    viewFooter: {
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5CC6BA',
        borderTopWidth: 0.5
    },
    footer: {
        color: '#000',
        fontSize: 16,
    }
})