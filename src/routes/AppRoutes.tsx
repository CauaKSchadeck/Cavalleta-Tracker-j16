// Importa os Hooks do React.
import React, {
    useEffect,
    useState,
} from 'react';

// Responsável pela navegação.
import { NavigationContainer } from '@react-navigation/native';

// Navegação em pilha.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas.
import Login from '../screens/Login';

import DrawerNavigator from './DrawerNavigator';

import BottomTabs from './TabNavigator';

import Sms from '../screens/SMS';

import Map from '../screens/Map';

import History from '../screens/History';

// Serviço responsável por verificar se existe uma sessão salva.
import { getSession } from '../services/storage/authStorage';

// Cria o Stack Navigator.
const Stack = createNativeStackNavigator();

export default function AppRoutes() {

    // Controla se o aplicativo ainda está carregando.
    const [loading, setLoading] = useState(true);

    // Define qual tela será aberta primeiro.
    const [initialRoute, setInitialRoute] = useState<
        'Login' | 'Home'
    >('Login');

    /*
        Executa apenas uma vez quando o aplicativo inicia.

        Verifica se existe uma sessão salva.
    */
    useEffect(() => {

        async function loadSession() {

            const logged = await getSession();

            if (logged) {

                setInitialRoute('Home');

            }

            setLoading(false);

        }

        loadSession();

    }, []);

    /*
        Enquanto verifica a sessão,
        não exibe nenhuma tela.
    */
    if (loading) {

        return null;

    }

    return (

        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Home"
                    component={DrawerNavigator}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}