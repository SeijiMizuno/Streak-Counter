require("dotenv").config();

const express = require("express");
const app = express();
const pool = require("./db/pool.js");

app.use(express.json());

const PORT = 3000;

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Streak Counter API is working! HELLO WORLD!"
    });
});

app.post("/api/activity", async (req, res) => {
    try {
        const activityName = req.body.activityName;
        const parsedActivityName = String(activityName).trim();

        if (!parsedActivityName) {
            return res.status(400).json({
                status: "error",
                message: "The activity name is required."
            });
        }

        // temporary static user ID for tests
        const userId = 1;
        const query = `
            INSERT INTO ${process.env.DB_TABLE_ACTIVITIES} (user_id, activity_name) 
            VALUES ($1, $2) RETURNING id, user_id, activity_name, created_at
        `;

        const result = await pool.query(query, [userId, parsedActivityName]);

        return res.status(201).json({
            status: "ok",
            message: `Activity '${parsedActivityName}' saved successfully!`,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error saving activity:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while saving the activity"
        });
    }
});

app.get("/api/listActivity", async (req, res) => {
    try {
        const userId = 1; // temporary static user ID for tests
        const query = `
            SELECT id, activity_name, created_at
            FROM activities
            WHERE user_id = $1
            AND archived_at IS NULL
            ORDER BY created_at DESC;
        `;

        const result = await pool.query(query, [userId]);

        return res.status(200).json({
            status: "ok",
            message: "Activities fetched successfully!",
            data: result.rows
        });
 
    } catch (error) {
        console.error("Error fetching activities:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching activities"
        });
    }

});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

