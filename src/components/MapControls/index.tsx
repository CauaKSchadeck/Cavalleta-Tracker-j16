// src/components/MapControls/index.tsx
import React from 'react';
import { View, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles'

type Props = {
    onOpenExternalMap: () => void;
    onShowLastLocation: () => void;
    realTimeEnabled: boolean;
    onToggleRealTime: (value: boolean) => void;
};

export default function MapControls({
    onOpenExternalMap,
    onShowLastLocation,
    realTimeEnabled,
    onToggleRealTime,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.switchWrapper}>
                <Ionicons
                    name="radio-outline"
                    size={25}
                    color={realTimeEnabled ? 'rgb(163, 204, 127)' : '#999'}
                    style={styles.signalIcon}
                />
                <Switch style={styles.switch} value={realTimeEnabled} onValueChange={onToggleRealTime} />
            </View>

            <TouchableOpacity style={styles.his} onPress={onShowLastLocation} activeOpacity={0.8}>
                <Ionicons name="time-outline" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.fab} onPress={onOpenExternalMap} activeOpacity={0.8}>
                <Ionicons name="paper-plane-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

