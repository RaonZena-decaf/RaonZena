-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema raonzena
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema raonzena
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `raonzena` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema ssafy_web_db
-- -----------------------------------------------------
USE `raonzena` ;

-- -----------------------------------------------------
-- Table `raonzena`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`user` (
  `user_no` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `exp` INT NULL DEFAULT 0,
  `level` INT NULL DEFAULT 1,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_no`),
  UNIQUE INDEX `user_no_UNIQUE` (`user_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`board` (
  `board_no` INT NOT NULL AUTO_INCREMENT,
  `board_image` VARCHAR(500) NOT NULL,
  `content` TEXT NOT NULL,
  `create_date` DATETIME NULL DEFAULT current_timestamp,
  `first_user` INT NULL,
  `second_user` INT NULL,
  `third_user` INT NULL,
  `user_no` INT NOT NULL,
  PRIMARY KEY (`board_no`),
  UNIQUE INDEX `board_no_UNIQUE` (`board_no` ASC) VISIBLE,
  INDEX `fk_board_user_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_board_user`
    FOREIGN KEY (`user_no`)
    REFERENCES `raonzena`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
    REFERENCES `raonzena`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_follow_user2`
    FOREIGN KEY (`followee`)
    REFERENCES `raonzena`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`roomInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`roomInfo` (
  `room_no` INT NOT NULL AUTO_INCREMENT,
  `room_title` VARCHAR(200) NOT NULL,
  `headcount` INT NOT NULL,
  `password` INT NULL,
  `create_date` DATETIME NULL DEFAULT current_timestamp,
  `host` INT NOT NULL,
  PRIMARY KEY (`room_no`),
  UNIQUE INDEX `room_no_UNIQUE` (`room_no` ASC) VISIBLE,
  INDEX `fk_roomInfo_user1_idx` (`host` ASC) VISIBLE,
  CONSTRAINT `fk_roomInfo_user1`
    FOREIGN KEY (`host`)
    REFERENCES `raonzena`.`user` (`user_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`speekAndDraw`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`speekAndDraw` (
  `seepk_no` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`seepk_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`seepk_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`objectFast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`objectFast` (
  `object_no` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`object_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`object_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`personQuiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`personQuiz` (
  `person_no` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(45) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`person_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`person_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`imageTheme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`imageTheme` (
  `image_no` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(500) NOT NULL,
  `level` INT NOT NULL,
  PRIMARY KEY (`image_no`),
  UNIQUE INDEX `seepk_no_UNIQUE` (`image_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `raonzena`.`topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `raonzena`.`topic` (
  `topic_no` INT NOT NULL,
  `answer` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`topic_no`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
