// src/screens/Map/index.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ActivityIndicator, Text, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TrackerMap from '../../components/TrackerMap';
import TrackerDropdown from '../../components/TrackerDropdown';
import MapControls from '../../components/MapControls';
import { TrackerService } from '../../services/Trackerservice';
import { requestSmsPermissions } from '../../services/Smsgateway';
import type { Tracker, TrackerLocation } from '../../types/Tracker';

const STORAGE_KEY = '@cavalleta:trackers';

export default function MapScreen() {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [selectedTracker, setSelectedTracker] = useState<Tracker | null>(null);
    const [location, setLocation] = useState<TrackerLocation | null>(null);
    const [loading, setLoading] = useState(true);
    const [realTimeEnabled, setRealTimeEnabled] = useState(false);
    const [smsLoading, setSmsLoading] = useState(false);

    const trackerServiceRef = useRef<TrackerService | null>(null);

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
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTrackers();
        }, [loadTrackers])
    );

    // Recria o TrackerService sempre que o rastreador selecionado muda
    useEffect(() => {
        trackerServiceRef.current?.destroy();
        trackerServiceRef.current = null;
        setLocation(null); // limpa localização do rastreador anterior

        if (selectedTracker) {
            trackerServiceRef.current = new TrackerService(selectedTracker.phone);
        }

        return () => {
            trackerServiceRef.current?.destroy();
            trackerServiceRef.current = null;
        };
    }, [selectedTracker]);

    // Polling de tempo real — liga/desliga com o switch
    useEffect(() => {
        if (!realTimeEnabled || !selectedTracker) return;

        const interval = setInterval(() => {
            handleRequestSmsLocation();
        }, 30000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realTimeEnabled, selectedTracker]);

    function handleOpenExternalMap() {
        if (!location) {
            Alert.alert('Aviso', 'Nenhuma localização disponível ainda.');
            return;
        }

        const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Erro', 'Não foi possível abrir o mapa externo.');
        });
    }

    function handleShowLastLocation() {
        if (!location) {
            Alert.alert('Última localização', 'Nenhuma localização disponível ainda.');
            return;
        }

        Alert.alert(
            'Última localização',
            `Lat: ${location.latitude}\nLng: ${location.longitude}` +
            (location.lastUpdate ? `\nAtualizado: ${location.lastUpdate}` : '')
        );
    }

    async function handleRequestSmsLocation() {
        if (!selectedTracker) {
            Alert.alert('Aviso', 'Selecione um rastreador primeiro.');
            return;
        }

        if (!trackerServiceRef.current) {
            Alert.alert('Erro', 'Serviço de rastreamento não inicializado.');
            return;
        }

        setSmsLoading(true);
        try {
            await requestSmsPermissions();
            const reply = await trackerServiceRef.current.getLocation();

            setLocation({
                latitude: reply.latitude,
                longitude: reply.longitude,
                lastUpdate: reply.timestamp,
            });
        } catch (error) {
            Alert.alert(
                'Erro ao buscar localização',
                error instanceof Error ? error.message : 'Erro desconhecido'
            );
        } finally {
            setSmsLoading(false);
        }
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <Text style={{ textAlign: 'center' }}>
                        {selectedTracker
                            ? 'Nenhuma localização recebida ainda. Toque no ícone de SMS para solicitar.'
                            : 'Nenhum rastreador cadastrado.'}
                    </Text>
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
                onRequestSmsLocation={handleRequestSmsLocation}
                smsLoading={smsLoading}
                realTimeEnabled={realTimeEnabled}
                onToggleRealTime={setRealTimeEnabled}
            />
        </View>
    );
}