import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from '../constants/colors'

type MainButtonProps = {
    onPress: Function,
    children?: React.ReactNode,
    btnStyle?: object,
    textStyle?: object,
}

const MainButton = ({onPress, children, btnStyle, textStyle}: MainButtonProps) => {
    return (
        <TouchableOpacity onPress={() => onPress()} activeOpacity={0.6}>
            <View style={{...styles.btn, ...btnStyle}}>
                <Text style={{...styles.btnText, ...textStyle}}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MainButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    btnText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
    }
})
