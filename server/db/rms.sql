-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2014 at 06:31 AM
-- Server version: 5.6.14
-- PHP Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rms`
--

-- --------------------------------------------------------

--
-- Table structure for table `payouts`
--

CREATE TABLE IF NOT EXISTS `payouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` char(255) DEFAULT NULL,
  `recipient` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `payouts`
--

INSERT INTO `payouts` (`id`, `date`, `recipient`, `amount`, `created`) VALUES
(5, '1403689962943', 18, 1000, '1403689972163');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchaser` int(11) NOT NULL,
  `referrer` int(11) NOT NULL,
  `payout` int(11) NOT NULL,
  `date` char(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `referral_eligible` tinyint(1) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `commission_amount` double DEFAULT NULL,
  `created` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `purchaser`, `referrer`, `payout`, `date`, `amount`, `referral_eligible`, `confirmed`, `commission_amount`, `created`) VALUES
(11, 18, 16, 5, '1403692868874', 1000, 0, 0, 100, '1403692882193'),
(12, 17, 14, 5, '1403692893867', 3500, 1, 0, 120, '1403692916271'),
(13, 17, 17, 5, '1403694668626', 2000, 1, 0, 500, '1403694685797');

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE IF NOT EXISTS `referrals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer` int(11) DEFAULT NULL,
  `referred` int(11) DEFAULT NULL,
  `date` char(255) DEFAULT NULL,
  `created` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `referrals`
--

INSERT INTO `referrals` (`id`, `referrer`, `referred`, `date`, `created`) VALUES
(14, 18, 17, '1403688936520', '1403688943432'),
(15, 17, 18, '1403688945887', '1403688951063'),
(16, 17, 18, '1403690008815', '1403690015921'),
(17, 19, 17, '2014-06-26T17:00:00.000Z', '1403690066804');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(150) DEFAULT NULL,
  `lastname` varchar(150) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `referral_code` char(50) DEFAULT NULL,
  `created` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `referral_code`, `created`) VALUES
(17, 'Bill', 'Gates', 'bill@microsoft.com', 'BILL', '1403601909429'),
(18, 'James', 'Storm', 'james.storm@yahoo.com', 'JAMES hhh', '1403601970557'),
(19, 'test', 'test', 'test@gmail.com', '123456', '1404181959531');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
