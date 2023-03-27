const express = require('express');
const http = require('http');
const os = require('os');
const { Command } = require('commander');

// //////////////////////////////////////////
// Upstream Endpoints
// //////////////////////////////////////////

const program = new Command();
program.option('-h, --host <host>', 'hostname or IP of the mighty server (localhost, 192.168.1.10)');
program.option('-p, --ports <portList>', 'comma separated list of ports or port ranges (5050-5057, or 5050,5051,5052,...,5057)');
program.option('-l, --listen <listen>', 'port to listen on (5000, 80, etc.)');
program.parse(process.argv);

function parsePortList(opts) {
  const portsList = opts.ports;
  const ports = [];

  if (!portsList) {
    const cpus = os.cpus().length;
    for(var i=0;i<cpus;i++) {
      ports.push(5050+i);
    }
    return ports;
  }
  portsList.split(',').forEach(port => {
    if (port.includes('-')) {
      const range = port.split('-');
      const start = parseInt(range[0]);
      const end = parseInt(range[1]);
      for (let i = start; i <= end; i++) {
        ports.push(i);
      }
    } else {
      ports.push(parseInt(port));
    }
  });
  return ports;
}

const upstreamEndpoints = [];
const host = program.opts().host;
const listen = parseInt(program.opts().listen || 5000);
const ports = parsePortList(program.opts());
for (let i = 0; i <= ports.length; i++) {
  const port = ports[i];
  upstreamEndpoints.push({
    url: `http://${host}:${port}`,
    inUse: false,
    agent: new http.Agent({keepAlive: true})
  });
}

// //////////////////////////////////////////
// Express proxy
// //////////////////////////////////////////

const app = express();
const server = http.createServer(app);

app.all('*', (req, res) => {
  let selectedEndpoint = null;
  const checkAvailability = () => {
    for (let i = 0; i < upstreamEndpoints.length; i++) {
      const endpoint = upstreamEndpoints[i];
      if (!endpoint.inUse) {
        endpoint.inUse = true;
        selectedEndpoint = endpoint;
        const proxyUrl = new URL(req.originalUrl, selectedEndpoint.url);
        const proxyReq = http.request(proxyUrl, {
          agent: endpoint.agent
        }, proxyRes => {
          proxyRes.pipe(res);
          proxyRes.on('end', () => {
            selectedEndpoint.inUse = false;
          });
        });
        req.pipe(proxyReq);
        return;
      }
    }
    process.nextTick(checkAvailability);
  };
  checkAvailability();
});

server.listen(listen, '0.0.0.0', () => {
  console.log(`Mighty load-balancer server listening on port ${listen}, forwarding to ports ${ports.join(', ')}`);
});