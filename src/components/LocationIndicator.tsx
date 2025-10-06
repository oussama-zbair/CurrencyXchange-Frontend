import { MapPin as MapPinIcon, Globe } from "lucide-react";
import { Card as UICard, CardContent } from "@/components/ui/card";
import type { GeolocationResponse } from "@/services/geolocationService";

interface LocationIndicatorProps {
  locationData: GeolocationResponse | null;
  isLoading: boolean;
  currentTime?: string;
}

export const LocationIndicator = ({ locationData, isLoading }: LocationIndicatorProps) => {
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
        <div className="flex items-center space-x-3">
          <img
            src={`https://flagcdn.com/24x18/${locationData.country_code2?.toLowerCase()}.png`}
            alt={locationData.country_name}
            className="w-6 h-4 rounded-sm"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{locationData.country_name}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">
                Currency: {locationData.currency || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </UICard>
  );
};
