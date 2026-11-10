import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {somaliArticles} from '../content/somali.mjs';
import {esc,icon} from '../src/templates.mjs';

const rootUrl='/so/maqaalada/';
const note='Fiiro gaar ah: Qoraalkan waa maqaal waxbarasho oo la soo gudbiyey. Qodobbada sharciga, lambarrada qodobbada, tarjumaadda iyo xaaladda sharciga ee hadda jirta waxay u baahan yihiin xaqiijin iyo dib-u-eegis qareen. Ma aha talo sharci oo ku saabsan xaalad gaar ah.';
function cleanBlocks(source,title){
 const blocks=source.replace(/^\\uFEFF/,'').replace(/\\r/g,'').split(/\\n\\s*\\n+/);
 return blocks.map(x=>x.trim()).filter(x=>x && x!==title && !['Published by','mkurtun','on'].includes(x) && !/^(January|February|March|April|May|June|July|August|September|October|November|December) \\d{1,2}, \\d{4}$/.test(x));
}
function renderBlock(block){
 const lines=block.split('\\n').map(x=>x.trim()).filter(Boolean);
 const text=lines.join('\\n');
 const heading=/^(Hordhac:?|KOW:?|Kow:?|LABO:?|Labo:?|SADDEX:?|Saddex:?|AFRAAD:?|Afraad:?|QAYBTA .{0,60}|QEEXIDDA .{0,100}|TIIRARKA .{0,100}|MADAAHIBTA .{0,100}|Xaaladaha .{0,100}|Horgeynta .{0,100}|DHAMAAD|DHAMMAAD|ILAH|GUNAANAD|[A-Z][A-Z0-9 /(),–—-]{3,100})$/.test(text) || (text.length<=110 && /:$/.test(text));
 if(heading) return '<h2>'+esc(text.replace(/:$/,''))+'</h2>';
 return '<p>'+lines.map(esc).join('<br>')+'</p>';
}
function shell(title,description,body){
 return '<!doctype html><html lang="so" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=1280"><title>'+esc(title)+' | ISMAIL HAJI LAW OFFICE</title><meta name="description" content="'+esc(description)+'"><meta name="robots" content="index,follow"><meta name="theme-color" content="#080b10"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/premium.css"><script src="/desktop-fit.js"></script></head><body class="inner-page reading-page somali"><a class="skip" href="#main">U gudub qoraalka</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="/en/">'+icon('scale','brand-mark')+'<span><strong>ISMAIL HAJI LAW</strong><small>LAW OFFICE</small></span></a><nav class="desktop-nav" aria-label="Hagidda bogga"><a href="/en/">Home</a><a href="/en/practice/">Practice Areas</a><a href="/en/articles/">English Articles</a><a href="/en/cases/">Legal Cases</a><a href="/so/maqaalada/">Maqaallo Soomaali ah</a><a href="/en/contact/">Contact</a></nav><a class="button accent header-cta" href="/en/contact/">La xiriir xafiiska</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu ☰</button></div><nav id="mobile-nav" class="mobile-nav" aria-label="Hagidda telefoonka" hidden><a href="/en/">Home</a><a href="/en/practice/">Practice Areas</a><a href="/en/articles/">English Articles</a><a href="/en/cases/">Legal Cases</a><a href="/so/maqaalada/">Maqaallo Soomaali ah</a><a href="/en/contact/">Contact</a></nav></header><main id="main">'+body+'</main><footer class="site-footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="/en/">'+icon('scale','brand-mark')+'<span><strong>ISMAIL HAJI LAW</strong><small>LAW OFFICE</small></span></a><p>Qoraallo sharciyeed iyo aqoon ku saabsan arrimaha Soomaaliya.</p></div><div><h2 class="footer-heading">Xiriirka</h2><ul class="footer-links contact-footer"><li>'+icon('phone')+'<a href="tel:+252615811256">+252 61 5811256</a></li><li>'+icon('mail')+'<a href="mailto:avvismailhaji1@gmail.com">avvismailhaji1@gmail.com</a></li></ul></div><div><h2 class="footer-heading">Qaybaha</h2><ul class="footer-links"><li><a href="/so/maqaalada/">Maqaallo Soomaali ah</a></li><li><a href="/en/articles/">English Articles</a></li><li><a href="/en/cases/">Legal Cases</a></li><li><a href="/en/contact/">Contact</a></li></ul></div></div><div class="footer-bottom"><p>© 2026 ISMAIL HAJI LAW OFFICE. '+esc(note)+'</p><a href="/en/privacy/">Privacy</a></div><div class="footer-notice">Maqaallada waxaa loo soo bandhigayaa waxbarasho; dib-u-eegis sharci ayaa weli loo baahan yahay.</div></div></footer><script type="module" src="/app.js"></script></body></html>';
}
export async function buildSomaliPages(projectRoot,dist){
 const folder=path.join(dist,'so','maqaalada');
 await mkdir(folder,{recursive:true});
 const cards=[];
 for(const article of somaliArticles){
  const raw=await readFile(path.join(projectRoot,'content','somali',article.file),'utf8');
  const body=cleanBlocks(raw,article.title).map(renderBlock).join('\\n');
  const special=article.id==='kiiska-qaylo-ka-timi-waa-hore';
  const caution=special?'Qoraalkan waa sheeko kiis oo la soo gudbiyey. Lambar dacwad, maxkamad iyo xukun rasmi ah oo la xaqiijiyey laguma darin; sidaas darteed looma soo bandhigayo precedent ama go’aan maxkamadeed.':'';
  const rights=article.id==='kiiska-qaylo-ka-timi-waa-hore'?' Sawirka boodhka ah waxaa soo gudbiyey milkiilaha codsiga; oggolaanshaha dib-u-daabacaadda waa in la xaqiijiyaa ka hor sii-daynta dadweynaha.':'';
  const image='<figure class="reading-image"><img src="/assets/'+esc(article.image)+'" alt="'+esc(article.imageAlt)+'" loading="lazy"><figcaption>Sawir tusaale ah. '+(rights?esc(rights):'Sawirku ma aha caddeyn maxkamadeed ama dhacdo dhab ah.')+'</figcaption></figure>';
  const content='<article class="reading-article"><header class="reading-header"><a class="reading-category" href="'+rootUrl+'">Maqaallo Soomaali ah</a><h1>'+esc(article.title)+'</h1><p class="reading-byline">Waxaa qoray: mkurtun · Taariikhda asalka ah: '+esc(article.date)+' · '+esc(article.category)+'</p><p class="reading-deck">'+esc(article.description)+'</p></header>'+image+'<div class="reading-body prose"><p class="reading-status"><strong>Qoraal waxbarasho — dib-u-eegis sharci ayaa loo baahan yahay</strong><br>'+esc(note)+'</p>'+(caution?'<p class="notice">'+esc(caution)+'</p>':'')+body+'<section class="notice"><h2>Xusuusin ku saabsan daabacaadda</h2><p>'+esc(note)+'</p><p>Qoraalka asalka ah waxaa loo keydiyey sidii loo soo gudbiyey. Qoraalka iyo sawirrada waa in la hubiyaa in oggolaansho dib-u-daabacaad loo haysto.</p></section><div class="reading-end"><div class="reading-actions"><a class="text-link" href="'+rootUrl+'">Ku noqo maqaalada Soomaaliga</a><a class="button outline" href="/en/contact/">La xiriir xafiiska</a></div></div></div></article>';
  const page=path.join(folder,article.id,'index.html');
  await mkdir(path.dirname(page),{recursive:true});
  await writeFile(page,shell(article.title,article.description,content));
  cards.push('<article class="card"><a class="card-image" href="'+rootUrl+article.id+'/" tabindex="-1" aria-hidden="true"><img src="/assets/'+esc(article.image)+'" alt="" loading="lazy"></a><div class="card-content"><div class="meta"><span>'+esc(article.category)+'</span><span>'+esc(article.date)+'</span></div><h2><a href="'+rootUrl+article.id+'/">'+esc(article.title)+'</a></h2><p>'+esc(article.description)+'</p><div class="card-bottom"><a class="text-link" href="'+rootUrl+article.id+'/">Akhri maqaalka <span>↗</span></a><span class="tag">Bilaash · Free to read</span></div></div></article>');
 }
 const intro='<section class="page-intro"><div class="wrap"><nav class="breadcrumb" aria-label="Meesha aad joogto"><a href="/en/">Home</a><span>/</span><span aria-current="page">Maqaallo Soomaali ah</span></nav><div class="eyebrow">ISMAIL HAJI LAW OFFICE</div><h1>Maqaallo Soomaali ah</h1><p class="lead">Qoraallo sharciyeed oo Af-Soomaali ah, mid walba bog u gaar ah leh. Dhammaan waa bilaash in la akhriyo.</p></div></section>';
 const indexBody=intro+'<section class="section"><div class="wrap"><p class="notice">Qoraalladan waxaa soo gudbiyey qoraaga lagu xusay bog kasta. Qodobbada sharciga iyo xaaladdooda hadda jirta weli waxay u baahan yihiin dib-u-eegis qareen.</p><div class="cards">'+cards.join('')+'</div><div class="reading-end"><p>Qaybta English-ka: <a href="/en/articles/">Legal articles</a> · <a href="/en/cases/">Free hypothetical case studies</a></p></div></div></section>';
 await writeFile(path.join(folder,'index.html'),shell('Maqaallo Soomaali ah','Qoraallo sharciyeed Af-Soomaali ah oo bilaash loo akhrin karo.',indexBody));
}
