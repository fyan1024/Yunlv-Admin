// pages/checkbed/checkbed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unCheckedBeds: [], // 存储未审核的床位数据
    unPassedBeds: [], // 存储审核未通过的床位数据
    PassedBeds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.ifCheck()
    this.watchBedDataChanges()
  },
  ifCheck() {
    const db = wx.cloud.database()
    const bedCollection = db.collection('Bed')
    bedCollection.where({
      Is_checked: false
    })
      .get()
      .then(res => {
        this.setData({
          unCheckedBeds: res.data // 将查询结果设置到 data 中
        })
      })
      .catch(err => {
        console.error('获取数据失败', err)
      })
    // 查询审核未通过的床位数据
    bedCollection.where({
      Is_pass: false
    }).get({
      success: res => {
        this.setData({
          unPassedBeds: res.data
        })
      },
      fail: err => {
        console.error('获取审核未通过床位数据失败', err)
      }
    })
    // 查询审核未通过的床位数据
    bedCollection.where({
      Is_pass: true
    }).get({
      success: res => {
        this.setData({
          PassedBeds: res.data
        })
      },
      fail: err => {
        console.error('获取审核未通过床位数据失败', err)
      }
    })
  },

  watchBedDataChanges() {
    const db = wx.cloud.database()
    const bedCollection = db.collection('Bed')
    // 监听未审核床位数据变化
    const unCheckedBedWatcher = bedCollection.where({
      Is_checked: false
    }).watch({
      onChange: snapshot => {
        this.setData({
          unCheckedBeds: snapshot.docs
        })
      },
      onError: err => {
        console.error('监听未审核床位数据变化失败', err)
      }
    })
    // 监听审核未通过床位数据变化
    const unPassedBedWatcher = bedCollection.where({
      Is_pass: false
    }).watch({
      onChange: snapshot => {
        this.setData({
          unPassedBeds: snapshot.docs
        })
      },
      onError: err => {
        console.error('监听审核未通过床位数据变化失败', err)
      }
    })
    // 监听审核未通过床位数据变化
    const PassedBedWatcher = bedCollection.where({
      Is_pass: true
    }).watch({
      onChange: snapshot => {
        this.setData({
          PassedBeds: snapshot.docs
        })
      },
      onError: err => {
        console.error('监听审核通过床位数据变化失败', err)
      }
    })
    // 在页面卸载时关闭监听器
    this.onUnload = () => {
      unCheckedBedWatcher.close()
      unPassedBedWatcher.close()
      PassedBedWatcher.close()
    }
  },
  goToDetail(event) {
    const bedsId = event.currentTarget.dataset.bedsId;
    console.log(bedsId)
    wx.navigateTo({
      url: `/pages/bedinfo/bedinfo?id=${bedsId}`,
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