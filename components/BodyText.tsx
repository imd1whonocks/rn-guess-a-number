import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type BodyTextProp = {
    style?: object,
    children?: React.ReactNode,
}

const BodyText = ({style, children}: BodyTextProp) => {
    return (
        <View>
            <Text style={{...styles.text, ...style}}>{children}</Text>
        </View>
    )
}

export default BodyText

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
})
