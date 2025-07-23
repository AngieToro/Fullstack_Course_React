require('dotenv').config()

const PORT = process.env.PORT

const userDB = process.env.MONGO_DB_USER
console.log('User: ', userDB)

const nameDB = process.env.MONGO_DB_NAME
console.log('DB: ', nameDB)

const clusterDB = process.env.MONGO_DB_CLUSTER
console.log('Cluster: ', clusterDB)

const passwordDB = process.env.MONGO_DB_PASSWORD
console.log('Password: ', passwordDB)

const MONGO_DEV_DB_URL = `mongodb+srv://${ userDB }:${ passwordDB }@${ clusterDB }/${ nameDB }?retryWrites=true&w=majority`
const MONGO_TEST_DB_URL = `mongodb+srv://${ userDB }:${ passwordDB }@${ clusterDB }/${ nameDB }?retryWrites=true&w=majority`

const MONGO_DB_URL  = process.env.NODE_ENV === 'test'
  ? MONGO_TEST_DB_URL
  : MONGO_DEV_DB_URL

module.exports = { 
  PORT,
  MONGO_DB_URL
}