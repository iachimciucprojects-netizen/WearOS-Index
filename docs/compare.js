"use strict";
(() => {
const d = window.WEAROS_COMPARE;
if (!d) return;
const selectors = ["#first","#second","#third"].map(s => document.querySelector(s));
const lsel = document.querySelector("#language");
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
const get = (key, replacements = {}) => Object.entries(replacements).reduce((s,[k,v])=>s.replace("{"+k+"}",v), d.ui[lang][key]);
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
 lsel.value=lang;
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
}
selectors.forEach(c=>{c.replaceChildren();});
setOptions();localize();render();
document.querySelector(".languages").hidden=false;
selectors.forEach(ctrl=>ctrl.addEventListener("change",()=>render(ctrl)));
only.addEventListener("change",()=>render());
lsel.addEventListener("change",()=>{
 if(!Object.hasOwn(d.ui,lsel.value))return;
 lang=lsel.value;
 try{localStorage.setItem("wearos-language",lang);}catch{}
 localize();render();
});
share.hidden=!navigator.clipboard?.writeText||location.protocol==="file:";
share.addEventListener("click",async()=>{
 const url=new URL(location.pathname,location.origin);
 ["first","second","third"].forEach((key,i)=>{if(selectors[i].value)url.searchParams.set(key,selectors[i].value);});
 url.searchParams.set("lang",lang);
 try{await navigator.clipboard.writeText(url.href);status.textContent=get("copied");}
 catch {status.textContent=get("copyFailed");}
});
})();
