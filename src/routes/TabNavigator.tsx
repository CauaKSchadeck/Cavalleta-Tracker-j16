// Importa o React.
import React, { useState } from 'react';

// Importa o navegador de abas.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa os ícones.
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Importa componentes do React Native.
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logout } from '../services/storage/authStorage';

// Importa as telas.
import HomeScreen from '../screens/Home';

import SmsScreen from '../screens/SMS';

import MapScreen from '../screens/Map';

import History from '../screens/History';
// Cria o Bottom Tab Navigator.
const Tab = createBottomTabNavigator();

const DRAWER_WIDTH = 280;

export default function BottomTabs() {
    const navigation = useNavigation<any>();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerTranslate] = useState(() => new Animated.Value(-DRAWER_WIDTH));

    function openDrawer() {
        setDrawerOpen(true);
        Animated.timing(drawerTranslate, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }

    function closeDrawer() {
        Animated.timing(drawerTranslate, {
            toValue: -DRAWER_WIDTH,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            setDrawerOpen(false);
        });
    }

    async function handleLogout() {
        closeDrawer();
        await logout();

        const parent = navigation.getParent?.();
        const root = parent?.getParent?.() ?? parent;

        if (root?.replace) {
            root.replace('Login');
            return;
        }

        navigation.replace('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
                    <MaterialIcons name="menu" size={28} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Cavalleta Connect</Text>
            </View>

            <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: '(rgb(163, 204, 127)',
                        tabBarInactiveTintColor: '#757575',
                        tabBarStyle: {
                            height: 60,
                            paddingBottom: 10,
                            paddingTop: 6,
                        },
                    }}
                >
                    <Tab.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: 'Início',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{
                            title: "Mapa",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons
                                    name="map"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="SmsScreen"
                        component={SmsScreen}
                        options={{
                            title: "SMS",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons
                                    name="sms"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />


                    <Tab.Screen name="HistoryScreen"
                        component={History}
                        options={{
                            title: "Histórico",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons
                                    name="history"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />

                </Tab.Navigator>
            </View>

            <Animated.View
                style={[
                    styles.drawer,
                    { transform: [{ translateX: drawerTranslate }] },
                ]}
            >
                <Text style={styles.drawerTitle}>Menu</Text>

                <TouchableOpacity style={styles.drawerItem} onPress={() => {
                    closeDrawer(); navigation.navigate("Home", {
                        screen: "Início",
                        params: {
                            screen: "HomeScreen",
                        },
                    });
                }}>
                    <MaterialIcons
                        name="home"
                        size={22}
                        color="(rgb(163, 204, 127)"
                        style={styles.drawerIcon}

                    />
                    <Text style={styles.drawerText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={closeDrawer}>
                    <MaterialIcons
                        name="settings"
                        size={22}
                        color="(rgb(163, 204, 127)"
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerText}>Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={closeDrawer}>
                    <MaterialIcons
                        name="info"
                        size={22}
                        color="(rgb(163, 204, 127)"
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerText}>Sobre</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
                    <MaterialIcons
                        name="logout"
                        size={22}
                        color="#D32F2F"
                        style={styles.drawerIcon}
                    />
                    <Text style={[styles.drawerText, styles.logoutText]}>Sair</Text>
                </TouchableOpacity>
            </Animated.View>

            {drawerOpen && (
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={closeDrawer}
                    activeOpacity={1}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    menuButton: {
        marginRight: 16,
        padding: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    tabContainer: {
        flex: 1,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: '#f7f9fc',
        paddingTop: 50,
        paddingHorizontal: 16,
        zIndex: 30,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 8,
        elevation: 10,
    },
    drawerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#111',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    drawerIcon: {
        marginRight: 12,
    },
    drawerText: {
        fontSize: 16,
        color: '#222',
    },
    logoutText: {
        color: '#D32F2F',
        fontWeight: '600',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 20,
    },
});
