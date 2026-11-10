import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {records,sources} from '../content/library.mjs';
import {practices,labels} from '../content/site.mjs';
import {recordPage,layout} from '../src/templates.mjs';
import {searchLibrary,normalize} from '../src/search-core.js';
const root=path.resolve('dist');
const pages=JSON.parse(await readFile(path.join(root,'page-manifest.json')));
const index=JSON.parse(await readFile(path.join(root,'search-index.json')));
test('every English route has a unique title and semantic document without language controls',async()=>{
 const urls=new Set(pages.map(p=>p.url));assert.equal(urls.size,pages.length);
 assert.equal(new Set(pages.map(p=>`${p.language}:${p.title}`)).size,pages.length);
 assert.equal(pages.length,32);
 for(const p of pages){assert.equal(p.language,'en');const html=await readFile(path.join(root,p.url,'index.html'),'utf8');assert.match(html,/<html lang="en"/);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,p.url);assert.ok(html.includes('<meta name="description"'));assert.ok(html.includes('index, follow'));assert.ok(!/hreflang|lang-switch|href="\/so\//.test(html));assert.ok(!/undefined|\[object Object\]/.test(html),p.url);}
});
test('all internal links, fragments, scripts and images resolve',async()=>{
 const files=new Map();for(const p of pages)files.set(p.url,await readFile(path.join(root,p.url,'index.html'),'utf8'));
 for(const [url,html] of files){for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){let href=match[1].replaceAll('&amp;','&');if(href.startsWith('#')){assert.ok(html.includes(`id="${href.slice(1)}"`),`${url}: ${href}`);continue;}if(!href.startsWith('/'))continue;const parsed=new URL(href,'http://localhost');const target=path.join(root,parsed.pathname,parsed.pathname.endsWith('/')?'index.html':'');assert.ok((await stat(target)).isFile(),`${url}: ${href}`);if(parsed.hash){const dest=await readFile(target,'utf8');assert.ok(dest.includes(`id="${parsed.hash.slice(1)}"`));}}}
});
test('all nine Somali legal subjects, English content, source statuses and case metadata exist',()=>{
 assert.equal(practices.length,9);
 for(const r of records){for(const l of ['en']){assert.ok(r.title[l]&&r.description[l]);assert.ok(r.sections.every(s=>s.heading[l]&&s.body[l]));}assert.equal(r.legalReviewStatus,'pending');assert.equal(r.translationReviewStatus,undefined);assert.deepEqual(Object.keys(r.title),['en']);for(const id of r.sourceIds){assert.ok(sources[id]);assert.equal(new URL(sources[id].url).protocol,'https:');}}
 assert.ok(records.every(r=>r.country.startsWith('Somalia')));assert.equal(records.filter(r=>r.kind==='judgment').length,0);
 for(const fictional of records.filter(r=>r.kind==='hypothetical')){assert.equal(fictional.caseNumber,null);assert.equal(fictional.court,null);assert.equal(fictional.date,null);assert.equal(fictional.citation,null);assert.equal(fictional.applicableLaw,null);}assert.equal(records.filter(r=>r.featured).length,3);
});
test('search covers original source terms, case numbers, categories, jurisdictions and dates',()=>{
 assert.equal(searchLibrary(index,{q:'Kenya'}).length,0);assert.ok(searchLibrary(index,{q:'Somali',type:'articles'}).length>0);
 assert.ok(searchLibrary(index,{q:'dastuurka'},'so').length>0);
 const filtered=searchLibrary(index,{type:'news',jurisdiction:'Somalia · Federal',from:'2024-01-01',to:'2024-12-31'});assert.equal(filtered.length,1);assert.ok(filtered.every(r=>r.id==='constitutional-development-2024'));
 assert.equal(searchLibrary(index,{q:'zzzxnonexistentterm'}).length,0);
 assert.equal(searchLibrary(index,{q:'<script>alert(1)</script>'}).length,0);
 assert.equal(normalize('Aadanaha — Caddaaladda'),'aadanaha caddaaladda');
 assert.equal(searchLibrary(index,{topic:'family-law',type:'practice'}).length,1);
 assert.ok(searchLibrary(index,{from:'2020-01-01'}).every(r=>r.date));
});
test('contact links are exact and local form has no backend',async()=>{
 for(const l of ['en']){const html=await readFile(path.join(root,l,'contact/index.html'),'utf8');assert.ok(html.includes('href="tel:+252615811256"'));assert.ok(html.includes('href="mailto:avvismailhaji1@gmail.com"'));assert.ok(html.includes('href="https://wa.me/252615811256"'));assert.ok(html.includes('type="email"'));assert.ok(html.includes('maxlength="1200"'));assert.ok(html.includes('name="consent" required'));assert.ok(html.includes('type="submit" disabled'));}
 const script=await readFile('src/app.js','utf8');assert.ok(!/localStorage|sessionStorage|innerHTML|insertAdjacentHTML/.test(script));assert.equal((script.match(/fetch\(/g)||[]).length,1);
});
test('WordPress handover covers every page and contains only supported content drafts',async()=>{
 const manifest=JSON.parse(await readFile('wordpress/manifest.json'));assert.equal(manifest.length,pages.length);
 for(const p of manifest){assert.equal(p.status,'draft');const html=await readFile(path.join('wordpress',p.blockFile),'utf8');assert.ok(html.includes('<!-- wp:'));assert.ok(!/<script|<style|<form|<input|<iframe|<svg/i.test(html),p.blockFile);assert.ok(!html.includes('http://127.0.0.1'));}
});

test('original case title and text stay unchanged with English interface and escaping',()=>{const original=records.find(r=>r.kind==='hypothetical');const sample={...original,originalTitle:'Cinwaanka asalka ah <test>',originalLanguage:'so',originalText:'Qoraalka asalka ah. <script>not executable</script>'};const html=layout('en','cases/sample','Sample','Test',recordPage(sample),{isArticle:true});assert.match(html,/<html lang="en"/);assert.match(html,/lang="so" dir="auto">Cinwaanka asalka ah &lt;test&gt;/);assert.ok(html.includes('Qoraalka asalka ah. &lt;script&gt;not executable&lt;/script&gt;'));assert.ok(html.includes('Legal issue'));assert.deepEqual(Object.keys(labels),['en']);});

test('public output contains no removed country or foreign-law records and uses the supplied portrait',async()=>{for(const p of pages){const html=await readFile(path.join(root,p.url,'index.html'),'utf8');assert.doesNotMatch(html,/Kenya|international-law|hero-lawyer\.jpg|portrait\.jpg/i,p.url);}const home=await readFile(path.join(root,'en/index.html'),'utf8');assert.match(home,/assets\/profile\.jpg/);assert.equal((await readFile('src/assets/profile.jpg')).equals(await readFile('dist/assets/profile.jpg')),true);});

test('every page keeps desktop viewport without disabling user zoom',async()=>{
 for(const url of [...pages.map(p=>path.join(p.url,'index.html')),'index.html','404.html']){const html=await readFile(path.join(root,url),'utf8');assert.match(html,/name="viewport" content="width=1280"/);assert.match(html,/src="\/desktop-fit.js"/);assert.doesNotMatch(html,/user-scalable=no|maximum-scale=1/);}
 for(const file of ['src/styles.css','src/premium.css'])assert.doesNotMatch(await readFile(file,'utf8'),/@media\s*\(max-width:/);
});
