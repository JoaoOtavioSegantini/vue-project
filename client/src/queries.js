import { gql } from 'apollo-boost'

// Post queries
export const GET_POSTS = gql`
query {
  getPosts {
    title
    imageUrl
    _id
  }
}
`;

export const SIGNIN_USER = gql`
mutation($username: String!, $password:String!){
  signinUser(username: $username, password: $password){
    token
  }
}
`;

export const SIGNUP_USER = gql`
mutation($username: String!, $password:String!, $email: String!){
  signupUser(username: $username, password: $password, email: $email){
    token
  }
}
`;

export const GET_CURRENT_USER = gql`
query {
  getCurrentUser{
    _id
    username
    email
    password
    avatar
    joinDate
    favorites {
      _id
      title
      imageUrl
    }
  }
}
`;

export const ADD_POST = gql`
  mutation(
    $title: String!,
    $imageUrl: String!,
    $categories: [String]!,
    $description: String!,
    $creatorId: ID!
  ){
    addPost (
    title:$title,
    imageUrl: $imageUrl,
    categories:$categories,
    description:$description,
    creatorId:$creatorId
    ){
      _id
      imageUrl
      categories
      description
      createdDate
    
    }
  }

`;

export const INIFINITE_SCROLL_POSTS = gql`
  query($pageNum: Int!, $pageSize: Int!){
           infiniteScrollPosts( pageNum: $pageNum, pageSize: $pageSize){
             hasMore
              posts {
                _id
                title
                description
                categories
                likes
                imageUrl
                createdDate
                createdBy {
                  _id
                  username
                  avatar
                }
                messages {
                  _id
                }
              }
           }
         }
`;

export const GET_POST = gql`
  query ($postId: ID!){
    getPost(postId: $postId){
        _id
        title
        imageUrl
        categories
        description
        createdDate
        likes
        messages{
          _id
          messageBody
          messageDate
          messageUser{
                   _id
                  username
                  avatar
          }
        }
          }


}
`

export const ADD_POST_MESSAGE = gql`
mutation($messageBody: String!, $userId: ID!, $postId: ID!){
  addPostMessage(messageBody: $messageBody, userId: $userId, postId: $postId){
  _id
  messageBody
  messageDate
  messageUser{
    _id
    username
    avatar

  }

  }

}
`;