import {searchLibrary} from './search-core.js';
// Navigate explicitly: the preview CSP intentionally blocks all form submissions.
document.querySelector('.quick-search')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const target=new URL(form.action,location.origin);target.searchParams.set('q',form.elements.namedItem('q').value.slice(0,180));location.assign(target.pathname+target.search);});
const menu=document.querySelector('.menu-toggle');
const mobile=document.querySelector('#mobile-nav');
function closeMenu(){if(!menu)return;menu.setAttribute('aria-expanded','false');menu.textContent=`${menu.dataset.openLabel} ☰`;mobile.hidden=true;}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?menu.dataset.closeLabel:`${menu.dataset.openLabel} ☰`;mobile.hidden=!open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}document.querySelectorAll('.nav-drop[open]').forEach(d=>{d.open=false;d.querySelector('summary').focus();});}});
document.addEventListener('click',e=>document.querySelectorAll('.nav-drop[open]').forEach(d=>{if(!d.contains(e.target))d.open=false;}));
matchMedia('(min-width: 1051px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());

const contact=document.querySelector('#contact-form');
if(contact){
 const submit=document.querySelector('#contact-submit');
 const status=document.querySelector('#form-status');
 contact.addEventListener('submit',e=>{e.preventDefault();for(const field of contact.querySelectorAll('input:not([type=checkbox]),textarea')){field.value=field.value.trim();field.setCustomValidity('');if(field.minLength>0&&field.value.length<field.minLength)field.setCustomValidity(`Enter at least ${field.minLength} characters.`);}if(!contact.reportValidity())return;status.textContent=status.dataset.success;contact.reset();});
 contact.addEventListener('input',e=>{status.textContent='';e.target.setCustomValidity?.('');});
 submit.disabled=false;
}

const form=document.querySelector('#library-search');
if(form){
 const box=document.querySelector('#search-results');
 const count=document.querySelector('#result-count');
 const language=document.documentElement.lang;
 const keys=['q','type','jurisdiction','topic','from','to'];
 const fields=Object.fromEntries(keys.map(k=>[k,form.elements.namedItem(k)]));
 let index;
 function readUrl(){const params=new URLSearchParams(location.search);keys.forEach(k=>fields[k].value=(params.get(k)??'').slice(0,k==='q'?180:100));}
 function elem(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
 function render(){
  if(!index)return;
  const filters=Object.fromEntries(keys.map(k=>[k,fields[k].value]));
  const matches=searchLibrary(index,filters,language);box.replaceChildren();count.textContent=`${matches.length} ${matches.length===1?'result':box.dataset.count}`;
  if(!matches.length){const empty=elem('div','empty-state');empty.append(elem('h2','',box.dataset.empty),elem('p','',box.dataset.emptyHelp));box.append(empty);return;}
  for(const r of matches){
   if(!/^\/en\/[a-z0-9/-]+\/$/.test(r.url))continue;
   const article=elem('article','search-result');article.lang=r.language;
   const meta=elem('div','meta',`${r.typeLabel} · ${r.topicLabel} · English`);
   const h=elem('h2');const a=elem('a','',r.title);a.href=r.url;h.append(a);
   article.append(meta,h,elem('p','',r.description));
   article.append(elem('p','result-context',`${r.jurisdiction}${r.caseNumber?` · ${r.caseNumber}`:''}${r.date?` · ${r.date}`:''}`));box.append(article);
  }
 }
 function apply(e){e?.preventDefault();if(fields.from.value&&fields.to.value&&fields.from.value>fields.to.value){fields.to.setCustomValidity('End date must be on or after the start date.');fields.to.reportValidity();return;}fields.to.setCustomValidity('');const params=new URLSearchParams();keys.forEach(k=>{if(fields[k].value)params.set(k,fields[k].value);});history.replaceState(null,'',`${location.pathname}${params.size?'?'+params:''}`);render();}
 form.addEventListener('submit',apply);
 form.addEventListener('change',e=>{fields.to.setCustomValidity('');if(e.target.name!=='q')apply();});
 form.addEventListener('reset',()=>{setTimeout(()=>{fields.to.setCustomValidity('');apply();fields.q.focus();},0);});
 window.addEventListener('popstate',()=>{readUrl();render();});
 readUrl();
 try{const response=await fetch('/search-index.json',{credentials:'omit',cache:'no-cache'});if(!response.ok)throw new Error('Search index unavailable');index=await response.json();render();}catch{count.textContent='';box.append(elem('p','notice',box.dataset.error));}

}
