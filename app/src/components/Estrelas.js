import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

function nome (i, quantidade) {
    if (i > quantidade) {
        return "star-outline"
    } else {
        return "star"
    }
}

export default function Estrelas({
    quantidade: quantidadeAntiga,
    editavel = false,
    grande = false,
}) {
    const [quantidade, setQuantidade] = useState(quantidadeAntiga)

    const RenderEstrelas = () => {
        const listaEstrelas = []

        for(let i = 0 ; i < 5 ; i++){
            listaEstrelas.push(
                <Ionicons
                    name={nome(i, quantidade)} 
                    color='#FF8000' 
                    size={45}
                    key={i}
                    onPress={() => setQuantidade(i)}
                    desabilitada={!editavel}
                    preenchida={i < quantidade}
                    grande={grande}
                />
            )
        }
        return listaEstrelas

    }
    return <View style={styles.estrelas}>
            <RenderEstrelas />
        </View>
}

const styles = StyleSheet.create({
    estrelas: {
        flexDirection: 'row',
        marginTop: 10,
    }
})