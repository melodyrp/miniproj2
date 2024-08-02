-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 05:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentplanner`
--

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `gradeId` int(11) NOT NULL,
  `module_code` varchar(100) NOT NULL,
  `module_name` varchar(200) NOT NULL,
  `grade` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`gradeId`, `module_code`, `module_name`, `grade`) VALUES
(1, 'C227', 'Computer Systems and Technologies', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `habits`
--

CREATE TABLE `habits` (
  `habitId` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `frequency` varchar(100) NOT NULL,
  `last_checked` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `habits`
--

INSERT INTO `habits` (`habitId`, `name`, `frequency`, `last_checked`) VALUES
(1, 'Exercise', 'Daily', NULL),
(2, 'Read a book', 'Weekly', NULL),
(3, 'Practice coding', 'Daily', NULL),
(5, 'Baking', 'Weekly', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `quoteId` int(11) NOT NULL,
  `text` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`quoteId`, `text`) VALUES
(1, 'The only way to do great work is to love what you do. – Steve Jobs'),
(2, 'Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer'),
(3, 'The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb'),
(4, 'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill'),
(5, 'Believe you can and you\'re halfway there. - Theodore Roosevelt'),
(6, 'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt'),
(7, 'You are never too old to set another goal or to dream a new dream. - C.S. Lewis'),
(8, 'The way to get started is to quit talking and begin doing. - Walt Disney'),
(9, 'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson'),
(10, 'It does not matter how slowly you go, as long as you do not stop. - Confucius'),
(11, 'Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau'),
(12, 'The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh'),
(13, 'Your limitation—it\'s only your imagination. - Unknown');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `taskId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`taskId`, `title`, `description`, `due_date`) VALUES
(2, 'G107 Essay', 'Essay about myself', '2024-07-30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`gradeId`);

--
-- Indexes for table `habits`
--
ALTER TABLE `habits`
  ADD PRIMARY KEY (`habitId`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quoteId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`taskId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `gradeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `habits`
--
ALTER TABLE `habits`
  MODIFY `habitId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quoteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
