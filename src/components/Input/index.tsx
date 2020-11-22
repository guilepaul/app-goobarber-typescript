import React, {useEffect, useRef} from 'react'
import {TextInputProps} from 'react-native'
import {useField} from '@unform/core'

import * as S from './styles'

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {

    const InputElementRef = useRef<any>(null);

    const {registerField, defaultValue = '', fieldName, error} = useField(name)
    const InputValueRef = useRef<InputValueReference>({ value: defaultValue});


    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: InputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                InputElementRef.current.value = value;
                InputElementRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                InputValueRef.current.value = '';
                InputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField])
    return(
        <S.Container>
            <S.Icon name={icon} size={20} color='#666360' />
            <S.TextInput 
            placeholderTextColor="#666360"
            defaultValue={defaultValue}
            keyboardAppearance="dark"
            onChangeText={value => {
                InputValueRef.current.value = value;
            }}
            {...rest}
            />
        </S.Container>
    )
}

export default Input