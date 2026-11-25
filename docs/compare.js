"use strict";
const selectors = ["#first", "#second", "#third"].map(s => document.querySelector(s));
const [first, second, third] = selectors;
const differences = document.querySelector("#differences");
const share = document.querySelector("#share");
const status = document.querySelector("#status");
const rows = [...document.querySelectorAll("#matrix tr")];
const modelIds = [...rows[0].querySelectorAll("[data-model]")].map(c => c.dataset.model);
const q = new URLSearchParams(location.search);
const telegram = window.Telegram?.WebApp;
const launch = telegram?.initDataUnsafe?.start_param || q.get("tgWebAppStartParam") || "";
const qp = launch.split("__");
const inbound = ["first","second","third"].map((n, i) => q.get(n) || qp[i] || "");
const possible = [...new Set(inbound.filter(id => modelIds.includes(id)))];
if (possible.length) {
  first.value = possible[0];
  second.value = possible[1] || modelIds.find(id => id !== first.value);
  third.value = possible[2] || "";
}
function render(changed) {
  const order = [first, second, third].filter(ctrl => ctrl === changed).concat(selectors.filter(ctrl => ctrl !== changed));
  const used = new Set();
  for (const ctrl of order) {
    if (!ctrl.value || used.has(ctrl.value)) {
      ctrl.value = ctrl === third ? "" : modelIds.find(id => !used.has(id));
    }
    if (ctrl.value) used.add(ctrl.value);
  }
  const selected = selectors.map(ctrl => ctrl.value).filter(Boolean);
  for (const ctrl of selectors) for (const opt of ctrl.options) {
    opt.disabled = !!opt.value && opt.value !== ctrl.value && selected.includes(opt.value);
  }
  rows.forEach((row, idx) => {
    const cells = [...row.querySelectorAll("[data-model]")];
    const visible = selected.map(id => cells.find(cell => cell.dataset.model === id));
    visible.forEach(cell => row.append(cell));
    cells.forEach(cell => { cell.hidden = !selected.includes(cell.dataset.model); });
    if (idx === 0) return;
    const values = visible.map(cell => cell.firstChild?.textContent.trim() || "");
    row.hidden = differences.checked && values.every(v => v === values[0]) && !visible.some(c => c.dataset.unknown);
    const numbers = visible.map(c => Number(c.dataset.number));
    const best = row.dataset.rank === "max" && numbers.every(Number.isFinite) ? Math.max(...numbers) : NaN;
    const winner = numbers.filter(n => n === best).length === 1 ? best : NaN;
    cells.forEach(cell => {
      const win = !cell.hidden && Number(cell.dataset.number) === winner;
      cell.classList.toggle("is-win", win);
      const badge = cell.querySelector(".win");
      badge.hidden = !win;
      badge.textContent = win ? row.dataset.win : "";
    });
  });
}
selectors.forEach(ctrl => ctrl.addEventListener("change", () => render(ctrl)));
differences.addEventListener("change", () => render());
share.hidden = !navigator.clipboard?.writeText || location.protocol === "file:";
share.addEventListener("click", async () => {
  const url = new URL(location.pathname, location.origin);
  ["first","second","third"].forEach((key, i) => { if (selectors[i].value) url.searchParams.set(key, selectors[i].value); });
  try { await navigator.clipboard.writeText(url.href); status.textContent = "Comparison link copied."; }
  catch { status.textContent = "Copy is unavailable in this view."; }
});
render();
