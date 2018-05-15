import { Usertype } from '../types/user.type';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserSchema from '../../models/user-model';

export const createUser = {
    type: Usertype,
    args: {
        name: new GraphQLNonNull(GraphQLString),
    },
    resolve: async (root) => {
        root.joinDate = new Date().toString();
        return UserSchema.create(root);
    }
};
