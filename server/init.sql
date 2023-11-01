CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL
);

-- email: admin@ecompjr.com
-- password: admin
INSERT INTO `users` (`email`, `password`)
VALUES ('admin@ecompjr.com', '$2b$12$a0q7UEwVfASCaL/Ft5AbcejiD5mGSoBbCKIp.04gcjx2hczB0GQYa');

CREATE TABLE IF NOT EXISTS `forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` text NOT NULL
);