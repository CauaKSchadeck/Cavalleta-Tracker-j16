// src/utils/phone.ts
export function normalizeToE164(input: string): string {
    const digits = input.replace(/\D/g, '');

    // já veio com 55 na frente (ex: usuário digitou 5561999999999)
    if (digits.startsWith('55') && digits.length >= 12) {
        return `+${digits}`;
    }

    // veio só DDD + número (ex: 61999999999)
    return `+55${digits}`;
}