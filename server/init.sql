CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL
);

-- email: admin@admin
-- password: admin
INSERT INTO `users` (`email`, `password`)
VALUES ('admin@admin', '$2b$12$a0q7UEwVfASCaL/Ft5AbcejiD5mGSoBbCKIp.04gcjx2hczB0GQYa');

CREATE TABLE IF NOT EXISTS `forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` text NOT NULL
);