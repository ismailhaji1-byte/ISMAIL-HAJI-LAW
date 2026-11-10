import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const origin='http://127.0.0.1:4173';
const pages=JSON.parse(await readFile('dist/page-manifest.json'));
for(const p of pages){const response=await fetch(origin+p.url);assert.equal(response.status,200,p.url);assert.match(response.headers.get('content-type'),/text\/html/);assert.match(response.headers.get('content-security-policy'),/form-action 'none'/);assert.match(await response.text(),/<main id="main">/);}
const missing=await fetch(origin+'/en/not-a-real-page/');assert.equal(missing.status,404);
assert.equal((await fetch(origin+'/so/')).status,404);
for(const old of ['/en/cases/somalia-kenya-maritime-2021/','/en/news/icj-maritime-announcement-2021/','/en/practice/international-law/'])assert.equal((await fetch(origin+old)).status,404);
const rejected=await fetch(origin+'/en/contact/',{method:'POST',body:'synthetic-test-only'});assert.equal(rejected.status,405);
const traversal=await fetch(origin+'/%2e%2e%5cpackage.json');assert.equal(traversal.status,400);
const hidden=await fetch(origin+'/.env');assert.equal(hidden.status,404);
for(const l of ['en'])assert.equal((await fetch(origin+`/downloads/research-checklist-${l}.txt`)).status,200);
for(const file of ['styles.css','app.js','search-core.js','search-index.json','assets/justice.svg','assets/favicon.svg','assets/profile.jpg','assets/consultation.jpg','assets/courthouse.jpg'])assert.equal((await fetch(origin+'/'+file)).status,200);
const sizes={};for(const f of ['en/index.html','styles.css','app.js','search-core.js','search-index.json','assets/profile.jpg','assets/consultation.jpg','assets/courthouse.jpg'])sizes[f]=(await stat('dist/'+f)).size;
console.log(JSON.stringify({pages:pages.length,status:'passed',checks:['HTTP 200 for all pages','404','POST 405','traversal rejection','no .env exposure','downloads','assets','CSP'],bytes:sizes},null,2));
