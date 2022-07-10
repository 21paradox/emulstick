<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <button @click="openblue">openble</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    openblue() {
      let options = {
        filters: [
          {
            // namePrefix: 'KBD',
            services: ['0000180A-0000-1000-8000-00805f9b34fb'.toLowerCase()],
          },
        ],
      };
      return navigator.bluetooth.requestDevice(options).then((device) => {
        // this.device = device;
        console.log(device);
        // this.device.addEventListener(
        //   'gattserverdisconnected',
        //   this.onDisconnected,
        // );
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
