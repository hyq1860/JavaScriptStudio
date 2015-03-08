/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50542
Source Host           : localhost:3306
Source Database       : huigou

Target Server Type    : MYSQL
Target Server Version : 50542
File Encoding         : 65001

Date: 2015-03-09 00:09:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ec`
-- ----------------------------
DROP TABLE IF EXISTS `ec`;
CREATE TABLE `ec` (
  `Id` tinyint(3) unsigned NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Domain` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ec
-- ----------------------------
INSERT INTO `ec` VALUES ('1', '淘宝', 'www.taobao.com');
INSERT INTO `ec` VALUES ('2', '京东', 'www.jd.com');
INSERT INTO `ec` VALUES ('3', 'womai', null);

-- ----------------------------
-- Table structure for `jdcategory`
-- ----------------------------
DROP TABLE IF EXISTS `jdcategory`;
CREATE TABLE `jdcategory` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `LogicId` char(36) NOT NULL,
  `Channel` varchar(100) DEFAULT NULL,
  `Href` varchar(200) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `CategoryUrl` varchar(200) DEFAULT NULL,
  `Item` varchar(100) DEFAULT NULL,
  `ItemUrl` varchar(200) DEFAULT NULL,
  `PageInfo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jdcategory
-- ----------------------------
INSERT INTO `jdcategory` VALUES ('193', '5f35fa50-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '少儿', 'http://list.jd.com/1713-4855-4859.html', '');
INSERT INTO `jdcategory` VALUES ('194', '6400efe0-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '商务投资', 'http://list.jd.com/1713-4855-4858.html', '');
INSERT INTO `jdcategory` VALUES ('195', '654d9420-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '英语学习与考试', 'http://list.jd.com/1713-4855-4864.html', '');
INSERT INTO `jdcategory` VALUES ('196', '66cdf290-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '小说', 'http://list.jd.com/1713-4855-4870.html', '');
INSERT INTO `jdcategory` VALUES ('197', '684e5100-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '传记', 'http://list.jd.com/1713-4855-4857.html', '');
INSERT INTO `jdcategory` VALUES ('198', '69ce6150-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '少儿', 'http://list.jd.com/1713-4855-4859.html', '励志', 'http://list.jd.com/1713-4855-4882.html', '');
INSERT INTO `jdcategory` VALUES ('199', '6b4e71a0-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '艺术/设计/收藏', 'http://list.jd.com/1713-6929-6930.html', '艺术/设计/收藏', 'http://list.jd.com/1713-6929-6930.html', '');
INSERT INTO `jdcategory` VALUES ('200', '6cced010-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '艺术/设计/收藏', 'http://list.jd.com/1713-6929-6930.html', '经济管理', 'http://list.jd.com/1713-3295-6954.html', '');
INSERT INTO `jdcategory` VALUES ('201', '6e4f5590-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '艺术/设计/收藏', 'http://list.jd.com/1713-6929-6930.html', '文化/学术', 'http://list.jd.com/1713-3296-6957.html', '');
INSERT INTO `jdcategory` VALUES ('202', '6fcfb400-c5ab-11e4-b63f-f3d1486fa9ae', '图书|音像|电子书刊', 'http://book.jd.com/|http://mvd.jd.com/|http://e.jd.com/ebook.html|', '艺术/设计/收藏', 'http://list.jd.com/1713-6929-6930.html', '少儿文学/国学', 'http://list.jd.com/1713-3296-6950.html', '');
INSERT INTO `jdcategory` VALUES ('203', '715346c0-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '平板电视', 'http://list.jd.com/737-794-798.html', '');
INSERT INTO `jdcategory` VALUES ('204', '72d308f0-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '空调', 'http://list.jd.com/737-794-870.html', '');
INSERT INTO `jdcategory` VALUES ('205', '7452a410-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '冰箱', 'http://list.jd.com/737-794-878.html', '');
INSERT INTO `jdcategory` VALUES ('206', '75d30280-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '洗衣机', 'http://list.jd.com/737-794-880.html', '');
INSERT INTO `jdcategory` VALUES ('207', '7752ebc0-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '家庭影院', 'http://list.jd.com/737-794-823.html', '');
INSERT INTO `jdcategory` VALUES ('208', '78d40d80-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', 'DVD播放机', 'http://list.jd.com/737-794-965.html', '');
INSERT INTO `jdcategory` VALUES ('209', '7a53cfb0-c5ab-11e4-b63f-f3d1486fa9ae', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '迷你音响', 'http://list.jd.com/737-794-1199.html', '');
INSERT INTO `jdcategory` VALUES ('210', 'c7b0cdd0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '烟机/灶具', 'http://list.jd.com/737-794-1300.html', '');
INSERT INTO `jdcategory` VALUES ('211', 'c8002650-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '热水器', 'http://list.jd.com/737-794-1706.html', '');
INSERT INTO `jdcategory` VALUES ('212', 'c8509040-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '消毒柜/洗碗机', 'http://list.jd.com/737-794-1301.html', '');
INSERT INTO `jdcategory` VALUES ('213', 'c89f9aa0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '冷柜/冰吧', 'http://list.jd.com/737-794-12392.html', '');
INSERT INTO `jdcategory` VALUES ('214', 'c8ee56e0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '酒柜', 'http://list.jd.com/737-794-12401.html', '');
INSERT INTO `jdcategory` VALUES ('215', 'c93d6140-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '大 家 电', 'http://channel.jd.com/737-794.html', '家电配件', 'http://list.jd.com/737-794-877.html', '');
INSERT INTO `jdcategory` VALUES ('216', 'c98c1d80-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '取暖电器', 'http://list.jd.com/737-738-747.html', '');
INSERT INTO `jdcategory` VALUES ('217', 'c9dbc420-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '净化器', 'http://list.jd.com/737-738-749.html', '');
INSERT INTO `jdcategory` VALUES ('218', 'ca2b43b0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '加湿器', 'http://list.jd.com/737-738-748.html', '');
INSERT INTO `jdcategory` VALUES ('219', 'ca79fff0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '扫地机器人', 'http://list.jd.com/737-738-12394.html', '');
INSERT INTO `jdcategory` VALUES ('220', 'caca42d0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '吸尘器', 'http://list.jd.com/737-738-745.html', '');
INSERT INTO `jdcategory` VALUES ('221', 'cb19c260-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '挂烫机/熨斗', 'http://list.jd.com/737-738-1279.html', '');
INSERT INTO `jdcategory` VALUES ('222', 'cb68ccc0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '插座', 'http://list.jd.com/737-738-1052.html', '');
INSERT INTO `jdcategory` VALUES ('223', 'cbb82540-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '电话机', 'http://list.jd.com/737-738-806.html', '');
INSERT INTO `jdcategory` VALUES ('224', 'cc086820-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '清洁机', 'http://list.jd.com/737-738-897.html', '');
INSERT INTO `jdcategory` VALUES ('225', 'cc574b70-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '除湿机', 'http://list.jd.com/737-738-1283.html', '');
INSERT INTO `jdcategory` VALUES ('226', 'cca62ec0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '干衣机', 'http://list.jd.com/737-738-12395.html', '');
INSERT INTO `jdcategory` VALUES ('227', 'ccf5ae50-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '收录/音机', 'http://list.jd.com/737-738-801.html', '');
INSERT INTO `jdcategory` VALUES ('228', 'cd44b8b0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '电风扇', 'http://list.jd.com/737-738-751.html', '');
INSERT INTO `jdcategory` VALUES ('229', 'cd9570c0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '冷风扇', 'http://list.jd.com/737-738-1278.html', '');
INSERT INTO `jdcategory` VALUES ('230', 'cde4a230-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '其它生活电器', 'http://list.jd.com/737-738-825.html', '');
INSERT INTO `jdcategory` VALUES ('231', 'ce338580-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '生活电器配件', 'http://list.jd.com/737-738-12396.html', '');
INSERT INTO `jdcategory` VALUES ('232', 'ce82de00-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '净水设备', 'http://list.jd.com/737-738-898.html', '');
INSERT INTO `jdcategory` VALUES ('233', 'ced20f70-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '生活电器', 'http://channel.jd.com/737-738.html', '饮水机', 'http://list.jd.com/737-738-750.html', '');
INSERT INTO `jdcategory` VALUES ('234', 'cf218f00-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '料理/榨汁机', 'http://list.jd.com/737-752-755.html', '');
INSERT INTO `jdcategory` VALUES ('235', 'cf707250-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '豆浆机', 'http://list.jd.com/737-752-756.html', '');
INSERT INTO `jdcategory` VALUES ('236', 'cfbf55a0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '电饭煲', 'http://list.jd.com/737-752-753.html', '');
INSERT INTO `jdcategory` VALUES ('237', 'd00f2350-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '电压力锅', 'http://list.jd.com/737-752-881.html', '');
INSERT INTO `jdcategory` VALUES ('238', 'd05e06a0-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '面包机', 'http://list.jd.com/737-752-899.html', '');
INSERT INTO `jdcategory` VALUES ('239', 'd0adad40-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '咖啡机', 'http://list.jd.com/737-752-761.html', '');
INSERT INTO `jdcategory` VALUES ('240', 'd0fc9090-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '微波炉', 'http://list.jd.com/737-752-758.html', '');
INSERT INTO `jdcategory` VALUES ('241', 'd14bc200-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '电烤箱', 'http://list.jd.com/737-752-759.html', '');
INSERT INTO `jdcategory` VALUES ('242', 'd19aa550-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '电磁炉', 'http://list.jd.com/737-752-757.html', '');
INSERT INTO `jdcategory` VALUES ('243', 'd1eac120-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '电饼铛/烧烤盘', 'http://list.jd.com/737-752-882.html', '');
INSERT INTO `jdcategory` VALUES ('244', 'd239cb80-c5ab-11e4-8110-2db764252eb2', '家用电器', 'http://channel.jd.com/electronic.html|', '厨房电器', 'http://channel.jd.com/737-752.html', '煮蛋器', 'http://list.jd.com/737-752-902.html', '');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `Id` bigint(20) NOT NULL,
  `LogicId` char(36) NOT NULL,
  `Sku` varchar(32) DEFAULT NULL,
  `Source` tinyint(4) DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Category` char(36) DEFAULT NULL,
  `InDate` datetime DEFAULT NULL,
  `UpDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
