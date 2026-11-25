"use strict";
(() => {
const d = window.WEAROS_COMPARE;
if (!d) return;
const selectors = ["#first","#second","#third"].map(s => document.querySelector(s));
const langs = Array.from(document.querySelectorAll("[data-lang]"));
const words = {
 en:{intro:"Compare specs, update support and firmware from the original sources.",guide:"Site guide",specs:"Source",choose:"Choose watches",count:"{count} models & variants",slots:["Watch 01","Watch 02","Watch 03"],add:"Add a third watch",search:"Search by model or brand",hint:"e.g. Pixel, Galaxy, TicWatch",close:"Close",remove:"Remove third watch",found:"Results: {n}",empty:"No matches. Try a different model or brand.",diff:"Differences only",share:"Copy link",swipe:"Swipe the table to see more."},
 ru:{intro:"Сравни характеристики, поддержку обновлений и прошивки по первоисточникам.",guide:"Инструкция",specs:"Источник",choose:"Выбор часов",count:"Моделей и вариантов: {count}",slots:["Часы 01","Часы 02","Часы 03"],add:"Добавить третьи часы",search:"Поиск по модели или бренду",hint:"Например, Pixel, Galaxy, TicWatch",close:"Закрыть",remove:"Убрать третьи часы",found:"Найдено: {n}",empty:"Ничего не найдено. Попробуй другое название.",diff:"Только различия",share:"Скопировать ссылку",swipe:"Листай таблицу вбок, чтобы увидеть все данные."},
 ro:{intro:"Compară specificațiile, actualizările și firmware-ul din sursele originale.",guide:"Ghid",specs:"Sursă",choose:"Alege ceasurile",count:"Modele și variante: {count}",slots:["Ceasul 01","Ceasul 02","Ceasul 03"],add:"Adaugă al treilea ceas",search:"Caută după model sau marcă",hint:"De ex. Pixel, Galaxy, TicWatch",close:"Închide",remove:"Elimină al treilea ceas",found:"Rezultate: {n}",empty:"Niciun rezultat. Încearcă alt model sau altă marcă.",diff:"Doar diferențele",share:"Copiază linkul",swipe:"Glisează tabelul pentru a vedea toate datele."}
};
const dialog = document.querySelector("#watch-picker");
const pickers = document.querySelector("#pickers");
const search = document.querySelector("#watch-search");
const results = document.querySelector("#watch-results");
const count = document.querySelector("#watch-count");
const enhanced = !!dialog?.showModal;
let slot = 0;
const only = document.querySelector("#differences");
const share = document.querySelector("#share");
const status = document.querySelector("#status");
const matrix = document.querySelector("#matrix");
const q = new URLSearchParams(location.search);
const langId = s => String(s || "").toLowerCase().split(/[-_]/)[0];
let saved;
try { saved = localStorage.getItem("wearos-language"); } catch {}
let lang = [q.get("lang"), saved, navigator.language].map(langId).find(x => Object.hasOwn(d.ui,x)) || "en";
const byId = new Map(d.models.map(m => [m.id,m]));
const groups = new Map();
for (const m of d.models) { if (!groups.has(m.brand)) groups.set(m.brand,[]); groups.get(m.brand).push(m); }
const get = (key, replacements = {}) => Object.entries(replacements).reduce((s,[k,v])=>s.replace("{"+k+"}",v), words[lang][key] ?? d.ui[lang][key]);
const el = (tag, text) => {const o=document.createElement(tag); if(text!==undefined)o.textContent=text; return o;};
const a = (text, url, cls) => {const o=el("a",text);o.href=url;if(cls)o.className=cls;return o;};
const inbound = ["first","second","third"].map(key=>q.get(key)||"");
const valid = [...new Set(inbound.filter(id=>byId.has(id)))];
const initial = [valid[0]||"pixel-watch-5",valid[1]||["galaxy-watch9","oppo-watch-x3"].find(id=>id!==valid[0]),valid[2]||""];
function setOptions() {
 selectors.forEach((ctrl,i)=>{
   if (i===2) {const o=el("option",get("none"));o.value="";ctrl.append(o);}
   groups.forEach((list,label)=>{
     const g=el("optgroup");g.label=label;
     for(const m of list){const o=el("option",m.name);o.value=m.id;g.append(o);}
     ctrl.append(g);
   });
   ctrl.value=initial[i];
 });
}
function format(v, i) {
 if(v===null) return get("unknown");
 if(typeof v==="number"){
   const unit=i===5?(lang==="ru"?"мА·ч":"mAh"):(lang==="ru"?"ГБ":"GB");
   return new Intl.NumberFormat(lang).format(v)+" "+unit;
 }
 if(v.startsWith("support:")) return get("supported",{year:v.split(":")[1]});
 if(v==="google-images") return get("images");
 return lang==="en"?v:(d.vals[v]?.[lang==="ru"?0:1]||v);
}
function localize(){
 document.documentElement.lang=lang;
 document.title=get("title")+" | WearOS Index";
 document.querySelectorAll("[data-msg]").forEach(n=>n.textContent=get(n.dataset.msg,{count:d.models.length,criteria:d.criteria.en.length}));
 document.querySelector(".tablebox").setAttribute("aria-label",get("table"));
 document.querySelector(".languages").setAttribute("aria-label",get("lang"));
 langs.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lang===lang)));
 document.querySelectorAll("[data-extra]").forEach(n=>n.textContent=words[lang][n.dataset.extra]);
 document.querySelector("#guide-link").href="guide/"+lang+"/";
 selectors[2].options[0].textContent=get("none");
 status.textContent="";
}
function render(changed) {
 const order=changed?[changed,...selectors.filter(c=>c!==changed)]:selectors;
 const used=new Set();
 order.forEach(ctrl=>{
  if(!byId.has(ctrl.value)||used.has(ctrl.value))ctrl.value=ctrl===selectors[2]?"":d.models.find(m=>!used.has(m.id)).id;
  if(ctrl.value)used.add(ctrl.value);
 });
 const chosen=selectors.map(ctrl=>byId.get(ctrl.value)).filter(Boolean);
 selectors.forEach(ctrl=>Array.from(ctrl.options).forEach(o=>o.disabled=!!o.value&&o.value!==ctrl.value&&used.has(o.value)));
 const cap=el("caption",get("caption"));cap.dataset.msg="caption";
 const top=el("thead"), tr=el("tr"), title=el("th",get("criterion"));title.scope="col";tr.append(title);
 for(const m of chosen){
  const th=el("th");th.scope="col";th.dataset.model=m.id;
  th.append(m.page?a(m.name,m.page):el("span",m.name));
  if(m.variant)th.append(el("small",m.variant[["en","ru","ro"].indexOf(lang)]));
  const c=el("small",get("coverage",{n:m.values.filter(v=>v!==null).length,total:d.criteria.en.length}));c.className="criteria-coverage";th.append(c,a(get("specs"),m.source,"source"));tr.append(th);
 }
 top.append(tr);
 const body=el("tbody");
 d.criteria[lang].forEach((caption,i)=>{
  const values=chosen.map(m=>m.values[i]);
  if(only.checked&&values.every(v=>v!==null&&v===values[0]))return;
  const row=el("tr"), th=el("th",caption);th.scope="row";row.append(th);
  const best=(i===5||i===9)&&values.every(Number.isFinite)?Math.max(...values):NaN;
  const unique=values.filter(v=>v===best).length===1;
  values.forEach((v,j)=>{
   const td=el("td",format(v,i));td.dataset.model=chosen[j].id;
   if(v===null)td.dataset.unknown="true";
   if(unique&&v===best){td.className="is-win";const badge=el("span",get(i===5?"largest":"storage"));badge.className="win";td.append(badge);}
   row.append(td);
  });
  body.append(row);
 });
 matrix.replaceChildren(cap,top,body);
 updatePickers();
}
function updatePickers(){
 if(!enhanced)return;
 selectors.forEach((ctrl,i)=>{
  const model=byId.get(ctrl.value);
  const button=pickers.children[i];
  button.classList.toggle("empty",!model);
  button.replaceChildren(Object.assign(el("span",words[lang].slots[i]),{className:"watch-slot"}),el("strong",model?.name||words[lang].add));
 });
}
function normalize(value){return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu,"").replace(/[^\p{L}\p{N}]+/gu,"");}
function showResults(){
 const other=new Set(selectors.filter((_,i)=>i!==slot).map(ctrl=>ctrl.value));
 const terms=search.value.trim().split(/\s+/).map(normalize).filter(Boolean);
 const matching=d.models.filter(m=>!other.has(m.id)&&terms.every(term=>normalize(m.name+" "+m.brand).includes(term)));
 const options=matching.map(m=>{
  const button=el("button");button.type="button";button.className="watch-option";button.dataset.value=m.id;
  if(m.id===selectors[slot].value)button.setAttribute("aria-current","true");
  button.append(el("span",m.name),el("small",m.variant?.[["en","ru","ro"].indexOf(lang)]||m.brand));return button;
 });
 if(slot===2&&selectors[slot].value&&!terms.length){
  const remove=el("button",words[lang].remove);remove.type="button";remove.className="watch-option";remove.dataset.value="";
  options.unshift(remove);
 }
 results.replaceChildren(...options);
 count.textContent=matching.length?words[lang].found.replace("{n}",matching.length):words[lang].empty;
}
if(enhanced){
 selectors.forEach((_,i)=>{
  const button=el("button");button.type="button";button.className="pick-model";button.setAttribute("aria-haspopup","dialog");
  button.addEventListener("click",()=>{
   slot=i; search.value=""; search.placeholder=words[lang].hint;
   document.querySelector("#picker-title").textContent=words[lang].slots[i];
   showResults();dialog.showModal();dialog.scrollTop=0;search.focus();
  });
  pickers.append(button);
 });
 search.addEventListener("input",showResults);
 search.addEventListener("keydown",event=>{
  if(event.key==="ArrowDown"||(event.key==="Enter"&&results.children.length===1)){
   const first=results.querySelector("button");
   if(!first)return;
   event.preventDefault(); if(event.key==="Enter")first.click();else first.focus();
  }
 });
 results.addEventListener("click",event=>{
  const button=event.target.closest("button[data-value]");
  if(!button)return;
  selectors[slot].value=button.dataset.value;
  render(selectors[slot]);dialog.close();
 });
 document.querySelector("#picker-close").addEventListener("click",()=>dialog.close());
 dialog.addEventListener("close",()=>pickers.children[slot].focus());
 document.querySelector("#native-chooser").hidden=true;pickers.hidden=false;
}
selectors.forEach(c=>{c.replaceChildren();});
setOptions();localize();render();
document.querySelector(".languages").hidden=false;
selectors.forEach(ctrl=>ctrl.addEventListener("change",()=>render(ctrl)));
only.addEventListener("change",()=>render());
langs.forEach(button=>button.addEventListener("click",()=>{
 lang=button.dataset.lang;
 try{localStorage.setItem("wearos-language",lang);}catch{}
 if(location.protocol!=="file:"){
  const url=new URL(location.href);
  url.searchParams.set("lang",lang);
  history.replaceState(null,"",url);
 }
 localize();render();
}));
share.hidden=!navigator.clipboard?.writeText||location.protocol==="file:";
share.addEventListener("click",async()=>{
 const url=new URL(location.pathname,location.origin);
 ["first","second","third"].forEach((key,i)=>{if(selectors[i].value)url.searchParams.set(key,selectors[i].value);});
 url.searchParams.set("lang",lang);
 try{await navigator.clipboard.writeText(url.href);status.textContent=get("copied");}
 catch {status.textContent=get("copyFailed");}
});
})();
