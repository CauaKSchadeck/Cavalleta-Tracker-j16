import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

interface Tracker {

    id: string;

    name: string;

    phone: string;

}

interface Props {

    tracker: Tracker;

    onDelete(id: string): void;

    onLocate(id: string): void;

    onEdit(tracker: Tracker): void;

}

export default function TrackerCard({

    tracker,

    onDelete,

    onLocate,

    onEdit,

}: Props) {

    return (

        <View
            style={{
                backgroundColor: '#FFF',
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                elevation: 2,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >

                    {tracker.name}

                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => onEdit(tracker)}
                        style={{ marginRight: 12 }}
                    >
                        <MaterialIcons
                            name="edit"
                            size={24}
                            color="#1976D2"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onDelete(tracker.id)}
                    >
                        <MaterialIcons
                            name="delete"
                            size={24}
                            color="#D32F2F"
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <Text
                style={{
                    marginTop: 10,
                    color: '#555',
                }}
            >

                Número: {tracker.phone}

            </Text>

            <TouchableOpacity

                style={{
                    marginTop: 15,
                    backgroundColor: '#1976D2',
                    borderRadius: 8,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}

                onPress={() => onLocate(tracker.id)}

            >

                <Text
                    style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                    }}
                >

                    Localizar

                </Text>

            </TouchableOpacity>

        </View>

    );

}