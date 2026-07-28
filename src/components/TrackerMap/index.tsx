import React, { useEffect, useRef, useMemo } from 'react';
import { View } from 'react-native';
import { Map, Marker, Camera, type CameraRef } from '@maplibre/maplibre-react-native';
import type { TrackerLocation } from '../../types/Tracker';

import styles from './styles';
// src/components/TrackerMap/index.tsx
type Props = {
    location: TrackerLocation;
};

const MAPTILER_KEY = process.env.EXPO_PUBLIC_MAPTILER_KEY;

const MAP_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`;






export default function TrackerMap({ location }: Props) {
    const cameraRef = useRef<CameraRef>(null);

    // MapLibre usa [longitude, latitude]
    const lngLat = useMemo<[number, number]>(
        () => [location.longitude, location.latitude],
        [location.longitude, location.latitude]
    );

    // Sempre que a localização mudar, move a câmera suavemente
    useEffect(() => {
        cameraRef.current?.easeTo({ center: lngLat, zoom: 15, duration: 500 });
    }, [lngLat]);

    return (
        <Map style={styles.map} mapStyle={MAP_STYLE} androidView="texture" >
            <Camera
                ref={cameraRef}
                initialViewState={{ center: lngLat, zoom: 15 }}
            />

            <Marker id="tracker" lngLat={lngLat}>
                <View style={styles.marker} />
            </Marker>
        </Map>
    );
}