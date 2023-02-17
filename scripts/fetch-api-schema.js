/* eslint-disable */
require('dotenv-flow').config()
const fs = require('fs')
const axios = require('axios')
const { cwd } = require('process')
const path = require('path')

const API_DOCS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/docs-json`

console.log(`Fetching API schema from ${API_DOCS}`)

async function fetchSchema() {
  const schema = await axios.get(API_DOCS).then(res => res.data)

  const apiDir = `${cwd()}/api`
  fs.mkdirSync(apiDir, { recursive: true })
  fs.writeFileSync(path.join(apiDir, 'api-schema.json'), JSON.stringify(schema))
}

fetchSchema()
