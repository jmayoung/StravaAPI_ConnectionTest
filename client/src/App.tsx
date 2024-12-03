import { useState } from 'react';
import './App.css';
import { useAthlete } from './AthleteContext.tsx';
// Import date-fns if needed
// import { parseISO, format } from 'date-fns';

function App() {
    const [error] = useState<string | null>(null);
    const { athlete, activities, isFetchingActivities } = useAthlete();

    let client_id = import.meta.env.VITE_CLIENT_ID;
    if (!client_id) {
        client_id = process.env.CLIENT_ID;
    }

    const handleStravaConnect = () => {
        window.location.href = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${window.location.origin}/callback&response_type=code&scope=read_all,activity:read`;
    };

    // Filter activities for today's date
    const todaysActivities = activities.filter(activity => {
        const activityDate = activity.start_date_local.split('T')[0];
        const todayString = new Date().toISOString().split('T')[0];
        return activityDate === todayString;
        console.log("Activity date:", activityDate, "Today's date:", todayString);
    });

    return (
        <div>
            {!athlete && (
                <>
                    <h1>Permission Requested</h1>
                    <h3>To get started, please connect to Strava</h3>
                    <button onClick={handleStravaConnect}>Connect to Strava</button>
                </>
            )}
            {error && <p>{error}</p>}
            {athlete && (
                <div>
                    <h1>Activities for: {athlete.firstname} {athlete.lastname} </h1>
                    <div>
                        {isFetchingActivities && <p>Fetching activities</p>}
                        {!isFetchingActivities && (
                            <>
                                {todaysActivities.length > 0 ? (
                                    <ul>
                                    </ul>
                                ) : (
                                    <h2>All activities from today:</h2>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

