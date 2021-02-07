import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

type InputProps = TextInputProps & {
    style?: object
}

const Input = ({style, ...otherProps}: InputProps) => {
    return (
        <TextInput  {...otherProps} style={{...styles.input, ...style}}/>
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        height: 30,
        marginVertical: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    }
})
