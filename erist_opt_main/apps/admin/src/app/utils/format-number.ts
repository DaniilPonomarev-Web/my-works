import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number: number | null | undefined): string {
  return numeral(number || 0).format();
}

export function fCurrency(number: number | null | undefined): string {
  const format = number ? numeral(number).format('$0,0.00') : '';
  return result(format, '.00');
}

export function fPercent(number: number | null | undefined): string {
  const format =
    number !== undefined && number !== null
      ? numeral(Number(number) / 100).format('0.0%')
      : '';
  return result(format, '.0');
}

export function fShortenNumber(number: number | null | undefined): string {
  const format = number || number === 0 ? numeral(number).format('0.00a') : '';
  const res = result(format, '.00');
  return res;
}

export function fData(number: number | null | undefined): string {
  const format = number ? numeral(number).format('0.0 b') : '';
  return result(format, '.0');
}

function result(format: string, key = '.00'): string {
  const isInteger = format.includes(key);
  return isInteger ? format.replace(key, '') : format;
}
