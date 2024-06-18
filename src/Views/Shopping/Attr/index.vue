<template>
  <!-- 引入三级分类组件 -->
  <Classify :scene="scene"></Classify>
  <el-card style="margin-top: 5px" shadow="always">
    <el-input
      v-show="scene == 1"
      v-model="AttrValueForm.attrname"
      style="max-width: 600px"
    >
      <template #prepend>新增属性名称:</template>
    </el-input>
    <el-button
      v-show="scene == 0"
      class="button_add"
      type="primary"
      icon="Plus"
      plain
      @click="addAttr"
      :disabled="attrStore.Attr3Id ? false : true"
      style="width: 130px"
    >
      添加平台属性
    </el-button>
    <!-- 表单数据展示区场景 -->
    <div v-show="scene == 0">
      <el-table
        class="table_css"
        style="margin: 10px 0px"
        :data="attrStore.AttrValueList"
        border
      >
        <el-table-column
          class="column"
          type="index"
          align="center"
          label="序号"
          width="130"
        />
        <el-table-column
          class="column"
          align="center"
          label="属性名称"
          width="150"
        >
          <template #="{ row, $index }">
            <pre style="font-family: \5FAE\8F6F\96C5\9ED1">{{
              row.attrname
            }}</pre>
          </template>
        </el-table-column>
        <el-table-column
          class="column"
          align="center"
          label="属性值名称"
          min-width="300"
        >
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
              size="large"
              class="valuename-tag"
            >
              {{ item.valuename }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          class="column"
          prop="operate"
          align="center"
          label="操作"
          width="250"
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
                @click="platFormDelete($index, row)"
                class="Delete"
                type="primary"
                icon="Delete"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加修改平台属性场景 -->
    <div v-show="scene == 1">
      <el-table
        class="table_css"
        style="margin: 10px 0px"
        :data="AttrValueForm.attrValueList"
        border
      >
        <el-table-column
          class="column"
          type="index"
          align="center"
          label="序号"
          width="129"
        />
        <el-table-column class="column" label="添加属性值" min-width="300">
          <template #="{ row, $index }">
            <!-- 收集valuename -->
            <el-input
              v-if="row.pattern"
              :ref="(vc: any) => InputAttrList[$index] = vc"
              v-model="row.valuename"
              style="width: 240px"
              placeholder="Please Input"
              @blur="loseFocus(row, $index)"
            />
            <!-- 展示valuename -->
            <el-tag
              v-else
              @click="Editvaluename(row, $index)"
              size="large"
              class="valuename-tag"
            >
              {{ row.valuename }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 修改删除组件 -->
        <el-table-column
          class="column"
          prop="operate"
          align="center"
          label="操作"
          min-width="250"
        >
          <template #="{ row, $index }">
            <el-button-group class="ml-4">
              <el-button
                plain
                @click="handleDelete($index, row)"
                class="Delete"
                size="small"
                type="primary"
                icon="Delete"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button
      v-show="scene == 1"
      class="button_add"
      type="primary"
      plain
      @click="AddAttrValueName"
      :disabled="AttrValueForm.attrname ? false : true"
    >
      添加属性值
    </el-button>
    <el-button
      v-show="scene == 1"
      class="button_add"
      type="primary"
      plain
      @click="AddAttrValueForm"
      :disabled="AttrValueForm.attrValueList.length > 0 ? false : true"
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
  </el-card>
</template>

<script setup lang="ts">
import { AttrValueForm, valueidList } from '../../../api/product/Attr/type'
import {
  putAttrValueList,
  deleteValueList,
  getAttrValueList,
  removeValueList,
} from '../../../api/product/Attr/index'
import useattrStore from '../../../store/modules/attr'
import { reactive, ref, nextTick, onBeforeUnmount } from 'vue'
// 引入消息提示
import { ElMessage, ElMessageBox } from 'element-plus'
// attr仓库
let attrStore = useattrStore()
// 场景控制参数5cene=0，显示table,scene=1，展示添加与修改属性结构
let scene = ref<number>(0)
// 存储input组件实例AttrInputList
let InputAttrList = ref<any>([])
let disabledvalue = ref<boolean>(true)
// 储存删除属性值的list
let valueAll = reactive<valueidList>({
  idList: [],
})
// 收集新增的数据
let AttrValueForm = reactive<AttrValueForm>({
  id: '',
  attrname: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})

// 取消添加场景回调
const CancelScene = async () => {
  AttrValueForm.attrname = ''
  // attrStore.getVauleList()
  scene.value = 0
}
// 添加属性名称回调
const AddAttrValueName = () => {
  console.log('添加属性名称回调' + AttrValueForm.id)
  AttrValueForm.attrValueList.push({
    attrid: AttrValueForm.id,
    valuename: '',
    pattern: true,
  })
  nextTick(() => {
    InputAttrList.value[AttrValueForm.attrValueList.length - 1].focus()
  })
}
// 保存按钮回调
const AddAttrValueForm = async () => {
  console.log('保存按钮回调')
  // 格式化valueAll.idList 里的id集合格式为 1,2,3,4,5，...
  const idsAsString = valueAll.idList
    .map((obj) => parseInt(obj.id, 10)) // 提取ID并转换为整数
    .sort((a, b) => a - b) // 对ID进行排序
    .join(',') // 将ID连接成字符串
  console.log('删除的id集合:' + idsAsString)
  if (idsAsString != '') {
    // 删除属性值方法
    console.log('删除属性值方法:' + idsAsString)
    let result = await deleteValueList(idsAsString)
    if (result.code == 200) {
      // 关闭添加属性值场景
      attrStore.getVauleList()
      scene.value = 0
      // 提示添加成功
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: result.msg,
      })
    }
  } else {
    // 更新属性名称属性值方法
    let result = await putAttrValueList(AttrValueForm)
    console.log('更新属性名称属性值方法:' + result)
    if (result.code == 200) {
      // 更新数据
      attrStore.getVauleList()
      // 关闭添加属性值场景
      scene.value = 0
      // 提示添加成功
      ElMessage({
        type: 'success',
        message: AttrValueForm.id ? '修改成功' : '添加成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '新增属性名重复！',
      })
    }
  }
}
// 修改属性按钮回调
const handleEdit = (index: number, row: any) => {
  // 合并数组
  // 浅拷贝 地址指向同一个
  // Object.assign(AttrValueForm,row)
  // 深拷贝数据
  Object.assign(AttrValueForm, JSON.parse(JSON.stringify(row)))
  // 切换场景
  scene.value = 1
}
// 平台删除属性回调
const platFormDelete = async ($index: number, row: any) => {
  ElMessageBox.confirm(
    '确定删除当前平台属性：' + row.attrname + '?',
    '删除' + row.attrname + '属性',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      autofocus: false,
    },
  )
    .then(async () => {
      await console.log(row)
      await console.log(row.id)
      let result: any = await removeValueList(row.id)
      if (result.data == true) {
        // 提示添加成功
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      } else {
        ElMessage({
          type: 'success',
          message: '删除失败',
        })
      }
      attrStore.getVauleList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 删除属性值按钮回调
const handleDelete = async (index: number, row: any) => {
  AttrValueForm.attrValueList.splice(index, 1)
  await console.log(row.id)
  valueAll.idList.push({
    id: row.id,
  })
}
// 添加平台属性按钮回调
const addAttr = () => {
  console.log('添加平台属性按钮回调:' + AttrValueForm.id)
  Object.assign(AttrValueForm, {
    id: '',
    attrname: '',
    categoryId: attrStore.Attr3Id,
    categoryLevel: 3,
    attrValueList: [],
  })
  // 切换场景
  scene.value = 1
}
// 输入框失去焦点回调
const loseFocus = (row: any, $index: any) => {
  // 判断框是否有值
  if (row.valuename == '') {
    // 删除属性值为空的对象
    AttrValueForm.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  } else {
    let repeat = AttrValueForm.attrValueList.find((time) => {
      if (time != row) {
        return time.valuename === row.valuename
      }
    })
    if (repeat) {
      // 删除属性值重复的对象
      AttrValueForm.attrValueList.splice($index, 1)
      ElMessage({
        type: 'error',
        message: '属性值不能重复',
      })
      return
    }
    row.pattern = false
  }
}
// 显示模式切换回调
const Editvaluename = (row: any, $index: any) => {
  row.pattern = true
  nextTick(() => {
    InputAttrList.value[$index].focus()
  })
}
// 生命周期钩子 onBeforeUnmount在组件实例被卸载之前调用
// 切换路由时销毁pinia仓库存储的attr数据
onBeforeUnmount(() => {
  // 清空仓库数据调用仓库的$reset()方法清除
  attrStore.$reset()
})
</script>

<style class="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.el-card__body {
  padding: 0;
}

.button_add {
  background-color: rgb(60, 213, 233);
}

.valuename-tag {
  font-family: \5FAE\8F6F\96C5\9ED1;
  margin: 5px;
}

/* 修改删除按钮样式 */
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

@media screen and (max-width: 1000px) {
  .el-card {
    height: 180px;
    display: block;
  }
}
</style>
