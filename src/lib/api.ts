const BASE_URL = import.meta.env.VITE_API_URL || "https://currencyxchange-api.azurewebsites.net/api";

export async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchLocation() {
  const res = await fetch(`${BASE_URL}/location`);
  if (!res.ok) throw new Error("Failed to fetch location");
  return res.json();
}

export async function fetchCurrencyRates(baseCurrency: string) {
  const res = await fetch(`${BASE_URL}/currency/rates?baseCurrency=${baseCurrency}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  return res.json();
}
