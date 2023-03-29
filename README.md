# Mighty Balance

A fast reverse proxy for Mighty cores.  Access your Mighty inference through a single endpoint!

## Installation

`mighty-balance` is meant to be built as a single executable, and deployed without the need for installing node.js and node_modules on the host machine/container.

Once the executable is built, just copy it to the target host machine or container.

## Building

First, install the dependencies, then build the binary.

```bash
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