import React, {useRef} from 'react'
import {Image, View,ScrollView, KeyboardAvoidingView, Platform, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styles'

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

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
                        <S.Title>Crie sua conta</S.Title>
                    </View>

                    
                    <Form ref={formRef} onSubmit={(data) => {console.log(data)}} style={{width: '100%'}} >
                        <Input 
                            autoCapitalize='words' 
                            name='name' 
                            icon= 'user' 
                            placeholder='Nome'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus()
                            }}
                        />

                        <Input 
                            ref={emailInputRef}
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize= 'none'
                            name='email' 
                            icon= 'mail' 
                            placeholder='E-mail'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus()
                            }}
                        />

                        <Input
                            ref={passwordInputRef}
                            secureTextEntry
                            name='password' 
                            icon= 'lock' 
                            placeholder= 'Senha'
                            textContentType='newPassword'
                            returnKeyType='send'
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />

                        <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                    </Form>

                    
                </S.Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <S.BackToSignInButton onPress={() => navigation.goBack()} >
            <Icon name='arrow-left' size={20} color='#fff' />
            <S.BackToSignInButtonText>Voltar para logon</S.BackToSignInButtonText>
        </S.BackToSignInButton>
        </>
    )
}

export default SignUp