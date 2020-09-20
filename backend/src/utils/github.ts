import { graphql } from '@octokit/graphql' 

const token = process.env.GH_TOKEN ? `token ${process.env.GH_TOKEN}` : `token testing`

const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: token,
    },
  });

export default graphqlWithAuth 

const query = `{
    repository(owner: "kevn07", name: "bash_profile")  {
            name
        }
    }`

async function helloworld() {
    console.log('running')
    try {
        const repository = await graphqlWithAuth(query);
        console.log(repository)
    } catch (err) {
        console.log(err)
    }
}

helloworld()