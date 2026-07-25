// Importa os Hooks do React.
import React, { useState } from 'react';

// Componentes visuais do React Native.
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

// Importa os estilos.
import { styles } from './styles';

// Serviço responsável pela autenticação.
import { login } from '../../services/Auth';

export default function Login({ navigation }: any) {

    /*
        Armazena o usuário digitado.
    */
    const [username, setUsername] = useState('');

    /*
        Armazena a senha digitada.
    */
    const [password, setPassword] = useState('');

    /*
        Realiza o login.
    */
    async function handleLogin() {

        const success = await login(

            username,

            password

        );

        if (success) {

            navigation.replace('Home');

            return;

        }

        Alert.alert(

            'Erro',

            'Usuário ou senha inválidos.'

        );

    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>

                Cavalleta Connect

            </Text>

            <Text style={styles.subtitle}>

                Sistema de Rastreamento J16

            </Text>

            <TextInput

                style={styles.input}

                placeholder="Usuário"

                autoCapitalize="none"

                value={username}
                placeholderTextColor="#8E8E93"

                onChangeText={setUsername}

            />

            <View style={styles.inputContainer}>
                <MaterialIcons
                    name="lock-outline"
                    size={22}
                    color="#8E8E93"
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.inputWithIcon}
                    placeholder="Senha"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity

                style={styles.button}

                onPress={handleLogin}

            >

                <Text style={styles.buttonText}>

                    Entrar

                </Text>

            </TouchableOpacity>

        </View>

    );

}