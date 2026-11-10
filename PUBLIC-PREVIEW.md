# ismaillaw temporary public preview

Requested and activated on 5 November 2026 using Cloudflare Quick Tunnel.

Current link: https://margin-was-cartridges-intervention.trycloudflare.com/en/

Anyone with this URL can view the website without signing in, including phones on mobile data or another Wi-Fi network. The computer must remain awake and connected to the Internet, with both the local preview server and cloudflared running. This is a temporary testing link, not permanent hosting. Restarting the tunnel generates a different hostname. No WordPress or Cloudflare account was created and no paid service was activated.

Only the existing read-only HTTP preview on 127.0.0.1:4173 is forwarded. Its document root is dist; source files, tools, artifacts and credentials are not served. The form remains a local validation demonstration. Cloudflare relays the public requests; no analytics code has been added to the website. Robots noindex headers and robots.txt remain in place, but they are not access controls.

To stop public access, run from the project directory:

```powershell
.\scripts\stop-public-preview.ps1
```

The script checks the process executable and creation time before stopping it. It leaves the local website running. Shutting down this computer also ends the preview. The process record and current URL are in artifacts/public-preview-process.json; logs are in artifacts/public-preview-error.log. No Windows service or automatic startup task was installed.

Portable cloudflared 2026.10.7 was downloaded from Cloudflare's official GitHub release and its SHA-256 was matched against the release digest before execution. The binary is kept in tools and is excluded from Git. Do not publish that tools directory.

Official reference: https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/
