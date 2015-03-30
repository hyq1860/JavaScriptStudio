/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : huigou

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-03-30 18:27:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `proxysite`
-- ----------------------------
DROP TABLE IF EXISTS `proxysite`;
CREATE TABLE `proxysite` (
  `Id` smallint(6) NOT NULL DEFAULT '0',
  `Site` varchar(50) DEFAULT NULL,
  `CanUse` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否可用',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proxysite
-- ----------------------------
INSERT INTO `proxysite` VALUES ('1', 'http://proxy.goubanjia.com', '1');
INSERT INTO `proxysite` VALUES ('2', 'http://cn-proxy.com/', '1');
