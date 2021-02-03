
export const databaseHost = process.env.DATABASE_HOST
export const databaseName = process.env.DATABASE_NAME
export const databaseUser = process.env.DATABASE_USER
export const databasePassword = process.env.DATABASE_PASSWORD
export const databasePort = process.env.DATABASE_PORT && parseInt(process.env.DATABASE_PORT) || 3306

export const applicationPort = process.env.PORT && parseInt(process.env.PORT) || 3030

export const appSecretKey = 'jkaiosdkioapskdoaskdoaks'

// AWS Config
export const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
export const awsBucketName = process.env.AWS_BUCKET_NAME || ''

export const appEnviromentStage: 'dev' | 'prod' = (process.env.APP_ENVIROMENT_STAGE || 'dev') as any

