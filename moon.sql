-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2017 at 07:50 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------
create database moondb;
use  moondb;
CREATE TABLE `user` (
  `iduser` int(10) UNSIGNED NOT NULL,
  `userName` varchar(100) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `createDay` datetime DEFAULT NULL,
  `updateDay` datetime DEFAULT NULL,
  `coin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `beat`
--



CREATE TABLE `beat` (
  `beatId` varchar(225) NOT NULL,
  `updateBeatDay` datetime DEFAULT NULL,
  `user_iduser` int(10) UNSIGNED NOT NULL,
  `music_musicId` varchar(10) NOT NULL,
  `score` int(10) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `buy` (
   `id` int(10) UNSIGNED PRIMARY KEY NOT NULL,
  `day` datetime DEFAULT NULL,
  `user_iduser` int(10) UNSIGNED NOT NULL,
  `music_musicId` varchar(10)  NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `buy` MODIFY `id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--

--
-- Dumping data for table `beat`
--

-- INSERT INTO `beat` (`beatId`, `updateBeatDay`, `user_iduser`, `music_musicId`) VALUES
-- ('1', '2017-05-03 00:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `challengeId` varchar(225) NOT NULL,
  `user_iduser1` int (10) NOT NULL,
  `user_iduser2` int(10) NOT NULL,
  `score1` int(11) DEFAULT NULL,
  `score2` int(11) DEFAULT NULL,
  `music_musicId` varchar(10)  NOT NULL,
  `challengeLevel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `challenge`
--

-- INSERT INTO `challenge` (`challengeId`, `userName1`, `userName2`, `score1`, `score2`, `music_musicId`, `challengeLevel`) VALUES
-- ('1', 'thien', 'minh', 10, 12, 'LV1');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `idfeedback` varchar(225) NOT NULL,
  `fbTitle` varchar(45) NOT NULL,
  `fbContent` varchar(225) NOT NULL,
  `fbDate` varchar(225) DEFAULT NULL,
  `user_iduser` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedback`
--

-- INSERT INTO `feedback` (`idfeedback`, `fbTitle`, `fbContent`, `fbDate`, `user_iduser`) VALUES
-- ('1', 'abc', 'asdasfsdaf', '22-225', 1);

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `id` int(11) NOT NULL,
  `userName1` varchar(255) NOT NULL,
  `userName2` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `historytransaction`
--

CREATE TABLE `historytransaction` (
  `htId` varchar(225) NOT NULL,
  `hisName` varchar(225) NOT NULL,
  `hisValue` int(11) NOT NULL,
  `hisDate` datetime NOT NULL,
  `user_iduser` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `historytransaction`
--

-- INSERT INTO `historytransaction` (`htId`, `hisName`, `hisValue`, `hisDate`, `user_iduser`) VALUES
-- ('1', 'avcfds', 10, '2017-05-02 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `musicId` varchar(10)  NOT NULL,
  `musicName` varchar(225) NOT NULL,
  `author` varchar(255) NOT NULL,
  `musicLink` varchar(1024) NOT NULL,
  `nodesLink` varchar(1024) NOT NULL,
  `hardLevel` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `music`
--

-- INSERT INTO `music` (`musicId`, `musicName`, `author`, `musicLink`, `nodesLink`, `hardLevel`, `count`) VALUES
-- ('LV1', 'ythftghf', '', 'gfhg', 'hgfhhggfjhg', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--


--
-- Dumping data for table `user`
--
-- Indexes for dumped tables
--

--
-- Indexes for table `beat`
--
ALTER TABLE `beat`
  ADD PRIMARY KEY (`user_iduser`,`music_musicId`,`beatId`),
  ADD KEY `fk_score_music1_idx` (`music_musicId`);

--
-- Indexes for table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`challengeId`,`music_musicId`),
  ADD KEY `fk_challenge_music1_idx` (`music_musicId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`idfeedback`,`user_iduser`),
  ADD KEY `fk_feedback_user1_idx` (`user_iduser`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `historytransaction`
--
ALTER TABLE `historytransaction`
  ADD PRIMARY KEY (`htId`,`user_iduser`),
  ADD KEY `fk_historytransaction_user1_idx` (`user_iduser`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`musicId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music`
--
-- ALTER TABLE `music`
--   MODIFY `musicId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `beat`
--
ALTER TABLE `beat`
  ADD CONSTRAINT `fk_score_music1` FOREIGN KEY (`music_musicId`) REFERENCES `music` (`musicId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_score_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `challenge`
--
ALTER TABLE `challenge`
  ADD CONSTRAINT `fk_challenge_music1` FOREIGN KEY (`music_musicId`) REFERENCES `music` (`musicId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `fk_feedback_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `historytransaction`
--
ALTER TABLE `historytransaction`
  ADD CONSTRAINT `fk_historytransaction_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




INSERT INTO `user` (`iduser`, `userName`, `fullName`, `email`, `password`, `sex`, `birthday`, `createDay`, `updateDay`, `coin`, `phone`) VALUES
(1, 'tt.thien', 'minhthien', 'abc@gmail.com', '123456', 'male', '2017-04-25 00:00:00', '2017-05-16 00:00:00', '2017-05-03 00:00:00', 757, '01448576473'),
(2, 'quyen', 'quyenhua', 'abc@gmail.com', '123456', 'female', '2017-05-18 00:00:00', '2017-05-24 00:00:00', '2017-05-23 00:00:00', 10, '92838576473'),
(3, 'duthien', 'Du Thien', 'blueskythien2010@gmail.com', '123456blue', 'male', '1995-04-25 00:00:00', '2017-05-16 00:00:00', '2017-05-03 00:00:00', 9757,'09128576473'),
(5, 'hungquoc', 'Pham Hung Quoc', 'hungquoc@gmail.com', '123456red', 'male', '2017-05-18 00:00:00', '2017-05-24 00:00:00', '2017-05-23 00:00:00', 1000, '89878576473'),
(6, 'quoccuong', 'Pham Quoc Cuong', 'quoccuong@gmail.com', '123456cyan', 'male', '1995-04-25 00:00:00', '2017-05-16 00:00:00', '2017-05-03 00:00:00', 97, '098748576473')

;


--insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV1', 'Dream', 'Rabpit', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterDream__Rabpit.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterDream__Rabpit.json', 1,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV2', 'Platinum', 'Sta', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterPlatinum__Sta.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterPlatinum__Sta.json', 1,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV3', 'Evolution Era', 'V.K', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterEvolution_Era__V.K.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterEvolution_Era__V.K.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV4', 'Guardian', 'The SxPlay', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterGuardian__The_SxPlay.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterGuardian__The_SxPlay.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV5', 'Jumpy Star', 'YJJ', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterJumpy_Star__YJJ.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterJumpy_Star__YJJ.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV6', 'Magnolia', 'M2U', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterMagnolia__M2U.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterMagnolia__M2U.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV7', 'Pulses', 'Sta', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterPulses__Sta.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterPulses__Sta.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV8', 'Undo', 'YM', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterUndo__YM.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterUndo__YM.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV9', 'YUBIKIRI-GENMAN', 'Mili', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterYUBIKIRI-GENMAN__Mili.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterYUBIKIRI-GENMAN__Mili.json', 2,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV10', 'Farewell Waltz', 'Stone', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterFarewell_Waltz__Stone.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterFarewell_Waltz__Stone.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV11', 'Leviathan', 'NeLiME', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterLeviathan__NeLiME.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterLeviathan__NeLiME.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV12', 'Light pollution', 'YE', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterLight_pollution__YE.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterLight_pollution__YE.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV13', 'Nine Point Eight', 'Mili', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterNine_Point_Eight__Mili.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterNine_Point_Eight__Mili.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV14', 'Reflection', 'V.K', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterReflection__V.K.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterReflection__V.K.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV15', 'Reverse-Parallel Universe', 'V.K', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterReverse-Parallel_Universe__V.K.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterReverse-Parallel_Universe__V.K.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV16', 'Revival', 'TQ', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterRevival__TQ.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterRevival__TQ.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV17', 'Saika', 'Rabpit', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterSaika__Rabpit.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterSaika__Rabpit.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('LV18', 'Utopiosphere', 'Mili', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterUtopiosphere__Mili.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterUtopiosphere__Mili.json', 3,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('SP1', 'Angelic Sphere', '3R2', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterAngelic_Sphere__3R2.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterAngelic_Sphere__3R2.json', 4,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('SP2', 'Wings of piano', 'V.K', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterWings_of_piano__V.K.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterWings_of_piano__V.K.json', 4,0);
insert into music(`musicId`,`musicName`,`author`,`musicLink`,`nodesLink`, `hardLevel`,`count`) values ('SP3', 'Sairai', 'Shinichi Kobayashi', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterSairai__Shinichi_Kobayashi.mp3', 'https://raw.githubusercontent.com/duthienkt/MoonLightData/masterSairai__Shinichi_Kobayashi.json', 5,0);


insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('3LV1', '2017-05-03 00:00:00', 3, 'LV1', 1291);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('3LV2', '2017-05-03 00:00:00', 3, 'LV2', 1991);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('3LV3', '2017-05-03 00:00:00', 3, 'LV3', 1881);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('3LV4', '2017-05-03 00:00:00', 3, 'LV4', 1991);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('3LV5', '2017-05-03 00:00:00', 3, 'LV5', 1761);


insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('1LV1', '2017-05-03 00:00:00', 1, 'LV1', 1201);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('1LV2', '2017-05-03 00:00:00', 1, 'LV2', 1991);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('1LV3', '2017-05-03 00:00:00', 1, 'LV3', 1081);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('1LV4', '2017-05-03 00:00:00', 1, 'LV4', 1091);
insert into beat(`beatId`,`updateBeatDay`,`user_iduser`,`music_musicId`,`score`) values ('1LV5', '2017-05-03 00:00:00', 1, 'LV5', 1761);



create view totalscore as select `user_iduser`,sum(score) as score  from beat group by user_iduser  ; 
create view rankboard as select `iduser`,`fullName`,`score` from totalscore  inner join user on iduser = user_iduser order by -score; 