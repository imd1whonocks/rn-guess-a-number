
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type TitleTextProp = {
    style?: object,
    children?: React.ReactNode,
}

const TitleText = ({style, children}: TitleTextProp) => {
    return (
        <View>
            <Text style={{...styles.text, ...style}}>{children}</Text>
        </View>
    )
}

export default TitleText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
})
