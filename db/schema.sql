DROP DATABASE IF EXISTS ThoughtParcel_db;
CREATE DATABASE ThoughtParcel_db;
USE ThoughtParcel_db;

-- table for all users (login system table)
-- I am going to follow the guidelines in the video I sent you guys for setting the data types of this table to make authentication and other things dealing with login system work

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR (255) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	password VARCHAR(100) BINARY NOT NULL,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (username),
	UNIQUE (email),
	PRIMARY KEY (id)
);

CREATE TABLE contacts(
	user_id INT NOT NULL,
	friend_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (friend_id) REFERENCES users(id)
)

CREATE TABLE conversations(
	id INT NOT NULL AUTO_INCREMENT,
	user_one_id INT NOT NULL,
	user_two_id INT NOT NULL,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	fs_path TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (user_one_id) REFERENCES users(id),
	FOREIGN KEY (user_two_id) REFERENCES users(id)
)

CREATE TABLE conversations_reply(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	content TEXT,
	fs_path TEXT,
	c_id_fk INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (c_id_fk) REFERENCES conversations(id)
)