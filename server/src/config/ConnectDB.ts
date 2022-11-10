import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M3ongchan23#",
  database: "chat",
});
