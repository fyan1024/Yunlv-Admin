// pages/checkreport/checkreport.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: [],
  },
  onChange(event) {
    let statusText = '';
    if (event.detail.name === 0) {
      statusText = '未验证身份';
    } else if (event.detail.name === 1) {
      statusText = '已验证身份';
    }
    wx.showToast({
      title: `${statusText}`,
      icon: 'none',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetUserData();
  },

  GetUserData() {
    db.collection('User').get({
      success: (resUser) => {
        console.log('查询用户成功，所有数据：', resUser.data);
        this.setData({
          userData: resUser.data,
        });
      },
      fail: (err) => {
        console.error('查询用户失败：', err);
      },
    });
  },

  showUserDetail(event) {
    const that = this;

    const index = event.currentTarget.dataset.index;
    const userInfo = this.data.userData[index];

    wx.showModal({
      title: '用户详细信息',
      content: `用户-${userInfo.User_name}  密码-${userInfo.passWord} 电话-${userInfo.phone}`,
      showCancel: false,
    });
  },

  showPage(event) {
    const that = this;
    const index = event.currentTarget.dataset.index;
    const userInfo = this.data.userData[index];
    console.log(userInfo)
    if (userInfo.Code) {
      console.log(1)
      wx.navigateTo({
        url: `/pages/webpage/webpage?code=${userInfo.Code}`,
      });
    } else {
      wx.showModal({
        title: '错误',
        content: '用户未填写学信网验证代码',
        showCancel: false,
      });
    }
  },

  showResult(event) {
    const that = this
    const index = event.currentTarget.dataset.index;
    const userInfo = this.data.userData[index];
    console.log(userInfo)
    wx.showModal({
      title: '确认更新数据',
      content: '是否确定更新用户数据？',
      success(res) {
        if (res.confirm) {
          // 用户点击确定，调用更新用户数据的函数
          that.updateUser(userInfo._id);
        }
      }
    });
  },

  updateUser(uid) {
    // 假设用户数据在 'user' 集合中
    const db = wx.cloud.database();
    const userCollection = db.collection('User');

    // 假设用户的 openid 是 '用户的openid'
    const id = uid
    console.log('ss', id)

    // 更新用户数据
    userCollection.doc(id).update({
      data: {
        Is_student: true // 修改为 data 字段以及正确的数据格式
      },
      success: res => {
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });
      },
      fail: err => {
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
        console.error('更新用户数据失败：', err);
      }
    });
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