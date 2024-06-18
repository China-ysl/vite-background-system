<template>
  <el-card style="width: 100%">
    <!-- header头部 -->
    <template #header>
      <div class="card-header">
        <el-button class="button_icon" type="primary" icon="Plus">
          添加产品
        </el-button>
        <el-input
          v-model="brandName"
          style="width: 240px"
          placeholder="Type something"
          class="search"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" loading>
          <template #loading>
            <div class="custom-loading">
              <svg class="circular" viewBox="-10, -10, 50, 50">
                <path
                  class="path"
                  d="
              M 30 15
              L 28 17
              M 25.61 25.61
              A 15 15, 0, 0, 1, 15 30
              A 15 15, 0, 1, 1, 27.99 7.5
              L 15 15
            "
                  style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                />
              </svg>
            </div>
          </template>
          GO
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
        label="产品名称"
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
        type="index"
        align="center"
        label="规格"
        width="100"
      />
      <el-table-column
        class="column"
        type="index"
        align="center"
        label="条码"
        width="100"
      />
      、
      <el-table-column
        class="column"
        type="index"
        align="center"
        label="价格"
        width="100"
      />
      <el-table-column
        class="column"
        type="index"
        align="center"
        label="库存"
        width="100"
      />
      <el-table-column
        class="column"
        align="center"
        label="产品图片"
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
        type="index"
        align="center"
        label="产品介绍"
        width="100"
      />
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
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button class="Edit" type="primary" :icon="Edit" />
            <el-button class="Delete" type="primary" :icon="Delete" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
      v-model:current-page="" 设置分页器当前页码
      v-model:page-size="" 设置分页器当前每页展示数据条数  
      background=true 设置是否有背景
      layout 组件布局
      -->
    <div class="demo-pagination-block">
      <el-pagination
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
</template>

<script lang="ts" setup>
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getBrandList } from '../../../api/product/brand/index'
import 'element-plus/dist/index.css'
import { BrandList } from '../../../api/product/brand/type'
// 当前页码
let pageNum = ref<number>(1)
// 每页展示多少条数据
let pageSize = ref<number>(5)
// background=true 设置是否有背景
let background = ref<boolean>(true)
let disabled = ref<boolean>(false)
// 模糊搜索——品牌名
let brandName = ref<string>('')
// 品牌总数
let total = ref<number>(0)
// 服务器返回的品牌数据
let BrandList = ref<BrandList>()

const getlist = async () => {
  let result = await getBrandList(
    pageNum.value,
    pageSize.value,
    brandName.value,
  )
  if (result.code == 200) {
    console.log(result.data)

    total.value = result.data.total
    BrandList.value = result.data.shoppingList
  } else {
    return console.log(result.msg)
  }
}
// 生命周期函数onMounted 组件挂载前
onMounted(() => {
  getlist()
})
// const handleEdit = (index: number, row: User) => {
//   console.log(index, row)
// }
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }
</script>

<style scoped lang="scss">
// 添加品牌按钮样式
.button_icon {
  background-color: rgb(13, 156, 252);
  width: 100px;
}
// 搜索按钮样式
.is-loading {
  width: 50px;
  margin-left: 50px;
  left: 20px;
  background-color: #8ee463;
}
.search {
  left: 50px;
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

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
// 修改按钮样式
.ml-4 {
  .Edit {
    color: #fff9f9;
    width: 50px;
    background-color: #8ee463;

    &:hover {
      background-color: #67c23a;
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
</style>
