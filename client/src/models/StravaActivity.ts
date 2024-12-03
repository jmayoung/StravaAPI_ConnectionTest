export interface StravaActivity {
    id: number; // unique identifier for the activity
    resource_state: number; // 1 for "summary", 2 for "detail", 3 for "meta"
    external_id: string; // identifier provided at upload time
    upload_id: number; // identifier provided at upload time
    athlete: {
        id: number; // unique identifier for the athlete
        resource_state: number; // 1 for "summary", 2 for "detail"
    };
    //Main:
    name: string; // activity name
    distance: number; // distance of activity, in meters
    moving_time: number; // moving time of activity in seconds
    elapsed_time: number; // elapsed time of activity in seconds (including stopped time)
    total_elevation_gain: number; // elevation gain of activity, in meters
    type: string; // activity type, ie. Ride, Run, Swim, etc.
    // Date and time:
    start_date: string; // UTC time when the activity was started.
    start_date_local: string; // local time when the activity was started.
    timezone: string; // timezone of the activity
    utc_offset: number; // offset from UTC time
    // Stats:
    average_speed: number; // average speed during the activity, in meters per second
    max_speed: number; // maximum speed during the activity, in meters per second
    average_cadence?: number; // average cadence during the activity, in rpm
    average_watts?: number; // average power during the activity, in watts
    weighted_average_watts?: number; // weighted average power during the activity, in watts
    kilojoules?: number; // total work done during the activity, in kilojoules
    device_watts?: boolean; // set to true if the watts are from a power meter, false if estimated
    has_heartrate?: boolean; // set to true if the activity has heartrate data, false if not
    average_heartrate: number; // average heart rate during the activity, in beats per minute
    max_watts?: number; // maximum power output during the activity, in watts
    elev_high?: number; // highest elevation during the activity, in meters
    elev_low?: number; // lowest elevation during the activity, in meters
    // Other:
    description?: string; // description of the activity
    calories?: number; // calories consumed during the activity
    //splits metric:
    splits_metric?: [
        {
            distance: number; // split distance in meters
            elapsed_time: number; // split elapsed time in seconds
            elevation_difference: number; // elevation difference in meters
            moving_time: number; // split moving time in seconds
            split: number; // split number
            average_speed: number; // average speed in meters per second
            pace_zone?: number; // pace zone of the split
        }
    ];
    //laps metric:
    laps?: [
        {
            id: number; // unique identifier of the lap
            resource_state: number; // 1 for "summary", 2 for "detail", 3 for "meta"
            name: string; // lap name
            activity: {
                id: number; // unique identifier of the activity
                resource_state: number; // 1 for "summary", 2 for "detail", 3 for "meta"
            };
            athlete: {
                id: number; // unique identifier of the athlete
                resource_state: number; // 1 for "summary", 2 for "detail", 3 for "meta"
            };
            elapsed_time: number; // lap elapsed time in seconds
            moving_time: number; // lap moving time in seconds
            start_date: string; // start date of the lap
            start_date_local: string; // local start date of the lap
            distance: number; // lap distance in meters
            start_index: number; // start index of the lap in its activity
            end_index: number; // end index of the lap in its activity
            total_elevation_gain: number; // elevation gain of the lap, in meters
            average_speed: number; // average speed during the lap, in meters per second
            max_speed: number; // maximum speed during the lap, in meters per second
            average_cadence: number; // average cadence during the lap, in rpm
            average_watts?: number; // average power during the lap, in watts
            weighted_average_watts?: number; // weighted average power during the lap, in watts
            lap_index: number; // lap index of the lap
            split?: number; // split index of the lap
        }
    ];
}