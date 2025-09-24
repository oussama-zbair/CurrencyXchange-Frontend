import { useState, useEffect } from "react";
import { ArrowUpDown, Loader2, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Flag from "react-flagkit";
import { fetchCountries, fetchLocation, fetchCurrencyRates } from "@/lib/api";

interface CountryData {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  countryCode: string | null;
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

  const primaryCountries: Record<string, string> = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    JPY: "JP",
    CAD: "CA",
    AUD: "AU",
    CHF: "CH",
    CNY: "CN",
    INR: "IN",
    BRL: "BR",
  };

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

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const aIsPrimary = primaryCountries[a.currencyCode] === a.countryCode;
    const bIsPrimary = primaryCountries[b.currencyCode] === b.countryCode;
    if (aIsPrimary && !bIsPrimary) return -1;
    if (!aIsPrimary && bIsPrimary) return 1;
    return a.countryName.localeCompare(b.countryName);
  });

  const renderFlag = (countryCode: string | null, currency: string) => {
    if (!countryCode) {
      const flagEmojis: { [key: string]: string } = {
        XOF: "🌍",
        BTC: "₿",
        ETH: "Ξ",
        XDR: "🏦",
        XAU: "🥇",
        XAG: "🥈",
      };
      return <span className="text-lg">{flagEmojis[currency] || "💱"}</span>;
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
              {renderFlag(selectedData?.countryCode || null, selectedData?.currencyCode || "")}
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedData?.currencyCode}</span>
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
                    <div className="flex-1 min-w-0 ml-3">
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
  const [detectedLocation, setDetectedLocation] = useState<{ country: string; currency: string } | null>(null);

  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();

        const locationRes = await fetch("/api/location", {
          headers: {
            "X-Real-IP": ip,
          },
        });

        const locationData = await locationRes.json();
        if (locationData.currency) {
          setFromCurrency(locationData.currency);
          setDetectedLocation(locationData);
        }
      } catch {
        console.warn("Location detection failed, defaulting to USD");
      }
    };
    detectUserLocation();
  }, []);


  useEffect(() => {
    const loadCountries = async () => {
      try {
        setDataLoading(true);
        const data = await fetchCountries();
        const patchedData = data.map((country: CountryData) => {
          if (country.currencyCode === "USD") {
            return { ...country, countryCode: "US" };
          }
          return country;
        });

        if (Array.isArray(patchedData) && patchedData.length > 0) {
          setCountryData(patchedData);
          setDataError(null);
        } else {
          setCountryData([]);
          setDataError("No currencies available.");
        }
      } catch {
        setDataError("Failed to load currency data.");
        setCountryData([]);
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
      if (!data.exchangeRates || !data.exchangeRates[toCurrency]) {
        throw new Error(`Exchange rate for ${toCurrency} not found`);
      }
      const rate = data.exchangeRates[toCurrency];
      setExchangeRate(rate);
      setConvertedAmount(parseFloat(amount) * rate);
    } catch {
      setConvertedAmount(null);
      setExchangeRate(null);
      setDataError("Error converting currencies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="currency-converter" className="py-20 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Currency Converter</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between 240+ currencies with real-time exchange rates
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="h-12 text-lg font-semibold text-center"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            {detectedLocation && (
              <div className="text-center py-2 px-4 bg-primary/5 border border-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Detected currency:{" "}
                  {countryData.find(c => c.currencyCode === detectedLocation.currency)?.currencyName ||
                    detectedLocation.currency}{" "}
                  ({detectedLocation.currency})
                </p>
              </div>
            )}

            {dataLoading && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading currency data...</p>
              </div>
            )}

            {dataError && (
              <div className="text-center py-4 px-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{dataError}</p>
              </div>
            )}

            {!dataLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <CurrencySelector value={fromCurrency} onSelect={setFromCurrency} label="From" countryData={countryData} disabled={dataLoading} />

                <div className="flex justify-center md:justify-start">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSwapCurrencies}
                    disabled={dataLoading}
                    className="h-12 w-12 rounded-full border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>

                <CurrencySelector value={toCurrency} onSelect={setToCurrency} label="To" countryData={countryData} disabled={dataLoading} />
              </div>
            )}

            {!dataLoading && (
              <Button
                onClick={handleConvert}
                disabled={!amount || parseFloat(amount) <= 0 || isLoading || dataLoading}
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
            )}

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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
