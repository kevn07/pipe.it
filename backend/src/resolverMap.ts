import { IResolvers } from 'graphql-tools';
import githubClient from './lib/github';
import { config } from './lib/config'


interface userRepositories {
  user: String
  repositories: any[]
}

interface userRepoArgs {
  queryString: String
}

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    async queryRepositories(_:void, args: userRepoArgs) {
      const query = `query listRepo($queryString: String!) {
        search(query:$queryString, type:REPOSITORY, first:20){
            repositoryCount
            edges{
                node{
                    ... on Repository{
                    id
                    name
                    }
                }
            }
        }
    }`
    try {
      const client = githubClient(config.GH_TOKEN)
      const response: any = await client(query, {
        queryString: args.queryString
      });

      let result: userRepositories = {
        user: 'kevn07',
        repositories: []
      }
      
      for (const edge of response.search.edges) {
        result.repositories.push({
          name: edge.node.name
        })
      }
      return result;

    } catch (err) {
      console.log(err)
    }
    
    }
  }
};
export default resolverMap;