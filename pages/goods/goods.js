// pages/goods/goods.js
const api = require("../../api/index")
const computedBehavior = require('miniprogram-computed').behavior
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    model:{
      userId:0,
      productId:0,
    },
    model2:{
      productCount: 0,
      productDesc: "",
      productId: 0,
      productImage: "",
      productName: "",
      productPrice: 0,
      productProduction: "",
      updateTime: "",
      userId: 0
    },
    historyModel:{
      id:0,
      product:{},
      productId:0,
      userId:0
    },
    collectList:[]
  },
  computed:{
    isCollect: data => data.collectList.find(item => item.productId === data.obj.id) === undefined ? false : true
  },
  async add(e){
    const item = this.data.obj
    this.setData({'model2.productCount': 1})
    this.setData({'model2.productDesc': item.dscp})
    this.setData({'model2.productId': item.id})
    this.setData({'model2.productImage': item.image})
    this.setData({'model2.productName': item.name})
    this.setData({'model2.productPrice': item.price})
    this.setData({'model2.productProduction': item.production})
    this.setData({'model2.userId': wx.getStorageSync('userId')})

    await api.category.addCart(this.data.model2)
    wx.showToast({
      title:"加入购物车成功",
      icon:"success"
    })
  },
  async addCollect() {
    const userId = wx.getStorageSync('userId')
    const productId = this.data.obj.id
    this.setData({'model.userId': userId})
    this.setData({'model.productId': productId})
    if(this.data.isCollect){
      const item = this.data.collectList.find(item => item.productId === this.data.obj.id)
      await api.collect.removeCollect(item.id)
      wx.showToast({
        title: '已取消收藏',
        type:"success"
      })
    }else{
      await api.collect.addCollect(this.data.model)
      wx.showToast({
        title: '已加入收藏',
        type:"success"
      })
    }
    const collectList = await api.collect.getCollect(userId)
    this.setData({collectList})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const cid = options.cid
    const item = await api.goods.getProduct(cid)
    this.setData({"obj": item})
    const userId = wx.getStorageSync('userId')
    const collectList = await api.collect.getCollect(userId)
    this.setData({collectList})
    this.setData({'historyModel.userId': userId})
    this.setData({'historyModel.productId': this.data.obj.id})
    this.setData({'historyModel.product': this.data.obj})
    delete this.data.historyModel.product.updateTime
    delete this.data.historyModel.product.createTime
    await api.history.addHistory(this.data.historyModel)
  },
  goCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
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