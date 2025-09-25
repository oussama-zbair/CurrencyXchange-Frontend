interface GeolocationResponse {
  ip: string;
  country_code2: string;
  country_name: string;
  state_prov: string;
  city: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  time_zone: {
    name: string;
    offset: number;
    current_time: string;
  };
  continent_code: string;
  continent_name: string;
  calling_code: string;
  country_tld: string;
}

interface RegionalCurrencies {
  [region: string]: string[];
}

// Popular currencies by continent/region
const regionalCurrencies: RegionalCurrencies = {
  'NA': ['USD', 'CAD', 'MXN'], // North America
  'SA': ['BRL', 'ARS', 'CLP', 'COP', 'PEN'], // South America
  'EU': ['EUR', 'GBP', 'CHF', 'NOK', 'SEK', 'DKK', 'PLN'], // Europe
  'AS': ['JPY', 'CNY', 'KRW', 'INR', 'SGD', 'HKD', 'THB', 'MYR'], // Asia
  'AF': ['ZAR', 'NGN', 'EGP', 'MAD', 'KES'], // Africa
  'OC': ['AUD', 'NZD', 'FJD'] // Oceania
};

class GeolocationService {
  private apiKey: string;
  private baseUrl = 'https://api.ipgeolocation.io/ipgeo';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getUserLocation(): Promise<GeolocationResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}?apiKey=${this.apiKey}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Geolocation data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch geolocation data:', error);
      return null;
    }
  }

  getRegionalCurrencies(continentCode: string): string[] {
    return regionalCurrencies[continentCode] || ['USD', 'EUR', 'GBP'];
  }

  formatCurrencyByLocale(amount: number, currencyCode: string, countryCode: string): string {
    try {
      // Map country codes to locale strings
      const localeMap: { [key: string]: string } = {
        'US': 'en-US',
        'GB': 'en-GB', 
        'DE': 'de-DE',
        'FR': 'fr-FR',
        'ES': 'es-ES',
        'IT': 'it-IT',
        'JP': 'ja-JP',
        'CN': 'zh-CN',
        'KR': 'ko-KR',
        'IN': 'hi-IN',
        'BR': 'pt-BR',
        'MX': 'es-MX',
        'CA': 'en-CA',
        'AU': 'en-AU',
        'NZ': 'en-NZ',
        'ZA': 'en-ZA',
        'RU': 'ru-RU',
        'AE': 'ar-AE',
        'SA': 'ar-SA',
        'TR': 'tr-TR',
        'PL': 'pl-PL',
        'NL': 'nl-NL',
        'BE': 'nl-BE',
        'CH': 'de-CH',
        'AT': 'de-AT',
        'SE': 'sv-SE',
        'NO': 'nb-NO',
        'DK': 'da-DK',
        'FI': 'fi-FI',
        'PT': 'pt-PT',
        'GR': 'el-GR',
        'CZ': 'cs-CZ',
        'HU': 'hu-HU',
        'RO': 'ro-RO',
        'BG': 'bg-BG',
        'HR': 'hr-HR',
        'SK': 'sk-SK',
        'SI': 'sl-SI',
        'LT': 'lt-LT',
        'LV': 'lv-LV',
        'EE': 'et-EE',
        'MA': 'ar-MA',
        'TN': 'ar-TN',
        'EG': 'ar-EG',
        'NG': 'en-NG',
        'KE': 'en-KE',
        'TH': 'th-TH',
        'VN': 'vi-VN',
        'ID': 'id-ID',
        'MY': 'ms-MY',
        'SG': 'en-SG',
        'PH': 'en-PH',
        'HK': 'zh-HK',
        'TW': 'zh-TW'
      };

      const locale = localeMap[countryCode] || 'en-US';
      
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(amount);
    } catch (error) {
      console.error('Currency formatting error:', error);
      return `${amount.toFixed(2)} ${currencyCode}`;
    }
  }

  getCurrentTimeInUserTimezone(timezoneName: string): string {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneName,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(new Date());
    } catch (error) {
      console.error('Timezone formatting error:', error);
      return new Date().toLocaleString();
    }
  }
}

export const geolocationService = new GeolocationService('e37414b2eccb442a94fc315a5cfa7559');
export type { GeolocationResponse };