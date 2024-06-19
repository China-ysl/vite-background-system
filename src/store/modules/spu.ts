// 引入pinia仓库
import { defineStore } from 'pinia'
// 引入attr api
import { } from '../../api/product/Spu/index'
import { getAllBrand } from '../../api/product/brand/index'
import { getSPUImage } from '../../api/product/Spu/index'
let useSpuStore = defineStore('SpuStore', {
    state: (): any => {
        return {
            spuImageList: [],
            spuPosterList: [],
            nullspuSaleAttrList: [],
        }
    },
    actions: {
        // 获取所有品牌数据
        async getAllBrandList() {
            let result = await getAllBrand()
            if (result.code == 200) {
                this.spuPosterList = result.data
            } else {
                return result.msg
            }
        },
        // 获取所有SPU图片数据
        async getAllSpuImageList(){
            let result = await getSPUImage()
            if (result.code == 200) {
                this.spuImageList = result.data
            } else {
                return result.msg
            }
        }
    },
    getters: {}
})
export default useSpuStore