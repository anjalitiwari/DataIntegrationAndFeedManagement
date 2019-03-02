#!/bin/bash
npm run test
npm run build
npm start
curl -X POST http://127.0.0.1:4000/insertFeeds
