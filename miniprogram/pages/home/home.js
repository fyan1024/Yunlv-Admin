// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

    // 展示数据按钮跳转
  showData: function() {
    wx.navigateTo({
      url: '/pages/adminViz/adminViz'
    });
  },
  
  // 审核床源按钮跳转  
  auditBed: function() {
    wx.navigateTo({
      url: '/pages/checkbed/checkbed'
    });
  },
  
  auditIdentity: function() {
    wx.navigateTo({
      url: '/pages/checkstudent/checkstudent'
    });
  },

  auditReport: function() {
    wx.navigateTo({
      url: '/pages/checkreport/checkreport'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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