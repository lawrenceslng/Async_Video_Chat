-- restructuring database
-- to add views, in conversation relation we can check if the user has watched it by adding a column and set it to 1 or 0
-- to add views, in conversations reply, we need to add conversations reply relation and do same thing above

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

CREATE TABLE groups(
	id INT NOT NULL AUTO_INCREMENT,
	group_name VARCHAR(30) NOT NULL,
	members INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users_groups_relations(
	user_id INT NOT NULL,
	group_id INT NOT NULL,
	user_level NOT NULL ENUM('admin', 'member'),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (group_id) REFERENCES groups(id),
)
-- backend checks emails in databases to see if a user with that email already EXISTS

-- CREATE TABLE contacts(
-- 	user_id INT NOT NULL,
-- 	friend_id INT NOT NULL,
-- 	FOREIGN KEY (user_id) REFERENCES users(id),
-- 	FOREIGN KEY (friend_id) REFERENCES users(id)
-- );

CREATE TABLE conversations(
	id INT NOT NULL AUTO_INCREMENT,
	user_one_id INT NOT NULL, 
	title VARCHAR(255) NOT NULL,
	content TEXT,
	fs_path TEXT,
	stat ENUM('active', 'archive'),
	-- share ENUM('public', 'group'),
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_one_id) REFERENCES users(id)
	-- FOREIGN KEY (user_two_id) REFERENCES users(id)
);

CREATE TABLE conversation_relation(
	conversation_id INT NOT NULL,
	user_id INT NOT NULL,
	viewed NOT NULL ENUM('0', '1'),
	FOREIGN KEY (conversation_id) REFERENCES conversations(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
-- to enable group chat:
-- create a chatroom table (each conversation is a new chatroom)
-- have a table that list the chat user_two_id

CREATE TABLE conversations_reply(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	content TEXT,
	fs_path TEXT,
	c_id_fk INT NOT NULL,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (c_id_fk) REFERENCES conversations(id)
);


