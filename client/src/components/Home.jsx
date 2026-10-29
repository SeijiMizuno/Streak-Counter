import React from 'react'
import { useNavigate } from 'react-router-dom'
import Activity from './Activity'

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/activity');
    }
    return (
        <>
            <h1>Welcome to the Streak Counter App!</h1>
            <p>This app helps you track your daily activities and maintain streaks.</p>

            <button onClick={handleClick}>Track a new activity</button>
        </>
    )
}

export default Home;