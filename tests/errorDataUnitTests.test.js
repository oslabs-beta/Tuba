const path = require('path')
const fs = require('fs')
const db = require('../server/models/tubaDB')

afterAll(async () => {
  await db.end();
  await server.close();
})

// allData tests

// allServices tests

// allErrors tests

// newErrors tests

// allConnections tests