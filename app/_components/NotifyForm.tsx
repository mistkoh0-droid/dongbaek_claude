"use client";

import { useState, type FormEvent } from "react";
import { GOODS } from "../_data/campaign";

const STORAGE_KEY = "dongbaek-notify";

/**
 * 알림받기 신청 폼.
 * 교육용 가상 캠페인이라 신청 내용은 서버로 보내지 않고 이 브라우저(localStorage)에만 저장합니다.
 */
export default function NotifyForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const goods = form.getAll("goods").map(String);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("이메일 주소를 다시 확인해 주세요.");
      return;
    }
    if (!form.get("agree")) {
      setError("알림을 받으려면 이메일 수집에 동의해 주세요.");
      return;
    }
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email, goods, at: new Date().toISOString() }),
      );
    } catch {
      /* 저장이 막힌 브라우저여도 신청 완료 화면은 보여 줍니다 */
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-line bg-white p-8 text-center"
      >
        <p className="text-sm font-bold tracking-widest text-pink">
          bLOOM YOUR WAY
        </p>
        <p className="mt-3 text-2xl font-bold">알림 신청이 저장됐어요</p>
        <p className="mt-2 text-sub">
          콜라보 굿즈가 피어나는 날, 가장 먼저 알려드릴게요.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 min-h-12 rounded-full border border-line px-6 font-bold hover:bg-tile"
        >
          신청 내용 바꾸기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-6 rounded-3xl border border-line bg-white p-6 sm:p-8"
    >
      <label className="grid gap-2">
        <span className="font-bold">이메일</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="name@example.com"
          className="min-h-12 rounded-xl border border-line px-4 text-base outline-none focus:border-ink"
        />
      </label>

      <fieldset className="grid gap-3">
        <legend className="mb-3 font-bold">
          관심 있는 굿즈 <span className="font-normal text-sub">(여러 개 골라도 돼요)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {GOODS.map((g) => (
            <label
              key={g.id}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line px-4 has-checked:border-ink has-checked:bg-tile"
            >
              <input
                type="checkbox"
                name="goods"
                value={g.id}
                className="size-4 accent-ink"
              />
              <span className="text-sm font-bold">{g.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-sub">
        <input type="checkbox" name="agree" className="mt-0.5 size-4 accent-ink" />
        출시 알림을 받기 위해 이메일을 남기는 데 동의해요.
      </label>

      {error && (
        <p role="alert" className="text-sm font-bold text-pink">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="min-h-13 rounded-full bg-ink text-lg font-bold text-white hover:bg-ink/85"
      >
        알림받기
      </button>
    </form>
  );
}
