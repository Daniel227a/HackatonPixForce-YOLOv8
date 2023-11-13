import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

import Imagem from '../../public/images/AI.png'

export default props => (
        <View style={[styles.header, props.style]} >
            <Image source={Imagem} resizeMode='contain' resizeMethod='resize' style={styles.imagem}/>
            <Text style={styles.text}>Hackaton PixForce</Text>
        </View>
)

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    imagem: {
        marginRight: 10,
        height: 40,
        width: 40,
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})