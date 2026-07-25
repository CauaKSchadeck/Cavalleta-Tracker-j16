// Serviço responsável pela autenticação.

// Serviço responsável por salvar a sessão.
import { saveSession } from './storage/authStorage';

// Usuário fixo.
const USERNAME = 'root';

// Senha fixa.
const PASSWORD = 'root';

/*
    Realiza a autenticação do usuário.

    Retorna:

    true  -> Login válido.

    false -> Login inválido.
*/
export async function login(

    username: string,

    password: string

): Promise<boolean> {

    // Remove espaços em branco.
    username = username.trim();

    password = password.trim();

    // Verifica usuário e senha.
    if (

        username === USERNAME &&

        password === PASSWORD

    ) {

        // Salva a sessão.
        await saveSession();

        return true;

    }

    return false;

}