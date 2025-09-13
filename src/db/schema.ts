import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  varchar,
  integer,
  real,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const resources = pgTable("resources", {
  id: varchar("id", { length: 32 }).primaryKey(),
  base: real("base").notNull(),
  price: real("price").notNull(),
  lastPrice: real("last_price").notNull(),
  min: real("min").notNull(),
  max: real("max").notNull(),
  soldTick: integer("sold_tick").notNull().default(0),
  boughtTick: integer("bought_tick").notNull().default(0),
});

export const players = pgTable("players", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 32 }).notNull(),
  wallet: integer("wallet").notNull().default(0),
  bank: integer("bank").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tx = pgTable(
  "tx",
  {
    id: serial("id").primaryKey(),
    playerId: varchar("player_id", { length: 36 }).notNull(),
    resId: varchar("res_id", { length: 32 }).notNull(),
    amount: integer("amount").notNull(),
    gross: integer("gross").notNull(),
    tax: integer("tax").notNull(),
    net: integer("net").notNull(),
    kind: varchar("kind", { length: 8 }).notNull(),
    ts: timestamp("ts").defaultNow(),
  },
  (t) => ({
    idx: uniqueIndex("idx").on(t.playerId),
  })
);
