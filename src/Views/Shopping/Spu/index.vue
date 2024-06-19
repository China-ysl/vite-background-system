<!--
  功能：spu数据展示组件
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
  <div>
    <!-- 引入三级分类组件 -->
    <Classify :scene="scene"></Classify>
    <el-card style="margin-top: 5px" shadow="always">
      <!-- 数据展示区 -->
      <div v-show="scene == 0">
        <!-- 头部按钮搜索框 -->
        <el-button class="button_add" type="primary" icon="Plus" plain @click="addSpu" style="width: 130px"
          :disabled="attrStore.Attr3Id ? false : true">
          添加SPU
        </el-button>
        <el-input :disabled="attrStore.Attr3Id ? false : true" v-model="spuNameForm"
          style="width: 240px;margin-left: 20px;" placeholder="SPU名称" @keyup.enter="getspulist" @clear="clearcontents"
          clearable="true" class="search">
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
        <el-button :disabled="attrStore.Attr3Id ? false : true" @click="getspulist" class="button_add" type="primary"
          icon="Search" style="margin-left: 20px; width: 50px">
          GO
        </el-button>
        <!-- 表单数据区 -->
        <el-table class="table_css" :data="spuList" border>
          <el-table-column class="column" type="index" align="center" label="序号" width="130" />
          <el-table-column class="column" align="center" label="SPU名称" min-width="150">
            <template #="{ row, $index }">
              <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{ row.spuname }}</pre>
            </template>
          </el-table-column>
          <el-table-column class="column" align="center" label="SPU描述" show-overflow-tooltip min-width="250">

            <template #="{ row, $index }">
              <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{ row.description }}</pre>
            </template>
          </el-table-column>
          <el-table-column class="column" prop="operate" align="center" label="SPU操作" min-width="250">
            <!-- 修改删除组件 -->
            <template #="{ row, $index }">
              <el-button-group class="ml-4">
                <el-button @click="handleAdd()" class="Plus" type="primary" icon="Plus" title="添加SKU" />
                <el-button @click="handleEdit($index, row)" class="Edit" type="primary" icon="Edit" title="修改SPU" />
                <el-button @click="handleInfoFilled($index, row)" class="InfoFilled" type="primary" icon="Files" title="查看SKU列表" />
                <el-button @click="handleDelete($index, row)" class="Delete" type="primary" icon="Delete" plain
                  title="删除SPU" />
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
          <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :disabled="disabled" :background="background" layout=" prev, pager, next, jumper, -> , sizes,total"
            :total="total" @size-change="changeSize" @current-change="getspulist" />
        </div>
      </div>
      <!-- 添加SPU|修改SPU子组件 -->
      <SpuForm v-show="scene == 1" :scene="scene" @CancelScene="CancelScene($event as unknown as number)"></SpuForm>
      <!-- SKU添加子组件 -->
      <SkuForm v-show="scene == 2" :scene="scene"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { getSPUList } from '../../../api/product/Spu/index'
import { getAllBrand } from '../../../api/product/brand/index'
import { SpuResponseData } from '../../../api/product/Spu/type'
import useattrStore from '../../../store/modules/attr'
import useSpuStore from '../../../store/modules/spu'
// 引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
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
let SpuStore = useSpuStore()
// 当前页码
let pageNum = ref<number>(1)
// 每页展示多少条数据
let pageSize = ref<number>(5)
// spu数据总条数
let total = ref<number>(0)
// disabled 是否禁用分页
let disabled = ref<boolean>(false)
// background=true 是否为分页按钮添加背景色
let background = ref<boolean>(true)
// spu数据
let spuList = ref<any>()
// 搜索框spu数据
let spuNameForm = ref<string>("")
// 获取SPU数据
const getspulist = async () => {
  let result: any = await getSPUList(pageNum.value, pageSize.value, attrStore.Attr3Id, spuNameForm.value)
  if (result.code == 200) {
    spuList.value = result.data.records
    total.value = parseInt(result.data.total)

  } else {
    return result.msg
  }
}
// 获取所有品牌数据
const getAllBrandValue = async () => {
    await SpuStore.getAllBrandList()
}
// 获取所有SPU图片数据
const getAllSpuImageList = async () => {
    await SpuStore.getAllSpuImageList()
}
// 监听attrStore.Attr3Id 数据是否变化
watch(() => attrStore.Attr3Id, () => {
  if (!attrStore.Attr3Id) return
  getspulist()
  getAllBrandValue()
  getAllSpuImageList()

})
// 切换路由时销毁pinia仓库存储的attr数据
onBeforeUnmount(() => {
  // 清空仓库数据调用仓库的$reset()方法清除
  attrStore.$reset()
})
// size发生改变回调
const changeSize = () => {
  // size改变时重置pageNum为第一页在发送请求
  pageNum.value = 1
  getspulist()
}
// 添加SPU回调
const addSpu =  () => {
  scene.value = 1
}
// 添加SKU回调
let handleAdd = ()=>{
  scene.value = 2
}
// 自定义子组件取消回调 接收子组件传值切换场景
const CancelScene = (num:number) => {
  scene.value = num
}
// 清除搜索框内容回调
let clearcontents = () => {
  console.log("清除搜索框内容回调");
  pageNum.value = 1
  spuNameForm.value = ''
  getspulist()

}
// 添加销售属性回调
const AddSell = () => {
  scene.value = 1
}
// 保存按钮回调
const AddSpuForm = () => {
  scene.value = 0
}
// 查看sku列表回调
const handleInfoFilled=($index: any, row: any)=>{
  
}
// 操作修改回调
const handleEdit = async ($index: any, row: any) => {
  scene.value = 1
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
.demo-pagination-block+.demo-pagination-block {
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
  .Plus {
    color: #fff9f9;
    width: 50px;
    background-color: #67c23a;

    &:hover {
      background-color: #67c23ada;
    }
  }

  .Edit {
    color: #fff9f9;
    width: 50px;
    background-color: #ffb341;

    &:hover {
      background-color: #d8942f;
    }
  }

  .InfoFilled {
    color: #fff9f9;
    width: 50px;
    background-color: #919191;

    &:hover {
      background-color: #6a6b6d;
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
