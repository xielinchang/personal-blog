/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : base

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 24/07/2022 09:37:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `banner_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT NULL,
  `state` int NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `upt_act` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_id` int NULL DEFAULT NULL,
  `updated_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, '5257', '/public/uploads/2022/07/23/1658538616774768.png', 27, 1, '257257', '2022-07-21 09:38:25', '2022-07-21 09:38:28', '', 2, 2);
INSERT INTO `banner` VALUES (2, ',iu,', '/public/uploads/2022/07/23/1658538749929742.png', 25, 1, '387378', '2022-07-21 10:36:00', '2022-07-21 10:36:00', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (3, 'btrb', '/public/uploads/2022/07/23/1658538717124322.png', 4, 1, '378378', '2022-07-21 10:36:46', '2022-07-21 10:36:46', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (4, 'b', '/public/uploads/2022/07/23/1658538738785735.png', 27, 1, '38778', '2022-07-21 10:37:41', '2022-07-21 10:37:41', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (5, 'bretbtre', '/public/uploads/2022/07/23/1658580882347819.png', 47, 2, '83787', '2022-07-21 10:38:07', '2022-07-21 10:38:07', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (6, 'tber', 'btre', 2, 1, '3873', '2022-07-21 10:43:41', '2022-07-21 10:43:41', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (7, 'btr', 'betr', 8, 2, '37', '2022-07-21 10:48:25', '2022-07-21 10:48:25', 'I', NULL, NULL);
INSERT INTO `banner` VALUES (10, 'vfwsefew', '/public/uploads/2022/07/22/1658454242129689.jpg', 0, 1, 'fewfwef', '2022-07-22 09:44:02', '2022-07-22 09:44:02', 'I', NULL, NULL);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `product_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `upt_act` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_id` int NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_id` int NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'tjtyj2', 'tyj', '/public/uploads/2022/07/23/1658562292767368.png', 2, '2', '2brt', NULL, NULL, '2022-07-23 15:41:25', NULL, '2022-07-23 15:41:30');
INSERT INTO `product` VALUES (2, '141', '112', '/public/uploads/2022/07/23/1658562340839150.png', 1, '1', 'regfer', NULL, NULL, '2022-07-23 15:41:27', NULL, '2022-07-23 15:41:32');
INSERT INTO `product` VALUES (3, 'htrh', 'hrthrthtr', '/public/uploads/2022/07/23/1658562347818929.png', 4, '1', 'thhrsthterht', 'I', NULL, '2022-07-22 17:13:18', NULL, '2022-07-22 17:13:18');
INSERT INTO `product` VALUES (4, 'yujyu', 'jyujt', '/public/uploads/2022/07/23/1658562354419848.png', 5, '2', 'juytjt', 'I', NULL, '2022-07-22 17:18:23', NULL, '2022-07-22 17:18:23');
INSERT INTO `product` VALUES (5, 'jytjy', 'jytj', '/public/uploads/2022/07/23/1658562361715628.png', 4, '1', 'jtryj', 'I', NULL, '2022-07-22 17:29:33', NULL, '2022-07-22 17:29:33');

-- ----------------------------
-- Table structure for product_top
-- ----------------------------
DROP TABLE IF EXISTS `product_top`;
CREATE TABLE `product_top`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NULL DEFAULT NULL,
  `sort` int NULL DEFAULT NULL,
  `state` int NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `upt_act` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_id` int NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_id` int NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_top
-- ----------------------------
INSERT INTO `product_top` VALUES (1, 4, 2, 1, 'rthgrthrt', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `product_top` VALUES (2, 1, 2, 2, 'rgerg', 'I', NULL, '2022-07-23 16:58:17', NULL, '2022-07-23 16:58:17');

-- ----------------------------
-- Table structure for product_type_dict
-- ----------------------------
DROP TABLE IF EXISTS `product_type_dict`;
CREATE TABLE `product_type_dict`  (
  `id` int NOT NULL,
  `type_num` int NULL DEFAULT NULL,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `upt_act` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_id` int NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_id` int NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_type_dict
-- ----------------------------
INSERT INTO `product_type_dict` VALUES (1, 1, '浴室空间', NULL, 1, '2022-07-24 09:36:44', 1, '2022-07-24 09:36:44');
INSERT INTO `product_type_dict` VALUES (2, 2, '厨房空间', NULL, 2, '2022-07-24 09:36:44', 2, '2022-07-24 09:36:44');
INSERT INTO `product_type_dict` VALUES (3, 3, '阳台空间', NULL, 5, '2022-07-24 09:36:44', 3, '2022-07-24 09:36:44');
INSERT INTO `product_type_dict` VALUES (4, 4, '服务配件', NULL, 3, '2022-07-24 09:36:44', 4, '2022-07-24 09:36:44');
INSERT INTO `product_type_dict` VALUES (5, 5, '匠心空间', NULL, 7, '2022-07-24 09:36:44', 5, '2022-07-24 09:36:44');

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典类型',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '注释',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '值',
  `state` int NULL DEFAULT 1 COMMENT '1正常0停用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (1, 'direction', 'Java', '1', 1);
INSERT INTO `sys_dict` VALUES (2, 'direction', 'JavaScript', '2', 0);
INSERT INTO `sys_dict` VALUES (3, 'direction', 'C', '3', 0);
INSERT INTO `sys_dict` VALUES (4, 'sex', '男', '1', 1);
INSERT INTO `sys_dict` VALUES (5, 'sex', '女', '2', 1);
INSERT INTO `sys_dict` VALUES (6, 'sex', '保密', '0', 1);

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典名称',
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典类型',
  `state` int NULL DEFAULT NULL COMMENT '状态',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, '方向', 'direction', 1, NULL);
INSERT INTO `sys_dict_type` VALUES (2, '性别', 'sex', 1, NULL);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `path` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路径',
  `component` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件标识',
  `meta_title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单标题',
  `meta_icon` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  `parent_id` int NULL DEFAULT NULL COMMENT '父菜单ID',
  `hidden` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '(0显示，1隐藏)',
  `keep_alive` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '(0不缓存，1缓存)',
  `upt_act` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_id` int NULL DEFAULT NULL COMMENT '创建人ID',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_id` int NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统菜单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '/sys', 'Layout', 'sys', '系统管理', 'set', 2, 0, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (2, '/sys/user', 'sys/User', 'User', '用户管理', 'user', 3, 1, '0', '1', 'U', NULL, NULL, 36, '2021-04-01 10:38:52');
INSERT INTO `sys_menu` VALUES (3, '/sys/role', 'sys/Role', 'Role', '角色管理', 'role', 4, 1, '0', '1', 'U', NULL, NULL, 36, '2022-03-18 10:55:57');
INSERT INTO `sys_menu` VALUES (4, '/sys/menu', 'sys/Menu', 'Menu', '菜单管理', 'menu', 5, 1, '0', '1', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (5, '/', 'Layout', 'home', '首页', 'home', 0, 0, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (6, '/', 'index/Index', 'Home', '首页', 'home', 1, 5, '0', '0', 'I', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (56, '/sys/dict', 'sys/Dict', 'Dict', '字典管理', 'course', 9, 1, '0', '0', 'U', 36, '2022-07-14 16:28:40', 36, '2022-07-15 14:41:13');
INSERT INTO `sys_menu` VALUES (57, '/sys/dict/detail', 'sys/DictDetail', 'DictDetail', '字典详情', 'course', 9, 1, '1', '0', 'U', 36, '2022-07-15 15:41:06', 36, '2022-07-20 15:03:52');
INSERT INTO `sys_menu` VALUES (58, '/home', 'Layout', 'HomeIndex', '官网管理', 'menu', 9, 0, '0', '0', 'U', 36, '2022-07-20 15:02:23', 36, '2022-07-20 15:07:07');
INSERT INTO `sys_menu` VALUES (59, '/home/banner', 'home/Banner', 'Banner', '轮播图管理', 'record', 9, 58, '0', '0', 'I', 36, '2022-07-20 15:06:55', 36, '2022-07-20 15:06:55');
INSERT INTO `sys_menu` VALUES (60, '/home/top', 'home/Top', 'Top', '畅销榜单管理', 'home', 9, 58, '0', '0', 'I', 36, '2022-07-20 15:08:03', 36, '2022-07-20 15:08:03');
INSERT INTO `sys_menu` VALUES (63, '/home/product', 'home/Product', 'Product', '产品管理', 'course', 9, 58, '0', '0', 'U', 36, '2022-07-22 11:15:31', 36, '2022-07-22 11:52:26');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `code` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色代码',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  `upt_act` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `created_id` int NULL DEFAULT NULL COMMENT '创建人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `updated_id` int NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'ADMIN', 1, 'I', '2020-12-07 16:08:19', 1, '2020-12-07 16:08:22', 1);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int NOT NULL COMMENT '角色ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统【角色】【菜单】表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1);
INSERT INTO `sys_role_menu` VALUES (1, 2);
INSERT INTO `sys_role_menu` VALUES (1, 3);
INSERT INTO `sys_role_menu` VALUES (1, 4);
INSERT INTO `sys_role_menu` VALUES (1, 5);
INSERT INTO `sys_role_menu` VALUES (1, 6);
INSERT INTO `sys_role_menu` VALUES (1, 56);
INSERT INTO `sys_role_menu` VALUES (1, 57);
INSERT INTO `sys_role_menu` VALUES (1, 58);
INSERT INTO `sys_role_menu` VALUES (1, 59);
INSERT INTO `sys_role_menu` VALUES (1, 60);
INSERT INTO `sys_role_menu` VALUES (1, 63);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '账号',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `sex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `upt_act` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '数据状态（I插入 D删除 U更新）',
  `created_id` int NULL DEFAULT NULL COMMENT '创建人ID',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_id` int NULL DEFAULT NULL COMMENT '更新人ID',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (36, 'admin', '超级管理员', '743c4d81b35239313001ae8e8a142acc', '1', '123456', 'U', 31, '2020-12-17 15:07:35', 36, '2022-03-18 09:34:21');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` int NOT NULL COMMENT '用户ID',
  `role_id` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统【用户】【角色】关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (36, 1);

SET FOREIGN_KEY_CHECKS = 1;
