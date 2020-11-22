import React, {
    useEffect, 
    useRef, 
    useImperativeHandle, 
    forwardRef, 
    useState, 
    useCallback
} from 'react'
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

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({
    name, 
    icon, 
    ...rest
}, ref) => {

    const InputElementRef = useRef<any>(null);

    const {registerField, defaultValue = '', fieldName, error} = useField(name)
    const InputValueRef = useRef<InputValueReference>({ value: defaultValue});

    const [isFocused, setIsFocused] = useState(false)
    const [isField, setIsField] = useState(false)

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsField(!!InputValueRef.current.value);
    }, [])
    
    useImperativeHandle(ref, () => ({
        focus() {
            InputElementRef.current.focus();
        }
    }))

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
        <S.Container isFocused={isFocused}>
            <S.Icon name={icon} size={20} color={isFocused || isField ? '#ff9000' : '#666360'} />
            <S.TextInput
            ref={InputElementRef}
            placeholderTextColor="#666360"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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

export default forwardRef(Input)