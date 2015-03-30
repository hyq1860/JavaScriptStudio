/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : huigou

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-03-30 18:27:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `proxysource`
-- ----------------------------
DROP TABLE IF EXISTS `proxysource`;
CREATE TABLE `proxysource` (
  `ProxySiteId` smallint(6) NOT NULL,
  `Url` varchar(100) NOT NULL,
  `Html` text,
  `InDate` datetime DEFAULT NULL,
  `EditDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ProxySiteId`,`Url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proxysource
-- ----------------------------
