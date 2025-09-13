import { db } from "@/db/client";
import { resources } from "@/db/schema";
import { NextResponse } from "next/server";

const INITIAL = [
  {
    id: "IRON",
    base: 12,
    min: 4,
    max: 48,
  },
  {
    id: "WHEAT",
    base: 6,
    min: 2,
    max: 24,
  },
  {
    id: "LOG",
    base: 5,
    min: 2,
    max: 18,
  },
  {
    id: "COAL",
    base: 4,
    min: 1,
    max: 12,
  },
];

export async function POST() {
  for (const r of INITIAL) {
    await db
      .insert(resources)
      .values({
        id: r.id,
        base: r.base,
        price: r.base,
        lastPrice: r.base,
        min: r.min,
        max: r.max,
        soldTick: 0,
        boughtTick: 0,
      })
      .onConflictDoNothing();
  }

  return NextResponse.json({ ok: true, count: INITIAL.length });
}
