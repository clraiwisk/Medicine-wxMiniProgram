// pages/order/order.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    status:10
  },
  async goExid(e) {
    const id = e.currentTarget.dataset.id
    await api.order.updateOrder({id,status:3}) 
    wx.showToast({
      title: '已申请退货！',
      type:"success"
    })
    const userId = wx.getStorageSync('userId')
    const list = await api.order.getOrderList(userId)
    this.setData({orderList: list})
  },
  async goPay(e){
    const id = e.currentTarget.dataset.id
    await api.order.updateOrder({id,status:0}) 
    wx.showToast({
      title: '支付成功！',
      type:"success"
    })
    const userId = wx.getStorageSync('userId')
    const list = await api.order.getOrderList(userId)
    this.setData({orderList: list})
  },
  async cancal(e){
    const id =  e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '真删？',
      complete: async (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          await api.order.removeOrder(id) 
          // const userId = wx.getStorageSync('userId')
          const list = await api.order.getStatusOrder(this.data.status)
          this.setData({orderList: list})
          wx.showToast({
            title: '删除成功',
            type:"success"
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({'orderList': JSON.parse(options.list)})
    this.setData({status: parseInt(options.s)})
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