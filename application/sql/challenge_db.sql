-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2014 at 07:17 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `challenge_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE IF NOT EXISTS `entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `creationDate` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`id`, `creationDate`, `title`, `content`, `user_id`) VALUES
(1, '2014-08-21 15:53:52', 'Ground Zeroes', 'Kept you waiting, huh!?.', 1),
(2, '2014-08-21 01:42:17', 'Fly, you fools', 'You shall not pass.', 1),
(3, '2014-08-21 01:44:06', 'Join!!!', 'By the power of smoses, join my sniper clan.', 1),
(4, '2014-08-21 01:46:40', 'P.T', 'Dont worry about it :V....', 1),
(5, '2014-08-21 01:48:00', 'wanna play Silent Hill...s?', 'Nope.... Nope nope nope nope nope.', 2),
(6, '2014-08-21 01:48:38', 'Dayum', 'The cheese up in here, is going H.A.M.', 2),
(7, '2014-08-21 01:49:07', 'Deadgiveway', 'Deadgiveway.', 2),
(8, '2014-08-21 01:49:41', 'Gym problem', 'I have to go xD.... :(!!!', 2),
(9, '2014-08-21 15:43:53', 'We are russian', 'Turn it arround, for mother smoses... I mean, russia.', 1),
(10, '2014-08-21 18:34:21', 'For the first time', 'Im so proud of you.', 1),
(11, '2014-08-21 18:36:14', 'I miss you so much', 'really.', 3),
(12, '2014-08-21 18:36:53', 'The unseen blade', 'is the deadliest.', 3),
(13, '2014-08-21 18:37:21', 'Strangelove', 'Strange high, Strange low.', 3),
(14, '2014-08-21 18:39:29', 'Im nuclear', 'Mike old field.', 3),
(15, '2014-08-21 19:59:07', 'Standing', 'Im sober..... what?!.', 2),
(16, '2014-08-21 20:54:38', 'O.o Farsa...?', 'Play with me I only want a friend', 4),
(17, '2014-08-21 23:35:49', 'this is my desing', 'this is my desing', 2),
(18, '2014-08-21 02:03:37', 'prueba', 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, ', 4),
(19, '2014-08-21 05:37:17', 'this is another test', 'Nulla pharetra eget nibh sed tempus. Aliquam commodo commodo urna ac feugiat. Etiam non consectetur odio. Cras luctus tristique elit sit amet volutpat. Nullam sit amet lacus lorem. Maecenas et tempor ipsum, sed semper odio. Praesent suscipit augue sit ame', 4),
(20, '2014-08-21 06:11:44', 'this is a test', 'Nam vitae neque in est malesuada vulputate non sed lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec convallis nisi. Donec pellentesque suscipit dictum.', 1),
(26, '2014-08-23 00:00:00', 'Ma mors :3', 'Te mao', 1);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`) VALUES
(1, 'admin', 'Administrator'),
(2, 'members', 'General User');

-- --------------------------------------------------------

--
-- Table structure for table `hidden_tweets`
--

CREATE TABLE IF NOT EXISTS `hidden_tweets` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hidden_tweets`
--

INSERT INTO `hidden_tweets` (`id`, `user_id`) VALUES
('123123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) NOT NULL,
  `login` varchar(100) NOT NULL,
  `time` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `twitterAccount` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `activation_code` varchar(40) DEFAULT NULL,
  `forgotten_password_code` varchar(40) DEFAULT NULL,
  `forgotten_password_time` int(11) unsigned DEFAULT NULL,
  `remember_code` varchar(40) DEFAULT NULL,
  `created_on` int(11) unsigned NOT NULL,
  `last_login` int(11) unsigned DEFAULT NULL,
  `active` tinyint(1) unsigned DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `ip_address`, `username`, `password`, `about`, `twitterAccount`, `salt`, `email`, `activation_code`, `forgotten_password_code`, `forgotten_password_time`, `remember_code`, `created_on`, `last_login`, `active`, `first_name`, `last_name`, `company`, `phone`) VALUES
(1, '127.0.0.1', 'Administrator', '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36', 'Only for revenge...', '@MetalGearSolidV', '', 'admin@admin.com', '', NULL, NULL, NULL, 1268889823, 1268889823, 1, 'Admin', 'istrator', 'Gault', '0'),
(2, '127.0.0.1', 'Belkan', '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36', 'Who I am , is just who I want to be :)', '@Day_Loaiza', '', 'belkan@admin.com', '', NULL, NULL, NULL, 1408646271, 1408646271, 1, 'Belkan', 'Ace', 'Galm', '0'),
(3, '127.0.0.1', 'Falken', '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36', 'Make it happen', '@Brigith_Loaiza', '', 'Falken@admin.com', '', NULL, NULL, NULL, 1408646562, 1408646562, 1, 'Falken', 'Adf', 'Gelb', '0'),
(4, '127.0.0.1', 'HeartbreakOne', '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36', 'I Just miss them, because They are important to me.', '@YriosMerca', '', 'hbreak@admin.com', '', NULL, NULL, NULL, 1408646572, 1408646572, 1, 'Heart', 'Break', 'Crow', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

CREATE TABLE IF NOT EXISTS `users_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_users_groups` (`user_id`,`group_id`),
  KEY `fk_users_groups_users1_idx` (`user_id`),
  KEY `fk_users_groups_groups1_idx` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users_groups`
--

INSERT INTO `users_groups` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2),
(4, 4, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `fk_users_entries_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `hidden_tweets`
--
ALTER TABLE `hidden_tweets`
  ADD CONSTRAINT `fk_users_hidden_tweets_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD CONSTRAINT `fk_users_groups_groups1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_groups_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
