
import { createConnection } from 'typeorm';
import { Users } from './models/user';
import { Comments } from './models/comment';
import { Posts } from './models/post';
createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'blog_database',
    entities: [
        Users,
        Comments,
        Posts
    ],
    synchronize: true,
    logging: true,
})
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(error => console.log('Connection error', error));
