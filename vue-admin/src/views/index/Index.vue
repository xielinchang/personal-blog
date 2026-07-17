<template>
    <div class="home">
        <el-card>
            <h3>{{ $store.state.user.name }}，Welcome to the blog management system!</h3>
        </el-card>
        <el-card style="margin-top: 10px;">
            <h4>tips:</h4>
            <p>1.Normal administrators can manage articles, blogs, etc., but do not have system and project permissions</p>
            <p>2.The directory of articles is displayed using h titles</p>
            <p>3.The carousel can only select published articles, please confirm whether the article is published first</p>
            <p>4.The blog is constantly being improved... Welcome to give various functional innovation suggestions</p>
            <p>5.If there are any errors or questions, please feel free to contact the blogger QQ:307001300~</p>
        </el-card>
    </div>
</template>

<script> 
</script>
<style scoped lang="scss">

</style>
