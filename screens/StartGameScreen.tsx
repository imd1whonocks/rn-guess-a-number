import React, { useState } from 'react'
import { 
    Alert,
    Button, 
    Keyboard, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback, 
    View 
} from 'react-native'

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors'

type StartGameScreenProps = {
    onStartGame: Function
}

const StartGameScreen = ({onStartGame}: StartGameScreenProps) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<number>()
    const handleInputChange = (text: string) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    }
    const handleResetInput = () => {
        setEnteredValue('');
    }
    const handleConfirmInput = () => {
        const choosenNumber = +enteredValue;
        if (isNaN(choosenNumber) || choosenNumber <=0 || choosenNumber > 99 ) {
            Alert.alert(
                'Invalid number', 
                'Number has to be between 1 and 99', 
                [{ text: 'Okay', style: 'destructive', onPress: handleResetInput}]
            )
            return
        }
        setConfirmed(true);
        setSelectedNumber(+enteredValue);
        setEnteredValue('');
        Keyboard.dismiss();
    }
    let confirmedText;
    if (confirmed) {
        confirmedText = (
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton
                    onPress={() => onStartGame(selectedNumber)}
                >START GAME</MainButton>
            </Card>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input 
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize={'none'}
                        keyboardType={'number-pad'}
                        maxLength={2}
                        onChangeText={handleInputChange}
                        value={enteredValue}
                    />
                    <View style={styles.btnContainer}>
                        <View style={styles.btn}>
                            <Button 
                                title='Reset' 
                                onPress={handleResetInput} 
                                color={Colors.accent}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button 
                                title='Confirm' 
                                onPress={handleConfirmInput} 
                                color={Colors.primary} 
                            />
                        </View>
                    </View>
                </Card>
                {confirmedText}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        marginVertical: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    btn: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen
