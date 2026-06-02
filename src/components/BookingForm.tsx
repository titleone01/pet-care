"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  basePrices,
  petSizeOptions,
  petTypeOptions,
  serviceOptions,
  sizeAddons
} from "@/data/site";
import type { PetSize, PetType, ServiceType } from "@/types/site";
import { useReveal } from "@/components/useReveal";

type BookingFormState = {
  petType: PetType;
  petSize: PetSize;
  service: ServiceType;
  date: string;
  name: string;
  phone: string;
  note: string;
};

const defaultFormState: BookingFormState = {
  petType: "dog",
  petSize: "small",
  service: "wash",
  date: "",
  name: "",
  phone: "",
  note: ""
};

function formatDateTimeLocal(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${minutes}`;
}

function formatArrivalTime(value: string) {
  return value.replace("T", " ");
}

function getTomorrowMorningValue() {
  const tomorrowMorning = new Date();
  tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
  tomorrowMorning.setHours(9, 30, 0, 0);

  return formatDateTimeLocal(tomorrowMorning);
}

export function BookingForm() {
  const revealRef = useReveal<HTMLDivElement>();
  const [defaultArrivalTime] = useState(getTomorrowMorningValue);
  const [form, setForm] = useState<BookingFormState>(() => ({
    ...defaultFormState,
    date: defaultArrivalTime
  }));
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimatePrice = useMemo(() => {
    const servicePrice = basePrices[form.service];
    const sizePrice = sizeAddons[form.petSize];
    const catAddon = form.petType === "cat" ? 40 : 0;

    return servicePrice + sizePrice + catAddon;
  }, [form.petSize, form.petType, form.service]);

  function updateField<Field extends keyof BookingFormState>(
    field: Field,
    value: BookingFormState[Field]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const arrivalDate = new Date(form.date);

    if (!name || !phone) {
      setMessage("请留下联系人和电话，方便门店确认档期。");
      return;
    }

    if (Number.isNaN(arrivalDate.getTime())) {
      setMessage("请选择正确的期望到店时间。");
      return;
    }

    setIsSubmitting(true);
    setMessage("正在提交预约...");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          petType: form.petType,
          petSize: form.petSize,
          service: form.service,
          arrivalTime: arrivalDate.toISOString(),
          name,
          phone,
          note: form.note.trim(),
          estimatedPrice: estimatePrice
        })
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setMessage(result?.message ?? "预约提交失败，请稍后再试。");
        return;
      }

      setMessage(
        `已收到预约信息，${name}，门店会优先为你保留 ${formatArrivalTime(form.date)} 的合适档期。`
      );
      setForm({
        ...defaultFormState,
        date: defaultArrivalTime
      });
    } catch {
      setMessage("预约提交失败，请检查网络后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="booking-panel reveal" ref={revealRef}>
      <h3>预约到店</h3>
      <p>提交后门店会在 15 分钟内确认档期。静态演示页不会真实发送信息。</p>
      <form id="bookingForm" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="petType">宠物类型</label>
            <select
              id="petType"
              name="petType"
              value={form.petType}
              onChange={(event) => updateField("petType", event.target.value as PetType)}
            >
              {petTypeOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="petSize">体型</label>
            <select
              id="petSize"
              name="petSize"
              value={form.petSize}
              onChange={(event) => updateField("petSize", event.target.value as PetSize)}
            >
              {petSizeOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="service">服务项目</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={(event) => updateField("service", event.target.value as ServiceType)}
            >
              {serviceOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="date">期望到店时间</label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              min={defaultArrivalTime}
              required
              value={form.date}
              onChange={(event) => updateField("date", event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="name">联系人</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="你的称呼"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">联系电话</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="手机号码"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>
          <div className="field full">
            <label htmlFor="note">宠物情况</label>
            <textarea
              id="note"
              name="note"
              placeholder="例如：泰迪，4kg，怕吹风，有轻微毛结"
              value={form.note}
              onChange={(event) => updateField("note", event.target.value)}
            />
          </div>
        </div>
        <div className="estimate" aria-live="polite">
          <span>当前预估价格</span>
          <strong id="estimatePrice">¥{estimatePrice} 起</strong>
        </div>
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交预约"}
        </button>
        <p className="form-message" id="formMessage" role="status">
          {message}
        </p>
      </form>
    </div>
  );
}
