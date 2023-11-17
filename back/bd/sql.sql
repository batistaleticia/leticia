-- MySQL Workbench Forward Engineering

DROP SCHEMA IF EXISTS helppy;
CREATE SCHEMA IF NOT EXISTS helppy;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema helppy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema helppy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `helppy` DEFAULT CHARACTER SET utf8 ;
USE `helppy` ;

-- -----------------------------------------------------
-- Table `helppy`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helppy`.`Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helppy`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helppy`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `acesso` INT NOT NULL DEFAULT 1 COMMENT '0 - admin, 1 - cliente',
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helppy`.`Comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helppy`.`Comentario` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `post` VARCHAR(1000) NOT NULL,
  `data` DATETIME NOT NULL,
  `quantidadeDenuncias` INT NOT NULL,
  `idCategoria` INT NOT NULL,
  `usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idComentario`),
  INDEX `fk_Comentario_Categoria_idx` (`idCategoria`),
  INDEX `fk_Comentario_Usuario1_idx` (`usuario_idUsuario`),
  CONSTRAINT `fk_Comentario_Categoria`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `helppy`.`Categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Usuario1`
    FOREIGN KEY (`usuario_idUsuario`)
    REFERENCES `helppy`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helppy`.`infoassistenciais`
-- -----------------------------------------------------
CREATE TABLE `helppy`.`infoassistenciais` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `info` VARCHAR(1000) NOT NULL,
 PRIMARY KEY (`id`))
ENGINE = InnoDB;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
