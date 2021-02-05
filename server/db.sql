CREATE TABLE userInfo(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL
);

CREATE TABLE gallery(
    gallery_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    image_title VARCHAR(255),
    image_url VARCHAR(255) NOT NULL,
    cloud_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);

INSERT INTO usersImage (user_name, user_password, user_email) VALUES ('testname','testpassword','test@email.com');