<template>
  <!-- brand 数据展示组件 -->
  <el-card style="width: 100%">
    <!-- header头部 -->
    <template #header>
      <div class="card-header">
        <el-button
          class="button_icon"
          type="primary"
          icon="Plus"
          plain
          @click="addBrand"
        >
          添加品牌
        </el-button>
        <el-input
          v-model="brandName"
          style="width: 240px"
          placeholder="品牌名称"
          class="search"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
        <el-button
          @click="getlist"
          class="button_icon"
          type="primary"
          icon="Search"
          style="margin-left: 20px; width: 50px"
        >
          GO
        </el-button>
        <el-button
          @click="RefreshBrand"
          class="button_Refresh"
          type="primary"
          icon="Refresh"
          style="margin-left: 20px; width: 100px"
        >
          重置
        </el-button>
      </div>
    </template>
    <!-- 表单数据区 -->
    <el-table class="table_css" :data="BrandList" border>
      <el-table-column
        class="column"
        type="index"
        align="center"
        label="序号"
        width="100"
      />
      <el-table-column
        class="column"
        align="center"
        label="品牌名称"
        min-width="200"
      >
        <template #="{ row, $index }">
          <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{
            row.brandName
          }}</pre>
        </template>
      </el-table-column>
      <el-table-column
        class="column"
        align="center"
        label="品牌LOGO"
        min-width="200"
      >
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt=""
            style="width: 100pxl; height: 100px; display: inline-block"
          />
        </template>
      </el-table-column>
      <el-table-column
        class="column"
        prop="createTime"
        align="center"
        label="创建时间"
        min-width="200"
      />
      <el-table-column
        class="column"
        prop="operate"
        align="center"
        label="操作"
        min-width="200"
      >
        <!-- 修改删除组件 -->
        <template #="{ row, $index }">
          <el-button-group class="ml-4">
            <el-button
              @click="handleEdit($index, row)"
              class="Edit"
              type="primary"
              :icon="Edit"
            />
            <el-button
              plain
              @click="handleDelete($index, row)"
              class="Delete"
              type="primary"
              :icon="Delete"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
    v-model:current-page="" 设置分页器当前页码
    v-model:page-size="" 设置分页器当前每页展示数据条数  
    background=true 设置是否有背景
    layout 组件布局
    pager-count 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
    @size-change="changeSize"当每页显示数据条数发生改变时触发 调用changeSize方法获取品牌数据
    @current-change="getlist"当页码发生改变时触发 调用getlist方法获取品牌数据
    -->
    <div class="demo-pagination-block">
      <el-pagination
        @size-change="changeSize"
        @current-change="getlist"
        :pager-count="5"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :disabled="disabled"
        :background="background"
        layout="slot,prev, pager, next, jumper,->, sizes, total"
        :total="total"
      />
    </div>
  </el-card>

  <!-- 对话框组件 -->
  <el-dialog v-model="dialogFormVisible" :title="brandTitle" width="500">
    <el-form :model="BranForm" :rules="rules" ref="BranFormRef">
      <el-form-item label="品牌名称:" prop="brandName">
        <el-input v-model="BranForm.brandName" />
      </el-form-item>
      <el-form-item label="品牌logo" prop="logoUrl">
        <!-- 
        action="#" 上传文件或图片的地址
        list-type="picture-card"  上传文件的类型
        :before-upload="beforeAvatarUpload" 上传文件之前约束文件上传的类型大小的方法
        :on-success="handleAvatarSuccess"  // 上传文件成功的钩子
        :auto-upload="false" 是否自动上传文件
        :drag="true" 是否开启拖拽上传
        -->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8989/Shopping/img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            w-full
            v-if="BranForm.logoUrl"
            :src="BranForm.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="button_edit" @click="cancelUpload" type="primary">
          取消
        </el-button>
        <el-button class="button_edit" @click="addPutBrandlist">
          {{ addEditTitle }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import {
  getBrandList,
  addPutBrand,
  DeleteBrand,
} from '../../../api/product/brand/index'
import { BrandList, BranForm } from '../../../api/product/brand/type'
// 引入消息提示
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
// 引入限制文件上传数据类型
import type { UploadProps, UploadInstance } from 'element-plus'
// 当前页码
let pageNum = ref<number>(1)
// 每页展示多少条数据
let pageSize = ref<number>(5)
// background=true 是否为分页按钮添加背景色
let background = ref<boolean>(true)
// disabled 是否禁用分页
let disabled = ref<boolean>(false)
// 模糊搜索——品牌名
let brandName = ref<string>('')
// 品牌总数
let total = ref<number>(0)
// 服务器返回的品牌数据
let BrandList = ref<BrandList>()
// 对话框控制参数
let dialogFormVisible = ref<boolean>(false)
// 对话框标题
let brandTitle = ref<string>('')
let addEditTitle = ref<string>('')
// 新增修改收集数据
let BranForm = reactive<BranForm>({
  id: undefined,
  brandName: '',
  logoUrl: '',
})
// 获取le-form组件实例
let BranFormRef = ref()
// 添加品牌按钮方法
const addBrand = async () => {
  brandTitle.value = '添加品牌'
  addEditTitle.value = '添加'
  BranForm.id = undefined
  BranForm.brandName = ''
  BranForm.logoUrl = ''
  dialogFormVisible.value = true
  // 清除表单校验提示信息
  await BranFormRef.value?.clearValidate('brandName')
  await BranFormRef.value?.clearValidate('logoUrl')
}
// 请求品牌数据方法
const getlist = async () => {
  let result = await getBrandList(
    pageNum.value,
    pageSize.value,
    brandName.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    BrandList.value = result.data.shoppingList
  } else {
    return console.log(result.msg)
  }
}
// 添加更改品牌数据接口
const addPutBrandlist = async () => {
  // 提交表单前校验表单 await保证表单校验成功在发送请求
  await BranFormRef.value.validate()
  let result = await addPutBrand(BranForm)
  if (result.msg == '必填参数为空') {
    ElMessage({
      type: 'error',
      message: '必填参数为空',
    })
  } else {
    if (result.code == 200) {
      ElMessage({
        message: '品牌' + addEditTitle.value + '成功',
        type: 'success',
      })
      // 添加成功更新数据
      getlist()
      dialogFormVisible.value = false
    } else {
      ElMessage({
        message: result.msg,
        type: 'error',
      })
    }
  }
}
// 表单校验brandNameError方法
// rule: any, value: any, callback: any
// rule:表单校验规则
// value：表单元素内文本内容
// callback：规则放行函数，符合条件callback放行通过，不符合条件callback方法，注入错误信息。
const brandNameError = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('品牌名不能为空'))
  } else if (value.length < 2) {
    return callback(new Error('长度至少 2 位数'))
  } else {
    // 校验通过放行
    callback()
  }
}
// 表单校验logoUrlError方法
const logoUrlError = (rule: any, value: any, callback: any) => {
  console.log('表单校验logoUrlError方法')
  if (value) {
    callback()
  } else {
    return callback(new Error('LOGO图片务必上传'))
  }
}
// 添加修改表单校验规则
const rules = {
  brandName: [{ required: true, trigger: 'blur', validator: brandNameError }],
  logoUrl: [{ required: true, validator: logoUrlError }],
}
// 生命周期函数onMounted 组件挂载前
onMounted(() => {
  getlist()
})
// size发生改变回调
const changeSize = () => {
  // size改变时重置pageNum为第一页在发送请求
  pageNum.value = 1
  getlist()
}
// 搜索重置方法
const RefreshBrand = () => {
  pageNum.value = 1
  brandName.value = ''
  getlist()
}
// 修改品牌按钮回调
const handleEdit = async (index: number, row: any) => {
  BranForm.id = row.id
  BranForm.brandName = row.brandName
  BranForm.logoUrl = row.logoUrl
  dialogFormVisible.value = true
  brandTitle.value = '修改品牌'
  addEditTitle.value = '修改'
  // 清除表单校验提示信息
  await BranFormRef.value?.clearValidate('brandName')
  await BranFormRef.value?.clearValidate('logoUrl')
  console.log('序号：' + index, 'row:' + row.brandName + 'id:' + row.id)
}
// 删除品牌按钮回调
const handleDelete = async (index: number, row: any) => {
  ElMessageBox.confirm('确定删除当前品牌：' + row.brandName + '?', '删除品牌', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    autofocus: false,
  })
    .then(async () => {
      BranForm.id = row.id
      BranForm.brandName = row.brandName
      BranForm.logoUrl = row.logoUrl
      addEditTitle.value = '删除'
      console.log('序号：' + index, 'row:' + row.brandName + 'id:' + row.id)
      let result = await DeleteBrand(BranForm.id)
      if ((result.code = 200)) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getlist()
      } else {
        ElMessage({
          type: 'error',
          message: result.msg,
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

// 上传文件之前约束文件上传的类型大小的方法
const beforeAvatarUpload: any['beforeUpload'] = (rawFile: any) => {
  console.log('上传文件之前约束文件上传的类型大小的方法')
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage({
        message: '上传的图片大于 2MB! 请重新上传',
        type: 'error',
      })
    } else {
      return true
    }
  } else {
    ElMessage({
      message: '请上格式为jpeg、png或gif的图片',
      type: 'error',
    })
    return false
  }
}
// 上传文件成功的钩子
const handleAvatarSuccess: any['onSuccess'] = async (
  response: any,
  uploadFile: any,
) => {
  console.log('上传文件')
  console.log(response.data)
  ElMessage({
    message: '图片上传成功',
    type: 'success',
  })
  BranForm.logoUrl = response.data
  // 上传图片成功清除表单校验信息
  await BranFormRef.value.clearValidate('logoUrl')
  console.log('上传文件成功')
}
// 取消上传方法
const cancelUpload = async () => {
  BranForm.logoUrl = ''
  dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
// 添加品牌按钮样式
.button_icon {
  width: 200px;
  margin-right: 50px;
}

// 重置按钮样式
.button_Refresh {
  float: right;
}
.card-header {
  white-space: nowrap;
  // position: relative;
  width: 100%;
}

.cell {
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  margin: 0, auto;
}

/*分页器样式 */
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block {
  margin-top: 20px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

// 修改按钮样式
.ml-4 {
  .Edit {
    color: #fff9f9;
    width: 50px;
    background-color: #e0f56d;

    &:hover {
      background-color: #c4f024;
    }
  }

  // 删除按钮样式
  .Delete {
    color: #fff9f9;
    width: 50px;
    background-color: #f56c6c;

    &:hover {
      background-color: #f54646;
    }
  }
}

// 对话框样式
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 6px;
}

.avatar-uploader-icon {
  border-radius: 6px;
  border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

// 对话框确认、取消按钮样式
.el-button {
  min-width: 50px;
  color: #fff9f9;
  background-color: #3ba6ee;

  &:hover {
    background-color: #4daeee;
  }
}
</style>
