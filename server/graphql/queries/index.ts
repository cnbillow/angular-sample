import { user, users } from './users.query';
import { GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
    name: 'Query',
    fields: {
        users,
        user,
    }});
