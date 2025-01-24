CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

INSERT INTO todos (
    id, user_email, title, progress, date
) VALUES (
    '0', 'jesus@test.com', 'First todo', 10, 'Thu Jan 23 2025 10:29:32 GMT-0700 (hora estándar de las Montañas Rocosas)'
);