import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "M3ongchan23#",
  database: "chat",
});