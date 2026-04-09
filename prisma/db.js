const {PrismaMariaDb}=require('@prisma/adapter-mariadb');
const {PrismaClient}= require('../generated/prisma/client');
const adapter= new PrismaMariaDb({
    host:'localhost',
    user: 'root',
    password:'',
    database:"sms_db",
    connectionLimit:5,
})
const db= new PrismaClient({adapter});
module.exports=db;