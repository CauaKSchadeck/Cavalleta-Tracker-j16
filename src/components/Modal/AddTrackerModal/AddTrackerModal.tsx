import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { styles } from './styles';

interface Props {

    visible: boolean;

    onClose(): void;

    onAdd(name: string, phone: string): void;

    initialName?: string;

    initialPhone?: string;

    title?: string;

    submitLabel?: string;

}

export default function AddTrackerModal({

    visible,

    onClose,

    onAdd,

    initialName = '',

    initialPhone = '',

    title = 'Novo Rastreador',

    submitLabel = 'Adicionar',

}: Props) {

    // Nome do rastreador.
    const [name, setName] = useState(initialName);

    // Número do chip.
    const [phone, setPhone] = useState(initialPhone);

    useEffect(() => {
        setName(initialName);
        setPhone(initialPhone);
    }, [initialName, initialPhone, visible]);

    /*
        Adiciona um novo rastreador.
    */
    function handleAdd() {

        if (

            name.trim() === '' ||

            phone.trim() === ''

        ) {

            Alert.alert(

                'Aviso',

                'Preencha todos os campos.'

            );

            return;

        }

        onAdd(

            name,

            phone

        );

        // Limpa os campos.
        setName('');

        setPhone('');

        // Fecha o Modal.
        onClose();

    }

    /*
        Fecha o Modal e limpa os campos.
    */
    function handleClose() {

        setName('');

        setPhone('');

        onClose();

    }

    function handleNameChange(value: string) {
        if (value.length <= 25) {
            setName(value);
        }
    }

    function handlePhoneChange(value: string) {
        const onlyNumbers = value.replace(/\D/g, '');

        if (onlyNumbers.length <= 11) {
            setPhone(onlyNumbers);
        }
    }

    return (

        <Modal

            visible={visible}

            transparent

            animationType="slide"

        >

            <View style={styles.overlay}>

                <View style={styles.container}>

                    <Text style={styles.title}>

                        {title}

                    </Text>

                    <TextInput

                        placeholder="Nome"
                        placeholderTextColor="#8E8E93"
                        value={name}

                        onChangeText={handleNameChange}

                        style={styles.input}

                    />

                    <TextInput

                        placeholder="Número do Chip"
                        placeholderTextColor="#8E8E93"
                        keyboardType="phone-pad"

                        value={phone}

                        onChangeText={handlePhoneChange}

                        style={[styles.input, styles.inputSpacing]}

                    />

                    <TouchableOpacity

                        style={styles.primaryButton}

                        onPress={handleAdd}

                    >

                        <Text
                            style={styles.primaryButtonText}
                        >

                            {submitLabel}

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.cancelButton}

                        onPress={handleClose}

                    >

                        <Text
                            style={styles.cancelButtonText}
                        >

                            Cancelar

                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Modal>

    );

}