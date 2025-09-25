import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin as MapPinIcon } from "lucide-react";
import FlagIcon from "react-flagkit";
import type { CountryData } from "../types/currency";

interface RegionalCurrenciesProps {
  regionalCurrencies: string[];
  countryData: CountryData[];
  onCurrencySelect: (currency: string) => void;
  userCountry?: string;
};

export const RegionalCurrencies = ({
  regionalCurrencies,
  countryData,
  onCurrencySelect,
  userCountry,
}: RegionalCurrenciesProps) => {
  const getCurrencyInfo = (currencyCode: string) =>
    countryData.find(c => c.currencyCode === currencyCode);

  const getCountryFlag = (currencyCode: string) => {
    const currencyToCountryMap: Record<string, string> = Object.fromEntries(
      countryData.map(({ currencyCode, countryCode }) => [currencyCode, countryCode])
    );
    return currencyToCountryMap[currencyCode] || null;
  };

  if (!regionalCurrencies.length) return null;

  return (
    <UICard className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <MapPinIcon className="h-5 w-5 text-primary" />
          <span>Popular in Your Region</span>
          {userCountry && (
            <Badge variant="secondary" className="ml-2">
              <FlagIcon country={userCountry} size={16} className="mr-1" />
              Regional
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {regionalCurrencies.map(currency => {
            const currencyInfo = getCurrencyInfo(currency);
            const countryFlag = getCountryFlag(currency);

            return (
              <Button
                key={currency}
                variant="outline"
                size="sm"
                onClick={() => onCurrencySelect(currency)}
                className="justify-start space-x-2 h-auto p-3 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
              >
                {countryFlag ? (
                  <FlagIcon country={countryFlag} size={16} />
                ) : (
                  <TrendingUp className="h-4 w-4" />
                )}
                <div className="flex flex-col items-start">
                  <span className="font-medium text-xs">{currency}</span>
                  {currencyInfo && (
                    <span className="text-xs text-muted-foreground truncate max-w-20">
                      {currencyInfo.currencyName}
                    </span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Quick access to currencies commonly used in your region
        </p>
      </CardContent>
    </UICard>
  );
};
