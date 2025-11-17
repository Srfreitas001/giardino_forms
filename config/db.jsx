import mysql from 'mysql2/promise'

/* mysql.createConnection();*/

export const db = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'Mvof.204615',
    database: 'giardino_nextjs'

})

try{

    const connection = await db.getConnection();
    console.log('Database connected successfully')
    connection.release()

}catch(err) {

    console.error('Database connection failed', err)
    process.exit(1);
}