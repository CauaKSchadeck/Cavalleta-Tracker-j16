/**
 * Lista de comandos SMS suportados pelo rastreador J16 (baseado no manual do dispositivo).
 * Cada função monta a string exata que deve ser enviada por SMS ao número do chip
 * instalado no rastreador.
 */

export const TrackerCommands = {
    format: () => 'FORMAT',

    // APN
    getApn: () => 'APN#',
    setApn: (apn, user = '', pass = '') => `APN,${apn},${user},${pass}#`,

    // Servidor da plataforma
    getServer: () => 'SERVER#',
    setServerDomain: (domain, port) => `SERVER,1,${domain},${port},0#`,
    setServerIp: (ip, port) => `SERVER,0,${ip},${port},0#`,

    // Localização / status
    getLocationUrl: () => 'URL#',
    getStatus: () => 'STATUS#',
    getParams: () => 'PARAM#',
    restart: () => 'RESET#',

    // Bloqueio de óleo/energia (corte de combustível/ignição)
    getRelayStatus: () => 'RELAY#',
    cutRelay: () => 'RELAY,1#',
    restoreRelay: () => 'RELAY,0#',

    // Números de central (até 3)
    addCenterNumber: (slot, number) => (slot === 1 ? `CENTER,A,${number}#` : `CENTER,A${slot},${number}#`),
    deleteCenterNumber: (slot) => (slot === 1 ? 'CENTER,D#' : `CENTER,D${slot}#`),
    getCenterNumbers: () => 'CENTER#',

    // Números de SOS (até 3)
    addSosNumbers: (...numbers) => `SOS,A,${numbers.join(',')}#`,
    deleteSosNumbers: (...slots) => `SOS,D,${slots.join(',')}#`,
    getSosNumbers: () => 'SOS#',

    // Atendimento automático de chamada
    enableAutoAnswer: () => '777#',
    disableAutoAnswer: () => '888#',

    // Heartbeat
    setHeartbeat: (accOnSec, accOffMin) => `HBT,${accOnSec},${accOffMin}#`,
    getHeartbeat: () => 'HBT#',

    // Intervalo de envio de posição
    setReportInterval: (accOnSec, accOffSec) => `TIMER,${accOnSec},${accOffSec}#`,
    getReportInterval: () => 'TIMER#',

    // Alarme de vibração
    enableVibrationAlarm: (mode = 0) => `SENALM,ON,${mode}#`,
    disableVibrationAlarm: () => 'SENALM,OFF#',
    getVibrationAlarm: () => 'SENALM#',

    // Alarme de queda de energia
    enablePowerAlarm: (mode, t1, t2) => `POWERALM,ON,${mode},${t1},${t2}#`,
    disablePowerAlarm: () => 'POWERALM,OFF#',
    getPowerAlarm: () => 'POWERALM#',

    // Bateria fraca
    enableBatteryAlarm: (mode = 0) => `BATALM,ON,${mode}#`,
    disableBatteryAlarm: () => 'BATALM,OFF#',
    getBatteryAlarm: () => 'BATALM#',

    // Alarme de movimento (geofence por raio)
    enableMovingAlarm: (radius, mode = 0) => `MOVING,ON,${radius},${mode}#`,
    disableMovingAlarm: () => 'MOVING,OFF#',
    getMovingAlarm: () => 'MOVING#',

    // Alarme de excesso de velocidade
    enableSpeedAlarm: (durationSec, speedKmh, mode = 1) => `SPEED,ON,${durationSec},${speedKmh},${mode}#`,
    disableSpeedAlarm: () => 'SPEED,OFF#',
    getSpeedAlarm: () => 'SPEED#',

    // Alarme de ignição ligada/desligada (ACC)
    enableAccOnAlarm: (mode = 3) => `ACCALM,ON,${mode}#`,
    disableAccOnAlarm: () => 'ACCALM,OFF#',
    getAccOnAlarm: () => 'ACCALM#',
    enableAccOffAlarm: (mode = 3) => `ACCOFFALM,ON,${mode}#`,
    disableAccOffAlarm: () => 'ACCOFFALM,OFF#',
    getAccOffAlarm: () => 'ACCOFFALM#',

    // Fuso horário
    setTimezone: (direction, hours, minutes = 0) => `GMT,${direction},${hours},${minutes}#`,
    getTimezone: () => 'GMT#',
};