/**
 * Interpreta as respostas SMS enviadas pelo rastreador J16 e transforma
 * em objetos JS fáceis de usar na UI.
 */

// Aceita tanto "<03-20 22:45>http://..." quanto só "http://..." sem prefixo
const LOCATION_REGEX = /(?:<(\d{2}-\d{2}\s\d{2}:\d{2})>\s*)?(https?:\/\/maps\.google\.com\/maps\?q=(-?[\d.]+),(-?[\d.]+))/;

const DELIVERY_REPORT_REGEX = /\b(?:torpedo entregue|sms entregue|sms delivered|sms sent|delivered|entregue|enviado)\b/i;
const NO_SIGNAL_REGEX = /\b(?:sem sinal|no signal|gprs:offline|gps:off|sem serviço|sem rede|offline|sem linha)\b/i;

const STATUS_REGEX = {
    battery: /Battery:([\d.]+)V/,
    gprs: /GPRS:(\w+)/,
    gsmSignal: /GSMSignal Level:(\d+)/,
    acc: /ACC:(\w+)/,
    gps: /GPS:(\w+)/,
    defense: /Defense:(ON|OFF)/,
    imei: /IMEI:(\d+)/,
};

export function parseTrackerReply(rawMessage) {
    const message = rawMessage.trim();

    if (DELIVERY_REPORT_REGEX.test(message)) {
        return { type: 'deliveryReport', raw: message };
    }

    if (NO_SIGNAL_REGEX.test(message)) {
        return { type: 'noSignal', raw: message };
    }

    const locationMatch = message.match(LOCATION_REGEX);
    if (locationMatch) {
        return {
            type: 'location',
            timestamp: locationMatch[1] ?? new Date().toISOString(),
            url: locationMatch[2],
            latitude: parseFloat(locationMatch[3]),
            longitude: parseFloat(locationMatch[4]),
            raw: message,
        };
    }

    if (message.includes('Battery:') && message.includes('IMEI:')) {
        const status = { type: 'status', raw: message };
        for (const [key, regex] of Object.entries(STATUS_REGEX)) {
            const match = message.match(regex);
            if (match) status[key] = match[1];
        }
        return status;
    }

    if (message.startsWith('RELAY:')) {
        return { type: 'relay', value: message.split(':')[1]?.trim(), raw: message };
    }

    if (message.startsWith('APN:')) {
        return { type: 'apn', raw: message };
    }

    if (message.startsWith('SERVER:')) {
        return { type: 'server', raw: message };
    }

    if (message.startsWith('HBT')) {
        return { type: 'heartbeat', raw: message };
    }

    if (message.startsWith('TIMER')) {
        return { type: 'reportInterval', raw: message };
    }

    if (message === 'RESET OK') {
        return { type: 'reset', raw: message };
    }

    return { type: 'unknown', raw: message };
}