# Mighty Balance

A fast reverse proxy for Mighty cores.  Access your Mighty inference through a single endpoint!

## Installation

`mighty-balance` is meant to be built as a single executable, and deployed without the need for installing node.js and node_modules on the host machine/container.

Once the executable is built, just copy it to the target host machine.

## Building

First, install the dependencies, then build the binary.

```bash
npm install
npm run build
```

This produces the linux-x86 compatible executable `mighty-balance`