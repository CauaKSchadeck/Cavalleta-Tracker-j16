// src/screens/Map/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Text, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TrackerMap from '../../components/TrackerMap';
import TrackerDropdown from '../../components/TrackerDropdown';
import MapControls from '../../components/MapControls';
import type { Tracker, TrackerLocation } from '../../types/Tracker';

const STORAGE_KEY = '@cavalleta:trackers';

export default function MapScreen() {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [selectedTracker, setSelectedTracker] = useState<Tracker | null>(null);
    const [location, setLocation] = useState<TrackerLocation | null>(null);
    const [loading, setLoading] = useState(true);
    const [realTimeEnabled, setRealTimeEnabled] = useState(false);

    const loadTrackers = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            const list: Tracker[] = stored ? JSON.parse(stored) : [];
            setTrackers(list);

            setSelectedTracker(prev => {
                const stillExists = prev && list.find(t => t.id === prev.id);
                return stillExists ? prev : list[0] ?? null;
            });
        } catch (error) {
            console.warn('Erro ao carregar rastreadores', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTrackers();
        }, [loadTrackers])
    );

    useEffect(() => {
        if (!selectedTracker) {
            setLoading(false);
            return;
        }

        // TEMPORÁRIO — depois vira a busca real da localização (SMS ou API)
        setLocation({
            latitude: -15.873930,
            longitude: -48.068194,
        });
        setLoading(false);
    }, [selectedTracker]);

    // Polling de tempo real — liga/desliga com o switch
    useEffect(() => {
        if (!realTimeEnabled || !selectedTracker) return;

        const interval = setInterval(() => {
            // FUTURO: buscar localização atualizada do selectedTracker (API/SMS)
            // e chamar setLocation(novaLocalizacao)
            console.log('🔄 Buscando localização em tempo real...');
        }, 10000);

        return () => clearInterval(interval);
    }, [realTimeEnabled, selectedTracker]);

    function handleOpenExternalMap() {
        if (!location) return;

        const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Erro', 'Não foi possível abrir o mapa externo.');
        });
    }

    function handleShowLastLocation() {
        // FUTURO: buscar a última localização salva do selectedTracker (AsyncStorage/API)
        if (!location) {
            Alert.alert('Última localização', 'Nenhuma localização disponível.');
            return;
        }

        Alert.alert(
            'Última localização',
            `Lat: ${location.latitude}\nLng: ${location.longitude}`
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : location ? (
                <TrackerMap location={location} />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Nenhum rastreador cadastrado.</Text>
                </View>
            )}

            <TrackerDropdown
                trackers={trackers}
                selectedTracker={selectedTracker}
                onSelect={setSelectedTracker}
            />

            <MapControls
                onOpenExternalMap={handleOpenExternalMap}
                onShowLastLocation={handleShowLastLocation}
                realTimeEnabled={realTimeEnabled}
                onToggleRealTime={setRealTimeEnabled}
            />
        </View>
    );
}