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