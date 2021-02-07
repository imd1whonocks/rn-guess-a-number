import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

type GameScreenProps = {
    userChoice: number,
    onGameOver: Function,
}

const renderListItems = (value: number, noOfRound: number): React.ReactNode => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{noOfRound}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    )
}

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rdNum = Math.floor(Math.random() * (max - min)) + min;
    if (rdNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rdNum;
    }
}

const GameScreen = ({userChoice, onGameOver}: GameScreenProps) => {
    const initialGuess = generateRandomBetween(1, 99, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(99);
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    },[currentGuess, onGameOver, userChoice])
    const handleNextGuess = (direction: 'lower' | 'higher') => {
        if (
            (direction === 'lower' && currentGuess < userChoice) || 
            (direction === 'higher' && currentGuess > userChoice)
        ) {
            Alert.alert(
                'Don\'t lie !!!', 
                'You know that this is wrong...', 
                [{ text: 'Sorry!', style: 'cancel'}]
            )
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else if (direction === 'higher') {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(pastGuesses => [nextNumber, ...pastGuesses])
    }
    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton
                    onPress={() => handleNextGuess('lower')}
                >
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton
                    onPress={() => handleNextGuess('higher')}
                >
                     <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: '80%',
        flex: 1,
        marginTop: 20,
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    listItem: {
        padding: 15,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }
})
