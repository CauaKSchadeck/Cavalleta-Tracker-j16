import React, { useEffect, useState } from 'react';

import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TrackerCard from '../../components/Card/TrackerCard';
import AddTrackerModal from '../../components/Modal/AddTrackerModal/AddTrackerModal';
import EmptyList from '../../components/List/EmptyList';

import { styles } from './styles';

interface Tracker {
    id: string;
    name: string;
    phone: string;
}

interface Props {
    navigation: any;
}

const STORAGE_KEY = '@cavalleta:trackers';

export default function Home({ navigation }: Props) {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTracker, setEditingTracker] = useState<Tracker | null>(null);

    useEffect(() => {
        loadTrackers();
    }, []);

    async function loadTrackers() {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);

            if (stored) {
                setTrackers(JSON.parse(stored));
            }
        } catch (error) {
            console.warn('Erro ao carregar rastreadores', error);
        }
    }

    async function saveTrackers(nextTrackers: Tracker[]) {
        try {
            setTrackers(nextTrackers);
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(nextTrackers)
            );
        } catch (error) {
            console.warn('Erro ao salvar rastreadores', error);
        }
    }

    async function handleAddTracker(name: string, phone: string) {
        const newTracker: Tracker = {
            id: String(Date.now()),
            name,
            phone,
        };

        await saveTrackers([newTracker, ...trackers]);
    }

    async function handleEditTracker(id: string, name: string, phone: string) {
        const nextTrackers = trackers.map(tracker =>
            tracker.id === id ? { ...tracker, name, phone } : tracker
        );

        await saveTrackers(nextTrackers);
    }

    function openAddModal() {
        setEditingTracker(null);
        setModalVisible(true);
    }

    function openEditModal(tracker: Tracker) {
        setEditingTracker(tracker);
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
        setEditingTracker(null);
    }

    async function handleSaveTracker(name: string, phone: string) {
        if (editingTracker) {
            await handleEditTracker(editingTracker.id, name, phone);
        } else {
            await handleAddTracker(name, phone);
        }

        closeModal();
    }

    async function handleDeleteTracker(id: string) {
        Alert.alert(
            'Remover rastreador',
            'Deseja remover este rastreador?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sim',
                    onPress: async () => {
                        const nextTrackers = trackers.filter(
                            tracker => tracker.id !== id
                        );
                        await saveTrackers(nextTrackers);
                    },
                },
            ]
        );
    }

    function handleLocateTracker(id: string) {
        const tracker = trackers.find(item => item.id === id);

        if (!tracker) {
            return;
        }

        Alert.alert(
            'Localizar rastreador',
            `Ainda não há localização ativa para ${tracker.name}.`
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={openAddModal}
            >
                <Text style={styles.addButtonText}>Adicionar Rastreador</Text>
            </TouchableOpacity>

            <FlatList
                data={trackers}
                keyExtractor={item => item.id}
                contentContainerStyle={
                    trackers.length === 0 && styles.emptyListContainer
                }
                ListEmptyComponent={<EmptyList />}
                renderItem={({ item }) => (
                    <TrackerCard
                        tracker={item}
                        onDelete={handleDeleteTracker}
                        onLocate={handleLocateTracker}
                        onEdit={openEditModal}
                    />
                )}
            />

            <AddTrackerModal
                visible={modalVisible}
                onClose={closeModal}
                onAdd={handleSaveTracker}
                initialName={editingTracker?.name ?? ''}
                initialPhone={editingTracker?.phone ?? ''}
                title={editingTracker ? 'Editar Rastreador' : 'Novo Rastreador'}
                submitLabel={editingTracker ? 'Salvar' : 'Adicionar'}
            />
        </View>
    );
}