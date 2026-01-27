import sql from "mssql";

const config: sql.config = {
  server: "sql-server-app-dev-2.database.windows.net",
  database: "sql-db-app-dev",
  user: "sql-server-admin-dev",
  password: "xyzAb@54321",
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getDb() {
  if (pool) return pool;

  pool = await sql.connect(config);
  return pool;
}
