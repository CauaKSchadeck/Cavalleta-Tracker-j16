import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 45,
        marginBottom: 15,



    },



    inputSpacing: {
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#1976D2',
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#D32F2F',
        fontWeight: 'bold',
    },
});
