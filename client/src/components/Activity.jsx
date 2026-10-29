import {
    useState,
} from 'react'

const Activity = () => {
    const [activityName, setActivityName] = useState('');
    const [message, setMessage] = useState('');

    const handleSaveActivity = async () => {
        try {
            const response = await fetch("/api/activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ activityName: activityName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMessage(`Activity "${data.data.activity_name}" saved successfully!`);
            setActivityName(''); // Clear the input field after successful save
        } catch (error) {
            console.error("Error saving activity:", error);
            setMessage("An error occurred while saving the activity");
        }
    }
    return (
        <>
            <div>
                <h1>Track a new activity</h1>

                <input type="text" placeholder="E.g., Study Math" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
            
                <button onClick={handleSaveActivity}>Save Activity</button>

                <p>{message}</p>
            </div>
        </>
    );
};

export default Activity;