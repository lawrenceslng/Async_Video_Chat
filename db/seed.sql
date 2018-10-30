INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('larry','larry','ng','alskdjf@laksdjf.com','password');
INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('asdf','larasdfasry','ng','asddf@jf.com','password');
INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('qwerqwer','lasdfgry','ng','arjkrg@laksdjf.com','password');
INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('zxcvzxcv','lawertry','ng','afghjfghjf@laksdjf.com','password');
INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('hjkggkjh','lasdfgry','ng','alcvbncbn@laksdjf.com','password');
INSERT INTO users(username, first_name, last_name, email, password)
VALUES ('tyuityuityui','lardsfgy','ng','alskyturtu@laksdjf.com','password');

INSERT INTO contacts(user_id,friend_id) 
VALUES (1,2);

INSERT INTO contacts(user_id,friend_id) 
VALUES (1,3);
INSERT INTO contacts(user_id,friend_id) 
VALUES (1,4);
INSERT INTO contacts(user_id,friend_id) 
VALUES (1,6);

SELECT conversations.id, conversations.user_one_id, conversations.title, conversations.content, conversations.fs_path, conversations_reply.user_id, conversations_reply.fs_path, conversations_reply.c_id_fk FROM conversations LEFT JOIN conversation_relation ON conversations.id = conversation_relation.conversation_id LEFT JOIN conversations_reply ON conversations.id = conversations_reply.c_id_fk WHERE conversation_relation.user_id = 1;
