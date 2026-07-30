/**
 * Camada responsável por falar com o SMS do próprio Android.
 *
 * ATENÇÃO — leia antes de instalar dependências:
 * Esta é apenas a estrutura/skeleton. O ecossistema de libs RN para SMS muda
 * com frequência (várias ficam sem manutenção). Antes de instalar, confira no
 * npm se o pacote escolhido ainda é mantido e compatível com sua versão de RN.
 * Se preferir algo mais durável, o caminho mais robusto é escrever um módulo
 * nativo próprio em Kotlin usando android.telephony.SmsManager (envio) e um
 * BroadcastReceiver para android.provider.Telephony.SMS_RECEIVED (recepção).
 *
 * Este arquivo assume dois pacotes populares como ponto de partida:
 *   - react-native-get-sms-android  (enviar / ler SMS)
 *   - react-native-android-sms-listener (ouvir SMS chegando em tempo real)
 * Ajuste a implementação abaixo conforme o pacote que você escolher.
 */

import { PermissionsAndroid, Platform } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';

export async function requestSmsPermissions() {
    console.log('1️⃣ Entrou em requestSmsPermissions, Platform.OS:', Platform.OS);

    if (Platform.OS !== 'android') {
        throw new Error('Envio/recebimento silencioso de SMS só é suportado no Android.');
    }

    console.log('2️⃣ Antes de PermissionsAndroid.requestMultiple');

    const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
    ]);

    console.log('🔍 Resultado das permissões de SMS:', granted);

    const denied = Object.entries(granted).filter(
        ([, status]) => status !== PermissionsAndroid.RESULTS.GRANTED
    );

    if (denied.length > 0) {
        const deniedNames = denied.map(([permission]) => permission).join(', ');
        throw new Error(
            `Permissões de SMS não concedidas: ${deniedNames}. ` +
            `Verifique em Ajustes > Apps > Permissões > SMS.`
        );
    }

    return true;
}

/**
 * Envia um comando SMS para o rastreador.
 * @param {string} trackerPhoneNumber Número do chip instalado no J16
 * @param {string} command Texto do comando (ex: "STATUS#")
 */
export function sendSmsToTracker(trackerPhoneNumber, command) {
    console.log('📤 Tentando enviar SMS para:', trackerPhoneNumber, '| comando:', command);

    return new Promise((resolve, reject) => {
        SmsAndroid.autoSend(
            trackerPhoneNumber,
            command,
            (failMessage) => {
                console.log('❌ Falha ao enviar SMS:', failMessage);
                reject(new Error(failMessage));
            },
            (successMessage) => {
                console.log('✅ SMS enviado:', successMessage);
                resolve(successMessage);
            }
        );
    });
}

/**
 * Registra um listener para SMS recebidos. Retorna uma função para cancelar
 * a escuta (chame no cleanup do seu useEffect).
 *
 * @param {(message: {originatingAddress: string, body: string, timestamp: number}) => void} onMessage
 */
export function listenForIncomingSms(onMessage) {
    console.log('👂 Registrando listener de SMS recebidos');

    const subscription = SmsListener.addListener((message) => {
        console.log('📩 SMS recebido de:', message.originatingAddress, '| corpo:', message.body);

        onMessage({
            originatingAddress: message.originatingAddress,
            body: message.body,
            timestamp: Date.now(),
        });
    });

    return () => subscription.remove();
}