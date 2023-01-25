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
  `user_no` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `exp` INT NULL DEFAULT '0',
  `level` INT NULL DEFAULT '1',
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `user_image` VARCHAR(500) NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE INDEX `user_no_UNIQUE` (`user_no` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`board` (
  `board_no` INT NOT NULL AUTO_INCREMENT,
  `board_image` VARCHAR(500) NOT NULL,
  `content` TEXT NOT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `first_user` INT NULL DEFAULT NULL,
  `second_user` INT NULL DEFAULT NULL,
  `third_user` INT NULL DEFAULT NULL,
  `user_no` INT NOT NULL,
  PRIMARY KEY (`board_no`),
  UNIQUE INDEX `board_no_UNIQUE` (`board_no` ASC) VISIBLE,
  INDEX `fk_board_user_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_board_user`
    FOREIGN KEY (`user_no`)
    REFERENCES `raonzena`.`user` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`follow` (
  `follow_no` INT NOT NULL AUTO_INCREMENT,
  `follower` INT NOT NULL,
  `followee` INT NOT NULL,
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
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`imagetheme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`imagetheme` (
  `image_no` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(500) NOT NULL,
  `level` INT NOT NULL,
  PRIMARY KEY (`image_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`image_no` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`objectfast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`objectfast` (
  `object_no` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`object_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`object_no` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`personquiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`personquiz` (
  `person_no` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(45) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`person_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`person_no` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`roominfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`roominfo` (
  `room_no` INT NOT NULL AUTO_INCREMENT,
  `room_title` VARCHAR(200) NOT NULL,
  `headcount` INT NOT NULL,
  `password` INT NULL DEFAULT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `host` INT NOT NULL,
  PRIMARY KEY (`room_no`),
  UNIQUE INDEX `room_no_UNIQUE` (`room_no` ASC) VISIBLE,
  INDEX `fk_roomInfo_user1_idx` (`host` ASC) VISIBLE,
  CONSTRAINT `fk_roomInfo_user1`
    FOREIGN KEY (`host`)
    REFERENCES `raonzena`.`user` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`speekanddraw`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`speekanddraw` (
  `seepk_no` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`seepk_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`seepk_no` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `raonzena`.`topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`topic` (
  `topic_no` INT NOT NULL,
  `answer` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`topic_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
