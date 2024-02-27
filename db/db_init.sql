CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS nurse (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nurse_location POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dob DATE,
    phone_number VARCHAR(10)
);

-- INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
-- ('Alice Smith', 'alice@example.com', POINT(40.7128, -74.0060), '1990-05-15', '1234567890'),
-- ('Bob Johnson', 'bob@example.com', POINT(34.0522, -118.2437), '1985-09-20', '9876543210'),
-- ('Carol Williams', 'carol@example.com', POINT(51.5074, -0.1278), '1988-11-30', '5551234567');

ALTER TABLE nurse
ADD COLUMN expertise VARCHAR(255);
