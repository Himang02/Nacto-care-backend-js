CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS nurse (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nurse_location VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dob DATE,
    phone_number VARCHAR(10)
);

-- INSERT INTO nurse (name, email, nurse_location, dob, phone_number) VALUES 
-- ('Alice Smith', 'alice@example.com', 'SURAT', '1990-05-15', '1234567890'),
-- ('Bob Johnson', 'bob@example.com', 'Bhavnagar', '1985-09-20', '9876543210'),
-- ('Carol Williams', 'carol@example.com', 'AHMEDABAD', '1988-11-30', '5551234567');

-- DROP TABLE nurse;
-- ALTER TABLE nurse
-- UPDATE COLUMN expertise VARCHAR(255)
-- ADD COLUMN expertise VARCHAR(255);

CREATE TABLE IF NOT EXISTS patients (
    patient_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dob DATE,
    phone_number VARCHAR(10)
);

INSERT INTO patients (name, email, phone_number) VALUES
    ('Jane Smith', 'jane.smith@example.com', '9876543210', '1990-05-15'),
    ('Bob Johnson', 'bob.johnson@example.com', '5551112233', '1990-05-15');
