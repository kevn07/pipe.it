import { IResolvers } from 'graphql-tools';
import githubClient from './utils/github';
const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    }
  },
  Github: {
    async userRepositories(_:void, args: void): Promise<any> {
      const query = `{
        search(query:"user:kevn07", type:REPOSITORY, first:20){
            repositoryCount
            pageInfo{
                endCursor
                startCursor
            }
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
      const repository = await githubClient(query);
      return repository
    } catch (err) {
      throw err
    }
    }
  }
  
};
export default resolverMap;