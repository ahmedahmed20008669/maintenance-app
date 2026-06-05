import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), '..', 'maintenance-app', 'prisma', 'dev.db')

const globalForDb = globalThis as unknown as {
  db: Database.Database | undefined
}

function createDatabase() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  
  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS Request (
      id TEXT PRIMARY KEY,
      tenantName TEXT NOT NULL,
      tenantEmail TEXT DEFAULT '',
      tenantUnit TEXT DEFAULT '',
      rawInput TEXT NOT NULL,
      title TEXT DEFAULT '',
      category TEXT DEFAULT 'Uncategorized',
      severity TEXT DEFAULT 'Medium',
      priority INTEGER DEFAULT 3,
      status TEXT DEFAULT 'Pending',
      assignedTo TEXT,
      summary TEXT DEFAULT '',
      actionSteps TEXT DEFAULT '[]',
      estimatedCost TEXT,
      imageUrl TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Notification (
      id TEXT PRIMARY KEY,
      requestId TEXT NOT NULL,
      type TEXT NOT NULL,
      recipient TEXT NOT NULL,
      message TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Tenant (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      unit TEXT NOT NULL,
      password TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `)

  return db
}

export const db = globalForDb.db ?? createDatabase()

if (process.env.NODE_ENV !== 'production') globalForDb.db = db

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
}
