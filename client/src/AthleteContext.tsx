import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StravaActivity } from './models/StravaActivity.ts';

interface AthleteContextType {
    athlete: any;
    activities: StravaActivity[];
    setAthlete: (athlete: any) => void;
    setActivities: (activities: StravaActivity[]) => void;
    setIsFetchingActivities: (isFetching: boolean) => void;
}

const AthleteContext = createContext<AthleteContextType | undefined>(undefined);

export const useAthlete = () => {
    const context = useContext(AthleteContext);
    if (!context) {
        throw new Error('useAthlete must be used within an AthleteProvider');
    }
    return context;
};

interface AthleteProviderProps {
    children: ReactNode;  // This explicitly types the 'children' prop
}

export const AthleteProvider: React.FC<AthleteProviderProps> = ({ children }) => {
    const [athlete, setAthlete] = useState<any>(null);
    const [activities, setActivities] = useState<StravaActivity[]>([]);
    const [isFetchingActivities, setIsFetchingActivities] = useState<boolean>(false);

    return (
        <AthleteContext.Provider
            value={{ athlete, activities, setAthlete, setActivities, setIsFetchingActivities }}
        >
            {children}
        </AthleteContext.Provider>
    );
};
