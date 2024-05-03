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
    IF text_to_check = '' THEN
        RETURN TRUE;
    END IF;
    RETURN text_to_check ~ '^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!-]+$';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_valid_location(text_to_check TEXT) RETURNS BOOLEAN AS $$
BEGIN
    IF text_to_check = '' THEN
        RETURN TRUE;
    END IF;
    RETURN text_to_check ~ '^-?\d+(\.\d+)?,-?\d+(\.\d+)?$';
END;
$$ LANGUAGE plpgsql;

CREATE TABLE event (
    event_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REfERENCES "user" ON DELETE CASCADE NOT NULL,
    event_name TEXT CHECK(is_valid_text(event_name)),
    theme TEXT CHECK(is_valid_text(theme)),
    event_description TEXT CHECK(is_valid_text(event_description)),
    event_date CHAR(10) CHECK(event_date ~ '^\d{2}\/\d{2}\/\d{4}$'),
    event_time CHAR(5),
    event_location VARCHAR(300) CHECK(is_valid_location(event_location)),
    CONSTRAINT valid_time CHECK (event_time ~ '^(([01]\d|2[0-3]):([0-5]\d))$')
);

CREATE FUNCTION is_valid_dish_text(text_to_check VARCHAR) RETURNS BOOLEAN AS $$
    SELECT text_to_check ~ '^[a-zA-ZÀ-ÖØ-öø-ÿ\s''-]+$';
$$ LANGUAGE sql;


CREATE TABLE dish (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REfERENCES "event" ON DELETE CASCADE NOT NULL,
    dish_name VARCHAR(100) CHECK(is_valid_dish_text(dish_name)) NOT NULL,
    "type" VARCHAR(14) CHECK(is_valid_dish_text("type")) NOT NULL
);

CREATE TABLE ingredient (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REfERENCES "event" ON DELETE CASCADE NOT NULL,
    dish_id UUID REfERENCES "dish" ON DELETE CASCADE NOT NULL,
    "name" VARCHAR(100) CHECK(is_valid_dish_text("name")) NOT NULL,
    unity_measure VARCHAR(100) NOT NULL,
    quantity INT CHECK(quantity > 0),
    purchased BOOLEAN DEFAULT false
);

CREATE FUNCTION is_valid_guest_name(text_to_check VARCHAR) RETURNS BOOLEAN AS $$
    SELECT text_to_check ~ '^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$';
$$ LANGUAGE sql;

CREATE TABLE guest (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES "event" ON DELETE CASCADE NOT NULL,
    "name" VARCHAR(100) CHECK(is_valid_guest_name("name")) NOT NULL,
    confirmed BOOLEAN DEFAULT false
);
CREATE TABLE upload (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REfERENCES "user" ON DELETE CASCADE NOT NULL,
    hash_name VARCHAR(255),
    uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255)
);