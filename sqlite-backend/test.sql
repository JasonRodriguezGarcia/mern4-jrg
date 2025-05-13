CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doorId TEXT,
        userId NUMBER,
        status TEXT,
        timestamp DATE
        );

        