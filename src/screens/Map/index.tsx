// src/screens/Map/index.tsx
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import TrackerMap from '../../components/TrackerMap';
import type { TrackerLocation } from '../../types/Tracker';

export default function MapScreen() {
    const [location, setLocation] = useState<TrackerLocation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TEMPORÁRIO — só pra testar o mapa
        setLocation({
            latitude: -15.873930,
            longitude: -48.068194
        });
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (!location) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text>Nenhuma localização recebida ainda.</Text>
            </View>
        );
    }

    return (

        <View style={{ flex: 1, }}>
            <TrackerMap location={location} />


        </View>
    );




};