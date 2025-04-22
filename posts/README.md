# nildb-browser-demos/posts
Small browser-based bulletin board that leverages public-key cryptography (for encryption and signing) and nilDB (for storage and communication). A working demo is [available online](https://nillion.pub/nildb-browser-demos/posts).

## Build Instructions

A live version (consisting of a single static webpage) can be built using the steps below.
```
npm install
esbuild index.js --bundle --outfile=bundle.js
```
