
--code needed to set up a new database with app features

CREATE DATABASE drinkrandomizer;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_dob DATE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_settings TEXT[]
);

CREATE TABLE bottles (
    bottle_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    bottle_name VARCHAR(255) NOT NULL,
    bottle_type VARCHAR(255) NOT NULL,
    bottle_neat BOOLEAN NOT NULL,
    bottle_iced BOOLEAN NOT NULL,
    bottle_mixed BOOLEAN NOT NULL,
    user_id uuid NOT NULL,
    rejected_cocktails VARCHAR(2550)[], --work in progress for this
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE cocktails (
    cocktail_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    cocktail_name VARCHAR(255) NOT NULL,
    cocktail_base_spirit VARCHAR(255) NOT NULL,
    cocktail_ingredients VARCHAR(2550)[] NOT NULL,
    cocktail_recipe VARCHAR(2550) NOT NULL,
    cocktail_active BOOLEAN NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);