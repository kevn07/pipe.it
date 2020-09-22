import { graphql } from '@octokit/graphql' 

export default function(gh_token: string) {
  return graphql.defaults({
    headers: {
      authorization: gh_token
    }
  });
}

// async function testing() {
//   const query = `{
//     search(query:"user:kevn07", type:REPOSITORY, first:20){
//         repositoryCount
//         pageInfo{
//             endCursor
//             startCursor
//         }
//         edges{
//             node{
//                 ... on Repository{
//                 id
//                 name
//                 }
//             }
//         }
//     }
//   }`
//   try {
//   const repository = await graphqlWithAuth(query);
//   console.log(repository);
//   } catch (err) {
//   console.log(err)
//   }
// }

// testing()
