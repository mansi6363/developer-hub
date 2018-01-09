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

//send post
export const sendPost = (post)=>(
    fetch(`${api}/posts`, {
        method: "POST",
        headers,
        body: JSON.stringify(post)
      })
    )

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

//edit Post
export const deletePostOnline = postId => (
     fetch(`${api}/posts/${postId}`, {
      method: "DELETE",
      headers
    })
);