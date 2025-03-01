"use strict";
// import mysql from "mysql2/promise";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlPool = void 0;
// console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
// console.log("MYSQL_USER:", process.env.MYSQL_USER);
// console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD);
// console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);
// export const mysqlPool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });
const promise_1 = __importDefault(require("mysql2/promise"));
// Directly include MySQL connection details
const MYSQL_HOST = "localhost"; // Your MySQL host
const MYSQL_USER = "root"; // Your MySQL username
const MYSQL_PASSWORD = "Nayan29@Account"; // Your MySQL password
const MYSQL_DATABASE = "authdb"; // Your MySQL database name
exports.mysqlPool = promise_1.default.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
});
