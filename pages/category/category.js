// pages/category/category.js
const computedBehavior = require('miniprogram-computed').behavior
const api = require("../../api/index.js")
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    activedId: 0,
    listSub: [],
    model:{
        productCount: 0,
        productDesc: "",
        productId: 0,
        productImage: "",
        productName: "",
        productPrice: 0,
        productProduction: "",
        updateTime: "",
        userId: 0
    }
  },
  async add(e){
    const item = e.currentTarget.dataset.item
    this.setData({'model.productCount': 1})
    this.setData({'model.productDesc': item.dscp})
    this.setData({'model.productId': item.id})
    this.setData({'model.productImage': item.image})
    this.setData({'model.productName': item.name})
    this.setData({'model.productPrice': item.price})
    this.setData({'model.productProduction': item.production})
    this.setData({'model.userId': wx.getStorageSync('userId')})

    await api.category.addCart(this.data.model)
    wx.lin.showToast({
      title:"加入购物车成功",
      icon:"success"
    })
  },
  onSelect(e) {
    if( this.data.activedId === e.currentTarget.dataset.id ) return
    this.setData({ activedId: e.currentTarget.dataset.id })
  },
  watch: {
    'activedId': async function(newValue) {
      const listSub = await api.category.getListSub(newValue)
      this.setData({listSub})
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const list = await api.category.getCategory()
    this.setData({'list': list})
    const listSub = await api.category.getListSub(8)
      this.setData({listSub})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})