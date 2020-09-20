import { graphql } from '@octokit/graphql' 

const token = process.env.GH_TOKEN ? `token ${process.env.GH_TOKEN}` : `token testing`

const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: token,
    },
  });

export default graphqlWithAuth 