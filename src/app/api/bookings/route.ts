import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

type BookingPayload = {
  petType?: unknown;
  petSize?: unknown;
  service?: unknown;
  arrivalTime?: unknown;
  name?: unknown;
  phone?: unknown;
  note?: unknown;
  estimatedPrice?: unknown;
};

const validPetTypes = ["dog", "cat"] as const;
const validPetSizes = ["small", "medium", "large"] as const;
const validServices = ["wash", "style", "soothe"] as const;

const globalForPg = globalThis as typeof globalThis & {
  bookingPgPool?: Pool;
};

function getPool() {
  const connectionString = process.env.SUPABASE_POSTGRES_SESSION_POOL_URL;

  if (!connectionString) {
    throw new Error("SUPABASE_POSTGRES_SESSION_POOL_URL is not configured.");
  }

  globalForPg.bookingPgPool ??= new Pool({
    connectionString,
    max: 3,
    ssl: {
      rejectUnauthorized: false
    }
  });

  return globalForPg.bookingPgPool;
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends readonly string[]>(value: string, allowed: T): value is T[number] {
  return allowed.includes(value);
}

function validateBooking(payload: BookingPayload) {
  const petType = getText(payload.petType);
  const petSize = getText(payload.petSize);
  const service = getText(payload.service);
  const arrivalTime = getText(payload.arrivalTime);
  const name = getText(payload.name);
  const phone = getText(payload.phone);
  const note = getText(payload.note);
  const estimatedPrice = Number(payload.estimatedPrice);
  const arrivalDate = new Date(arrivalTime);

  if (!isOneOf(petType, validPetTypes)) {
    return { error: "宠物类型不正确。" };
  }

  if (!isOneOf(petSize, validPetSizes)) {
    return { error: "宠物体型不正确。" };
  }

  if (!isOneOf(service, validServices)) {
    return { error: "服务项目不正确。" };
  }

  if (!arrivalTime || Number.isNaN(arrivalDate.getTime())) {
    return { error: "期望到店时间不正确。" };
  }

  if (!name || name.length > 80) {
    return { error: "联系人需要填写，且不能超过 80 个字。" };
  }

  if (!phone || phone.length > 30) {
    return { error: "联系电话需要填写，且不能超过 30 个字。" };
  }

  if (note.length > 1000) {
    return { error: "宠物情况不能超过 1000 个字。" };
  }

  if (!Number.isInteger(estimatedPrice) || estimatedPrice < 0) {
    return { error: "预估价格不正确。" };
  }

  return {
    booking: {
      petType,
      petSize,
      service,
      arrivalTime: arrivalDate.toISOString(),
      name,
      phone,
      note,
      estimatedPrice
    }
  };
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ message: "提交内容格式不正确。" }, { status: 400 });
  }

  const validated = validateBooking(payload);

  if ("error" in validated) {
    return NextResponse.json({ message: validated.error }, { status: 400 });
  }

  try {
    const pool = getPool();
    const result = await pool.query<{ id: string }>(
      `
        insert into public.bookings (
          pet_type,
          pet_size,
          service,
          arrival_time,
          customer_name,
          phone,
          note,
          estimated_price
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning id
      `,
      [
        validated.booking.petType,
        validated.booking.petSize,
        validated.booking.service,
        validated.booking.arrivalTime,
        validated.booking.name,
        validated.booking.phone,
        validated.booking.note,
        validated.booking.estimatedPrice
      ]
    );

    return NextResponse.json({
      id: result.rows[0]?.id,
      message: "预约已提交，门店会尽快确认档期。"
    });
  } catch (error) {
    console.error("Booking insert failed:", error);

    return NextResponse.json(
      { message: "预约提交失败，请稍后再试或直接电话联系门店。" },
      { status: 500 }
    );
  }
}
