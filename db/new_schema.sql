-- restructuring database
-- to add views, in conversation relation we can check if the user has watched it by adding a column and set it to 1 or 0
-- to add views, in conversations reply, we need to add conversations reply relation and do same thing above

DROP DATABASE IF EXISTS ThoughtParcel_db;
CREATE DATABASE ThoughtParcel_db;
USE ThoughtParcel_db;

-- table for all users (login system table)
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR (255) NOT NULL, 
	email VARCHAR(100), 
	phone VARCHAR(30),
	password VARCHAR(100) BINARY NOT NULL,
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (username),
	UNIQUE (email),
	PRIMARY KEY (id)
);

--this table stores all groups that exist in the ThoughtParcel sphere
CREATE TABLE group_name(
	id INT NOT NULL AUTO_INCREMENT,
	group_name VARCHAR(30) NOT NULL,
	members INT NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

--this table stores all emails of people invited to join groups, as these users verify and create account, their email will be moved from this table
CREATE TABLE invites(
	id INT NOT NULL AUTO_INCREMENT,
	group_id INT NOT NULL,
	email VARCHAR(100) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (group_id) REFERENCES group_name(id)
);

--user group relations table, keeping track of which group each user belongs too and what kind of members they are within that group
CREATE TABLE users_groups_relations(
	user_id INT NOT NULL,
	group_id INT NOT NULL,
	date_joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (group_id) REFERENCES group_name(id)
);
-- backend checks emails in databases to see if a user with that email already EXISTS

-- CREATE TABLE contacts(
-- 	user_id INT NOT NULL,
-- 	friend_id INT NOT NULL,
-- 	FOREIGN KEY (user_id) REFERENCES users(id),
-- 	FOREIGN KEY (friend_id) REFERENCES users(id)
-- );

--same conversation table as before with date_created added so we can sort each conversation by month/year
CREATE TABLE conversations(
	id INT NOT NULL AUTO_INCREMENT,
	user_one_id INT NOT NULL, 
	title VARCHAR(255) NOT NULL,
	content TEXT,
	fs_path TEXT,
	stat ENUM('active', 'archive'),
	-- share ENUM('public', 'group'),
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_one_id) REFERENCES users(id)
	-- FOREIGN KEY (user_two_id) REFERENCES users(id)
);

-- same conversations reply as before
CREATE TABLE conversations_reply(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	content TEXT,
	fs_path TEXT,
	c_id_fk INT NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (c_id_fk) REFERENCES conversations(id)
);

-- same conversation relation table as before with viewed added so we know which user has viewed which conversation
-- actually also added conversation reply so we know if someone has viewed a reply yet as well, this could get messy
CREATE TABLE conversation_relation(
	conversation_id INT,
	conversation_reply_id INT,
	user_id INT NOT NULL,
	viewed BOOLEAN NOT NULL DEFAULT false,
	date_watched TIMESTAMP,
	FOREIGN KEY (conversation_id) REFERENCES conversations(id),
	FOREIGN KEY (conversation_reply_id) REFERENCES conversations_reply(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);



