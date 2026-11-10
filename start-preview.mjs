import {spawn} from 'node:child_process';
import {access, mkdir, open} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const url = 'http://127.0.0.1:4173/en/';
async function ready() {
  try {
    const response = await fetch(url, {signal: AbortSignal.timeout(1000)});
    return response.ok && (await response.text()).includes('ismaillaw');
  } catch { return false; }
}

if (await ready()) {
  console.log(`Website is already running: ${url}`);
} else {
  await access(path.join(root, 'dist/en/index.html'));
  await mkdir(path.join(root, 'artifacts'), {recursive: true});
  const output = await open(path.join(root, 'artifacts/preview-server.log'), 'a');
  const errors = await open(path.join(root, 'artifacts/preview-server-error.log'), 'a');
  const child = spawn(process.execPath, [path.join(root, 'scripts/serve.mjs')], {
    cwd: root,
    env: {...process.env, PORT: '4173'},
    detached: true,
    windowsHide: true,
    stdio: ['ignore', output.fd, errors.fd],
  });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  child.unref();
  await output.close();
  await errors.close();
  let started = false;
  for (let attempt = 0; attempt < 20; attempt++) {
    if (await ready()) { started = true; break; }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (started) console.log(`Website is ready: ${url}\nLocal preview only. You can close this launcher window.`);
  else {
    console.error('Preview could not start. Check artifacts/preview-server-error.log and whether port 4173 is occupied.');
    process.exitCode = 1;
  }
}
