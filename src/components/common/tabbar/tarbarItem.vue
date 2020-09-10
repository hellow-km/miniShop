<template>
  <router-link
    class="tab-bar-item"
    :to="to"
    @click.native="routeClick"
  >
    <img :src="url">
    <div :style=" { color: isActive?activeColor:'' }">{{title}}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String
    },
    title: {
      type: String
    },
    ext: {
      type: String,
      default: '.svg'
    },
    to: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: '#a33'
    }
  },
  data () {
    return {
      imgPath: ''
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.to) > -1
    },
    url () {
      return this.imgUrl.indexOf('base64') === -1 ? this.imgUrl + (this.isActive ? '-active' + this.ext : this.ext) : this.imgUrl
    }
  },
  created () {

  },
  methods: {
    routeClick () {
      this.$emit('routeClick')
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 3.5rem;
  font-size: 0.6rem;
  margin-top: 0.3rem;
}
.tab-bar-item img {
  width: 1.2rem;
  height: 1.2rem;
}
.red {
  color: #a33;
}
.tab-bar-item a {
  color: #000;
  text-decoration: none;
}
</style>
