<!--
  功能：spu表单组件
  作者：ysl
  邮箱：2750827735@.com
  时间：2024年06月18日 14:52:58
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：2024年06月18日 14:52:58
-->

<template>
    <!-- from表单数据收集区 -->
    <div>
        <el-form label-width="100">
            <el-form-item label="SPU品牌:" prop="sputext">
                <el-select v-model="spuForm.sputext" placeholder="选择SPU品牌">
                    <el-option v-for="item in spuStore.spuPosterList" :key="item.value" :label="item.label" :value="item.brandName" />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU名称:" prop="spuname">
                <!-- 收集SPU名称 -->
                <el-input v-model="spuForm.spuname" placeholder="请输入SPU名称" />
            </el-form-item>
            <el-form-item label="SPU描述:" prop="spuname">
                <!-- 收集SPU描述 -->
                <el-input v-model="spuForm.spuname" type="textarea" placeholder="请输入SPU描述" />
            </el-form-item>
            <el-form-item label="SPU图片:">
                <!-- 上传spu图片框 -->
                <el-upload v-model:file-list="imgFileList" action="http://localhost:8989/Shopping/img"
                    list-type="picture-card" :headers="headersToken" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
                <el-dialog v-model="dialogVisible" style="overflow: hidden">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>


            </el-form-item>
            <el-form-item label="SPU销售属性:" prop="sputext">
                <el-select v-model="spuForm.sputext" placeholder="选择SPU销售属性">
                    <el-option label="华为" value="shanghai" />
                    <el-option label="小米" value="beijing" />
                </el-select>
                <el-button class="button_add" style="margin: 0px 20px;" type="primary" plain @click="AddSell">
                    添加销售属性
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-table class="table_css" :data="spuList" border>
                    <el-table-column class="column" type="index" align="center" label="序号" width="100" />
                    <el-table-column class="column" align="center" label="属性名" width="210">
                    </el-table-column>
                    <el-table-column class="column" align="center" label="属性值" show-overflow-tooltip min-width="250">
                    </el-table-column>
                    <el-table-column class="column" prop="operate" align="center" label="SPU操作" min-width="250">
                        <!-- 修改删除组件 -->

                        <template #="{ row, $index }">
                            <el-button-group class="ml-4">
                                <el-button @click="handleDelete($index, row)" class="Delete" icon="Delete" plain
                                    title="删除SPU" />
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

        </el-form>
        <!-- 按键操作区 -->
        <div>
            <el-button class="button_add" type="primary" plain @click="AddSpuForm">
                保存
            </el-button>
            <el-button class="button_add" type="primary" plain @click="Cancel">
                取消
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, defineProps } from 'vue'
// 引用用户相关的pinia仓库
import useUserStore from '../../../store/modules/user'
import useSpuStore from '../../../store/modules/spu'
// pinia user仓库
let useStore = useUserStore()
let spuStore = useSpuStore()
// SPU form表单
let spuForm = reactive<any>({
    spuname: '',
    sputext: '',
})
let options = ref<any[]>([])
// 上传图片集合
const imgFileList = ref<any[]>([
    
])

let $emits = defineEmits(['CancelScene'])
// 取消回调 通知父组件切换场景
let Cancel = () => {
    $emits('CancelScene', 0)
}
// 删除回调
const handleDelete = ($index: any, row: any) => {
}
// 预览图片地址
const dialogImageUrl = ref('')
// 是否预览上传图片 
const dialogVisible = ref(false)
// 携带token上传图片
const headersToken = {
    "token": useStore.token   // JWT认证，携带token
}
// spu图片删除回调
const handleRemove: any['onRemove'] = (uploadFile: any, uploadFiles: any) => {
    fileList.value = []
}
// spu图片预览回调
const handlePictureCardPreview: any['onPreview'] = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
</script>

<style scoped class="scss">
.button_add {
    color: #050505;
    background-color: #6ec1f1;

    &:hover {
        background-color: #1290da;
    }
}

/* 预览缩放图片样式 */
.img {
    max-width: 100%;
    max-height: 100%;
}

.w-100\%,
.w-full,
[w-full=""] {
    width: 100%;
}
</style>
