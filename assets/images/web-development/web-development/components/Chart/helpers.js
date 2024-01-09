// Makes requests to CryptoCompare API
import init from '../../init';

export async function makeApiRequest(path) {
    try {
        console.log('vueContext getSymbleinfos', vueContext.$store.getters.getSymbleinfos);
        const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
        return response.json();

        // const response = await fetch(init.api + `/${path}`, { method: 'post' });
        // console.log('getAllSymbols', response);
        // return response.json();
    } catch (error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}


export function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}