import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({

    container: {

        // Ocupa toda a tela disponível.
        flex: 1,

        // Centraliza o conteúdo verticalmente.
        justifyContent: 'center',

        // Centraliza o conteúdo horizontalmente.
        alignItems: 'center',

    },


    title: {

        // Tamanho do texto.
        fontSize: 24,

        // Deixa o texto em negrito.
        fontWeight: 'bold',

    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#1976D2',
        paddingVertical: 14,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
    },
})
