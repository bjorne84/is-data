<template>
  <main>
    <h1 id="welcomeh1">Is-rapporten</h1>
    <p class="p-one">
      Se aktuella israpporter över sjöar och vattendrag från
      långfärdsskridskoåkare landet runt!
    </p>
    <!---ERROR in hide if no error is to display-->
    <p class="p-error" v-if="error">{{ error }}</p>

    <div v-if="showUpdateForm === 'defualt'" class="formWrapper">
      <h3 class="h3form">Skriv en rapport:</h3>
      <form @submit="addPost">
        <label for="lake">Sjö/vattendrag:</label><br />
        <input
          type="text"
          id="lake"
          v-model="lake"
          class="formBorder"
          name="lake"
          placeholder="Vilken sjö var du på?"
          required
        /><br />
        <label for="textIn">Beskrivning av läget:</label><br />
        <textarea
          id="textIn"
          v-model="text"
          name="textIn"
          class="formBorder"
          cols="30"
          rows="8"
          placeholder="exempelvis hur tjock isen var"
          required
        /><br />
        <button type="submit" class="btn up">Posta!</button>
        <button type="reset" class="btn del">Radera fält</button>
      </form>
    </div>
    <FormUpdate
      :error="error"
      :lake="lake"
      :text="text"
      :hiddenId="hiddenId"
      :showUpdateForm="showUpdateForm"
      @reload-call="reloadNow"
    />
    <section class="wrapper">
      <h1 class="wrapperh1">Inlägg:</h1>
      <article
        class="posts"
        v-for="(post, index) in posts.slice().reverse()"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <h3 class="titel">{{ post.lake }}</h3>
        <p class="post-p">{{ post.text }}</p>
        <p class="create-p">
          Publicerad: {{ `${post.date.substring(0, 10)}` }}
        </p>
        <div class="btn-div">
          <button class="btn del" v-on:click="deletePost(post._id)">
            Radera
          </button>
          <!---Update btn, sends data to form and add show the updateform / hide newpostform-->
          <button
            class="btn up"
            v-on:click="pressUpdate(post._id, post.lake, post.text)"
            @click="changeForm()"
          >
            Updatera
          </button>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CallApi from "../CallApi";

// eslint-disable-next-line no-unused-vars
import FormUpdate from "./FormUpdate";

export default {
  name: "IcePostComp",
  components: {
    FormUpdate,
  },
  data() {
    return {
      posts: [],
      error: "",
      lake: "",
      text: "",
      hiddenId: "",
      showUpdateForm: "defualt",
    };
  },

  async created() {
    try {
      // this is pointing to -> data() -> return -> posts[]
      this.posts = await CallApi.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    // when update-btn is pressed this method starts, and change wich form will dislpay
    changeForm() {
      this.showUpdateForm = "show";
      console.log(this.showUpdateForm);
    },

    // eslint-disable-next-line no-unused-vars
    async deletePost(id) {
      // this.text är bundet till inputfältet med v-model
      await CallApi.deletePost(id);
      this.posts = await CallApi.getPosts();
    },
    async addPost(e) {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const newPost = {
        lake: this.lake,
        text: this.text,
      };

      // clear form
      this.lake = "";
      this.text = "";

      console.log(newPost);
      //call fetchApi to add post in db
      await CallApi.createPost(newPost);
      this.posts = await CallApi.getPosts();
    },

    // Adds data to the form by id
    // eslint-disable-next-line no-unused-vars
    pressUpdate(id, lake, text) {
      this.lake = lake;
      this.text = text;
      this.hiddenId = id;
    },

    // A call from child-component has come, it´s asking for reload of the view
    async reloadNow() {
      this.posts = await CallApi.getPosts();
      // clear form
      this.lake = "";
      this.text = "";
      this.showUpdateForm = "defualt";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#welcomeh1 {
  font-family: monospace;
  font-size: 5em;
  color: rgb(12, 15, 145);
}
.wrapperh1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
  color: rgb(201, 14, 170);
}
h3 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2em;
  color: rgb(12, 15, 145);
  margin: 20px 0 0;
}
.create-p {
  background-color: rgb(247, 234, 218);
  padding: 4px;
  max-width: 400px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: 12px;
}
main {
  border: 1px solid rgb(167, 165, 165);
  border-radius: 0.2em;
  max-width: 1080px;
  margin: 0 auto;
  background-color: rgb(250, 248, 245);
}
/* The section that holds the article-elements with all the posts*/
.wrapper {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  text-align: left;
  padding: 2em;
  margin-bottom: 2em;
}

.posts {
  border: dotted 4px #c2c0c0;
  margin-bottom: 2em;
  padding: 1em;
}

/* Knappar*/
.btn {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 5px;
  border-radius: 0.2em;
}
.btn:hover {
  cursor: pointer;
}

.up {
  background-color: #4caf50; /* Green */
}
.del {
  background-color: #b60b0b; /* Green */
}
</style>
