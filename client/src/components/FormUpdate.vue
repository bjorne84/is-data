
<template>
  <div v-if="showUpdateForm === 'show'" class="formWrapper">
    <h3 class="h3form">Uppdatera inlägg</h3>
    <form @submit="upDate2">
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
</template>

<script>
// eslint-disable-next-line no-unused-vars
import CallApi from "../CallApi";

export default {
  name: "FormUpdate",
  props: ["error", "lake", "text", "hiddenId", "showUpdateForm"],

  methods: {
    async upDate2(e) {
      e.preventDefault();
      const newPost = {
        lake: this.lake,
        text: this.text,
      };

      //Calls for fetchAPi to update post
      await CallApi.updatePost(newPost, this.hiddenId);
      // Send up to parent
      this.$emit("reload-call");
    },
  },
};
</script>

<style>
/* Form*/
.formWrapper {
  text-align: left;
  max-width: 800px;
  padding: 2em;
  margin-bottom: 2em;
  margin: 0 auto;
  background-color: rgb(235, 235, 233);
  margin-bottom: 2em;
  border-radius: 0.2em;
}
.formBorder {
  margin-top: 4px;
  border-radius: 0.2em;
  border: 1px solid black;
}

#lake {
  margin-bottom: 1em;
}

#textIn {
  margin-bottom: 12px;
}
</style>