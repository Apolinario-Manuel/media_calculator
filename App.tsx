import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Alert , TouchableWithoutFeedback, Keyboard , FlatList, View, Text, TextInput } from 'react-native'

export default function App(){

    const [values, setValues] = useState<number[]>([])
    const [numberInsert, setNumberInsert] = useState<string>('')


    const calcMedia = () => {
        let sum = 0

        for(let i = 0; i < values.length; i++)
            sum += values[i]

        Alert.alert(
            "Resultado",
            `Sua média é ${(sum / values.length).toFixed(3)}`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    const handleValues = () => {
        let arr = values
        arr.push(parseInt(numberInsert))
        setValues(arr)
        setValues([...values])
        setNumberInsert('')
    }

    const clearList = () => {
        setValues([])
    }

    return(
        <View style={styles.container} >
            
                <View style={styles.content} >
                    
                    <Text style={styles.age} >Idades </Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form} >
                        <TextInput 
                            style={styles.input}
                            keyboardType='numeric'
                            value={numberInsert}
                            onChangeText={(value: string) => setNumberInsert(value)}  
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleValues}
                            disabled={!numberInsert}
                        >
                            <Text style={styles.textButton} > Inserir </Text>
                        </TouchableOpacity>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.list}>
                        <FlatList
                            data={values}
                            renderItem={({ item, index })=> (
                                <Text key={index} style={[
                                    styles.textList, 
                                    { color: (item < 20) ? '#1DA1F2': (item < 50 ) ? '#d2afff': '#ffa500'}
                                ]} > {item} </Text>
                            )}
                            
                        />
                    </View>
                    <TouchableOpacity style={[
                            styles.buttonMedia, 
                            (values.length == 0) ? { backgroundColor: '#CFCFCF'}: {backgroundColor: '#3498DB' }
                        ]} 
                        disabled={values.length == 0} 
                        onPress={calcMedia} 
                    >
                        <Text style={styles.textButtonMedia} > Calcular Média </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonClear} onPress={clearList} >
                        <Text style={styles.textButtonMedia} > Limpar Lista </Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#2C3E50'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    age: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        backgroundColor: '#fff',
        width: "45%",
        padding: 20,
        fontSize: 20
    },
    button: {
        backgroundColor: '#1ABC9C',
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: '#353535',
        fontSize: 20,
    },
    list:{
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 10,
        
    },
    textList: {
        flex: 1,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3
    },
    buttonMedia: {
        padding: 15,
        marginVertical: 5
    },
    buttonClear: {
        backgroundColor: 'red',
        padding: 15,
        marginVertical: 5
    },
    textButtonMedia: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    }
})