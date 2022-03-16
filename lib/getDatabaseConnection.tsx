
import { createConnection, getConnectionManager } from "typeorm";
import 'reflect-metadata';
import { Post } from 'src/entity/Post';
import { User } from 'src/entity/User';
import { Comment } from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    database: 'blog_development',
    // database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
    entities: [Post, User, Comment]
  });
}
const promise = (async () => {
  const manager = getConnectionManager()
  const current = manager.has('default') && manager.get('default');
  if (current) { await current.close(); }
  return create();
  // if (!manager.has('default')) {
  //    return create()
  // } else {
  //     const current = manager.get('default');
  //     if (current.isConnected) {
  //         return current
  //     } else {
  //         return await createConnection()
  //     }
  // }

})();
export const getDatabaseConnection = () => {
  return promise
}