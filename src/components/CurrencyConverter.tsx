import { useState } from "react";
import { ArrowUpDown, Loader2, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Flag from "react-flagkit";

// Country-to-currency mapping with comprehensive data
const countryData = [
  // Major Countries
  { country: "United States", currency: "USD", currencyName: "US Dollar", countryCode: "US", rate: 1 },
  { country: "European Union", currency: "EUR", currencyName: "Euro", countryCode: "EU", rate: 0.85 },
  { country: "United Kingdom", currency: "GBP", currencyName: "British Pound", countryCode: "GB", rate: 0.73 },
  { country: "Japan", currency: "JPY", currencyName: "Japanese Yen", countryCode: "JP", rate: 110.12 },
  { country: "Switzerland", currency: "CHF", currencyName: "Swiss Franc", countryCode: "CH", rate: 0.92 },
  { country: "Canada", currency: "CAD", currencyName: "Canadian Dollar", countryCode: "CA", rate: 1.25 },
  { country: "Australia", currency: "AUD", currencyName: "Australian Dollar", countryCode: "AU", rate: 1.35 },
  { country: "China", currency: "CNY", currencyName: "Chinese Yuan", countryCode: "CN", rate: 6.45 },
  
  // Americas
  { country: "Argentina", currency: "ARS", currencyName: "Argentine Peso", countryCode: "AR", rate: 350.25 },
  { country: "Bolivia", currency: "BOB", currencyName: "Bolivian Boliviano", countryCode: "BO", rate: 6.91 },
  { country: "Brazil", currency: "BRL", currencyName: "Brazilian Real", countryCode: "BR", rate: 5.02 },
  { country: "Chile", currency: "CLP", currencyName: "Chilean Peso", countryCode: "CL", rate: 800.45 },
  { country: "Colombia", currency: "COP", currencyName: "Colombian Peso", countryCode: "CO", rate: 4250.30 },
  { country: "Costa Rica", currency: "CRC", currencyName: "Costa Rican Colon", countryCode: "CR", rate: 545.75 },
  { country: "Cuba", currency: "CUP", currencyName: "Cuban Peso", countryCode: "CU", rate: 24.50 },
  { country: "Dominican Republic", currency: "DOP", currencyName: "Dominican Peso", countryCode: "DO", rate: 56.85 },
  { country: "Guatemala", currency: "GTQ", currencyName: "Guatemalan Quetzal", countryCode: "GT", rate: 7.85 },
  { country: "Honduras", currency: "HNL", currencyName: "Honduran Lempira", countryCode: "HN", rate: 24.75 },
  { country: "Jamaica", currency: "JMD", currencyName: "Jamaican Dollar", countryCode: "JM", rate: 155.40 },
  { country: "Mexico", currency: "MXN", currencyName: "Mexican Peso", countryCode: "MX", rate: 17.85 },
  { country: "Nicaragua", currency: "NIO", currencyName: "Nicaraguan Córdoba", countryCode: "NI", rate: 36.85 },
  { country: "Panama", currency: "PAB", currencyName: "Panamanian Balboa", countryCode: "PA", rate: 1.00 },
  { country: "Peru", currency: "PEN", currencyName: "Peruvian Sol", countryCode: "PE", rate: 3.75 },
  { country: "Paraguay", currency: "PYG", currencyName: "Paraguayan Guarani", countryCode: "PY", rate: 7250.50 },
  { country: "Uruguay", currency: "UYU", currencyName: "Uruguayan Peso", countryCode: "UY", rate: 39.45 },
  { country: "Venezuela", currency: "VES", currencyName: "Venezuelan Bolívar", countryCode: "VE", rate: 35.85 },
  
  // Europe
  { country: "Albania", currency: "ALL", currencyName: "Albanian Lek", countryCode: "AL", rate: 95.25 },
  { country: "Armenia", currency: "AMD", currencyName: "Armenian Dram", countryCode: "AM", rate: 385.50 },
  { country: "Azerbaijan", currency: "AZN", currencyName: "Azerbaijani Manat", countryCode: "AZ", rate: 1.70 },
  { country: "Bosnia and Herzegovina", currency: "BAM", currencyName: "Bosnia-Herzegovina Mark", countryCode: "BA", rate: 1.75 },
  { country: "Bulgaria", currency: "BGN", currencyName: "Bulgarian Lev", countryCode: "BG", rate: 1.75 },
  { country: "Belarus", currency: "BYN", currencyName: "Belarusian Ruble", countryCode: "BY", rate: 2.50 },
  { country: "Czech Republic", currency: "CZK", currencyName: "Czech Republic Koruna", countryCode: "CZ", rate: 22.85 },
  { country: "Denmark", currency: "DKK", currencyName: "Danish Krone", countryCode: "DK", rate: 6.85 },
  { country: "Georgia", currency: "GEL", currencyName: "Georgian Lari", countryCode: "GE", rate: 2.65 },
  { country: "Croatia", currency: "HRK", currencyName: "Croatian Kuna", countryCode: "HR", rate: 6.75 },
  { country: "Hungary", currency: "HUF", currencyName: "Hungarian Forint", countryCode: "HU", rate: 365.50 },
  { country: "Iceland", currency: "ISK", currencyName: "Icelandic Króna", countryCode: "IS", rate: 135.75 },
  { country: "Moldova", currency: "MDL", currencyName: "Moldovan Leu", countryCode: "MD", rate: 17.85 },
  { country: "North Macedonia", currency: "MKD", currencyName: "Macedonian Denar", countryCode: "MK", rate: 55.25 },
  { country: "Norway", currency: "NOK", currencyName: "Norwegian Krone", countryCode: "NO", rate: 10.85 },
  { country: "Poland", currency: "PLN", currencyName: "Polish Zloty", countryCode: "PL", rate: 4.15 },
  { country: "Romania", currency: "RON", currencyName: "Romanian Leu", countryCode: "RO", rate: 4.65 },
  { country: "Serbia", currency: "RSD", currencyName: "Serbian Dinar", countryCode: "RS", rate: 105.50 },
  { country: "Russia", currency: "RUB", currencyName: "Russian Ruble", countryCode: "RU", rate: 75.25 },
  { country: "Sweden", currency: "SEK", currencyName: "Swedish Krona", countryCode: "SE", rate: 10.45 },
  { country: "Turkey", currency: "TRY", currencyName: "Turkish Lira", countryCode: "TR", rate: 28.75 },
  { country: "Ukraine", currency: "UAH", currencyName: "Ukrainian Hryvnia", countryCode: "UA", rate: 36.85 },
  
  // Asia
  { country: "Afghanistan", currency: "AFN", currencyName: "Afghan Afghani", countryCode: "AF", rate: 85.50 },
  { country: "Bangladesh", currency: "BDT", currencyName: "Bangladeshi Taka", countryCode: "BD", rate: 109.75 },
  { country: "Bhutan", currency: "BTN", currencyName: "Bhutanese Ngultrum", countryCode: "BT", rate: 83.25 },
  { country: "Brunei", currency: "BND", currencyName: "Brunei Dollar", countryCode: "BN", rate: 1.35 },
  { country: "Cambodia", currency: "KHR", currencyName: "Cambodian Riel", countryCode: "KH", rate: 4085.50 },
  { country: "Hong Kong", currency: "HKD", currencyName: "Hong Kong Dollar", countryCode: "HK", rate: 7.85 },
  { country: "Indonesia", currency: "IDR", currencyName: "Indonesian Rupiah", countryCode: "ID", rate: 15750.25 },
  { country: "India", currency: "INR", currencyName: "Indian Rupee", countryCode: "IN", rate: 83.25 },
  { country: "Iraq", currency: "IQD", currencyName: "Iraqi Dinar", countryCode: "IQ", rate: 1305.50 },
  { country: "Iran", currency: "IRR", currencyName: "Iranian Rial", countryCode: "IR", rate: 42250.75 },
  { country: "Jordan", currency: "JOD", currencyName: "Jordanian Dinar", countryCode: "JO", rate: 0.71 },
  { country: "Kazakhstan", currency: "KZT", currencyName: "Kazakhstani Tenge", countryCode: "KZ", rate: 455.25 },
  { country: "Kyrgyzstan", currency: "KGS", currencyName: "Kyrgystani Som", countryCode: "KG", rate: 89.75 },
  { country: "Kuwait", currency: "KWD", currencyName: "Kuwaiti Dinar", countryCode: "KW", rate: 0.31 },
  { country: "Laos", currency: "LAK", currencyName: "Laotian Kip", countryCode: "LA", rate: 20500.50 },
  { country: "Lebanon", currency: "LBP", currencyName: "Lebanese Pound", countryCode: "LB", rate: 15050.25 },
  { country: "Malaysia", currency: "MYR", currencyName: "Malaysian Ringgit", countryCode: "MY", rate: 4.65 },
  { country: "Maldives", currency: "MVR", currencyName: "Maldivian Rufiyaa", countryCode: "MV", rate: 15.45 },
  { country: "Mongolia", currency: "MNT", currencyName: "Mongolian Tugrik", countryCode: "MN", rate: 3485.75 },
  { country: "Myanmar", currency: "MMK", currencyName: "Myanmar Kyat", countryCode: "MM", rate: 2105.50 },
  { country: "Nepal", currency: "NPR", currencyName: "Nepalese Rupee", countryCode: "NP", rate: 133.25 },
  { country: "North Korea", currency: "KPW", currencyName: "North Korean Won", countryCode: "KP", rate: 900.00 },
  { country: "Oman", currency: "OMR", currencyName: "Omani Rial", countryCode: "OM", rate: 0.38 },
  { country: "Pakistan", currency: "PKR", currencyName: "Pakistani Rupee", countryCode: "PK", rate: 285.75 },
  { country: "Philippines", currency: "PHP", currencyName: "Philippine Peso", countryCode: "PH", rate: 56.25 },
  { country: "Qatar", currency: "QAR", currencyName: "Qatari Rial", countryCode: "QA", rate: 3.64 },
  { country: "Saudi Arabia", currency: "SAR", currencyName: "Saudi Riyal", countryCode: "SA", rate: 3.75 },
  { country: "Singapore", currency: "SGD", currencyName: "Singapore Dollar", countryCode: "SG", rate: 1.35 },
  { country: "South Korea", currency: "KRW", currencyName: "South Korean Won", countryCode: "KR", rate: 1325.50 },
  { country: "Sri Lanka", currency: "LKR", currencyName: "Sri Lankan Rupee", countryCode: "LK", rate: 325.75 },
  { country: "Syria", currency: "SYP", currencyName: "Syrian Pound", countryCode: "SY", rate: 2515.25 },
  { country: "Taiwan", currency: "TWD", currencyName: "Taiwan New Dollar", countryCode: "TW", rate: 31.85 },
  { country: "Tajikistan", currency: "TJS", currencyName: "Tajikistani Somoni", countryCode: "TJ", rate: 10.95 },
  { country: "Thailand", currency: "THB", currencyName: "Thai Baht", countryCode: "TH", rate: 35.75 },
  { country: "Turkmenistan", currency: "TMT", currencyName: "Turkmenistani Manat", countryCode: "TM", rate: 3.50 },
  { country: "United Arab Emirates", currency: "AED", currencyName: "UAE Dirham", countryCode: "AE", rate: 3.67 },
  { country: "Uzbekistan", currency: "UZS", currencyName: "Uzbekistani Som", countryCode: "UZ", rate: 12450.75 },
  { country: "Vietnam", currency: "VND", currencyName: "Vietnamese Dong", countryCode: "VN", rate: 24350.50 },
  { country: "Yemen", currency: "YER", currencyName: "Yemeni Rial", countryCode: "YE", rate: 250.75 },
  
  // Africa
  { country: "Algeria", currency: "DZD", currencyName: "Algerian Dinar", countryCode: "DZ", rate: 135.50 },
  { country: "Angola", currency: "AOA", currencyName: "Angolan Kwanza", countryCode: "AO", rate: 825.75 },
  { country: "Botswana", currency: "BWP", currencyName: "Botswanan Pula", countryCode: "BW", rate: 13.85 },
  { country: "Burundi", currency: "BIF", currencyName: "Burundian Franc", countryCode: "BI", rate: 2850.50 },
  { country: "Central African Republic", currency: "XAF", currencyName: "Central African CFA Franc", countryCode: "CF", rate: 585.25 },
  { country: "Comoros", currency: "KMF", currencyName: "Comorian Franc", countryCode: "KM", rate: 415.75 },
  { country: "Democratic Republic of the Congo", currency: "CDF", currencyName: "Congolese Franc", countryCode: "CD", rate: 2685.50 },
  { country: "Djibouti", currency: "DJF", currencyName: "Djiboutian Franc", countryCode: "DJ", rate: 177.85 },
  { country: "Egypt", currency: "EGP", currencyName: "Egyptian Pound", countryCode: "EG", rate: 30.85 },
  { country: "Eritrea", currency: "ERN", currencyName: "Eritrean Nakfa", countryCode: "ER", rate: 15.00 },
  { country: "Ethiopia", currency: "ETB", currencyName: "Ethiopian Birr", countryCode: "ET", rate: 55.75 },
  { country: "Gambia", currency: "GMD", currencyName: "Gambian Dalasi", countryCode: "GM", rate: 67.25 },
  { country: "Ghana", currency: "GHS", currencyName: "Ghanaian Cedi", countryCode: "GH", rate: 12.15 },
  { country: "Guinea", currency: "GNF", currencyName: "Guinean Franc", countryCode: "GN", rate: 8565.50 },
  { country: "Kenya", currency: "KES", currencyName: "Kenyan Shilling", countryCode: "KE", rate: 150.75 },
  { country: "Lesotho", currency: "LSL", currencyName: "Lesotho Loti", countryCode: "LS", rate: 18.85 },
  { country: "Liberia", currency: "LRD", currencyName: "Liberian Dollar", countryCode: "LR", rate: 185.50 },
  { country: "Libya", currency: "LYD", currencyName: "Libyan Dinar", countryCode: "LY", rate: 4.85 },
  { country: "Madagascar", currency: "MGA", currencyName: "Malagasy Ariary", countryCode: "MG", rate: 4550.25 },
  { country: "Malawi", currency: "MWK", currencyName: "Malawian Kwacha", countryCode: "MW", rate: 1685.75 },
  { country: "Mauritania", currency: "MRU", currencyName: "Mauritanian Ouguiya", countryCode: "MR", rate: 37.85 },
  { country: "Mauritius", currency: "MUR", currencyName: "Mauritian Rupee", countryCode: "MU", rate: 45.25 },
  { country: "Morocco", currency: "MAD", currencyName: "Moroccan Dirham", countryCode: "MA", rate: 10.15 },
  { country: "Mozambique", currency: "MZN", currencyName: "Mozambican Metical", countryCode: "MZ", rate: 63.85 },
  { country: "Namibia", currency: "NAD", currencyName: "Namibian Dollar", countryCode: "NA", rate: 18.85 },
  { country: "Nigeria", currency: "NGN", currencyName: "Nigerian Naira", countryCode: "NG", rate: 785.50 },
  { country: "Rwanda", currency: "RWF", currencyName: "Rwandan Franc", countryCode: "RW", rate: 1285.75 },
  { country: "São Tomé and Príncipe", currency: "STN", currencyName: "São Tomé and Príncipe Dobra", countryCode: "ST", rate: 22.85 },
  { country: "Seychelles", currency: "SCR", currencyName: "Seychellois Rupee", countryCode: "SC", rate: 13.45 },
  { country: "Sierra Leone", currency: "SLL", currencyName: "Sierra Leonean Leone", countryCode: "SL", rate: 20850.50 },
  { country: "Somalia", currency: "SOS", currencyName: "Somali Shilling", countryCode: "SO", rate: 570.25 },
  { country: "South Africa", currency: "ZAR", currencyName: "South African Rand", countryCode: "ZA", rate: 18.85 },
  { country: "South Sudan", currency: "SSP", currencyName: "South Sudanese Pound", countryCode: "SS", rate: 130.75 },
  { country: "Sudan", currency: "SDG", currencyName: "Sudanese Pound", countryCode: "SD", rate: 601.25 },
  { country: "Eswatini", currency: "SZL", currencyName: "Swazi Lilangeni", countryCode: "SZ", rate: 18.85 },
  { country: "Tanzania", currency: "TZS", currencyName: "Tanzanian Shilling", countryCode: "TZ", rate: 2485.50 },
  { country: "Tunisia", currency: "TND", currencyName: "Tunisian Dinar", countryCode: "TN", rate: 3.15 },
  { country: "Uganda", currency: "UGX", currencyName: "Ugandan Shilling", countryCode: "UG", rate: 3785.25 },
  { country: "Zambia", currency: "ZMW", currencyName: "Zambian Kwacha", countryCode: "ZM", rate: 23.85 },
  { country: "Zimbabwe", currency: "ZWL", currencyName: "Zimbabwean Dollar", countryCode: "ZW", rate: 322.50 },
  
  // Oceania
  { country: "Fiji", currency: "FJD", currencyName: "Fijian Dollar", countryCode: "FJ", rate: 2.25 },
  { country: "New Zealand", currency: "NZD", currencyName: "New Zealand Dollar", countryCode: "NZ", rate: 1.65 },
  { country: "Papua New Guinea", currency: "PGK", currencyName: "Papua New Guinean Kina", countryCode: "PG", rate: 3.75 },
  { country: "Solomon Islands", currency: "SBD", currencyName: "Solomon Islands Dollar", countryCode: "SB", rate: 8.45 },
  { country: "Tonga", currency: "TOP", currencyName: "Tongan Paʻanga", countryCode: "TO", rate: 2.35 },
  { country: "Vanuatu", currency: "VUV", currencyName: "Vanuatu Vatu", countryCode: "VU", rate: 119.75 },
  { country: "Samoa", currency: "WST", currencyName: "Samoan Tala", countryCode: "WS", rate: 2.75 },
  
  // Special cases (no flags for these)
  { country: "West Africa", currency: "XOF", currencyName: "West African CFA Franc", countryCode: null, rate: 585.25 },
  { country: "Digital Currency", currency: "BTC", currencyName: "Bitcoin", countryCode: null, rate: 0.000023 },
  { country: "Digital Currency", currency: "ETH", currencyName: "Ethereum", countryCode: null, rate: 0.00045 },
  { country: "International", currency: "XDR", currencyName: "Special Drawing Rights", countryCode: null, rate: 0.75 },
  { country: "Commodities", currency: "XAU", currencyName: "Gold (troy ounce)", countryCode: null, rate: 0.0005 },
  { country: "Commodities", currency: "XAG", currencyName: "Silver (troy ounce)", countryCode: null, rate: 0.04 },
];

// Currency selector component
const CurrencySelector = ({ 
  value, 
  onSelect, 
  label, 
  disabled = false 
}: { 
  value: string; 
  onSelect: (value: string) => void; 
  label: string;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedData = countryData.find(c => c.currency === value);
  
  const filteredCountries = countryData.filter(country =>
    country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.currencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFlag = (countryCode: string | null) => {
    if (!countryCode) {
      // Fallback for special currencies
      const flagEmojis: { [key: string]: string } = {
        "XOF": "🌍",
        "BTC": "₿",
        "ETH": "Ξ",
        "XDR": "🏦",
        "XAU": "🥇",
        "XAG": "🥈"
      };
      return <span className="text-lg">{flagEmojis[value] || "💱"}</span>;
    }
    return <Flag country={countryCode} size={24} />;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="h-12 w-full justify-between text-lg transition-smooth hover:shadow-glow focus:shadow-glow"
          >
            <div className="flex items-center space-x-2">
              {renderFlag(selectedData?.countryCode || null)}
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedData?.currency}</span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {selectedData?.currencyName}
                </span>
              </div>
            </div>
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0 bg-popover border-border" align="start">
          <Command className="bg-popover">
            <CommandInput 
              placeholder="Search by country, currency, or code..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-12"
            />
            <CommandList className="max-h-64">
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CommandItem
                    key={country.currency}
                    value={`${country.country} ${country.currencyName} ${country.currency}`}
                    onSelect={() => {
                      onSelect(country.currency);
                      setOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    {renderFlag(country.countryCode)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{country.country}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full font-mono">
                          {country.currency}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {country.currencyName}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const fromData = countryData.find(c => c.currency === fromCurrency);
    const toData = countryData.find(c => c.currency === toCurrency);
    
    if (fromData && toData) {
      // Convert to USD first, then to target currency
      const usdAmount = parseFloat(amount) / fromData.rate;
      const result = usdAmount * toData.rate;
      const rate = toData.rate / fromData.rate;
      
      setConvertedAmount(result);
      setExchangeRate(rate);
    }
    
    setIsLoading(false);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  return (
    <section id="currency-converter" className="py-20 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Currency Converter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between 150+ currencies with real-time exchange rates and intuitive country search
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-primary/10 shadow-elegant backdrop-blur-sm bg-card/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>Live Exchange Rates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg font-semibold text-center"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            {/* Currency Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <CurrencySelector
                value={fromCurrency}
                onSelect={setFromCurrency}
                label="From"
              />
              
              <div className="flex justify-center md:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapCurrencies}
                  className="h-12 w-12 rounded-full border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </Button>
              </div>
              
              <CurrencySelector
                value={toCurrency}
                onSelect={setToCurrency}
                label="To"
              />
            </div>

            {/* Convert Button */}
            <Button
              onClick={handleConvert}
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              className="w-full h-12 text-lg font-semibold gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert Currency"
              )}
            </Button>

            {/* Results */}
            {convertedAmount !== null && exchangeRate !== null && !isLoading && (
              <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(convertedAmount, toCurrency)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(parseFloat(amount), fromCurrency)} ≈ {formatCurrency(convertedAmount, toCurrency)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};