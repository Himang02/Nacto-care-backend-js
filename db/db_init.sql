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

-- INSERT INTO patients (name, email, phone_number) VALUES
--     ('Jane Smith', 'jane.smith@example.com', '9876543210', '1990-05-15'),
--     ('Bob Johnson', 'bob.johnson@example.com', '5551112233', '1990-05-15');

CREATE TYPE session_status_enum AS ENUM ('scheduled', 'ongoing', 'completed');
CREATE TYPE payment_type_enum AS ENUM ('upi', 'cash', 'card', 'netbanking', 'wallet');

CREATE TABLE IF NOT EXISTS nacto_session (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(patient_id),
    nurse_id UUID REFERENCES nurse(id),
    session_status session_status_enum,
    session_location VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO nacto_session (patient_id, nurse_id, session_status, session_location) VALUES
--     ('d4708437-dde8-4304-bcf9-5926e48e6aee', '3df70900-2d92-4c18-8185-433342640aaf', 'completed', 'New York'),
--     ('619e744f-5bd7-4605-93b4-24785292ce11', '3df70900-2d92-4c18-8185-433342640aaf', 'scheduled', 'Mumbai'),
--     ('619e744f-5bd7-4605-93b4-24785292ce11', '3df70900-2d92-4c18-8185-433342640aaf', 'ongoing', 'Banglore');

CREATE TABLE IF NOT EXISTS payments (
    session_id UUID REFERENCES nacto_session(session_id) UNIQUE,
    payment_type payment_type_enum,
    amount NUMBER(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO payments (session_id, payment_type, amount) VALUES
--     ('9d688492-c40a-428a-ae5f-904668b5c651', 'upi', 1000);
--     ('0e451e58-e37c-4ca9-a667-5b4685f2a227', 'cash', 2000);
--     ('cd2379f4-f77f-4a5e-8d86-451478cf3771', 'card', 3000);



-- WHICH NURSE WAS GIVEN WHICH SESSION
-- SELECT 
--     nacto_session.session_id,
--     nurse.name AS nurse_name,
--     nurse.email AS nurse_email,
--     nacto_session.session_status,
--     nacto_session.session_location
-- FROM 
--     nacto_session
-- JOIN 
--     nurse ON nacto_session.nurse_id = nurse.id;

-- WHICH NURSE WAS GIVEN WHICH SESSION AND PAYMENT STATUS
-- SELECT 
--     nacto_session.session_id,
--     nurse.name AS nurse_name,
--     nurse.email AS nurse_email,
--     nacto_session.session_status,
--     nacto_session.session_location,
--     payments.payment_type AS payment_mode,
--     CASE
--         WHEN payments.session_id IS NOT NULL THEN 'Paid'
--         ELSE 'Not Paid'
--     END AS payment_status
-- FROM 
--     nacto_session
-- JOIN 
--     nurse ON nacto_session.nurse_id = nurse.id
-- LEFT JOIN
--     payments ON nacto_session.session_id = payments.session_id;

-- WHICH USER DID WHICH SESSION WITH WHICH NURSE AND STATUS OF PAYMENTS
-- SELECT 
--     nacto_session.session_id,
--     patients.name AS patient_name,
--     nurse.name AS nurse_name,
--     payments.payment_type AS payment_mode,
--     payments.amount AS amount,
--     CASE
--         WHEN payments.session_id IS NOT NULL THEN 'Paid'
--         ELSE 'Not Paid'
--     END AS payment_status
-- FROM 
--     nacto_session
-- JOIN 
--     patients ON nacto_session.patient_id = patients.patient_id
-- JOIN
--     nurse ON nacto_session.nurse_id = nurse.id
-- LEFT JOIN
--     payments ON nacto_session.session_id = payments.session_id;

CREATE TABLE IF NOT EXISTS session_ratings (
    session_id UUID REFERENCES nacto_session(session_id) UNIQUE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback VARCHAR(100),
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO session_ratings (session_id, rating, feedback)
-- VALUES ('9d688492-c40a-428a-ae5f-904668b5c651', 4, 'The session was very helpful and informative.');

-- WHICH NURSE WAS GIVEN WHICH SESSION RATING
-- SELECT 
--     nacto_session.session_id,
--     nurse.name AS nurse_name,
--     session_ratings.rating
-- FROM 
--     session_ratings
-- JOIN 
--     nacto_session ON session_ratings.session_id = nacto_session.session_id
-- JOIN 
--     nurse ON nacto_session.nurse_id = nurse.id;
