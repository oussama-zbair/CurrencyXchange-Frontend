const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/['"]+/g, "") 
  || "http://localhost:8080";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
};

export const fetchCountries = async () => {
  const res = await fetch(`${API_BASE_URL}/api/countries`);
  return handleResponse(res);
};

export const fetchLocation = async () => {
  const res = await fetch(`${API_BASE_URL}/api/location`);
  return handleResponse(res);
};

export const fetchCurrencyRates = async (baseCurrency: string) => {
  const res = await fetch(`${API_BASE_URL}/api/currency/rates?baseCurrency=${baseCurrency}`);
  return handleResponse(res);
};
