module.exports = {
  ironfish: {
    input: {
      target: './api/api-schema.json',
    },
    output: {
      mode: 'tags',
      target: './api/ironfish.ts',
      client: 'react-query',
      mock: false,
      override: {
        operationName: operation => {
          return operation.operationId
            .split('Controller_')
            .map((word, i) => {
              const modifier = i === 0 ? 'toLowerCase' : 'toUpperCase'
              return `${word[0][modifier]()}${word.slice(1)}`
            })
            .join('')
        },
      },
    },
  },
}
