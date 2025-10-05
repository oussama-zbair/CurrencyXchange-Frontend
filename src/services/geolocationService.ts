interface GeolocationResponse {
  ip: string;
  country_code2: string;
  country_name: string;
  currency: string;
}

class GeolocationService {
  // Backend base URL
  private baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

  // Calls backend /api/location endpoint
  async getUserLocation(): Promise<GeolocationResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/location`);
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
