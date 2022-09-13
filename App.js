import {Alert, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";

export default function App() {
    const [result, setResult] = useState('0');
    const [amount, setAmount] = useState('');
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState('CHF');
    const to = 'EUR'

    const fetchCodes = () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "bCpvxC9e6uS46Z2SVL7hdlqhHc7OV9g7");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
            .then(response => response.text())
            .then(result => setCodes(Object.keys(JSON.parse(result).symbols)))
            .catch(error => {
                Alert.alert('Error', error);
                console.log(error);
            });
    }

    const fetchConvert = () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "bCpvxC9e6uS46Z2SVL7hdlqhHc7OV9g7");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        let amount1 = parseFloat(amount);

        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}r&from=${selectedCode}&amount=${amount1}`, requestOptions)
            .then(response => response.text())
            .then(result => setResult(JSON.parse(result).result))
            .catch(error => {
                Alert.alert('Error', error);
                console.log(error);
            });
    }

    //TODO dirty code ?
    // Fetches the symbols only if the list is empty
    useEffect(() => {
        if (codes.length === 0) {
            fetchCodes();
        }
    });

    return (
        <View style={styles.container}>
            <Image
                style={{width: 200, height: 200}}
                source={
                    {uri: 'https://png.pngtree.com/png-vector/20211006/ourlarge/pngtree-euro-symbol-currency-png-image_3974231.png'}}
            />
            <Text style={styles.result}>
                {result} €
            </Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.textInput}
                    keyboardType={"number-pad"}
                    onChangeText={text => setAmount(text)}
                    placeholder={'Amount'}
                    placeholderTextColor={'grey'}
                />
                <Picker
                    placeholder='CHF'
                    selectedValue={selectedCode}
                    onValueChange={(itemValue) =>
                        setSelectedCode(itemValue)
                    }
                    style={styles.pickerInput}>
                    {
                        codes.map((code) => <Picker.Item label={code} value={code}/>)
                    }
                </Picker>
            </View>
            <Button title='Convert' onPress={fetchConvert}/>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 11,
        marginTop: 66,
    },
    result: {
        fontSize: 24,
        margin: 11,

    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 16,
        padding: 5,
        marginTop: 11,
        minWidth: 200,
        marginBottom: 5
    },
    pickerInput: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 16,
        padding: 5,
        marginTop: 11,
        minWidth: 100,
        marginBottom: 5
    },
});
