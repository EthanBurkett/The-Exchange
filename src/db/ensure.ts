import { sql } from "./client";

let _ensured = false;

export async function ensureSchema() {
  if (_ensured) return;

  // Ensure Tables
  await sql`
    create table if not exists resources (
      id varchar(32) primary key,
      base real not null,
      price real not null,
      last_price real not null,
      min real not null,
      max real not null,
      sold_tick integer not null default 0,
      bought_tick integer not null default 0
    )
  `;

  await sql`
    create table if not exists players (
      id varchar(36) primary key,
      username varchar(32) not null,
      wallet integer not null default 0,
      bank integer not null default 0,
      created_at timestamp default now()
    )
  `;

  await sql`
    create table if not exists tx (
      id serial primary key,
      player_id varchar(36) not null,
      res_id varchar(32) not null,
      amount integer not null,
      gross integer not null,
      tax integer not null,
      net integer not null,
      kind varchar(8) not null,
      ts timestamp default now()
    )
  `;

  await sql`
    create table if not exists settings (
      k varchar(64) primary key,
      v jsonb not null
    );
  `;

  const initial = [
    { id: "IRON", base: 12, min: 4, max: 48 },
    { id: "WHEAT", base: 6, min: 2, max: 24 },
    { id: "LOG", base: 5, min: 2, max: 18 },
    { id: "COAL", base: 4, min: 1, max: 12 },
  ];

  for (const r of initial) {
    await sql`
      insert into resources (id, base, price, last_price, min, max, sold_tick, bought_tick)
      values (${r.id}, ${r.base}, ${r.base}, ${r.base}, ${r.min}, ${r.max}, 0, 0)
      on conflict (id) do nothing;
    `;
  }

  await sql`
    insert into settings (k, v)
    values ('BOOTSTRAPPED', '{"ok":true}')
    on conflict (k) do nothing;
  `;

  _ensured = true;
}
