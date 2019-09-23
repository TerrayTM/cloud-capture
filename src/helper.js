import { apiEndpoint } from './config';

const checkCode = async (id) => {
    try {
        const body = new FormData();
        body.append('id', id);
        let response = await fetch(`${apiEndpoint}/services/room`, {
            method: 'post',
            body
        });
        response = await response.text();
        return response === 'VALID';
    } catch (error) {
        return false;
    }
};

export const generateCode = async () => {
    let code;
    let character = 0;
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberSet = '0123456789';
    do {
        code = '';
        for (let i = 0; i < 6; ++i) {
            let pick;
            if (Math.random() < 0.5 && character < 2) {
                pick = characterSet.charAt(Math.floor(Math.random() * 26));
                ++character;
            } else {
                character = 0;
                pick = numberSet.charAt(Math.floor(Math.random() * 10));
            }
            code += pick;
        }
    } while (await checkCode(code));
    return code;
};

export const generate = () => {
    let code ='';
    let character = 0;
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberSet = '0123456789';
    for (let i = 0; i < 6; ++i) {
        let pick;
        if (Math.random() < 0.5 && character < 2) {
            pick = characterSet.charAt(Math.floor(Math.random() * 26));
            ++character;
        } else {
            character = 0;
            pick = numberSet.charAt(Math.floor(Math.random() * 10));
        }
        code += pick;
    }
    return code;
};