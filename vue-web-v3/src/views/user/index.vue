<template>
  <div>
    <TemplatePage :wave="true"></TemplatePage>
    <Wave />
    <div class="user">
      <div class="user-info">
        <div class="portrait">
          <img
            v-lazy="prefix+userInfo.portrait"
            alt=""
          >
        </div>
        <div class="user-l">
          <div class="username user-l-item"><span> Account：{{ userInfo.username }}</span></div>
          <div class="name user-l-item">
            <div>
              <span> Name：{{ userInfo.name }}</span>
              <j-icon
                name="edit"
                color="var(--text7)"
                @click="editNameClick"
              ></j-icon>
            </div>
          </div>
        </div>
        <div class="user-r">
          <div class="btns">
            <n-button
              type="error"
              @click="logout"
            >Logout</n-button>
          </div>
        </div>
      </div>
      <div class="user-main">
        <div class="user-module">
          <n-tabs type="line"  style="padding: 10px 15px;">
            <n-tab-pane name="essayCollect" tab="Collect">
              <ul>
                <li
                  v-for="item in essay_list"
                  :key="item.id"
                  class="essay-list-item"
                >
                  <img
                    v-lazy="item.coverUrl"
                    class="control-item-img"
                    @click="jumpToEssay(item)"
                  />
                  <div
                    class="control-item-right"
                    @click="jumpToEssay(item)"
                  >
                    <div class="control-item-time">{{ item.updated_at }}</div>
                    <div
                      class="control-item-title"
                    >
                      <a>{{ item.title }}</a>
                    </div>
                    <div
                      class="item-sub-title"
                    >
                      {{ item.subtitle }}
                    </div>
                    <ul class="control-item-type">
                      <li
                        v-for="(essay_tag) in item.tags"
                        :key="essay_tag"
                      >
                        {{ essay_tag }}
                      </li>
                    </ul>
                    <div class="view-icon">
                      <span><j-icon name="view" size="14px"></j-icon></span>
                      <span>{{ item.reading_num }}</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="essay_list.length === 0" class="no-data">
                There are no favorite articles yet, go to the homepage and click the Favorites!
              </div>
            </n-tab-pane>
            <n-tab-pane  name="essayNote" tab="Notes">
              <ul>
                <li
                  v-for="item in note_list"
                  :key="item.id"
                  class="essay-list-item"
                >
                  <img
                    v-lazy="item.coverUrl"
                    class="control-item-img"
                    @click="jumpToEssay(item)"
                  />
                  <div
                    class="control-item-right"
                    @click="jumpToEssay(item)"
                  >
                    <div class="control-item-time">{{ item.updated_at }}</div>
                    <div
                      class="control-item-title"
                    >
                      <a>{{ item.title }}</a>
                    </div>
                    <div
                      class="item-sub-title"
                    >
                      {{ item.subtitle }}
                    </div>
                    <ul class="control-item-type">
                      <li
                        v-for="note_tag in item.tags"
                        :key="note_tag"
                      >
                        {{ note_tag }}
                      </li>
                    </ul>
                    <div class="item-del" @click="deleteNote(item)">
                      <j-icon
                        name="delete" size="16px"
                        color="var(--rose5)"
                      />
                    </div>
                    <div class="view-icon">
                      <span><j-icon name="view" size="14px"></j-icon></span>
                      <span>{{ item.reading_num }}</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="note_list.length === 0" class="no-data">
                There are no article notes yet, and the articles that record notes will be displayed here.
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="editNameShow"
      preset="card"
      style="width: 500px;"
      @update:show="handleDialogChange"
    >
      <div class="modal-body">
        <div class="form-item">
          <label class="form-label">Username</label>
          <n-input
            v-model:value="userForm.username"
            :disabled="true"
            style="width: 100%"
            placeholder="Please enter your username"
          />
        </div>
        <div class="form-item">
          <label class="form-label">Name</label>
          <n-input
            v-model:value="userForm.name"
            style="width: 100%"
            placeholder="Please enter your name"
          />
        </div>
        <div class="form-item">
          <label class="form-label">Portrait</label>
          <n-upload
            v-model:file-list="fileList"
            :action="uploadUrl"
            :max="1"
            @change="handleUploadChange"
          >
            <n-button type="primary" block>Select Image</n-button>
          </n-upload>
          <div v-if="userForm.portrait" style="margin-top: 10px; text-align: center;">
            <img :src="userForm.portrait" style="width: 100px; height: 100px; border-radius: 50%;" />
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">Old Password</label>
          <n-input
            v-model:value="userForm.old_password"
            type="password"
            style="width: 100%"
            placeholder="Leave blank if not changing"
          />
        </div>
        <div class="form-item">
          <label class="form-label">New Password</label>
          <n-input
            v-model:value="userForm.new_password"
            type="password"
            style="width: 100%"
            placeholder="Leave blank if not changing"
          />
        </div>
      </div>
      <div class="modal-footer">
        <n-button @click="handleClose">Cancel</n-button>
        <n-button type="primary" @click="handleSave">Save Changes</n-button>
      </div>
    </n-modal>

  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { NButton, NTabs, NTabPane, NModal, NInput, NUpload, useMessage, useDialog } from 'naive-ui'
import { essayQuery } from '@/api/main/essay'
import { changePsw, updateUser } from '@/api/default/user'
import { getUserNotes, essayNoteDelete } from '@/api/main/essayNote'
import axios from 'axios'
import { getToken, removeToken } from '@/utils/author'
import { setItemWithExpiry, getItemWithExpiry } from '@/utils/tool'

const route = useRoute()
const router = useRouter()
const store = useMainStore()
const message = useMessage()
const dialog = useDialog()

// 响应式数据
const essay_list = ref([])
const note_list = ref([])
const portrait = ref('')
const file = ref({})
const fileList = ref([])
const newPotrait = ref('')
const userInfo = ref({})
const newName = ref('')
const prefix = import.meta.env.VITE_APP_BASE_API
const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/api/file'
const changePswForm = ref({})
const changePswFlag = ref(false)
const editNameShow = ref(false)
const customImageFile = ref('')

const userForm = ref({
  username: '',
  name: '',
  portrait: '',
  old_password: '',
  new_password: ''
})

// 监听路由变化
watch(() => route.path, (to) => {
  if (to === '/user') {
    initUser()
  }
})

// 生命周期
onMounted(() => {
  initUser()
})

// 方法
const handleClose = () => {
  editNameShow.value = false
}

const handleDialogChange = (visible) => {
  if (visible) {
    initUserForm()
  }
}
const initUserForm = () => {
  console.log(userInfo.value)
  userForm.value = {
    username: userInfo.value.username || '',
    name: userInfo.value.name || '',
    portrait: userInfo.value.portrait ? prefix + userInfo.value.portrait : '',
    old_password: '',
    new_password: ''
  }
  fileList.value = []
}

const editNameClick = () => {
  editNameShow.value = true
  initUserForm()
}

const handleSave = async () => {
  const hasNameChange = userForm.value.name !== (userInfo.value.name || '')
  const hasPasswordChange = userForm.value.old_password && userForm.value.new_password
  const hasPortraitChange = userForm.value.portrait !== (userInfo.value.portrait ? prefix + userInfo.value.portrait : '')

  if (!hasNameChange && !hasPasswordChange && !hasPortraitChange) {
    message.warning('No changes made')
    return
  }

  try {
    if (hasPasswordChange) {
      if (userForm.value.new_password.length < 6 || userForm.value.new_password.length > 18) {
        message.warning('Password must be 6-18 characters')
        return
      }
      const pswRes = await changePsw({
        old_pass: userForm.value.old_password,
        pass: userForm.value.new_password
      })
      if (pswRes.data.msg === '原密码错误') {
        message.error('Old password is incorrect')
        return
      }
      message.success('Password updated successfully')
    }

    if (hasNameChange || hasPortraitChange) {
      const updateData = {
        ...userInfo.value,
        name: userForm.value.name
      }
      if (userInfo.value.portrait !== (userForm.value.portrait.replace(prefix, '') || '')) {
        updateData.portrait = userForm.value.portrait.replace(prefix, '') || userInfo.value.portrait
      }
      await updateUser(updateData)
      message.success('Profile updated successfully')
    }

    editNameShow.value = false
    location.reload()
  } catch (error) {
    message.error('Update failed, please try again')
  }
}
const unpublishTip = (id, type) => {
  if (!getItemWithExpiry('is_read_essay_unpublish')) {
    message.warning(type === 'note' ? `您对id为${id}的文章所做的笔记已被下架` : `您收藏id为${id}的文章已被下架`)
    setItemWithExpiry('is_read_essay_unpublish', true, 1000 * 60 * 60 * 24 * 3)
  }
}

const initNotes = async (userId) => {
  note_list.value = []
  const userNotesRes = await getUserNotes({ user_id: userId })
  const userNotes = userNotesRes.data
  await Promise.all(userNotes.map(async item => {
    const essayRes = await essayQuery({
      limit: 999,
      offset: 1,
      query: {
        id: item.essay_id,
        title: undefined,
        subtitle: undefined,
        domain: undefined
      }
    })

    if (essayRes.data.count) {
      const essayData = essayRes.data.rows[0]
      essayData.tags = essayData.tags.split(',')
      essayData.note_id = item.id
      essayData.coverUrl = prefix + essayData.coverUrl
      note_list.value.push(essayData)
    } else {
      unpublishTip(item.essay_id, 'note')
    }
  }))
}

const deleteNote = (item) => {
  dialog.warning({
    title: '提醒',
    content: '要删除吗？一旦删除将不可恢复',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      essayNoteDelete({ id: item.note_id }).then(res => {
        message.success('删除成功')
        initNotes(userInfo.value.user_detail.user_id)
      })
    }
  })
}



const initUser = async () => {
  if (getToken('token')) {
    await store.getUserInfo().then(async user => {
      console.log(user)
      userInfo.value = user
      var ids = []
      essay_list.value = []
      if (userInfo.value.user_detail.collect !== '') {
        ids = userInfo.value.user_detail.collect.split(',')
        const promises = ids.map(id => {
          return essayQuery({
            limit: 999,
            offset: 1,
            query: {
              id: Number(id),
              title: undefined,
              subtitle: undefined,
              domain: undefined
            }
          }).then(res => {
            if (res.data.count > 0) {
              const essayData = res.data.rows[0]
              essayData.tags = essayData.tags.split(',')
              essayData.coverUrl = prefix + essayData.coverUrl
              return essayData
            } else {
              unpublishTip(id, 'collect')
            }
          })
        })

        await Promise.all(promises).then(results => {
          essay_list.value = results.filter(item => item !== undefined)
          initNotes(userInfo.value.user_detail.user_id)
        })
      }
    })
  }
}

// 更新头像回调
const uploadCallback = (file) => {
  customImageFile.value = file
  // 创建一个读取对象
  var reader = new FileReader()
  // 将文件转化为一个二进制字符串
  reader.readAsArrayBuffer(file)
  // 监听文件读取完成
  reader.onload = (e) => {
    // 监听完成后，将二进制字符串转化为Blob对象，并且通过URL.createObjectURL创建一个url，指向该Blob对象
    const data = window.URL.createObjectURL(new Blob([e.target.result]))
    // 将生成的url赋值给需要预览的url
    newPotrait.value = data
  }
}

// 删除头像回调
const deleteCallback = () => {
  newPotrait.value = ''
  customImageFile.value = ''
}

// 处理文件上传变化
const handleUploadChange = (fileList) => {
  const file = fileList[fileList.length - 1]
  if (file && file.status === 'finished') {
    userInfo.value.portrait = file.response.data.url
    userForm.value.portrait = prefix + file.response.data.url
  } else if (file && file.status === 'uploading') {
    // 上传中
  } else if (file && file.status === 'error') {
    message.error('Upload failed, please try again')
  }
}

const jumpToEssay = (item) => {
  router.push('/note/essay?id=' + item.id)
}



const logout = () => {
  removeToken('token')
  if (route.path !== '/') {
    router.replace('/')
  }
  location.reload()
}
</script>
<style lang='scss' scoped>
@import "./scss/index";

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e6eb;
}

.modal-body {
  padding: 16px;
  max-height: 500px;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e5e6eb;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1f2329;
}
</style>
