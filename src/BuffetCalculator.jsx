import { useState } from "react";
import "./BuffetCalculator.css";

const ADULT_PRICE = 299;
const CHILD_PRICE = 89;
const REFILL_PRICE = 29;
const WATER_PRICE = 10;
const SODA_PRICE = 25;

const DISCOUNTS = [
  { value: 0, label: "ไม่มีส่วนลด" },
  { value: 10, label: "ส่วนลด 10%" },
  { value: 15, label: "ส่วนลด 15%" },
  { value: 20, label: "ส่วนลด 20%" },
];

const initialForm = {
  adult: "",
  child: "",
  drink: "refill", // "refill" | "bottle"
  water: "",
  soda: "",
  discount: 0,
};

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ช่องว่าง = 0, ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป
const parseCount = (v) => {
  if (v.trim() === "") return { empty: true, n: 0, ok: true };
  const n = Number(v);
  return { empty: false, n, ok: Number.isInteger(n) && n >= 0 };
};

export default function BuffetCalculator() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const isBottle = form.drink === "bottle";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrinkChange = (e) => {
    const drink = e.target.value;
    // เลือกน้ำรีฟิล -> ล้างและปิดช่องน้ำเปล่า/น้ำอัดลม
    setForm((prev) =>
      drink === "refill" ? { ...prev, drink, water: "", soda: "" } : { ...prev, drink }
    );
  };

  const handleCalculate = () => {
    setError("");
    const adult = parseCount(form.adult);
    const child = parseCount(form.child);

    if (adult.empty && child.empty) {
      setResult(null);
      return setError("กรุณาป้อนจำนวนผู้ใหญ่หรือจำนวนเด็ก");
    }
    if (!adult.ok || !child.ok) {
      setResult(null);
      return setError("จำนวนคนต้องเป็นเลขจำนวนเต็มตั้งแต่ 0 ขึ้นไป");
    }

    let drinkTotal = 0;
    let drinkLabel = "";
    if (isBottle) {
      const water = parseCount(form.water);
      const soda = parseCount(form.soda);
      if (!water.ok || !soda.ok) {
        setResult(null);
        return setError("จำนวนขวดต้องเป็นเลขจำนวนเต็มตั้งแต่ 0 ขึ้นไป");
      }
      drinkTotal = water.n * WATER_PRICE + soda.n * SODA_PRICE;
      drinkLabel = "เครื่องดื่มแบบขวด";
    } else {
      drinkTotal = (adult.n + child.n) * REFILL_PRICE;
      drinkLabel = "น้ำรีฟิล";
    }

    const food = adult.n * ADULT_PRICE + child.n * CHILD_PRICE;
    const discountAmount = (food * Number(form.discount)) / 100; // ลดเฉพาะค่าอาหาร
    const total = food - discountAmount + drinkTotal;

    setResult({ food, discountAmount, drinkTotal, drinkLabel, total });
  };

  const handleReset = () => {
    setForm(initialForm);
    setError("");
    setResult(null);
  };

  return (
    <div className="bc-page">
      <div className="bc-card">
        <h1>Buffet Calculator</h1>
        <p className="bc-sub">คำนวณค่าอาหารบุฟเฟ่ต์</p>

        <label htmlFor="adult">จำนวนผู้ใหญ่ (คนละ {ADULT_PRICE} บาท)</label>
        <input
          id="adult"
          name="adult"
          type="number"
          min="0"
          step="1"
          value={form.adult}
          onChange={handleChange}
        />

        <label htmlFor="child">จำนวนเด็ก (คนละ {CHILD_PRICE} บาท)</label>
        <input
          id="child"
          name="child"
          type="number"
          min="0"
          step="1"
          value={form.child}
          onChange={handleChange}
        />

        <fieldset>
          <legend>เครื่องดื่ม</legend>
          <label className="bc-radio">
            <input
              type="radio"
              name="drink"
              value="refill"
              checked={!isBottle}
              onChange={handleDrinkChange}
            />
            น้ำรีฟิล คนละ {REFILL_PRICE} บาท (ผู้ใหญ่และเด็ก)
          </label>
          <label className="bc-radio">
            <input
              type="radio"
              name="drink"
              value="bottle"
              checked={isBottle}
              onChange={handleDrinkChange}
            />
            เครื่องดื่มแบบขวด
          </label>

          <label htmlFor="water">น้ำเปล่า (ขวดละ {WATER_PRICE} บาท)</label>
          <input
            id="water"
            name="water"
            type="number"
            min="0"
            step="1"
            value={form.water}
            onChange={handleChange}
            disabled={!isBottle}
          />

          <label htmlFor="soda">น้ำอัดลม (ขวดละ {SODA_PRICE} บาท)</label>
          <input
            id="soda"
            name="soda"
            type="number"
            min="0"
            step="1"
            value={form.soda}
            onChange={handleChange}
            disabled={!isBottle}
          />
        </fieldset>

        <label htmlFor="discount">บัตรส่วนลด</label>
        <select id="discount" name="discount" value={form.discount} onChange={handleChange}>
          {DISCOUNTS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <div className="bc-hint">ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม</div>

        <div className="bc-btns">
          <button type="button" className="bc-calc" onClick={handleCalculate}>
            คำนวณ
          </button>
          <button type="button" className="bc-reset" onClick={handleReset}>
            รีเซ็ต
          </button>
        </div>

        <div className="bc-error" role="alert">
          {error}
        </div>

        <div className="bc-sum">
          <div>
            ยอดชำระทั้งหมด: <b>{fmt(result ? result.total : 0)}</b> บาท
          </div>
          {result && (
            <div className="bc-detail">
              ค่าอาหาร {fmt(result.food)} บาท
              <br />
              ส่วนลด {form.discount}% (-{fmt(result.discountAmount)} บาท)
              <br />
              {result.drinkLabel} {fmt(result.drinkTotal)} บาท
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
