CREATE TABLE `Products` (
  `product_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `weight` decimal(6,2) NOT NULL
);

CREATE TABLE `Storage_Products` (
  `storage_product_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_status` ENUM ('in_stock', 'out_of_stock'),
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Users` (
  `user_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `middle_name` varchar(50),
  `address` varchar(255),
  `phone_number` varchar(15),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Regular_Customers` (
  `regular_customer_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `discount_id` int(11)
);

CREATE TABLE `Orders` (
  `order_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `delivery_date` datetime NOT NULL,
  `price` decimal(8,2) NOT NULL
);

CREATE TABLE `Order_Details` (
  `order_detail_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
);

CREATE TABLE `Discounts` (
  `discount_id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `discount_percentage` tinyint unsigned NOT NULL,
  `start_date` datetime,
  `end_date` datetime
);

ALTER TABLE `Storage_Products` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);

ALTER TABLE `Regular_Customers` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Regular_Customers` ADD FOREIGN KEY (`discount_id`) REFERENCES `Discounts` (`discount_id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);

CREATE INDEX `Users_index_0` ON `Users` (`email`);
