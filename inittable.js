const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS task;

DROP TABLE IF EXISTS taskProgress;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT
);

CREATE TABLE task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
);

CREATE TABLE taskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (task_id) REFERENCES task(task_id)
);

INSERT INTO task (title, description, points) VALUES
    ('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
    ('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
    ('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
    ('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
    ('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);
`;
pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully:", results);
    }
    process.exit();
  });