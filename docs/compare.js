"use strict";
const first = document.querySelector("#first");
const second = document.querySelector("#second");
const share = document.querySelector("#share");
const status = document.querySelector("#status");
const cards = [...document.querySelectorAll("[data-id]")];
const modelIds = new Set(cards.map(card => card.dataset.id));
const query = new URLSearchParams(location.search);
const telegram = window.Telegram?.WebApp;
const launch = telegram?.initDataUnsafe?.start_param || query.get("tgWebAppStartParam") || "";
const pair = launch.split("__");
function choose(ctrl, value) { if (modelIds.has(value)) ctrl.value = value; }
choose(first, query.get("first") || pair[0]);
choose(second, query.get("second") || pair[1]);
function render(changed) {
  if (first.value === second.value) {
    const other = changed === second ? first : second;
    other.value = [...modelIds].find(id => id !== changed?.value && id !== first.value);
  }
  cards.forEach(card => { card.hidden = ![first.value, second.value].includes(card.dataset.id); });
}
first.addEventListener("change", () => render(first));
second.addEventListener("change", () => render(second));
share.hidden = !navigator.clipboard?.writeText;
share.addEventListener("click", async () => {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set("first", first.value);
  url.searchParams.set("second", second.value);
  try { await navigator.clipboard.writeText(url.href); status.textContent = "Comparison link copied."; }
  catch { status.textContent = "Copy is unavailable. Open this page in your browser."; }
});
render();
