import React from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'

import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

type GameOverScreenProps = {
    noOfRounds: number,
    userChoice: number | null,
    onStartNewGame: Function,
}

const GameOverScreen = ({noOfRounds, userChoice, onStartNewGame}: GameOverScreenProps) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over</TitleText>
            <View style={styles.imgContainer}>
                <Image 
                    source={require('../assets/success.png')} 
                    style={styles.image}
                    resizeMode={'cover'}
                />
            </View>
            <View style={styles.textContainer}>
                <BodyText style={styles.text}>Your phone took <Text style={styles.highlight}>
                    {noOfRounds}
                    </Text> attempts to guess the number <Text style={styles.highlight}>{userChoice}</Text>
                </BodyText>
            </View>
            <MainButton 
                onPress={() => onStartNewGame()}
            >NEW GAME</MainButton>
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'black',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        marginHorizontal: 20,
        marginBottom: 30
    },
    text: {
        fontSize: 16,
        // fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    highlight: {
        color: Colors.primary
    }
})
