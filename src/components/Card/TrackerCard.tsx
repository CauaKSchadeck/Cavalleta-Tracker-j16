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
                width: 250,
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
                        style={{ right: 10, }}
                    >
                        <MaterialIcons
                            name="edit"
                            size={24}
                            color="rgb(163, 204, 127)"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onDelete(tracker.id)} style={{ left: 5, }}
                    >
                        <MaterialIcons
                            name="delete"
                            size={24}
                            color="rgb(163, 204, 127)"
                        />
                    </TouchableOpacity>
                </View>

            </View>







        </View >

    );

}