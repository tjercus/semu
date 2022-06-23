export const toNumber = (str: string | number) =>
  isNaN(Number(str)) ? 0 : Number(str);

export const parseAsTelegram = (payload: Uint8Array) =>
  JSON.parse(new TextDecoder().decode(payload));
