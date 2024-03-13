USE latihan;

CREATE DATABASE latihanote;

USE latihanote;

CREATE TABLE dbnote (
title VARCHAR(30),
content VARCHAR(50)
);

SHOW TABLES;
DESC dbnote;

INSERT INTO dbnote (title,content)
VALUES ("Hai","kamu");

SELECT * FROM latihan.notes1