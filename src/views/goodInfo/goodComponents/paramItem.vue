<template>
  <div class="param-item">
    <div class="item-label">{{title}}</div>
    <div class="item-txt">
      <div
        class="item-item"
        v-if="multy"
      ><span
          class="item-arr"
          v-for="val in txt"
        >{{val}}</span>
      </div>
      <span
        class="item-str"
        v-else
      >{{txt}}</span>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    txt: {
      type: Array | String,
    },
  },
  computed: {
    multy () {
      return typeof this.txt == 'object'
    }
  },
  created () {

  },
  methods: {
  },
}
</script>

<style>
.param-item {
  line-height: 2.5rem;
  border-bottom: 1px solid #ddd;
  display: flex;
}
.item-label {
  float: left;
  flex: 1;
  white-space: nowrap;
  text-align: center;
}
.item-txt {
  flex: 4;
  padding-left: 1.5rem;
}
.item-arr {
  display: inline-block;
  width: 2.5rem;
  text-align: center;
}
.item-str {
  display: inline-block;
  color: #f33;
}
</style>
