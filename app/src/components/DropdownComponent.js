import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ModelsContext } from "../contexts/ModelsContext";


function populaData (modelos) {
    const data = [];

    const modelosLista = modelos
    modelosLista.map((item) => {
        if(item.downloaded){
            data.push(item)
        }
    })
    return data
}

const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const { modelos } = useContext(ModelsContext)

    const data = populaData(modelos)

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="nome"
                valueField="nome"
                placeholder={!isFocus ? 'Selecione o modelo' : '...'}
                searchPlaceholder="Procure..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
container: {
    backgroundColor: 'white',
    padding: 16,
    width: '90%',
},
dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
},
icon: {
    marginRight: 5,
},
label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
},
placeholderStyle: {
    color: '#000',
    fontSize: 16,
},
selectedTextStyle: {
    color: '#000',
    fontSize: 16,
},
iconStyle: {
    width: 20,
    height: 20,
},
inputSearchStyle: {
    color: '#000',
    height: 40,
    fontSize: 16,
},
itemTextStyle: {
    color: '#000',
}
});