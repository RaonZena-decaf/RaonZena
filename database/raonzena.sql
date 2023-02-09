-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema raonzena
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema raonzena
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `raonzena` DEFAULT CHARACTER SET utf8mb3 ;
USE `raonzena` ;

-- -----------------------------------------------------
-- Table `raonzena`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`user` (
  `user_no` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `exp` INT NULL DEFAULT '0',
  `level` INT NULL DEFAULT '1',
  `create_dtm` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `user_image_url` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE INDEX `user_no_UNIQUE` (`user_no` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`board` (
  `board_no` BIGINT NOT NULL AUTO_INCREMENT,
  `board_image_url` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  `title` VARCHAR(60) NOT NULL,
  `create_dtm` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `first_user` BIGINT NULL DEFAULT NULL,
  `second_user` BIGINT NULL DEFAULT NULL,
  `third_user` BIGINT NULL DEFAULT NULL,
  `user_no` BIGINT NOT NULL,
  PRIMARY KEY (`board_no`),
  UNIQUE INDEX `board_no_UNIQUE` (`board_no` ASC) VISIBLE,
  INDEX `fk_board_user_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_board_user`
    FOREIGN KEY (`user_no`)
    REFERENCES `raonzena`.`user` (`user_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`chat` (
  `chat_no` BIGINT NOT NULL AUTO_INCREMENT,
  `topic` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`chat_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`follow` (
  `follow_no` BIGINT NOT NULL AUTO_INCREMENT,
  `follower` BIGINT NOT NULL,
  `followee` BIGINT NOT NULL,
  PRIMARY KEY (`follow_no`),
  UNIQUE INDEX `follow_no_UNIQUE` (`follow_no` ASC) VISIBLE,
  INDEX `fk_follow_user1_idx` (`follower` ASC) VISIBLE,
  INDEX `fk_follow_user2_idx` (`followee` ASC) VISIBLE,
  CONSTRAINT `fk_follow_user1`
    FOREIGN KEY (`follower`)
    REFERENCES `raonzena`.`user` (`user_no`),
  CONSTRAINT `fk_follow_user2`
    FOREIGN KEY (`followee`)
    REFERENCES `raonzena`.`user` (`user_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`image_theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`image_theme` (
  `theme_no` BIGINT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(200) NOT NULL,
  `level` INT NOT NULL,
  `image_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`theme_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`object_fast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`object_fast` (
  `object_no` BIGINT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`object_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`person_quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`person_quiz` (
  `person_no` BIGINT NOT NULL AUTO_INCREMENT,
  `person_answer` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`person_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`room_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`room_info` (
  `room_no` BIGINT NOT NULL AUTO_INCREMENT,
  `create_dtm` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `headcount` INT NOT NULL,
  `password` VARCHAR(20) NULL DEFAULT NULL,
  `room_title` VARCHAR(255) NOT NULL,
  `host` BIGINT NOT NULL,
  `image_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`room_no`),
  INDEX `FKl4iulw57a8n1hf39otu3xxcqy` (`host` ASC) VISIBLE,
  CONSTRAINT `FKl4iulw57a8n1hf39otu3xxcqy`
    FOREIGN KEY (`host`)
    REFERENCES `raonzena`.`user` (`user_no`))
ENGINE = InnoDB
AUTO_INCREMENT = 1050
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`speak_and_draw`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`speak_and_draw` (
  `speak_no` BIGINT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`speak_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`speak_no` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`chance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`chance` (
  `chance_no` BIGINT NOT NULL AUTO_INCREMENT,
  `chance_id` VARCHAR(50) NULL,
  `item` VARCHAR(200) NULL,
  PRIMARY KEY (`chance_no`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;