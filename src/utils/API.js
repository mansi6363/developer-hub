const api = "http://localhost:3001";

// checking for token in local storage
let token = localStorage.token;

//if not generating token
if (!token)
  token = localStorage.token = 'RANDOM-TOKEN'

const headers = {
  Accept: "application/json",
  'Content-Type': "application/json",
  Authorization: token
};

// request for all post

export const getAllPost = ()=>(
    fetch(`${api}/posts`, {headers}).then(
        data=> data.json()
    )
)

//get single post
export const getSinglePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    headers
  }).then(res => res.json());


//fetch post from particular category
export const fetchPostsFromCategory = category =>
  fetch(`${api}/${category}/posts`, { headers }).then(data => data.json());

//send post
export const sendPost = (post)=>(
    fetch(`${api}/posts`, {
        method: "POST",
        headers,
        body: JSON.stringify(post)
      })
);

//edit post
export const sendEditedPost = (post, postId) => (
     fetch(`${api}/posts/${postId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(post)
    })
);
  
//vote comment
export const votePost = (postId, option) =>(
  fetch(`${api}/posts/${postId}`, {
    method: `POST`,
    headers,
    body: JSON.stringify({ option })
  })
);

//delete Post
export const deletePostOnline = postId => (
     fetch(`${api}/posts/${postId}`, {
      method: "DELETE",
      headers
    })
);

//comments calls
//get comments of a post
export const getComments = postID =>
  fetch(`${api}/posts/${postID}/comments`, { headers }).then(
      data =>data.json()
);

//add comment
export const uploadComment = comment => (
      fetch(`${api}/comments/`, {
      method: "POST",
      headers,
      body: JSON.stringify(comment)
    })
);

//delete comment
export const deleteCommentFromServer = commentId => (
      fetch(`${api}/comments/${commentId}`, {
      method: "DELETE",
      headers
    })
);

//editComment
export const editServerComment = (comment, commentId) => {
    return fetch(`${api}/comments/${commentId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(comment)
    }).then(data => data.json());
  };

//upvote and down vote comments
export const voteServerComment = (commentId, option) => (
     fetch(`${api}/comments/${commentId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({option})
    })
);

//get all categories
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(data => data.json())
    .then(data => data.categories);