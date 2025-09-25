export interface CountryData {
  currencyCode: string;
  currencyName: string;
  countryCode: string | null;
  countryName: string;
  rate?: number;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}