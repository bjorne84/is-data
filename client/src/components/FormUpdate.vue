
<template>
  <div class="formWrapper">
    <h3 class="h3form">Uppdatera</h3>
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
</template>

<script>
export default {};
</script>