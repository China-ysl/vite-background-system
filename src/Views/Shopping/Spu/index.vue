<template>
  <div>
    <!-- 引入三级分类组件 -->
    <Classify :scene="scene"></Classify>
    <!-- 数据展示区 -->
    <el-card style="margin-top: 5px" shadow="always">
      <el-button
        v-show="scene == 0"
        class="button_add"
        type="primary"
        icon="Plus"
        plain
        @click="addSpu"
        style="width: 130px"
      >
        添加SPU
      </el-button>

      <!-- 表单数据区 -->
      <el-table v-show="scene == 0" class="table_css" :data="spuList" border>
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
          label="SPU名称"
          min-width="200"
        >
          <template #="{ row, $index }">
            <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{
              row.spuname
            }}</pre>
          </template>
        </el-table-column>
        <el-table-column
          class="column"
          align="center"
          label="SPU描述"
          min-width="200"
        >
          <template #="{ row, $index }">
            <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{
              row.description
            }}</pre>
          </template>
        </el-table-column>
        <el-table-column
          class="column"
          prop="operate"
          align="center"
          label="SPU操作"
          min-width="200"
        >
          <!-- 修改删除组件 -->

          <template #="{ row, $index }">
            <el-button-group class="ml-4">
              <el-button
                @click="handleEdit($index, row)"
                class="Edit"
                type="primary"
                icon="Edit"
              />
              <el-button
                plain
                @click="handleDelete($index, row)"
                class="Delete"
                type="primary"
                icon="Delete"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- from表单数据收集区 -->
      <el-form v-show="scene == 1">
        <el-form-item label="SPU品牌:" prop="sputext">
          <el-select v-model="spuForm.sputext" placeholder="选择SPU品牌">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU名称:" prop="spuname">
          <el-input v-model="spuForm.spuname" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU描述:" prop="spuname">
          <el-input
            v-model="spuForm.spuname"
            type="textarea"
            placeholder="请输入SPU描述"
          />
        </el-form-item>

        <el-form-item label="SPU图片:">
          <!-- 上传spu图片框 -->
          <el-upload
            v-show="scene == 1"
            v-model:file-list="fileList"
            action="http://localhost:8989/Shopping/img"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <!-- 按键操作区 -->
      <div>
        <el-button
          v-show="scene == 1"
          class="button_add"
          type="primary"
          plain
          @click="AddSell"
        >
          添加销售属性
        </el-button>
        <el-button
          v-show="scene == 1"
          class="button_add"
          type="primary"
          plain
          @click="AddSpuForm"
        >
          保存
        </el-button>
        <el-button
          v-show="scene == 1"
          class="button_add"
          type="primary"
          plain
          @click="CancelScene"
        >
          取消
        </el-button>
      </div>
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
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :disabled="disabled"
          :background="background"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @size-change="changeSize"
          @current-change="getspulist"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { getSPUList } from '../../../api/product/Spu/index'
import { SpuResponseData } from '../../../api/product/Spu/type'
import useattrStore from '../../../store/modules/attr'
// 引入消息提示
import { ElMessage, ElMessageBox } from 'element-plus'
// 场景控制参数5cene=0，显示table,scene=1，展示添加与修改属性结构
let scene = ref<number>(0)
// SPU form表单
const spuForm = reactive<any>({
  spuname: '',
  sputext: '',
})
// attr仓库
let attrStore = useattrStore()
// spuName
let spuName = ref<any>()
// 当前页码
let pageNum = ref<number>(1)
// 每页展示多少条数据
let pageSize = ref<number>(5)
// spu数据总条数
let total = ref<number | string>(0)
// disabled 是否禁用分页
let disabled = ref<boolean>(false)
// background=true 是否为分页按钮添加背景色
let background = ref<boolean>(true)
// spuList
let spuList = ref<any>()
// 搜索框spu数据
let spuNameForm = ref<string>('啊')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref<any[]>([])
// 请求SPU数据方法
const getspulist = async () => {
  console.log('请求SPU数据方法')
  let result: any = await getSPUList(
    pageNum.value,
    pageSize.value,
    attrStore.Attr3Id,
    spuNameForm.value,
  )
  if (result.code == 200) {
    spuList.value = result.data.records
    total.value = Number(result.data.total)
  } else {
    return console.log(result.msg)
  }
}
// 生命周期函数onMounted 组件挂载前
onMounted(() => {
  getspulist()
})

// size发生改变回调
const changeSize = () => {
  // size改变时重置pageNum为第一页在发送请求
  pageNum.value = 1
  getspulist()
}

// spu图片删除回调
const handleRemove: any['onRemove'] = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}
// spu图片预览回调
const handlePictureCardPreview: any['onPreview'] = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 添加SPU回调
const addSpu = () => {
  scene.value = 1
}
// 添加销售属性回调
const AddSell = () => {
  scene.value = 1
}
// 保存按钮回调
const AddSpuForm = () => {
  scene.value = 0
}
// 取消回调
const CancelScene = () => {
  scene.value = 0
}
// 操作修改回调
const handleEdit = ($index: any, row: any) => {
  scene.value = 0
}
// 操作删除回调
const handleDelete = ($index: any, row: any) => {
  scene.value = 0
}
</script>

<style class="scss" scoped>
.button_add {
  background-color: rgb(60, 213, 233);
}

.table_css {
  margin: 10px 0px;
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

/* 修改按钮样式 */
.ml-4 {
  .Edit {
    color: #fff9f9;
    width: 50px;
    background-color: #e0f56d;

    &:hover {
      background-color: #c4f024;
    }
  }

  /* 删除按钮样式 */
  .Delete {
    color: #fff9f9;
    width: 50px;
    background-color: #f56c6c;

    &:hover {
      background-color: #f54646;
    }
  }
}
</style>
