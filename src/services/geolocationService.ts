interface GeolocationResponse {
  ip: string;
  country_code2: string;
  country_name: string;
  currency: string;
}

class GeolocationService {
  private baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/location';

  async getUserLocation(): Promise<GeolocationResponse | null> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      console.log('Backend geolocation data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch location from backend:', error);
      return null;
    }
  }
}

export const geolocationService = new GeolocationService();
export type { GeolocationResponse };
