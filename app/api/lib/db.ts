import sql from "mssql";

const config: sql.config = {
  server: process.env.server!,
  database: process.env.database!,
  user: process.env.user!,
  password: process.env.password!,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getDb() {
  if (pool) return pool;

  pool = await sql.connect(config);
  return pool;
}
