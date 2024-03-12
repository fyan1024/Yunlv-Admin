const db = wx.cloud.database();

Page({
  data: {
    bedinfo: [],
    userId: '',
    userName: '',
    avatarUrl: '',
    bedId: '',
    comments: [], // 存储查询到的留言数据
    bed: [],
    isChecked: false,
  },
  onLoad(options) {
    const user = wx.getStorageSync('userInfo');
    console.log("用户信息", user)
    this.setData({
      user: user,
      userId: user._id, // 确保这里的属性名与实际存储的key匹配
      userName: user.name,
      avatarUrl: user.avatarUrl
    })
    console.log("用户id", this.data.userId)
    const bedsId = options.id;
    // 发起网络请求，获取商品详情数据
    db.collection('Bed').doc(bedsId).get().then(res => {
      // 处理后台返回的商品信息
      const bedinfo = res.data;
      // 在页面中渲染商品信息
      this.setData({
        bedinfo: bedinfo,
        bedId: bedinfo._id
      });
      console.log("床铺ID", bedinfo._id)
    })
      .catch(error => {
        console.error('获取商品信息失败', error);
      });
  },
  onClickButton1() {
    const that = this
    // 初始化数据库引用
    const db = wx.cloud.database()
    // 获取 Bed 集合引用
    const bedCollection = db.collection('Bed')
    // 批量更新 Bed 集合中所有文档,添加 Is_pass 字段并设置为 true
    bedCollection.where({
      _id: this.data.bedId,
    }).update({
      data: {
        Is_pass: true,
        Is_checked: true,
      },
      success: res => {
        console.log('更新成功', res)
      },
      fail: err => {
        console.error('更新失败', err)
      }
    })
  },

  onClickButton2() {
    const that = this
    // 初始化数据库引用
    const db = wx.cloud.database()
    // 获取 Bed 集合引用
    const bedCollection = db.collection('Bed')
    // 批量更新 Bed 集合中所有文档,添加 Is_pass 字段并设置为 true
    bedCollection.where({
      _id: this.data.bedId,
    }).update({
      data: {
        Is_checked: true,
        Is_pass: false
      },
      success: res => {
        console.log('更新成功', res)
      },
      fail: err => {
        console.error('更新失败', err)
      }
    })
  },
});