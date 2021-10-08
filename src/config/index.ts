import dotenv from 'dotenv';
dotenv.config();


const venv = {
  PORT: process.env.PORT || 8000,
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'ecommerce',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'ecommerce',
  MONGO_ATLAS_URL: `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
};

export default venv;
