interface GeolocationResponse {
  ip: string;
  country_code2: string;
  country_name: string;
  currency: string;
  continent_code?: string;
  time_zone?: {
    name?: string;
  };
}

class GeolocationService {
  private baseUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://currencyxchange-backend.azurewebsites.net";

  // Existing: get user's IP, then call backend
  async getUserLocation(): Promise<GeolocationResponse | null> {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();

      const response = await fetch(`${this.baseUrl}/api/location/${ip}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      console.log("Backend geolocation data:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch location from backend:", error);
      return null;
    }
  }

  getRegionalCurrencies(continentCode: string): string[] {
    const regions: Record<string, string[]> = {
      AF: ["ZAR", "NGN", "EGP", "MAD"], // Africa
      EU: ["EUR", "GBP", "CHF", "NOK"], // Europe
      AS: ["JPY", "CNY", "INR", "KRW"], // Asia
      NA: ["USD", "CAD", "MXN"],        // North America
      SA: ["BRL", "ARS", "CLP"],        // South America
      OC: ["AUD", "NZD"],               // Oceania
    };

    return regions[continentCode] || [];
  }

  getCurrentTimeInUserTimezone(timezone: string): string {
    try {
      return new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return new Date().toLocaleTimeString("en-US");
    }
  }
}

export const geolocationService = new GeolocationService();
export type { GeolocationResponse };
