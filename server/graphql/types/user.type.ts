import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';

export const Usertype = new GraphQLObjectType({
    name: 'User',
    description: 'User for our system',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        active: {
            type: GraphQLBoolean
        },
        role: {
            type: GraphQLString
        },
        mail: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    })
});
