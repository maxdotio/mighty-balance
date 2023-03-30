# Mighty Balance

A fast reverse proxy for Mighty cores.  Access your Mighty inference through a single endpoint!

## Deploy

Pre-requisites: an Ubuntu server already running Mighty Inference Server.

To deploy `mighty-balance` on your mighty server, run the following commands:

```
curl -O https://max.io/mighty-balance-linux.tar.gz
tar -zxf mighty-balance-linux.tar.gz
cd mighty-balance
./install.sh
```

This will create and start the systemd service for the `mighty-balance` application that will route requests to all mighty cores.

Be default, this will create the reverse proxy that listens on port 80, and forwards to mighty servers on the same machine as `mighty-balance`.

To verify the installation, make a curl request to the port for mighty's metadata:

```bash
curl http://localhost/metadata
```

This should return a JSON object for the currently hosted model.

### Changing the default listening port

To change the listening port, edit the `mighty-balance.service` file, to change the port in the ExecStart command.  For example:

```
ExecStart=/home/ubuntu/mighty-balance/mighty-balance --listen 5000
```

Then save the file and run the following:

```
sudo systemctl stop mighty-balance
./install.sh
```

## Manual Installation

`mighty-balance` is meant to be built as a single executable, and deployed without the need for installing node.js and node_modules on the host machine/container.

Once the executable is built, just copy it to the target host machine or container, and run it however you like.

## Building

Prerequisites: The `pgk` tool https://www.npmjs.com/package/pkg

```bash
npm install -g pkg
```

With `pkg` installed, you can clone the repo and install the dependencies, then build the binary.

```bash
git clone https://github.com/maxdotio/mighty-balance
cd src
npm install
npm run build
```

This produces the linux-x86 compatible executable `mighty-balance`, which you can copy elsewhere and run independently without any dependencies.

## Releasing

When you are happy with the executable, you can make a release, specifying the semver (for example 0.9.9):

```bash
./release_linux.sh <semver>
```

# License

Copyright 2023, Max Irwin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.