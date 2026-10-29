import React from 'react'
import {
    useState,
    useEffect
} from 'react'


const Activity = () => {
    const [activityName, setActivityName] = useState('');

    return (
        <>
            <h1>Track a new activity</h1>
            <label htmlFor="ActivityName">
                Activity Name:
            </label>

            <input 
                id="activityName"
                type="text" 
                value={activityName} 
                onChange={(e) => setActivityName(e.target.value)} 
            />

            <button 
                onClick={() => {
                    console.log(`/api/saveActivity?activityName=` + encodeURIComponent(activityName));
                    fetch(`/api/saveActivity?activityName=` + encodeURIComponent(activityName))
                }}
            >
                Save Activity
            </button>
        </>
    );
};

export default Activity;