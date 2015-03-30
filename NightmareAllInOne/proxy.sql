/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : huigou

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-03-30 18:27:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `proxy`
-- ----------------------------
DROP TABLE IF EXISTS `proxy`;
CREATE TABLE `proxy` (
  `IP` varchar(15) NOT NULL,
  `Port` varchar(8) NOT NULL,
  `Anonymous` varchar(20) DEFAULT NULL,
  `Type` varchar(20) NOT NULL,
  `Speed` decimal(10,0) DEFAULT NULL,
  `Flag` tinyint(4) DEFAULT NULL,
  `InDate` datetime DEFAULT NULL,
  `EditDate` datetime DEFAULT NULL,
  `ProxyId` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`IP`,`Port`,`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proxy
-- ----------------------------
