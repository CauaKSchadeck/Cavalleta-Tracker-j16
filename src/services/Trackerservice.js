import { sendSmsToTracker, listenForIncomingSms } from './Smsgateway';
import { TrackerCommands } from './Trackercommands';
import { parseTrackerReply } from './Trackerparse';

/**
 * Orquestra o ciclo "enviar comando -> aguardar resposta do rastreador".
 * Como SMS não tem correlação nativa de request/response, casamos a resposta
 * pelo número de origem (deve ser o número do rastreador) dentro de uma
 * janela de tempo.
 */
export class TrackerService {
    constructor(trackerPhoneNumber, { timeoutMs = 20000 } = {}) {
        this.trackerPhoneNumber = trackerPhoneNumber;
        this.timeoutMs = timeoutMs;
        this.pendingResolvers = [];
        this.unsubscribe = listenForIncomingSms(this._handleIncoming.bind(this));
    }

    _handleIncoming({ originatingAddress, body }) {
        // normaliza os últimos dígitos pra comparar números com/sem DDI
        const from = originatingAddress?.replace(/\D/g, '').slice(-9);
        const expected = this.trackerPhoneNumber.replace(/\D/g, '').slice(-9);
        if (from !== expected) return;

        const parsed = parseTrackerReply(body);
        if (parsed.type === 'deliveryReport') {
            return;
        }

        // resolve a primeira promessa pendente que ainda não expirou
        const resolver = this.pendingResolvers.shift();
        if (resolver) resolver.resolve(parsed);
    }

    /**
     * Envia um comando e resolve com a resposta já parseada assim que chegar
     * (ou rejeita por timeout).
     */
    sendCommand(commandString) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pendingResolvers = this.pendingResolvers.filter((r) => r.resolve !== resolve);
                reject(new Error(`Timeout aguardando resposta do rastreador para: ${commandString}`));
            }, this.timeoutMs);

            this.pendingResolvers.push({
                resolve: (parsed) => {
                    clearTimeout(timer);
                    resolve(parsed);
                },
            });

            sendSmsToTracker(this.trackerPhoneNumber, commandString).catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }

    /** Atalho para pedir a localização atual */
    async getLocation() {
        const reply = await this.sendCommand(TrackerCommands.getLocationUrl());
        if (reply.type === 'noSignal') {
            throw new Error(`Rastreador sem sinal: ${reply.raw}`);
        }
        if (reply.type !== 'location') {
            throw new Error(`Resposta inesperada ao pedir localização: ${JSON.stringify(reply)}`);
        }
        return reply; // { latitude, longitude, url, timestamp }
    }

    /** Atalho para pedir o status atual do rastreador */
    async getStatus() {
        const reply = await this.sendCommand(TrackerCommands.getStatus());
        if (reply.type !== 'status') {
            throw new Error(`Resposta inesperada ao pedir status: ${JSON.stringify(reply)}`);
        }
        return reply;
    }

    destroy() {
        this.unsubscribe?.();
    }
}