const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat
  } = require('graphql');

  const connections = require('../models/connection');
  const connectionTypes = require('../models/connectionType');
  const currentTypes = require('../models/currentType');
  const levels = require('../models/level');
  const stations = require('../models/station');
  // Models in --

  const gql_geoJSON = new GraphQLObjectType({
    name: "geoJSON",
    description: "Location type",
    fields: () => ({
        type: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) }
    })
});

  const station = new GraphQLObjectType({
    name: 'Station',
    description: 'Station',
    fields: () => ({
      id: {type: GraphQLID},
      Title: {type: GraphQLString},
      AddressLine1: {type: GraphQLString},
      Town: {type: GraphQLString},
      StateOrProvince: {type: GraphQLString},
      Postcode: {type: GraphQLString},
      Location: {type: gql_geoJSON},
      Connetions: {
          type: new GraphQLList(connection),
          //type: connection,
          resolve: async (parent, args) => {
              try {
                return await connections.find({'_id': { $in: parent.Connections}});
              }
              catch (e) {
                return new Error(e.message)
              }
          }},    
    }),
  });
  

  const connection = new GraphQLObjectType({
    name: 'Connections',
    description: 'ConnectionIDs',
    fields: () => ({
      id: {type: GraphQLID},
      Quantity: {type: GraphQLInt},
      ConnectionTypeID: {
          type: connectionType,
          resolve: async (parent, args) => {
              try {
                return await connectionTypes.findById(parent.ConnectionTypeID);
              }
              catch(e) {
                return new Error(e.message);
              }
          }
        },
      LevelID: {
        type: level,
        resolve: async (parent, args) => {
            try {
                return await levels.findById(parent.LevelID)
            }
            catch(e) {
                return new Error(e.message);
            }
        }
      },
      CurrentTypeID: {
        type: currentType,
        resolve: async (parent, args) => {
          try {
            return await currentTypes.findById(parent.CurrentTypeID);
          }
          catch (e) {
            return new Error(e.message);
          }
        },
      },
    }),
  });

  const connectionType = new GraphQLObjectType({
    name: 'ConnectionTypeID',
    description: 'ConnectionTypes',
    fields: () => ({
      id: {type: GraphQLID},
      FormalName: {type: GraphQLString},
      Title: {type: GraphQLString},
    }),
  });

  const level = new GraphQLObjectType({
    name: 'LevelID',
    description: 'Levels',
    fields: () => ({
      id: {type: GraphQLID},
      Comments: {type: GraphQLString},
      IsFastChargeCapable: {type: GraphQLBoolean},
      Title: {type: GraphQLString},
    }),
  });

  const currentType = new GraphQLObjectType({
    name: 'CurrentTypeID',
    description: 'CurrentTypes',
    fields: () => ({
      id: {type: GraphQLID},
      Description: {type: GraphQLString},
      Title: {type: GraphQLString},
    }),
  });


  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      stations: {
        type: new GraphQLNonNull(new GraphQLList(station)),
        description: 'Get all stations',
        args: {
            limit: {type: GraphQLInt}
        },
        resolve: async (parent, args) => {
          try {
            return await stations.find().limit(args.limit ? +args.limit : 10);
            console.log(t)
          }
          catch (e) {
            return new Error(e.message);
          }
        },
      },
      station: {
          type: station,
          description: "Get singular station by id",
          args: {
              id: {type: new GraphQLNonNull(GraphQLID)}
          },
          resolve: async (parent, args) => {
              try {
                  return await stations.findById(args.id);
              }
              catch(e) {
                  return new Error(e.message);
              }
          }
      },
      connectionTypes: {
        type: new GraphQLNonNull(new GraphQLList(connectionType)),
        description: "Get all connection types",
        resolve: async (parent, args) => {
            try {
              return await connectionTypes.find();
            }
            catch (e) {
              return new Error(e.message);
            }
          },
      },
      currentTypes: {
        type: new GraphQLNonNull(new GraphQLList(currentType)),
        description: "Get all current types",
        resolve: async (parent, args) => {
            try {
              return await currentTypes.find();
            }
            catch (e) {
              return new Error(e.message);
            }
          },
      },
      levels: {
        type: new GraphQLNonNull(new GraphQLList(level)),
        description: "Get all levels",
        resolve: async (parent, args) => {
            try {
              return await levels.find();
            }
            catch (e) {
              return new Error(e.message);
            }
          },
      }
    },
  });

  const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations...',
    fields: {
      addStation: {
        type: station,
        description: 'Add a new chargestation',
        args: {
          Title: {type: new GraphQLNonNull(GraphQLString)},
          AddressLine1: {type: new GraphQLNonNull(GraphQLString)},
          Town: {type: new GraphQLNonNull(GraphQLString)},
          StateOrProvince: {type: new GraphQLNonNull(GraphQLString)},
          Postcode: {type: new GraphQLNonNull(GraphQLString)},
          //Connetions: {type: new GraphQLNonNull(new GraphQLList(connection))},
          //Location: {type: new GraphQLNonNull(gql_geoJSON)},
        },
        resolve(parent, args) {
          const newStation = new stations({
            Title: args.Title,
            AddressLine1: args.AddressLine1,
            Town: args.Town,
            StateOrProvince: args.StateOrProvince,
            Postcode: args.Postcode,
            Connections: args.Connections,
            //Location: args.Title,
          });
          return newStation.save();
        },
      },
      modifyStation: {
        type: station,
        description: 'Modify the title of a station',
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)},
          Title: {type: GraphQLString},
        },
        resolve: async (parent, args) => {
          try {
            return await stations.findByIdAndUpdate(args.id, args, {new:true});
          }
          catch (e) {
            return new Error(e.message);
          }
        },
      },
      deleteStation: {
        type: station,
        description: 'Delete a station with id',
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: async (parent, args) => {
          try {
            console.log("Deleted station with id: ",args)
            return await stations.findByIdAndDelete(args)
          }
          catch (e) {
            return new Error(e.message);
          }
        },
      }
    },
  });
  
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });
  