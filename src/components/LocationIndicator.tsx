import { MapPin as MapPinIcon, Clock, Globe } from "lucide-react";
import { Card as UICard, CardContent } from "@/components/ui/card";
import FlagIcon from "react-flagkit";
import type { GeolocationResponse } from "@/services/geolocationService";

interface LocationIndicatorProps {
  locationData: GeolocationResponse | null;
  isLoading: boolean;
  currentTime?: string;
}

export const LocationIndicator = ({ locationData, isLoading, currentTime }: LocationIndicatorProps) => {
  if (isLoading) {
    return (
      <UICard className="bg-primary/5 border-primary/10">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-primary animate-pulse" />
            <div className="h-4 bg-primary/20 rounded w-32 animate-pulse"></div>
          </div>
        </CardContent>
      </UICard>
    );
  }

  if (!locationData) {
    return (
      <UICard className="bg-muted/50 border-muted-foreground/10">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Location detection unavailable</span>
          </div>
        </CardContent>
      </UICard>
    );
  }

  return (
    <UICard className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FlagIcon country={locationData.country_code2} size={20} />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {locationData.city}, {locationData.country_name}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  Currency: {locationData.currency?.code} ({locationData.currency?.symbol})
                </span>
              </div>
            </div>
          </div>
          {currentTime && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{currentTime}</span>
            </div>
          )}
        </div>
      </CardContent>
    </UICard>
  );
};
