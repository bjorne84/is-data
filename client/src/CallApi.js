const url = "http://localhost:5000/api/posts/";
// eslint-disable-next-line no-unused-vars
class CallApi {
  // Get Posts
  // use static = no need to instantiate class
  static getPosts() {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          resolve(
            data.map((arr) => ({
              ...arr,
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
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  // Delete Post

  static deletePost(id) {
    return (
      fetch(url + id, {
        method: "DELETE",
        //body: JSON.stringify(obj),
      })
        // Tar emot respons-data i JSON-format
        .then((response) => response.json())
        // Laddar om portfoliosidan
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
    );
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
