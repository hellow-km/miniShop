<template>
  <div class="dialog">
    <div class="dialog-title">{{diaTitle}}</div>
    <div class="dialog-mes">{{mes}}</div>
    <div class="dialog-btn">
      <button @click="submit">确定</button><button @click="cancle">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    diaTitle: {
      type: String
    },
    mes: {
      type: String
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    cancle () {
      this.$emit('cancle')
    }
  },
}
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 40%;
  left: 50%;
  height: 10rem;
  width: 10rem;
  background-color: #eee;
  transform: translate(-50%, -50%);
}
.dialog-title {
  text-align: center;
  line-height: 2rem;
  background-color: #f88;
}
.dialog-mes {
  text-align: center;
  line-height: 2rem;
}
.dialog-btn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.dialog-btn button {
  margin-right: 0.7rem;
  border: 1px solid #eee;
  width: 3rem;
  height: 1.5rem;
}
</style>
