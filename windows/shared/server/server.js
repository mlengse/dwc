import http from 'http'
import httpProxy from 'http-proxy'
import puppeteer from 'puppeteer-core';

const proxy = new httpProxy.createProxyServer();

http
  .createServer()
  .on('upgrade', async(req, socket, head) => {
    const browser = await puppeteer.launch({
      // args: [
      //   '--no-sandbox', 
      //   '--disable-setuid-sandbox', 
      // ],
      headless: false,
      userDataDir: './user',
      // executablePath: '/usr/bin/google-chrome'
      executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    });
    const target = browser.wsEndpoint();
    
    proxy.ws(req, socket, head, { target })
    proxy.on('close', async ()  => await browser.close());
  })
  .listen(3000);
