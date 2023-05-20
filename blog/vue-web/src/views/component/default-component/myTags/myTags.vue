<template>
  <div
    :class="{
      'read-only': readOnly,
      'vue-input-tag-wrapper--active': isInputActive,
    }"
    class="vue-input-tag-wrapper"
    @click="focusNewTag()"
  >
    <span
      v-for="(tag, index) in innerTags"
      :key="index"
      class="input-tag"
    >
      <span class="views_tag">{{ tag }}</span>
      <svg-icon
        color="#1DA9E0"
        size="14px"
        icon-name="circle-close-filled"
        class="remove"
        @click.prevent.stop="remove(index)"
      >
      </svg-icon>
    </span>
    <input
      v-if="!readOnly && !isLimit"
      ref="inputtag"
      v-model="newTag"
      :placeholder="placeholder"
      type="text"
      class="new-tag"
      @keydown.delete.stop="removeLastTag"
      @keydown="addNew"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
    />
  </div>
</template>
<script>
import SvgIcon from '../SvgIcon/SvgIcon.vue'

export default {
  name: 'MyTags',
  components: { SvgIcon },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '+new Tags'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    addTagOnKeys: {
      type: Array,
      default: function () {
        return [
          13, // Return
          188, // Comma ','
          9 // Tab
        ]
      }
    },
    addTagOnBlur: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: -1
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    beforeAdding: {
      type: Function
    }
  },
  emits: ['update-tags'],
  data () {
    return {
      newTag: '',
      innerTags: [...this.value],
      isInputActive: false
    }
  },

  computed: {
    isLimit: function () {
      return this.limit > 0 && Number(this.limit) === this.innerTags.length
    }
  },

  watch: {
    value () {
      this.innerTags = [...this.value]
    }
  },

  methods: {
    focusNewTag () {
      if (this.readOnly || !this.$el.querySelector('.new-tag')) {
        return
      }
      this.$el.querySelector('.new-tag').focus()
    },
    handleInputFocus () {
      this.isInputActive = true
    },

    async handleInputBlur (e) {
      this.isInputActive = false
      this.addNew(e)
    },

    addNew (e) {
      const keyShouldAddTag = e ? this.addTagOnKeys.indexOf(e.keyCode) !== -1 : true
      const typeIsNotBlur = e && e.type !== 'blur'
      if ((!keyShouldAddTag && (typeIsNotBlur || !this.addTagOnBlur)) || this.isLimit) {
        return
      }
      const tag = this.beforeAdding ? this.beforeAdding(this.newTag) : this.newTag
      if (tag.length > 0) {
        this.innerTags.push(tag)
      }
      this.newTag = ''
      e && e.preventDefault()
      this.tagChange()
    },
    remove (index) {
      this.innerTags.splice(index, 1)
      this.tagChange()
    },

    removeLastTag () {
      if (this.newTag) {
        return
      }
      this.innerTags.pop()
      this.tagChange()
    },
    tagChange () {
      this.$emit('update-tags', this.innerTags)
    }
  }

}

</script>

  <style  lang="scss" scpoed>
  @import './myTags.scss';
  </style>

