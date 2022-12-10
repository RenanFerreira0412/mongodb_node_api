const DB_USER = 'mongo';
const DB_PASSWORD = encodeURIComponent('mongo');
const BD_NAME = 'db_cs_ts_orm_api_2022_renan_igor';

export const DB = {
    uri: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.noxqfqq.mongodb.net/${BD_NAME}?retryWrites=true&w=majority`
};