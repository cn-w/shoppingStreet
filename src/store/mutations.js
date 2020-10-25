import Vue from "vue";

export default {
  //添加商品数量
  addMerchandise(state, index) {
    state.cartGoods[index].count++
  },
  //添加新商品
  addNewMerchandise(state, goods) {
    state.cartGoods.push(goods)
    // Vue.set(state.goods, 'iid', goods)
  },
  //减少商品数量
  subMerchandise(state, index) {
    state.cartGoods[index].count--
  },
  //移除商品

  deleteMerchandise(state, index) {
    state.cartGoods.splice(index, 1)
  },

  //全选商品
  selectAll(state, isSelectAll) {
    for (let item of state.cartGoods) {
      // console.log(item);
      item.select = isSelectAll
    }
  },
  //商品选择
  select(state, index, isSelect) {
    state.cartGoods[index].select = isSelect
  }


}