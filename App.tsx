import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fonts = {
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
}

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [fontsLoaded] = useFonts(fonts);
  const [guessRound, setGuessRound] = useState(0);

  const handleNewGame = () => {
    setGuessRound(0)
    setSelectedNumber(null);
  }
  const handleStartGame = (selectedNumber: number) => {
    setSelectedNumber(selectedNumber);
    setGuessRound(0)
  } 
  const handleGameOver = (noOfGuess: number) => {
    setGuessRound(noOfGuess);
  }
  let content = <StartGameScreen onStartGame={handleStartGame} />
  if (selectedNumber && guessRound <=0)  {
    content = <GameScreen userChoice={selectedNumber} onGameOver={handleGameOver} />
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen 
        onStartNewGame={handleNewGame} 
        userChoice={selectedNumber} 
        noOfRounds={guessRound} 
      />
    )
  }
  if (!fontsLoaded) {
    <AppLoading />
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number'/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
