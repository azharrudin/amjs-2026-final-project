-- Car Rental Database - MSSQL Script
-- Create Database
DROP DATABASE IF EXISTS CarRentalDB;
CREATE DATABASE CarRentalDB;
GO

USE CarRentalDB;
GO

-- Create Tables
CREATE TABLE MsCustomer (
    customer_id INT PRIMARY KEY IDENTITY(1,1),
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL,
    name NVARCHAR(200) NOT NULL,
    phone_number NVARCHAR(50),
    address NVARCHAR(500),
    driver_license_number NVARCHAR(100) NOT NULL
);

CREATE TABLE MsEmployee (
    employee_id INT PRIMARY KEY IDENTITY(1,1),
    name DATETIME2 NOT NULL,
    position NVARCHAR(100),
    email DECIMAL(18,2),
    phone_number NVARCHAR(50)
);

CREATE TABLE MsCar (
    car_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(200) NOT NULL,
    model NVARCHAR(100) NOT NULL,
    year INT,
    license_plate NVARCHAR(50) NOT NULL UNIQUE,
    number_of_car_seats INT,
    transmission NVARCHAR(100),
    price_per_day DECIMAL(18,2),
    status BIT NOT NULL DEFAULT 1
);

CREATE TABLE MsCarImages (
    image_car_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT NOT NULL,
    image_link NVARCHAR(2000),
    FOREIGN KEY (car_id) REFERENCES MsCar(car_id)
);

CREATE TABLE TrRental (
    rental_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT NOT NULL,
    car_id INT NOT NULL,
    rental_date DATETIME2 NOT NULL,
    return_date DATETIME2,
    total_cost DECIMAL(18,2),
    payment_status BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES MsCustomer(customer_id),
    FOREIGN KEY (car_id) REFERENCES MsCar(car_id)
);

CREATE TABLE LfPayment (
    payment_id INT PRIMARY KEY IDENTITY(1,1),
    rental_id INT NOT NULL,
    payment_date DATETIME2 NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    payment_method NVARCHAR(100),
    FOREIGN KEY (rental_id) REFERENCES TrRental(rental_id)
);

CREATE TABLE TrMaintenance (
    maintenance_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT NOT NULL,
    employee_id INT,
    maintenance_date DATETIME2 NOT NULL,
    description NVARCHAR(4000),
    cost DECIMAL(18,2),
    FOREIGN KEY (car_id) REFERENCES MsCar(car_id),
    FOREIGN KEY (employee_id) REFERENCES MsEmployee(employee_id)
);

GO

-- Insert Dummy Data

-- Insert Customers
INSERT INTO MsCustomer (email, password, name, phone_number, address, driver_license_number) VALUES
('john.doe@email.com', 'hashed_password_123', 'John Doe', '+1-555-0101', '123 Main St, New York, NY 10001', 'DL12345678'),
('jane.smith@email.com', 'hashed_password_456', 'Jane Smith', '+1-555-0102', '456 Oak Ave, Los Angeles, CA 90001', 'DL23456789'),
('mike.johnson@email.com', 'hashed_password_789', 'Mike Johnson', '+1-555-0103', '789 Pine Rd, Chicago, IL 60601', 'DL34567890'),
('sarah.williams@email.com', 'hashed_password_012', 'Sarah Williams', '+1-555-0104', '321 Elm St, Houston, TX 77001', 'DL45678901'),
('david.brown@email.com', 'hashed_password_345', 'David Brown', '+1-555-0105', '654 Maple Dr, Phoenix, AZ 85001', 'DL56789012');

-- Insert Employees
INSERT INTO MsEmployee (name, position, email, phone_number) VALUES
('2024-01-15 09:00:00', 'Manager', 850.00, '+1-555-0201'),
('2024-02-20 10:30:00', 'Mechanic', 650.00, '+1-555-0202'),
('2024-03-10 08:45:00', 'Customer Service', 550.00, '+1-555-0203'),
('2024-04-05 11:15:00', 'Mechanic', 650.00, '+1-555-0204');

-- Insert Cars
INSERT INTO MsCar (name, model, year, license_plate, number_of_car_seats, transmission, price_per_day, status) VALUES
('Toyota Camry', 'LE', 2023, 'ABC1234', 5, 'Automatic', 45.00, 1),
('Honda Accord', 'Sport', 2023, 'XYZ5678', 5, 'Automatic', 50.00, 1),
('Ford Mustang', 'GT', 2024, 'MUS9012', 4, 'Manual', 85.00, 1),
('Tesla Model 3', 'Long Range', 2024, 'TES3456', 5, 'Automatic', 95.00, 0),
('Chevrolet Suburban', 'LT', 2023, 'SUB7890', 7, 'Automatic', 75.00, 1),
('BMW 3 Series', '330i', 2024, 'BMW2345', 5, 'Automatic', 90.00, 1),
('Mercedes-Benz C-Class', 'C300', 2023, 'MER6789', 5, 'Automatic', 95.00, 1),
('Nissan Altima', 'SV', 2023, 'NIS1357', 5, 'Automatic', 42.00, 1);

-- Insert Car Images
INSERT INTO MsCarImages (car_id, image_link) VALUES
(1, 'https://example.com/images/camry1.jpg'),
(1, 'https://example.com/images/camry2.jpg'),
(2, 'https://example.com/images/accord1.jpg'),
(3, 'https://example.com/images/mustang1.jpg'),
(3, 'https://example.com/images/mustang2.jpg'),
(4, 'https://example.com/images/tesla1.jpg'),
(5, 'https://example.com/images/suburban1.jpg'),
(6, 'https://example.com/images/bmw1.jpg');

-- Insert Rentals
INSERT INTO TrRental (customer_id, car_id, rental_date, return_date, total_cost, payment_status) VALUES
(1, 1, '2024-11-01 10:00:00', '2024-11-05 10:00:00', 180.00, 1),
(2, 3, '2024-11-10 14:00:00', '2024-11-12 14:00:00', 170.00, 1),
(3, 2, '2024-11-15 09:00:00', '2024-11-20 09:00:00', 250.00, 1),
(4, 5, '2024-11-18 11:00:00', '2024-11-22 11:00:00', 300.00, 1),
(5, 6, '2024-11-25 15:00:00', NULL, NULL, 0),
(1, 8, '2024-12-01 10:00:00', '2024-12-03 10:00:00', 84.00, 1),
(2, 7, '2024-12-05 13:00:00', NULL, NULL, 0);

-- Insert Payments
INSERT INTO LfPayment (rental_id, payment_date, amount, payment_method) VALUES
(1, '2024-11-01 10:15:00', 180.00, 'Credit Card'),
(2, '2024-11-10 14:20:00', 170.00, 'Debit Card'),
(3, '2024-11-15 09:30:00', 250.00, 'Credit Card'),
(4, '2024-11-18 11:45:00', 300.00, 'Cash'),
(6, '2024-12-01 10:30:00', 84.00, 'Credit Card');

-- Insert Maintenance Records
INSERT INTO TrMaintenance (car_id, employee_id, maintenance_date, description, cost) VALUES
(1, 2, '2024-10-15 08:00:00', 'Oil change and tire rotation', 75.00),
(3, 2, '2024-10-20 09:30:00', 'Brake pad replacement', 320.00),
(4, 4, '2024-11-05 10:00:00', 'Battery replacement and software update', 450.00),
(2, 2, '2024-11-12 14:00:00', 'Regular maintenance check', 120.00),
(5, 4, '2024-11-18 11:30:00', 'Engine diagnostic and repair', 680.00),
(6, 2, '2024-11-25 09:00:00', 'Oil change', 85.00);

GO

-- Create some useful views
CREATE VIEW vw_ActiveRentals AS
SELECT 
    r.rental_id,
    c.name AS customer_name,
    c.email,
    c.phone_number,
    car.name AS car_name,
    car.model,
    car.license_plate,
    r.rental_date,
    r.total_cost,
    r.payment_status
FROM TrRental r
JOIN MsCustomer c ON r.customer_id = c.customer_id
JOIN MsCar car ON r.car_id = car.car_id
WHERE r.return_date IS NULL;

GO

CREATE VIEW vw_AvailableCars AS
SELECT 
    c.car_id,
    c.name,
    c.model,
    c.year,
    c.license_plate,
    c.number_of_car_seats,
    c.transmission,
    c.price_per_day
FROM MsCar c
WHERE c.status = 1
AND c.car_id NOT IN (
    SELECT car_id FROM TrRental WHERE return_date IS NULL
);

GO

-- Display summary statistics
SELECT 'Total Customers' AS Metric, COUNT(*) AS Count FROM MsCustomer
UNION ALL
SELECT 'Total Cars', COUNT(*) FROM MsCar
UNION ALL
SELECT 'Available Cars', COUNT(*) FROM vw_AvailableCars
UNION ALL
SELECT 'Active Rentals', COUNT(*) FROM vw_ActiveRentals
UNION ALL
SELECT 'Total Rentals', COUNT(*) FROM TrRental
UNION ALL
SELECT 'Total Revenue', CAST(ISNULL(SUM(amount), 0) AS INT) FROM LfPayment;

GO