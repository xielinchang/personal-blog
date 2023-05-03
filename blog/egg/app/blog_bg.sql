/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 28/04/2023 13:06:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_bg
-- ----------------------------
DROP TABLE IF EXISTS `blog_bg`;
CREATE TABLE `blog_bg`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_bg
-- ----------------------------
INSERT INTO `blog_bg` VALUES (1, '/public/uploads/main/bg/day01.jpg', NULL, NULL);
INSERT INTO `blog_bg` VALUES (2, '/public/uploads/main/bg/sunset01.jpg', NULL, NULL);
INSERT INTO `blog_bg` VALUES (3, '/public/uploads/main/bg/night01.jpg', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
