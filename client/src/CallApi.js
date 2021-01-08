import axios from "axios";
const url = "http://localhost:5000/api/posts/";
// eslint-disable-next-line no-unused-vars
class CallApi {
  // Get Posts
  static helloHaj() {
    console.log("halloHAJ");
  }
  // use static så man inte behöver instansera
  static getPosts() {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("inne i andre then");
          resolve(
            data.map((arne) => ({
              ...arne,
              // createdAt: new Date(arne.createdAt),
            }))
          );
        })
        // catch
        .catch((err) => {
          reject(err);
        });
    });
  }

  //Create Post
  // eslint-disable-next-line no-unused-vars
  static createPost(newPost) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // message
        console.log(data);
        // CallApi.getPosts();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(url + id);
  }

  //Update post
  // eslint-disable-next-line no-unused-vars
  static updatePost(newPost, id) {
    return fetch(url + id, {
      method: "PATCH",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // message
        console.log(data);
        // CallApi.getPosts();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
}
export default CallApi;
