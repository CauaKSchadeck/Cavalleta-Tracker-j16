import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    return (

        <Drawer.Navigator

            initialRouteName="Início"

            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: '#1976D2',
                drawerInactiveTintColor: '#555',
                drawerLabelStyle: {
                    fontSize: 16,
                },
            }}

        >

            <Drawer.Screen

                name="Início"

                component={TabNavigator}

                options={{

                    drawerIcon: ({ color, size }) => (

                        <MaterialIcons
                            name="home"
                            color={color}
                            size={size}
                        />

                    ),

                }}

            />





        </Drawer.Navigator>

    );

}