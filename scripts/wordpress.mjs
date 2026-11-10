import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {brand,labels,practices} from '../content/site.mjs';
import {records,sources} from '../content/library.mjs';
import {esc,date,route,recordPath} from '../src/templates.mjs';
const paragraph=html=>`<!-- wp:paragraph -->\n<p>${html}</p>\n<!-- /wp:paragraph -->\n`;
const heading=(html,level=2)=>`<!-- wp:heading${level===2?'':` {"level":${level}}`} -->\n<h${level} class="wp-block-heading">${html}</h${level}>\n<!-- /wp:heading -->\n`;
export async function exportWordPress(root,pages){
 const out=path.join(root,'wordpress');await mkdir(path.join(out,'blocks'),{recursive:true});
 const mapping=pages.map(p=>({...p,kind:p.record?'post':'page',slug:p.record?`${p.language}-${p.record}`:p.path?p.path.split('/').at(-1):p.language,parent:p.record?'':p.path.includes('/')?`/${p.language}/${p.path.split('/').slice(0,-1).join('/')}/`:p.path?`/${p.language}/`:'',wordpressPath:p.record?`/${p.language}-${p.record}/`:p.url,blockFile:`blocks/${p.language}-${p.path.replaceAll('/','--')||'home'}.html`,categories:p.record?[labels[p.language][records.find(r=>r.id===p.record).type]]:[],status:'draft'}));
 const rewrite=html=>{for(const m of mapping)html=html.replaceAll(`href="${m.url}"`,`href="${m.wordpressPath}"`);return html.replaceAll(/<svg\b[\s\S]*?<\/svg>/g,'').replaceAll(/\s(?:class|style|id|aria-[a-z-]+)="[^"]*"/g,'');};
 for(const p of mapping){
  const l=p.language,u=labels[l];let blocks='';
  blocks+=paragraph(`<strong>${u.draft}</strong> — ${esc(u.languageNote)}`);
  if(p.record){
   const r=records.find(r=>r.id===p.record);
   blocks+=paragraph(esc(r.description[l]));
   if(r.originalTitle)blocks+=paragraph(`<strong>Original case title:</strong> <span lang="${esc(r.originalLanguage??'en')}" dir="auto">${esc(r.originalTitle)}</span>`);
   if(r.originalText)blocks+=paragraph(`<span lang="${esc(r.originalLanguage??'en')}" dir="auto">${esc(r.originalText)}</span>`);
   blocks+=paragraph(esc(r.kind==='hypothetical'?u.hypothetical:r.sourceIds.length?u.reviewNote:'Original educational guidance — Unverified — Requires Legal Review.'));
   const fields=[[u.country,r.country],[u.jurisdiction,r.jurisdiction],[u.prepared,date(r.preparedDate,l)],['Record ID',r.id]];
   if(r.type==='cases')fields.push(['Original document language',r.originalLanguage??u.notAvailable],['Citation',r.citation??u.notAvailable],[u.court,r.court??u.notAvailable],[u.caseNumber,r.caseNumber??u.notAvailable],[u.decisionDate,r.date?date(r.date,l):u.notAvailable],[u.issue,r.issue[l]],[u.law,r.applicableLaw??u.notAvailable],[u.principles,r.principles[l]]);
   if(r.type==='news')fields.push([u.sourceDate,date(r.date,l)],[u.archive,u.archive]);
   for(const [k,v] of fields)blocks+=paragraph(`<strong>${esc(k)}:</strong> ${esc(v)}`);
   for(const s of r.sections)blocks+=heading(esc(s.heading[l]))+paragraph(esc(s.body[l]));
   blocks+=heading(u.sources);
   for(const id of r.sourceIds){const s=sources[id];blocks+=paragraph(`<a href="${esc(s.url)}">${esc(s.title)}</a>`)+paragraph(`${esc(s.publisher)} · ${esc(s.country)} · ${esc(s.jurisdiction)}${s.date?' · '+date(s.date,l):''}`)+paragraph(esc(s.note[l]))+paragraph(`${u.updated}: ${date(s.checkedAt,l)}. ${u.sourceStatus}.`);}
   if(!r.sourceIds.length)blocks+=paragraph(esc('Original educational draft. Unverified — Requires Legal Review.'));
   if(r.download)blocks+=paragraph(esc('Editorial setup: upload the original project checklist as an allowed document or recreate it as a page and add a link here.'));
  }else if(p.path==='search'){
   blocks+=paragraph(esc('Search the published library by keyword. Legal-topic categories provide additional browsing routes.'));
   blocks+=`<!-- wp:search {"label":"${u.searchLabel}","placeholder":"${u.searchPlaceholder}","buttonText":"${u.search}","buttonUseIcon":false} /-->\n`;
  }else if(p.path==='contact'){
   blocks+=paragraph(esc(u.contactBody))+paragraph(`<a href="tel:${brand.telephone}">${brand.phone}</a>`)+paragraph(`<a href="mailto:${brand.email}">${brand.email}</a>`)+paragraph(`<a href="${brand.whatsapp}">WhatsApp</a>`)+paragraph(esc(u.noConfidential))+paragraph(esc(u.disclaimerShort));
   blocks+=paragraph(esc('Editorial setup: add the native Form block only after approving its privacy notice, storage and notification settings.'));
  }else{
   const html=await readFile(path.join(root,'dist',p.url,'index.html'),'utf8');
   const body=html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
   for(const match of body.matchAll(/<(h2|h3|p)\b[^>]*>([\s\S]*?)<\/\1>/g)){const content=rewrite(match[2]);blocks+=match[1]==='p'?paragraph(content):heading(content,Number(match[1].slice(1)));}
   if(p.practice){const practice=practices.find(x=>x.id===p.practice);for(const topic of practice.topics[l])blocks+=paragraph(esc(topic));}
   if(p.path===''){blocks=paragraph(esc(u.draft))+heading('Building relationships of trust.')+blocks;}
  }
  blocks+=paragraph(esc(u.disclaimerShort));
  await writeFile(path.join(out,p.blockFile),blocks);
 }
 await writeFile(path.join(out,'manifest.json'),JSON.stringify(mapping,null,2));
 const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
 await writeFile(path.join(out,'migration-map.csv'),'language,local_path,wordpress_type,slug,parent,wordpress_path,title,block_file,status\n'+mapping.map(p=>[p.language,p.url,p.kind,p.slug,p.parent,p.wordpressPath,p.title,p.blockFile,p.status].map(csv).join(',')).join('\n'));
 await writeFile(path.join(out,'README.md'),'# WordPress content drafts\n\nThese native block drafts are content handover files, not an installable theme or a complete-site import. Nothing has been uploaded or tested in a live WordPress editor.\n\nFollow ../docs/WORDPRESS-MIGRATION.md. Open migration-map.csv for target slugs, parent pages, draft status and block filenames. Read every draft before use. Native blocks may need recovery or manual recreation depending on the editor; do not bypass plan upgrade prompts. Replace editorial setup instructions before eventual publication.\n\nAll records require owner and legal review. Preserve original case document language. No credentials or account connection are needed for this local handover.\n');
}
