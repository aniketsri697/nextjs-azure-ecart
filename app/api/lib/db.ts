import sql from "mssql";

const config: sql.config = {
  server: process.env.AZURE_STORAGE_ACCOUNT!,
  database: process.env.AZURE_STORAGE_ACCOUNT!,
  user: process.env.AZURE_STORAGE_ACCOUNT!,
  password: process.env.AZURE_STORAGE_ACCOUNT!,
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
