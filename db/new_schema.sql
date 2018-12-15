-- restructuring database
-- to add views, in conversation relation we can check if the user has watched it by adding a column and set it to 1 or 0
-- to add views, in conversations reply, we need to add conversations reply relation and do same thing above


CREATE TABLE conversation_relation(
	conversation_id INT NOT NULL,
	user_id INT NOT NULL,
    had_viewed NOT NULL ENUM('0', '1'),
	FOREIGN KEY (conversation_id) REFERENCES conversations(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

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