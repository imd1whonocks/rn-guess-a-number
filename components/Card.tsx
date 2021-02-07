import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type CardProps = {
    children: React.ReactNode,
    style?: {}
}

const Card = ({children, style}: CardProps) => {
    return (
        <View style={{...styles.card, ...style}}>
            {children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 5,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})
