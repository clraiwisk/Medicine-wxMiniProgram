// pages/cart/cart.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:null,
    cartList: [],
    disableded: false,
    addressList: {},
    amount:'',
    model:{
      addressId: 0,
      amount:0,
      id:0,
      number:1,
      orderDetails:[],
      status:-1,
      userId:0
    }
  },
  goAddress(){
    if(this.data.userId !== null) {
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }else{
      wx.showToast({
        title: '请登录!',
        icon:"error"
      })
    }
  },
  async addOrder(e){
    this.data.model.orderDetails=[]
    let amount = 0
    this.data.cartList.forEach(item => {
      const itemAmount = item.productCount * item.productPrice
      amount = amount + itemAmount
    })
    this.data.cartList.forEach(item => {
      delete item.updateTime
      delete item.createTime
      delete item.id
      this.data.model.orderDetails.push(item)
    })
    this.setData({'model.amount': amount})
    const id = 0
    this.setData({'model.id': id})
    const userId = wx.getStorageSync('userId')
    this.setData({'model.userId': userId})
    
    // this.data.model.orderDetails.push()
    if(this.data.addressList === null) {
      wx.showToast({
        title: '请选择地址',
        icon:"error"
      })
      return
    }else{
      const addressId = this.data.addressList.id
      this.setData({'model.addressId': addressId})
      await api.order.addOrder(this.data.model)
      wx.showToast({
        title: '添加订单成功',
        type:"success"
      })
      this.setData({amount:0})
      console.log(this.data.cartList)
      const list = await api.cart.getCartList(userId)
      this.setData({'cartList': list.saleShopcarts})
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = wx.getStorageSync('userId')
    this.setData({userId: id})
    if(this.data.userId === '') return
    const list = await api.cart.getCartList(id)
    this.setData({'cartList': list.saleShopcarts})
    const addressList = await api.address.getAddress(id)
    this.setData({'addressList': addressList})
    // 
  },
  async addCount(e){
    const item = e.currentTarget.dataset.item
    const model = {
      id: item.id,
      value: item.productCount + 1
    }
    await api.cart.count(model)
    const id = wx.getStorageSync('userId')
    const list = await api.cart.getCartList(id)
    this.setData({'cartList': list.saleShopcarts})
    let amount = 0
    this.data.cartList.forEach(item => {
      const itemAmount = item.productCount * item.productPrice
      amount = amount + itemAmount
    })
    this.setData({amount})
  },
  async decCount(e){
    const item = e.currentTarget.dataset.item
    if(item.productCount === 2){
      this.setData({disableded: true})
    }
    const model = {
      id: item.id,
      value: item.productCount - 1
    }
    await api.cart.count(model)
    const id = wx.getStorageSync('userId')
    const list = await api.cart.getCartList(id)
    this.setData({'cartList': list.saleShopcarts})
    let amount = 0
    this.data.cartList.forEach(item => {
      const itemAmount = item.productCount * item.productPrice
      amount = amount + itemAmount
    })
    this.setData({amount})
  },
  async remove(e){
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '真删？',
      complete: async (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          await api.cart.removeCartList(id) 
          const userId = wx.getStorageSync('userId')
          const list = await api.cart.getCartList(userId)
          this.setData({'cartList': list.saleShopcarts})
          wx.showToast({
            title: '删除成功',
            type:"success"
          })
          let amount = 0
          this.data.cartList.forEach(item => {
            const itemAmount = item.productCount * item.productPrice
            amount = amount + itemAmount
          })
          this.setData({amount})
        }
      }
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
  async onShow() {
    const userId = wx.getStorageSync('userId')
    this.setData({userId})
    if(this.data.userId === '') return
    const list = await api.cart.getCartList(userId)
    this.setData({'cartList': list.saleShopcarts})
    const item = wx.getStorageSync('item')
    this.setData({'addressList': item})
    let amount = 0
    this.data.cartList.forEach(item => {
      const itemAmount = item.productCount * item.productPrice
      amount = amount + itemAmount
    })
    this.setData({amount})
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