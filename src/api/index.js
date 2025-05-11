import * as contenful from 'contentful'

const client = contenful.createClient({
  space: '8coia8hhzmkq',
  accessToken: 'PFtIeGwnBtkThlNIzjyTIXRBA2GlaupHLUT6PMGvy9I',
  environment: 'master',
})

export { client }