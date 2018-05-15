import { Usertype } from '../types/user.type';
import UserSchema from '../../models/user-model';
import { GraphQLList, GraphQLString } from 'graphql';

export const user = {
    type: Usertype,
    args: {
        id: {
            type: GraphQLString
        }
    },
    description: 'Get a user by ID',
    resolve: async (root, args) => await UserSchema.findById(args.id),
};

export const users = {
    type: new GraphQLList(Usertype),
    description: 'Get All Users',
    resolve: async () => await UserSchema.find({}),
};
