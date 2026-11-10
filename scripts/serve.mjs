import http from 'node:http';
import {readFile,stat,realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT??4173);
const mime={'.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Method not allowed');}
  const url=new URL(req.url,'http://127.0.0.1');
  const decoded=decodeURIComponent(url.pathname);
  if(decoded.includes('\0')||decoded.includes('\\')){res.writeHead(400);return res.end('Invalid path');}
  let file=path.resolve(root,`.${decoded}`);
  const within=p=>p===root||p.startsWith(root+path.sep);
  if(!within(file)){res.writeHead(403);return res.end('Forbidden');}
  let code=200;
  try{const info=await stat(file);if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});return res.end();}file=path.join(file,'index.html');}if(!within(await realpath(file))){res.writeHead(403);return res.end('Forbidden');}}
  catch{file=path.join(root,'404.html');code=404;}
  const body=await readFile(file);
  let csp="default-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'";
  if(file.endsWith('.html')){for(const match of body.toString().matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){csp+=` 'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`;}}
  csp+="; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
  res.writeHead(code,{'Content-Type':mime[path.extname(file)]??'application/octet-stream','Content-Length':body.byteLength,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':csp,'Permissions-Policy':'camera=(), microphone=(), geolocation=()','X-Robots-Tag':'index, follow'});
  res.end(req.method==='HEAD'?undefined:body);
 }catch(e){res.writeHead(e instanceof URIError?400:500,{'Content-Type':'text/plain; charset=utf-8'});res.end(e instanceof URIError?'Invalid URL':'Preview could not load this page. Run the build and try again.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/en/\nLoopback only. No contact submissions, analytics or external services.`));
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is already in use. Reuse the running preview or set PORT.`:e.message);process.exitCode=1;});
