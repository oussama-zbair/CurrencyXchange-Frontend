import { useState, useEffect } from "react";
import { ArrowUpDown, Loader2, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Flag from "react-flagkit";
import { fetchCountries, fetchCurrencyRates } from "@/lib/api";
import { geolocationService } from "@/services/geolocationService";
import { LocationIndicator } from "@/components/LocationIndicator";
import { RegionalCurrencies } from "@/components/RegionalCurrencies";

export interface CountryData {
  currencyCode: string;
  currencyName: string;
  countryCode: string | null;
  countryName: string;
  rate?: number;
}



const CurrencySelector = ({
  value,
  onSelect,
  label,
  disabled = false,
  countryData
}: {
  value: string;
  onSelect: (value: string) => void;
  label: string;
  disabled?: boolean;
  countryData: CountryData[];
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedData = countryData.find(c => c.currencyCode === value);

  const filteredCountries = searchQuery === ""
    ? countryData
    : countryData.filter(country => {
      const search = searchQuery.toLowerCase();
      return (
        country.countryName?.toLowerCase().includes(search) ||
        country.currencyCode?.toLowerCase().includes(search) ||
        country.currencyName?.toLowerCase().includes(search)
      );
    });

  const sortedCountries = [...filteredCountries].sort((a, b) => a.countryName.localeCompare(b.countryName));

  const renderFlag = (countryCode: string | null, currency: string) => {
    if (!countryCode) return <span className="text-lg">💱</span>;
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
            className="h-12 w-full justify-between text-lg"
          >
            <div className="flex items-center space-x-2">
              {renderFlag(selectedData?.countryCode || null, selectedData?.currencyCode || "")}
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedData?.currencyCode}</span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {selectedData?.currencyName}
                </span>
              </div>
            </div>
            <Search className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search currency..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-12"
            />
            <CommandList className="max-h-64">
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {sortedCountries.map((country, index) => (
                  <CommandItem
                    key={`${country.currencyCode}-${country.countryCode || index}`}
                    value={`${country.countryName} ${country.currencyCode} ${country.currencyName}`}
                    onSelect={() => {
                      onSelect(country.currencyCode);
                      setOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    {renderFlag(country.countryCode, country.currencyCode)}
                    <div className="ml-3 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{country.countryName}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full font-mono">
                          {country.currencyCode}
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

const formatCurrency = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      const geo = await geolocationService.getUserLocation();
      setLocationData(geo);
      if (geo?.currency?.code) setFromCurrency(geo.currency.code);
      if (geo?.time_zone?.name) {
        const time = geolocationService.getCurrentTimeInUserTimezone(geo.time_zone.name);
        setCurrentTime(time);
      }
    };
    fetchGeoData();
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setDataLoading(true);
        const data = await fetchCountries();
        setCountryData(data);
        setDataError(null);
      } catch {
        setDataError("Failed to load currency data.");
      } finally {
        setDataLoading(false);
      }
    };
    loadCountries();
  }, []);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsLoading(true);
    try {
      const data = await fetchCurrencyRates(fromCurrency);
      const rate = data.exchangeRates[toCurrency];
      if (!rate) throw new Error();
      setExchangeRate(rate);
      setConvertedAmount(parseFloat(amount) * rate);
    } catch {
      setExchangeRate(null);
      setConvertedAmount(null);
      setDataError("Error converting currencies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const regionalCurrencies = locationData?.continent_code
    ? geolocationService.getRegionalCurrencies(locationData.continent_code)
    : [];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <LocationIndicator locationData={locationData} isLoading={dataLoading} currentTime={currentTime || undefined} />

        <RegionalCurrencies
          regionalCurrencies={regionalCurrencies}
          countryData={countryData}
          onCurrencySelect={setFromCurrency}
          userCountry={locationData?.country_code2}
        />

        <Card className="border-primary/10 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>Live Exchange Rates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="h-12 text-lg font-semibold text-center"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <CurrencySelector value={fromCurrency} onSelect={setFromCurrency} label="From" countryData={countryData} disabled={dataLoading} />

              <div className="flex justify-center md:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapCurrencies}
                  className="h-12 w-12"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </Button>
              </div>

              <CurrencySelector value={toCurrency} onSelect={setToCurrency} label="To" countryData={countryData} disabled={dataLoading} />
            </div>

            <Button
              onClick={handleConvert}
              disabled={!amount || parseFloat(amount) <= 0 || isLoading || dataLoading}
              className="w-full h-12 text-lg font-semibold"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Convert Currency"}
            </Button>

            {convertedAmount !== null && exchangeRate !== null && !isLoading && (
              <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">{formatCurrency(convertedAmount, toCurrency)}</div>
                  <div className="text-sm text-muted-foreground">
                    1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(parseFloat(amount), fromCurrency)} ≈ {formatCurrency(convertedAmount, toCurrency)}
                  </div>
                </div>
              </div>
            )}

            {dataError && (
              <div className="text-center text-sm text-red-500 pt-4">
                {dataError}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};