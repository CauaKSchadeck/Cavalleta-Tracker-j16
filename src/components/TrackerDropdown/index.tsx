// src/components/TrackerDropdown/index.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import type { Tracker } from '../../types/Tracker';
import { styles } from './styles';


type Props = {
    trackers: Tracker[];
    selectedTracker: Tracker | null;
    onSelect: (tracker: Tracker) => void;
};

export default function TrackerDropdown({ trackers, selectedTracker, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => setOpen(prev => !prev)}>
                <Text style={styles.headerText} numberOfLines={1}>
                    {selectedTracker ? selectedTracker.name : 'Selecione um rastreador'}
                </Text>
                <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {open && (
                <View style={styles.list}>
                    <FlatList
                        data={trackers}
                        keyExtractor={item => item.id}
                        style={{ maxHeight: 220 }}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Nenhum rastreador cadastrado.</Text>
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemSubtext}>{item.phone}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

