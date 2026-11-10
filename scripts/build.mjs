import {mkdir,writeFile,copyFile,readdir,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brand,labels,practices} from '../content/site.mjs';
import {records,sources} from '../content/library.mjs';
import * as ui from '../src/templates.mjs';
import {normalize} from '../src/search-core.js';
import {exportWordPress} from './wordpress.mjs';
import {additionalCases} from '../content/additional-cases.mjs';
import {buildSomaliPages} from './somali-pages.mjs';
records.push(...additionalCases);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist'),l='en',u=labels.en,pages=[];
await mkdir(path.join(dist,'assets'),{recursive:true});
async function add(p,title,description,body,extra={}){const url=ui.route(l,p);const target=path.join(dist,url,'index.html');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,ui.layout(l,p,title,description,body,{isArticle:Boolean(extra.record)}));pages.push({language:l,path:p,url,title,description,...extra});}
await add('',u.home,`Legal knowledge, careful research and contact information for ${brand.name}, Lawyer and Legal Consultant.`,ui.home());
await add('about',u.about,'Learn about the platform, its professional values and profile details awaiting confirmation.',ui.about());
await add('practice',u.practice,u.practiceIntro,ui.practiceIndex());
for(const p of practices)await add(`practice/${p.id}`,p.title.en,p.description.en,ui.practicePage(p),{practice:p.id});
for(const type of ['articles','cases','news','research','resources'])await add(type,u[type],u[type+'Intro'],ui.collection(l,type));
for(const r of records)await add(ui.recordPath(r),r.originalTitle??r.title.en,r.description.en,ui.recordPage(r),{record:r.id});
await add('contact',u.contact,u.contactBody,ui.contact());
await add('search',u.searchLabel,u.searchHint,ui.search());
for(const key of ['privacy','disclaimer','standards'])await add(key,u[key],u.disclaimerShort,ui.policy(l,key));
const index=records.map(r=>({id:r.id,language:'en',url:ui.route(l,ui.recordPath(r)),title:r.originalTitle??r.title.en,description:r.description.en,type:r.type,typeLabel:u[r.type],topic:r.topic,topicLabel:ui.topic(r.topic),jurisdiction:r.jurisdiction,country:r.country,caseNumber:r.caseNumber??null,date:r.date??sources[r.sourceIds[0]]?.date??null,searchText:normalize([r.originalTitle,r.originalText,r.title.en,r.description.en,r.country,r.jurisdiction,r.id,r.caseNumber,r.court,ui.topic(r.topic),...r.sections.map(s=>`${s.heading.en} ${s.body.en}`),...r.sourceIds.map(id=>sources[id].title)].filter(Boolean).join(' '))}));
for(const p of practices)index.push({id:p.id,language:l,url:ui.route(l,`practice/${p.id}`),title:p.title.en,description:p.description.en,type:'practice',typeLabel:u.practice,topic:p.id,topicLabel:p.title.en,jurisdiction:'General education',country:'Somalia',date:null,searchText:normalize([p.title.en,p.description.en,...p.topics.en].join(' '))});
await writeFile(path.join(dist,'search-index.json'),JSON.stringify(index));
for(const asset of ['styles.css','premium.css','app.js','search-core.js','desktop-fit.js'])await copyFile(path.join(root,'src',asset),path.join(dist,asset));
for(const asset of await readdir(path.join(root,'src/assets')))await copyFile(path.join(root,'src/assets',asset),path.join(dist,'assets',asset));
await buildSomaliPages(root,dist);
await writeFile(path.join(dist,'index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1280"><meta name="robots" content="index,follow"><title>${brand.name}</title><meta http-equiv="refresh" content="0;url=/en/"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/premium.css"><script src="/desktop-fit.js"></script></head><body><main class="not-found"><h1>${brand.name}</h1><a href="/en/">Home</a></main></body></html>`);
await writeFile(path.join(dist,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1280"><meta name="robots" content="index,follow"><title>Page not found | ${brand.name}</title><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/premium.css"><script src="/desktop-fit.js"></script></head><body><main class="not-found"><div class="eyebrow">404</div><h1>Page not found</h1><p>The address may have changed.</p><a class="button" href="/en/">Home</a></main></body></html>`);
await writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
await rm(path.join(dist,'sitemap.xml'),{force:true});
await mkdir(path.join(dist,'downloads'),{recursive:true});
const fields=['Document title in original language','Country and jurisdiction','Issuing institution / original court name','Case / law number','Source URL','Publication / decision date','Original document language','Version and amendments','Exact supporting article / paragraph','Access date','Legal reviewer / date','Outstanding questions'];
await writeFile(path.join(dist,'downloads/research-checklist-en.txt'),`Legal source checklist\nismaillaw — LOCAL EDITORIAL DRAFT\n\n${fields.map(f=>`[ ] ${f}: __________________________`).join('\n\n')}\n\n${u.disclaimerShort}\n\nOriginal project worksheet. Permission granted to copy and adapt this worksheet.\n`);
await writeFile(path.join(dist,'_headers'),`/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
`);
await writeFile(path.join(dist,'page-manifest.json'),JSON.stringify(pages,null,2));
await exportWordPress(root,pages);
console.log(`Built ${pages.length} English pages, ${index.length} search records and WordPress content drafts.`);
