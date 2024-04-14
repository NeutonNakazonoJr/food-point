CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    "password" CHAR(60) NOT NULL,
    CONSTRAINT password_bcrypt_check CHECK (password  LIKE '$2b$%'
        AND LENGTH("password") = 60
    )
);

CREATE FUNCTION is_valid_text(text_to_check TEXT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN text_to_check ~ '^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!]+$';
END;
$$ LANGUAGE plpgsql;

CREATE TABLE event (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REfERENCES "user" ON DELETE CASCADE NOT NULL,
    event_name VARCHAR(60) CHECK(is_valid_text(event_name)),
    theme TEXT CHECK(is_valid_text(theme)),
    "description" TEXT CHECK(is_valid_text("description")),
    event_date DATE CHECK(event_date >= CURRENT_DATE),
    event_time CHAR(5),
    event_location VARCHAR(300) CHECK(is_valid_text(event_location)),
    CONSTRAINT valid_time CHECK (event_time ~ '^(([01]\d|2[0-3]):([0-5]\d))$')
);

     
