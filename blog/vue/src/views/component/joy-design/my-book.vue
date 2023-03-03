<template>
  <div>
    <div class="book-container ">
      <flipPage
        ref="filpPage"
        class="book"
        :width="pagewidth"
        :height="pageheight"
        :data="manuals"
      ></flipPage>
    </div>
  </div>
</template>

<script>
import flipPage from 'vue-flip-page'
export default {
  components: {
    flipPage
  },
  data () {
    return {
      // manuals: [{ 'picture_image': require('../../assets/images/动漫1.webp') },
        // { 'picture_image': require('../../assets/images/动漫2.webp') }],
      pagewidth: 800,
      pageheight: 400
    }
  }
}
</script>

<style>
.book{
  width: 90%;
  margin-left: 7%;
  margin-top: 50px;
}
.book img{
  width: 100%;
  height: 100%;
}
.page-count{
  opacity: 0;
}
.book-container{
  width: 90%;
  height: 400px;
  position: relative;
}
.book-container :hover .page-count{
  opacity: 0.6;
  transition: 500ms;
}
.turn-right-border{
  width: 0 !important;
}
</style>
