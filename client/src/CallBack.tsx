import React, { useEffect } from 'react';
import { useAthlete } from './AthleteContext.tsx';
import { StravaActivity } from "./models/StravaActivity.ts";

async function getAllActivities(token: string): Promise<StravaActivity[]> {
    let page = 1;
    const perPage = 200;
    let allActivities: StravaActivity[] = [];

    while (true) {
        const url = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=${perPage}&page=${page}`;
        const response = await fetch(url);
        const activities: StravaActivity[] = await response.json();

        if (activities.length === 0) break;

        allActivities = allActivities.concat(activities);
        page++;
    }

    return allActivities;
}

function CallbackComponent() {
    const { setAthlete, setActivities, setIsFetchingActivities, activities } = useAthlete();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const client_id = import.meta.env.VITE_CLIENT_ID;
        const client_secret = import.meta.env.VITE_CLIENT_SECRET;

        if (!client_id || !client_secret) {
            console.error("Error: Missing environment variables for CLIENT_ID or CLIENT_SECRET.");
            return;
        }

        if (code) {
            console.log("Authorization code:", code);
            console.log("Client ID:", client_id);
            console.log("Client Secret:", client_secret);

            fetch('https://www.strava.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id,
                    client_secret,
                    code,
                    grant_type: 'authorization_code'
                })
            })
                .then(async response => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Error response from Strava token exchange:", errorData);
                        throw new Error("Failed to exchange authorization code for token.");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.access_token) {
                        console.log("Access token received:", data.access_token);

                        fetch('https://www.strava.com/api/v3/athlete', {
                            headers: {
                                Authorization: `Bearer ${data.access_token}`
                            }
                        })
                            .then(response => response.json())
                            .then(athlete => {
                                setAthlete(athlete);
                                console.log('Athlete information:', athlete);
                            })
                            .catch(error => console.error('Error fetching athlete information:', error));

                        setIsFetchingActivities(true);
                        getAllActivities(data.access_token)
                            .then(allActivities => {
                                const activitiesToday = allActivities.filter(activity => {
                                    const activityDate = new Date(activity.start_date);
                                    const today = new Date();
                                    return (
                                        activityDate.getFullYear() === today.getFullYear() &&
                                        activityDate.getMonth() === today.getMonth() &&
                                        activityDate.getDate() === today.getDate()
                                    );
                                });

                                console.log("Today's activities:", activitiesToday);
                                setActivities(activitiesToday);
                                setIsFetchingActivities(false);
                            })
                            .catch(error => {
                                console.error('Error fetching all activities:', error);
                                setIsFetchingActivities(false);
                            });
                    } else {
                        console.error("Error: No access token received.");
                    }
                })
                .catch(error => {
                    console.error('Error exchanging code for token:', error);
                });
        }
    }, [setAthlete, setActivities, setIsFetchingActivities]);

    // Ensure the activities are properly rendered
    return (
        <div>
            {activities.length === 0 ? (
                <p>No activities for today.</p>
            ) : (
                <ul>
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            <h3>{activity.name}</h3>
                            <p>Distance: {(activity.distance * 0.000621371).toFixed(2)} miles</p>
                            <p>Duration: {(activity.moving_time / 60).toFixed(2)} minutes</p>
                            <p>Elevation gain: {(activity.total_elevation_gain*3.28084).toFixed(0)} feet</p>
                            <p>Average Speed: {activity.average_speed.toFixed(2)} mph</p>
                            <p>Average Heart Rate: {activity.average_heartrate.toFixed(0)} bpm</p>
                        </li>

                    ))}
                </ul>
            )}
        </div>
    );
}

export default CallbackComponent;

