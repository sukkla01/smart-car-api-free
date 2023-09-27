/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.0.32_3306
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : 192.168.0.32:3306
 Source Schema         : smart_car

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 28/06/2023 15:56:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `pass_md5` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `cid` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `dept` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `tname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `staff` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `d_update` datetime NULL DEFAULT NULL,
  `admin_car` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT 'พนักงานขับรถ',
  `role` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (12, '1', 'ict009', 'ph634k', 'def08538c63fc18384af3f6be46a0acb', '1640700015461', '51', 'สุจินต์ สุกกล้า', NULL, '2023-05-28 19:21:41', NULL, 'superadmin');
INSERT INTO `user` VALUES (13, '1', 'ado031', 'hwp31y', 'd96c1634d1afe05f93d0993026407bbd', '1640100155424', '37', 'หาญ ผัดผล', NULL, '2023-05-30 13:28:09', NULL, 'admin');
INSERT INTO `user` VALUES (21, '1', 'mao012', 'e17vhw', '43444893b34b48e32e20738dd52225c6', '3640600115657', '', 'เนมพลาย จันทร์วงศ์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (23, '1', 'pw4012', 'la77th', '5aebfdf43787b9ad62dca4d90da8f6ff', '3640700220762', '1', 'อรสา  อาจปาน', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (24, '1', 'mrs004', '2e34cy', 'cdc36b3d6846dbd26cf13b60f601c3fd', '3640600403849', '45', 'สมลัก​ษณ์​ สุคนธ์​พา​นิช​', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (25, '1', 'mrs003', 'nbfds9', '71ae3fd5fef15137bbee3c4fd9370c1c', '3220200116773', '45', 'ปุณญิศา ปราศราคิน', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (26, '1', 'mrs014', 'aa8d4g', '65f45415ada5ae0da67d5b4d04b56e5f', '1640600001515', '45', 'ปาณิศรา​ เกษรสกุล', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (27, '1', 'mrs002', '4d87rt', '795317d907dc5a2bc735e37a4160f878', '3640700618570', '45', 'นก​ ล้วนพฤกษ์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (28, '1', 'ict003', 'taj917', '465f3018b0f5ec6b9e2a0147d48117bd', '3330100578421', '51', 'นางระพีเพชร ทองบุญ', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (29, '1', 'hio005', 'ls15fz', '6bafbf4ad442d96f64a9b2d1c5bc6fc2', '3640300010213', '63', 'นายชำนาญ  เงินนา', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (30, '1', 'nicu07', 'hjni8d', 'b8c75643d9e7f5092d3fe75c2ee1b1f6', '3640600598836', '3', 'วันเพ็ญ พุ่มเกตุ', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (31, '1', 'fin016', 'hy6hu3', 'dbc10e561039d75d3278f3b53c49407f', '1640600006169', '41', 'กนกวรรณ มีเจริญ', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (32, '1', 'SWO006', 'bd5hmd', 'e892c4e3ea3fa385b71d5e1dfc590068', '3640600016616', '42', 'นางสาวณัฐกานต์ เนตรนิลพงษ์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (33, '1', 'opd021', '7dd32p', '138b93764e726777f8a38a6fb4c18d76', '3102000813732', '63', 'วันทนีย์  ชมกลิ่น', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (34, '1', 'osm004', 'fa35cp', '3251080c8e9f1bd95b5487c532e20985', '3640600526100', '48', 'นันทนา เที่ยมรักษา', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (35, '1', 'sto202', 'drryu2', '40b9889729e9247a8be8582badc94f01', '3840500032961', '52', 'นางศิริรัตน์ หว่างเชื้อ', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (36, '1', 'nur008', '97fc1k', '7c56b9e9c63475b1c72b52fa1661d260', '3640100646882', '1', 'พรชนก พากเพียร', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (37, '1', 'ph1043', '31m38c', 'e4dd0b75e057205e6a5d96bfd00334af', '1659900690446', '41', 'สกุณา ปั่นแก้ว', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (38, '1', 'psy006', '9u8kg3', 'ad6c505ab53f3f62c297ec0c5ab3444a', '1640600317423', '5', 'สัตตบุษย์ มันตะสูตร', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (39, '1', 'ttm011', 'ddwk12', 'ae8da8072809c445dbed2449f4474df3', '1640600312421', '65', 'นางสาวสุนิตตา นุชปาน', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (40, '1', 'ohd006', 'nw6026', 'eacb41777343f5668f6767058edfbf78', '1551000036026', '68', 'นายณัฐวุฒิ หลากจิตร์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (41, '1', 'lab049', 'swq4h5', '8d998c6b21230468273a2fe4fb15b7d5', '1640600312901', '27', 'น.ส.สุดารัตน์ เข็มพล', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (42, '1', 'hdu013', 'ddc44p', '034a8c8fa453261fea620775543c85e0', '1640600333747', '12', 'น.ส.จุฑามาศ ครุฑมี', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (43, '1', 'lab024', 'ku39p2', 'bf2921b0efc4f2da54b58fb8162dd5b1', '3640600456624', '27', 'น.ส.จิดาภา หมีเพ็ง', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (44, '1', 'ph1047', 'oc3521', '5276dea3b41424bcbf479ac3dfbe3b9c', '1640700094736', '28', 'นายสัมฤทธิ์   หลากจิตร', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (45, '1', 'nur061', '23g7d9', '873b3c7d68908a06abde7feff5508a2c', '1640600229290', '63', 'ฐาปนีย์  อุ้มทอง', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (46, '1', 'osm007', '23a8ug', '34dbf4afdc3a8dde0519e2e67e388aa5', '1639900229188', '48', 'รัชนีกร รินทมาตย์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (47, '1', 'den051', 'pm18sd', '5b1bb8aa56b200d07c1d43d1765be3af', '1640600132059', '26', 'พิมชนก เสถียรดี', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (48, '1', 'qic003', 'ch12bk', 'da4e6ff566ac8dd90bfba35bb6fe6851', '1630300068002', '50', 'นางสาวชลีพร บุญเกิด', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (49, '1', 'Ph1050', 'wqa41u', '23a9a762fd56983e09d0eecd0ff35870', '1640600273001', '28', 'นางสาวณัฏฐริกา พุ่มเกตุ', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (50, '1', 'reh036', '9ar9t4', '543467a874fa31c0ae205b3907130e5e', '1640600252852', '30', 'นายจำปาศักดิ์ สุวรรณโฉม', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (51, '1', 'swo002', 'a1233f', 'b04d120479b3f8cdf8f984ebf7cd54cd', '3659900173995', '42', 'นางสาวกฤติยา ชั้นไพบูลย์', 'ict009', '2023-06-16 10:10:54', NULL, 'user');
INSERT INTO `user` VALUES (52, '1', 'mao002', 'y946by', '4ebfd15d892ccd1ad348627f293b6a4d', '3850100268169', '', 'ชิดชัย รัตนหาญ', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (53, '1', 'mrs001', '7daa3d', '029c353f9be0f1329e3f56f2fedcff59', '3649800209696', '45', 'หทัยรัก  รัตนหาญ', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (54, '1', 'ems002', 'kx370k', '7d5bdcfe0b8b37ced5b7a9f85768c164', '3640600295370', '1', 'นางสาวรุจีพร  เพ็ญศรี', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (55, '1', 'ict002', 'qw2rtp', '45309444c37ffe220bed2ced6b40feba', '3640700475400', '51', 'นายสุทธิวุฒิ สุคนธ์พานิช', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (56, '1', 'mmw005', 'up159t', '575970eafc20c4680c5eca935fe495da', '3640700328091', '60', 'น.ส.จินดารัตน์ นาคคุ้ม', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (57, '1', 'ane005', 'bhu702', '7c77ece97154398ecfe7c0563e685475', '3649900038702', '9', 'สินีนาฏ พิพัฒนเดชา', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (58, '1', 'nur009', 'yq5t71', '409e467ff17e3c3585e896611a521606', '3640700138233', '52', 'น.ส.ยุภารัตน์ สุกกล้า', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (59, '1', 'ems026', 'kj2ak8', '1e84c6dddd0323b1331a2e2f7edc0fcd', '1659900188635', '62', 'กิจจา อ่วมแก้ว', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (60, '1', 'reh001', 'jhk605', '7d029e1e2655ef197671e39f128f2301', '3649900038605', '30', 'ดลฤดี เกตุเอี่ยม', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (61, '1', 'scp001', '3eixd9', '60ff808493b0173be74f1fa7c3b14589', '3649900134698', '41', 'บุปผา เพชรหมอง', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (62, '1', 'reh015', 'u9b4qh', '23e66abc2cc241fe6f2dbef4197707b9', '1659900048744', '65', 'นางสาวทัชชิรพรรณ เทียนมั่น', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (63, '1', 'lab007', 'd5ab88', 'fb3d1170a565943710f9413fba111962', '3650400230762', '27', 'น.ส.ภัทรพร มรฤทธิ์', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (64, '1', 'den045', 'kr36ln', '543d8cbe9f304416b3782dd5e6008927', '1439900180351', '26', 'คิราลีฬห์ เครือใหม่', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (65, '1', 'swo001', 'kmb85j', 'aa4ed7422b30fbd171a043be0ac37a2c', '3640700026028', '42', 'นางสาวพวงเพ็ญ ชูพงษ์', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (66, '1', 'reh016', 'g3dd8j', '8a33629cda8aaa7ba2ef5095daadbe02', '1509900307775', '30', 'นางขวัญนิญานันท์ เชื้อชาติทองธกุล', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (69, '1', 'osm006', 'ktp15p', 'e4bb30a17ea84ad89977fd531cb6b8f8', '1580400014444', '48', 'ภัคศินีพิชญ์ กุลทัตพงษ์', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (70, '1', 'lab002', 'uyb54p', '2632d5901fa61220aff41d095fd42ac7', '3419900326670', '27', 'นางกัลยา พุฒฤทธิ์', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (71, '1', 'lab008', '25azcv', '7deb599458849d04b42c5624a7f61f40', '3649900203096', '27', 'นายรณรงค์ แก้วประเสริฐ', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (72, '1', 'ph2001', 'gh6k73', 'c795fa7fdbc4906e867f7f71af5c042c', '3639900035673', '28', 'ภญ.จตุพร สุมิตสวรรค์', 'ict009', '2023-06-16 10:11:58', NULL, 'boss_dept');
INSERT INTO `user` VALUES (83, '1', 'mso023', 'ooprgr', '0a0eb3788803f431f1da972142a2726e', '3649900032178', '26,3', 'ณัฐพล เดชะปรากรม', NULL, '2023-06-16 10:12:29', NULL, 'boss_dept');
INSERT INTO `user` VALUES (84, '1', 'ict008', 'ph4dd6', 'c2109807b90dd41d714fe4868f94d00b', '3640600162671', '51', 'กฤษฎา อนันตะ', NULL, '2023-06-27 16:12:01', NULL, 'superadmin');

SET FOREIGN_KEY_CHECKS = 1;
