export function normalize(value='') {
  return String(value).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[’‘']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
export function searchLibrary(index,filters={},language='en') {
  const words=normalize(String(filters.q??'').slice(0,180)).split(/\s+/).filter(Boolean);
  return index.filter(r=>
    (!filters.type||r.type===filters.type)&&
    (!filters.topic||r.topic===filters.topic)&&
    (!filters.jurisdiction||r.jurisdiction===filters.jurisdiction)&&
    (!filters.from||(r.date&&r.date>=filters.from))&&
    (!filters.to||(r.date&&r.date<=filters.to))&&
    words.every(word=>r.searchText.includes(word))
  ).map(r=>({...r,score:(r.language===language?5:0)+words.reduce((s,w)=>s+(normalize(r.title).includes(w)?8:0),0)}))
    .sort((a,b)=>b.score-a.score||(b.date??'').localeCompare(a.date??'')||a.title.localeCompare(b.title));
}
