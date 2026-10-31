import { useState, useEffect } from 'react';

const ListActivity = ({ refresh }) => {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/listActivity");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setActivities(data.data);

            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchData();
    }, [refresh]);

    return (
        <div>
            <h2>My Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        {activity.activity_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListActivity;