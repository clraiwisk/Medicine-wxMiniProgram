// pages/address/address.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
          await api.address.removeAddress(id)
          const userId = wx.getStorageSync('userId')
          const list = await api.address.getUserAddress(userId)
          this.setData({ list })
          wx.showToast({
            title: '删除成功',
            type:"success"
          })
        }
      }
    })
  },
  back(){
    wx.navigateBack()
  },
  goCart(e){
    const item = e.currentTarget.dataset.item
    const item2 = wx.getStorageSync('item')
    if(item2.length > 0) wx.removeStorageSync('item')
    wx.setStorageSync('item', item)
    wx.switchTab({
      url: `/pages/cart/cart`,
    })
  },
  beginAdd() {
    wx.navigateTo({
      url: '/pages/address/edit/edit',
      events: {
        ok: async model => {
          await api.address.addAddress(model)
          const userId = wx.getStorageSync('userId')
          const list = await api.address.getUserAddress(userId)
          this.setData({ list })
        }
      },
    })
  },
  async beginUpdate(e) {
    const id = e.currentTarget.dataset.id
    const target = await api.address.getAddress(id)
    wx.navigateTo({
      url: '/pages/address/edit/edit',
      events: {
        ok: async model => {
          delete model.updateTime
          delete model.createTime
          await api.address.updateAddress(model)
          const userId = wx.getStorageSync('userId')
          const list = await api.address.getUserAddress(userId)
          this.setData({ list })
          console.log(this.data.list)
        }
      },
      success: function(res) {
        res.eventChannel.emit('beginUpdate', {...target})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = wx.getStorageSync('userId')
    const list = await api.address.getUserAddress(id)
    this.setData({'list': list})
    console.log(this.data.list)
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