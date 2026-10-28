require("dotenv").config();

const express = require("express");
const pool = require("./db/pool.js");

const app = express();
const PORT = 3000;

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Streak Counter API is working! HELLO WORLD!"
    });
});

app.get("/api/saveActivity", (req, res) => {
    try {
        const activityName = req.query.activityName;

        if (!activityName) {
            return res.status(400).json({
                status: "error",
                message: "Missing activityName parameter"
            });
        }

        console.log("save activity triggered with activityName:", activityName);
        // Save the activity to the database
        // pool.query(`INSERT INTO ${process.env.DB_TABLE_ACTIVITIES}`);
        return res.json({
            status: "ok",
            message: `Activity '${activityName}' saved successfully!`
        });
    } catch (error) {
        console.error("Error saving activity:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while saving the activity"
        });
    }

});


app.get("/api/test", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT NOW() AS current_time,
            current_database() AS database_name
        `);

        res.json({
            status: "ok",
            message: "Connected to the database successfully!",
            database: result.rows[0].database_name,
            time: result.rows[0].current_time,
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);

        res.status(500).json({
            status:"error",
            message: "It was not possible to connect to the database",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

