/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : huigou

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-04-17 18:52:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `stockhistory`
-- ----------------------------
DROP TABLE IF EXISTS `stockhistory`;
CREATE TABLE `stockhistory` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `StockNumber` varchar(255) NOT NULL,
  `Date` varchar(20) DEFAULT NULL,
  `Open` decimal(10,2) DEFAULT NULL,
  `High` decimal(10,2) DEFAULT NULL,
  `Low` decimal(10,2) DEFAULT NULL,
  `Close` decimal(10,2) DEFAULT NULL,
  `Volume` decimal(10,2) DEFAULT NULL,
  `AdjClose` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stockhistory
-- ----------------------------
