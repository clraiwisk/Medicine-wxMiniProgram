// pages/collect/collect.js
const api = require("../../api/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[]
  },
  async remove(e){
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '真删？',
      complete: async (res) => {
        if (res.confirm) {
          await api.collect.removeCollect(id)
          const userId = wx.getStorageSync('userId')
          const collectList = await api.collect.getCollect(userId)
          this.setData({collectList})
          wx.showToast({
            title: '删除成功',
            type:"success"
          })
        }
        if (res.cancel) {
          return
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const userId = wx.getStorageSync('userId')
    const collectList = await api.collect.getCollect(userId)
    this.setData({collectList})
    console.log(this.data.collectList)
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
    const collectList = await api.collect.getCollect(userId)
    this.setData({collectList})
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