"use strict";
// import { mysqlPool } from "../config/dbMySQL";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTable = void 0;
// export const createUserTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       otp VARCHAR(6) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (email) REFERENCES users(email)
//     );
//   `;
//   await mysqlPool.query(query);
// };
// import { mysqlPool } from "../config/dbMySQL";
// export const createUserTable = async () => {
//   const userTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       name VARCHAR(255) NOT NULL,
//       date_of_birth DATE NOT NULL
//     );
//   `;
//   const otpTableQuery = `
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       otp VARCHAR(6) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (email) REFERENCES users(email)
//     );
//   `;
//   await mysqlPool.query(userTableQuery);
//   await mysqlPool.query(otpTableQuery);
// };
const dbMySQL_1 = require("../config/dbMySQL");
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL
    );
  `;
    const otpTableQuery = `
    CREATE TABLE IF NOT EXISTS otps (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(6) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (email) REFERENCES users(email)
    );
  `;
    const unverifiedUserTableQuery = `
    CREATE TABLE IF NOT EXISTS unverified_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      otp VARCHAR(6) NOT NULL,
      otp_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    yield dbMySQL_1.mysqlPool.query(userTableQuery);
    yield dbMySQL_1.mysqlPool.query(otpTableQuery);
    yield dbMySQL_1.mysqlPool.query(unverifiedUserTableQuery);
});
exports.createUserTable = createUserTable;
