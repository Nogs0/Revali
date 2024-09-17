export const regexDocumento = new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})");
export const regexCPF = new RegExp('^\\d{3}\\.?\\d{3}\\.?\\d{3}\\-?\\d{2}$');
export const regexCNPJ = new RegExp('^\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}\\-?\\d{2}$');
export const regexEMAIL = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');