import React, {useCallback, useRef} from 'react'
import {Image, View,ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styles'

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const handleSignIn = useCallback((data: object) => {
        console.log(data)
    }, [])

    return (
        <>
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled 
        >
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flex: 1 }}
            >
                <S.Container>
                    <Image source={logoImg} />
                    <View>
                        <S.Title>Faça seu logon</S.Title>
                    </View>
    
                    <Form ref={formRef} onSubmit={handleSignIn} style={{width: '100%'}} >
                        <Input name='email' icon= 'mail' placeholder='E-mail'/>

                        <Input name='password' icon= 'lock' placeholder= 'Senha'/>

                        <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                    </Form>

                    <S.ForgotPassword onPress={() => {}} >
                        <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
                    </S.ForgotPassword>
                </S.Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <S.CreateAccountButton onPress={() => navigation.navigate('SignUp')} >
            <Icon name='log-in' size={20} color='#ff9000' />
            <S.CreateAccountButtonText>Criar uma conta</S.CreateAccountButtonText>
        </S.CreateAccountButton>
        </>
    )
}

export default SignIn