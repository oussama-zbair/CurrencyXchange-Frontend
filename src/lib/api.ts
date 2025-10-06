const BASE_URL = import.meta.env.VITE_API_URL || "https://currencyxchange-backend.azurewebsites.net";

export async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/api/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchLocation() {
  const userIp = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => null);

  if (!userIp) throw new Error("Failed to detect user IP");

  const res = await fetch(`${BASE_URL}/api/location/${userIp}`);
  if (!res.ok) throw new Error("Failed to fetch location");
  return res.json();
}




export async function fetchCurrencyRates(baseCurrency: string) {
  const res = await fetch(`${BASE_URL}/api/currency/rates?baseCurrency=${baseCurrency}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  return res.json();
}
