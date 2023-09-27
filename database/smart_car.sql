/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.1.13_3306
 Source Server Type    : MySQL
 Source Server Version : 50517
 Source Host           : 192.168.1.13:3306
 Source Schema         : smart_car

 Target Server Type    : MySQL
 Target Server Version : 50517
 File Encoding         : 65001

 Date: 27/09/2023 16:30:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for approve_admin_car
-- ----------------------------
DROP TABLE IF EXISTS `approve_admin_car`;
CREATE TABLE `approve_admin_car`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `car_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_car` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keeper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tcount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `start_time` time NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `end_time` time NULL DEFAULT NULL,
  `approve_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'y = อนุมัต  , n = ไม่อนุมัติ',
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of approve_admin_car
-- ----------------------------

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 130 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES (82, 'ICT', NULL);
INSERT INTO `dept` VALUES (83, 'สำนักผู้อำนวยการ', NULL);
INSERT INTO `dept` VALUES (84, 'หน่วยจ่ายกลาง', NULL);

-- ----------------------------
-- Table structure for deptxxxx
-- ----------------------------
DROP TABLE IF EXISTS `deptxxxx`;
CREATE TABLE `deptxxxx`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of deptxxxx
-- ----------------------------
INSERT INTO `deptxxxx` VALUES (1, 'กลุ่มการพยาบาล');
INSERT INTO `deptxxxx` VALUES (2, 'งานจักษุวิทยา');
INSERT INTO `deptxxxx` VALUES (3, 'งานโสต ศอ นาสิก');
INSERT INTO `deptxxxx` VALUES (4, 'งานคลินิกพิเศษ');
INSERT INTO `deptxxxx` VALUES (5, 'กลุ่มงานจิตเวช');
INSERT INTO `deptxxxx` VALUES (6, 'งานผู้ป่วยนอก');
INSERT INTO `deptxxxx` VALUES (7, 'งานอุบัติเหตุและฉุกเฉิน');
INSERT INTO `deptxxxx` VALUES (8, 'ศูนย์เปล');
INSERT INTO `deptxxxx` VALUES (9, 'งานวิสัญญีพยาบาล');
INSERT INTO `deptxxxx` VALUES (10, 'งานห้องผ่าตัด');
INSERT INTO `deptxxxx` VALUES (11, 'งานหน่วย Endoscope และ EST');
INSERT INTO `deptxxxx` VALUES (12, 'งานหน่วยไตเทียม');
INSERT INTO `deptxxxx` VALUES (13, 'งานซักฟอก-ตัดเย็บ');
INSERT INTO `deptxxxx` VALUES (14, 'งานหน่วยจ่ายกลาง');
INSERT INTO `deptxxxx` VALUES (15, 'หอผู้ป่วยกุมารเวชกรรม');
INSERT INTO `deptxxxx` VALUES (16, 'หอผู้ป่วยทารกวิกฤติ');
INSERT INTO `deptxxxx` VALUES (17, 'หอผู้ป่วยหนัก');
INSERT INTO `deptxxxx` VALUES (18, 'หอผู้ป่วยอายุรกรรมชาย');
INSERT INTO `deptxxxx` VALUES (19, 'หอผู้ป่วยอายุรกรรมหญิง');
INSERT INTO `deptxxxx` VALUES (20, 'หอผู้ป่วยศัลยกรรมชาย');
INSERT INTO `deptxxxx` VALUES (21, 'หอผู้ป่วยศัลยกรรมหญิง');
INSERT INTO `deptxxxx` VALUES (22, 'หอผู้ป่วยสูติกรรม');
INSERT INTO `deptxxxx` VALUES (23, 'หอผู้ป่วยพิเศษ 6 รอบ');
INSERT INTO `deptxxxx` VALUES (24, 'สำนักผู้อำนวยการและไม่ระบุหน่วยงาน');
INSERT INTO `deptxxxx` VALUES (25, 'องค์กรแพทย์');
INSERT INTO `deptxxxx` VALUES (26, 'กลุ่มงานทันตกรรม');
INSERT INTO `deptxxxx` VALUES (27, 'กลุ่มงานเทคนิคการแพทย์และพยาธิวิทยาคลินิก');
INSERT INTO `deptxxxx` VALUES (28, 'กลุ่มงานเภสัชกรรม');
INSERT INTO `deptxxxx` VALUES (29, 'กลุ่มงานรังสีวิทยา');
INSERT INTO `deptxxxx` VALUES (30, 'กลุ่มงานเวชกรรมฟื้นฟู');
INSERT INTO `deptxxxx` VALUES (31, 'กลุ่มงานเวชกรรมสังคม');
INSERT INTO `deptxxxx` VALUES (32, 'กลุ่มงานสุขศึกษา');
INSERT INTO `deptxxxx` VALUES (33, 'กลุ่มอำนวยการ');
INSERT INTO `deptxxxx` VALUES (34, 'กลุ่มงานการเงิน');
INSERT INTO `deptxxxx` VALUES (35, 'กลุ่มงานทรัพยากรบุคคล');
INSERT INTO `deptxxxx` VALUES (36, 'กลุ่มงานพัสดุ');
INSERT INTO `deptxxxx` VALUES (37, 'กลุ่มงานบริหารทั่วไป');
INSERT INTO `deptxxxx` VALUES (38, 'งานซ่อมบำรุง');
INSERT INTO `deptxxxx` VALUES (39, 'งานยานพาหนะ');
INSERT INTO `deptxxxx` VALUES (40, 'งานสนาม');
INSERT INTO `deptxxxx` VALUES (41, 'กลุ่มงานประกันสุขภาพ');
INSERT INTO `deptxxxx` VALUES (42, 'กลุ่มงานสังคมสงเคราะห์ ');
INSERT INTO `deptxxxx` VALUES (43, 'กลุ่มงานพัฒนาทรัพยากรบุคคล');
INSERT INTO `deptxxxx` VALUES (44, 'งานเวชนิทัศน์และโสตทัศนศึกษา');
INSERT INTO `deptxxxx` VALUES (45, 'งานเวชระเบียนและสถิติ');
INSERT INTO `deptxxxx` VALUES (46, 'ศูนย์ข้อมูลข่าวสารและสารสนเทศทางการแพทย์ (Data Center)');
INSERT INTO `deptxxxx` VALUES (48, 'กลุ่มงานยุทธศาสตร์และแผนงานโครงการ');
INSERT INTO `deptxxxx` VALUES (49, 'สหกรณ์ออมทรัพย์');
INSERT INTO `deptxxxx` VALUES (50, 'กลุ่มงานพัฒนาคุณภาพบริการและมาตรฐาน');
INSERT INTO `deptxxxx` VALUES (51, 'ศูนย์ ICT กลุ่มงานสารสนเทศทางการแพทย์');
INSERT INTO `deptxxxx` VALUES (52, 'กลุ่มงานโภชนศาสตร์');
INSERT INTO `deptxxxx` VALUES (53, 'ศูนย์เครื่องมือพิเศษ-เครื่องมือแพทย์');
INSERT INTO `deptxxxx` VALUES (54, 'ศูนย์ทำความสะอาด');
INSERT INTO `deptxxxx` VALUES (55, 'ศูนย์รักษาความปลอดภัย');
INSERT INTO `deptxxxx` VALUES (56, 'งานคลินิกผู้ป่วยนอกโรคติดเชื้อ (ARI)');
INSERT INTO `deptxxxx` VALUES (57, 'งานคลินิก CAPD');
INSERT INTO `deptxxxx` VALUES (58, 'ร้านค้าสวัสดิการ (All tasty)');
INSERT INTO `deptxxxx` VALUES (59, 'ร้านค้าสวัสดิการ (All Time)');
INSERT INTO `deptxxxx` VALUES (60, 'หอผู้ป่วย Stroke Unit');
INSERT INTO `deptxxxx` VALUES (61, 'ร้านค้าสวัสดิการ (SW Coffee)');
INSERT INTO `deptxxxx` VALUES (62, 'งานคลินิกเคมีบำบัด');
INSERT INTO `deptxxxx` VALUES (63, 'กลุ่มงานอาชีวเวชกรรม');
INSERT INTO `deptxxxx` VALUES (64, 'กลุ่มงานบัญชี');
INSERT INTO `deptxxxx` VALUES (65, 'กลุ่มงานแพทย์แผนไทยและการแพทย์ทางเลือก');
INSERT INTO `deptxxxx` VALUES (66, 'พยาธิวิทยากายวิภาค/ศูนย์รับบริจาคอวัยวะ');
INSERT INTO `deptxxxx` VALUES (67, 'หอผู้ป่วย Cohort ward / สามัญทั่วไป');
INSERT INTO `deptxxxx` VALUES (68, 'กลุ่มงานประชาสัมพันธ์');

-- ----------------------------
-- Table structure for keeper
-- ----------------------------
DROP TABLE IF EXISTS `keeper`;
CREATE TABLE `keeper`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of keeper
-- ----------------------------
INSERT INTO `keeper` VALUES (1, 'ประพันธ์ ภู่เจริญ');

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET tis620 COLLATE tis620_thai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 216 CHARACTER SET = tis620 COLLATE = tis620_thai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (2, 'ช่างกายอุปกรณ์');
INSERT INTO `position` VALUES (3, 'ช่างตัดเย็บผ้า');
INSERT INTO `position` VALUES (4, 'ช่างต่อท่อ');
INSERT INTO `position` VALUES (5, 'ช่างทันตกรรม');
INSERT INTO `position` VALUES (6, 'ช่างประปา');
INSERT INTO `position` VALUES (7, 'ช่างฝีมือทั่วไป');
INSERT INTO `position` VALUES (8, 'ช่างไฟฟ้าและอิเลคทรอนิกส์');
INSERT INTO `position` VALUES (9, 'ช่างไม้');
INSERT INTO `position` VALUES (10, 'ทันตแพทย์');
INSERT INTO `position` VALUES (11, 'นักกายภาพบำบัด');
INSERT INTO `position` VALUES (12, 'นักกิจกรรมบำบัด');
INSERT INTO `position` VALUES (13, 'นักจัดการงานทั่วไป');
INSERT INTO `position` VALUES (14, 'นักจิตวิทยา');
INSERT INTO `position` VALUES (15, 'นักทรัพยากรบุคคล');
INSERT INTO `position` VALUES (16, 'นักประชาสัมพันธ์');
INSERT INTO `position` VALUES (17, 'นักรังสีการแพทย์');
INSERT INTO `position` VALUES (18, 'นักวิชาการคอมพิวเตอร์');
INSERT INTO `position` VALUES (19, 'นักวิชาการพัสดุ');
INSERT INTO `position` VALUES (20, 'นักวิชาการสถิติ');
INSERT INTO `position` VALUES (21, 'นักวิชาการสาธารณสุข');
INSERT INTO `position` VALUES (22, 'นักวิชาการเงินและบัญชี');
INSERT INTO `position` VALUES (23, 'นักวิทยาศาสตร์การแพทย์');
INSERT INTO `position` VALUES (24, 'นักวิเคราะห์นโยบายและแผน');
INSERT INTO `position` VALUES (25, 'นักสังคมสงเคราะห์');
INSERT INTO `position` VALUES (26, 'นักเทคนิคการแพทย์');
INSERT INTO `position` VALUES (27, 'นักเทคโนโลยีหัวใจและทรวงอก');
INSERT INTO `position` VALUES (28, 'นักโภชนาการ');
INSERT INTO `position` VALUES (29, 'นายช่างเทคนิค');
INSERT INTO `position` VALUES (30, 'นายช่างโยธา');
INSERT INTO `position` VALUES (31, 'นายช่างไฟฟ้า');
INSERT INTO `position` VALUES (32, 'นายแพทย์');
INSERT INTO `position` VALUES (33, 'นิติกร');
INSERT INTO `position` VALUES (34, 'บรรณารักษ์');
INSERT INTO `position` VALUES (35, 'ผู้ช่วยทันตแพทย์');
INSERT INTO `position` VALUES (36, 'ผู้ช่วยนักกายภาพบำบัด');
INSERT INTO `position` VALUES (37, 'ผู้ช่วยพนักงานสุขศึกษา');
INSERT INTO `position` VALUES (38, 'ผู้อำนวยการเฉพาะด้าน(แพทย์)');
INSERT INTO `position` VALUES (39, 'พนักงานกายภาพบำบัด');
INSERT INTO `position` VALUES (40, 'พนักงานการแพทย์และรังสีเทคนิค');
INSERT INTO `position` VALUES (41, 'พนักงานช่วยการพยาบาล');
INSERT INTO `position` VALUES (42, 'พนักงานช่วยเหลือคนไข้');
INSERT INTO `position` VALUES (43, 'พนักงานซักฟอก');
INSERT INTO `position` VALUES (44, 'พนักงานทั่วไป');
INSERT INTO `position` VALUES (45, 'พนักงานธุรการ');
INSERT INTO `position` VALUES (46, 'พนักงานบริการ');
INSERT INTO `position` VALUES (47, 'พนักงานบริการเอกสารทั่วไป');
INSERT INTO `position` VALUES (48, 'พนักงานบัตรรายงานโรค');
INSERT INTO `position` VALUES (49, 'พนักงานประจำห้องทดลอง');
INSERT INTO `position` VALUES (50, 'พนักงานประจำห้องยา');
INSERT INTO `position` VALUES (51, 'พนักงานพัสดุ');
INSERT INTO `position` VALUES (52, 'พนักงานพิมพ์');
INSERT INTO `position` VALUES (53, 'พนักงานวิทยาศาสตร์');
INSERT INTO `position` VALUES (54, 'พนักงานห้องผ่าตัด');
INSERT INTO `position` VALUES (55, 'พนักงานห้องสมุด');
INSERT INTO `position` VALUES (56, 'พนักงานห้องเฝือก');
INSERT INTO `position` VALUES (57, 'พนักงานเก็บเอกสาร');
INSERT INTO `position` VALUES (58, 'พนักงานเภสัชกรรม');
INSERT INTO `position` VALUES (59, 'พยาบาลวิชาชีพ');
INSERT INTO `position` VALUES (60, 'พยาบาลเทคนิค');
INSERT INTO `position` VALUES (61, 'เจ้าพนักงานการเงินและบัญชี');
INSERT INTO `position` VALUES (62, 'เจ้าพนักงานการแพทย์แผนไทย');
INSERT INTO `position` VALUES (63, 'เจ้าพนักงานทันตสาธารณสุข');
INSERT INTO `position` VALUES (64, 'เจ้าพนักงานธุรการ');
INSERT INTO `position` VALUES (65, 'เจ้าพนักงานพัสดุ');
INSERT INTO `position` VALUES (66, 'เจ้าพนักงานรังสีการแพทย์');
INSERT INTO `position` VALUES (67, 'เจ้าพนักงานวิทยาศาสตร์การแพทย์');
INSERT INTO `position` VALUES (68, 'เจ้าพนักงานสาธารณสุข');
INSERT INTO `position` VALUES (69, 'เจ้าพนักงานห้องสมุด');
INSERT INTO `position` VALUES (70, 'เจ้าพนักงานอาชีวบำบัด');
INSERT INTO `position` VALUES (71, 'เจ้าพนักงานเครื่องคอมพิวเตอร์');
INSERT INTO `position` VALUES (72, 'เจ้าพนักงานเผยแพร่ประชาสัมพันธ์');
INSERT INTO `position` VALUES (73, 'เจ้าพนักงานเภสัชกรรม');
INSERT INTO `position` VALUES (74, 'เจ้าพนักงานเวชกรรมฟื้นฟู');
INSERT INTO `position` VALUES (75, 'เจ้าพนักงานเวชสถิติ');
INSERT INTO `position` VALUES (76, 'เจ้าพนักงานโสตทัศนศึกษา');
INSERT INTO `position` VALUES (77, 'เภสัชกร');
INSERT INTO `position` VALUES (78, 'แพทย์แผนไทย');
INSERT INTO `position` VALUES (79, 'แม่บ้าน');
INSERT INTO `position` VALUES (80, 'โภชนากร');
INSERT INTO `position` VALUES (208, 'ผู้ช่วยพยาบาล');
INSERT INTO `position` VALUES (209, 'ผู้ช่วยแพทย์แผนไทย');
INSERT INTO `position` VALUES (210, 'วิศวกรไฟฟ้า');
INSERT INTO `position` VALUES (211, 'พนักงานขับรถยนต์');
INSERT INTO `position` VALUES (212, 'พนักงานบริการ(อาหาร)');
INSERT INTO `position` VALUES (213, 'ผู้อำนวยการเฉพาะด้าน (แพทย์) สูง');
INSERT INTO `position` VALUES (214, 'ผู้ช่วยแพทย์แผนไทย');
INSERT INTO `position` VALUES (215, 'วิศวกรโยธา');

-- ----------------------------
-- Table structure for reserve_car_head
-- ----------------------------
DROP TABLE IF EXISTS `reserve_car_head`;
CREATE TABLE `reserve_car_head`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'เลขที่การขอ',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'แผนก',
  `position` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ตำแหน่ง',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'สถานที่',
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'รายละเอียดการขอ',
  `start_date` date NULL DEFAULT NULL COMMENT 'วันที่ออกเดินทาง',
  `start_time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'เวลาออกเดินทาง',
  `end_date` date NULL DEFAULT NULL COMMENT 'วันที่กลับ',
  `end_time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'เวลากลับ',
  `tcount` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'จำนวนคน',
  `no_car` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ทะเบียนรถ',
  `boss_dept` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'หัวหน้าแผนก',
  `boss_dept_date` datetime NULL DEFAULT NULL COMMENT 'หัวหน้าแผนก วันที่อนุมัติ',
  `admin_approve` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'เจ้าหน้าที่จัดรถอนุมัติ',
  `admin_approve_date` datetime NULL DEFAULT NULL COMMENT 'เจ้าหน้าที่จัดรถอนุมัติ วันที่',
  `boss_admin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'รองบริหาร',
  `boss_admin_date` datetime NULL DEFAULT NULL COMMENT 'รองบริหาร วันที่อนุมัติ',
  `boss_admin_detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'เหตุผลหารไม่อนุมัติ',
  `staff` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ผู้ขอรถ',
  `d_update` datetime NULL DEFAULT NULL COMMENT 'วันที่บันทึก',
  `keeper` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'พนักงานขับรถ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reserve_car_head
-- ----------------------------

-- ----------------------------
-- Table structure for reserve_car_manage
-- ----------------------------
DROP TABLE IF EXISTS `reserve_car_manage`;
CREATE TABLE `reserve_car_manage`  (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `no_car` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ทะเบียนรถ',
  `type_car` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ประเภทรถ',
  `keeper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ผู้ดูแลรถ',
  `image_car` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'รูปรถ',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'สถานะ',
  `count_seat` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'จำนวนที่นั่ง',
  PRIMARY KEY (`no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reserve_car_manage
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'user', 'user');
INSERT INTO `role` VALUES (2, 'admin', 'admin');
INSERT INTO `role` VALUES (3, 'boss_dept', 'boss_dept');
INSERT INTO `role` VALUES (4, 'boss_admin', 'boss_admin');
INSERT INTO `role` VALUES (5, 'superadmin', 'superadmin');

-- ----------------------------
-- Table structure for tmp
-- ----------------------------
DROP TABLE IF EXISTS `tmp`;
CREATE TABLE `tmp`  (
  `tname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dept` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tmp
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `pass_md5` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `cid` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dept` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `tname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `staff` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `d_update` datetime NULL DEFAULT NULL,
  `admin_car` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'พนักงานขับรถ',
  `role` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `token_line` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3690 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (3666, '1', 'ict009', 'ph634k', 'def08538c63fc18384af3f6be46a0acb', '1640700015461', '33', 'สุจินต์ สุกกล้า', NULL, '2023-06-28 16:12:04', NULL, 'superadmin', '5EJDf0Afp7g5G5I6x9IAYUlVRk8agMI1jFbxYY8fxXS');

SET FOREIGN_KEY_CHECKS = 1;
