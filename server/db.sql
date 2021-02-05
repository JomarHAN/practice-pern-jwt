CREATE TABLE usersImage(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_gallery VARCHAR[]
);

INSERT INTO usersImage (user_name, user_password, user_email) VALUES ('testname','testpassword','test@email.com');