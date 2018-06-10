
const audioApi = require('../../config/audioApi.js');
var app = getApp();
let rotate = 0;
Page({
  onReady: function() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  data: {
    name: '', // 歌曲名称
    musicUrl: '', // 歌曲链接地址
    picUrl: '', // 专辑图片地址
    page: '', // 网易云音乐的歌曲链接
    singer: '', //歌手名称
    input: '', // 输入框的内容
    transform: '', // 旋转动画属性
    rotateFlag: false, // 控制专辑图片旋转
    showContainer: true, // 展示音乐播放器或音乐播放列表
    list: [], // 搜索音乐播放列表
    songRec: []
  },
  // 专辑图片旋转函数
  myRotate: function() {
    rotate++;
    let transform = `transform:rotate(${rotate}deg);`;
    this.setData({
      transform,
    });
    const animation = setTimeout(() => {
      this.myRotate();
    }, 30);
    if (!this.data.rotateFlag) {
      clearTimeout(animation);
    };
  },
  // 控制专辑图片旋转
  toggleRotate: function() {
    if (this.data.rotateFlag) {
      this.pauseMusic();
      this.audioCtx.pause();
    } else {
      this.playMusic();
      this.audioCtx.play();
    }
  },
  // 播放音乐
  playMusic: function() {
    this.setData({
      rotateFlag: true,
    });
    this.myRotate();
  },
  // 暂停播放音乐
  pauseMusic: function() {
    this.setData({
      rotateFlag: false,
    });
  },
  // bindMusicNameInput监听用户输入
  bindMusicNameInput: function(e) {
    this.setData({
      input: e.detail.value,
    });
  },
  // bindSearch搜索按钮触发
  bindSearch: function(e) {
    this.getMusicInfos(this.data.input);
  },
  // getMusicInfos发送http请求
  getMusicInfos: function(musicname) {
    wx.request({
      method: 'POST',
      url: audioApi.searchpc, //访问node端后台接口
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        s: musicname,
        offset: 0,
        limit : 20,
        type : '1',
        //歌曲 1 专辑 10 歌手 100 歌单 1000 用户 1002 mv 1004 歌词 1006 主播电台 1009
      },
      success: (res) => {
        // 把返回的歌曲列表设定为list中的数据
        this.setData({
          list: res.data,
          showContainer: false,
        });
      },
      error: () => {
        console.log('err');
      }
    });
  },
  // 列表音乐函数
  changeMusic: function (e) {
    // 获取歌曲列表详细内容
    var infos = this.data.list[e.target.dataset.musicindex];
    this.setData(infos);
    this.setData({
      showContainer: true,
      input: '',
    });
  },
  // onLoad为生命周期函数
  onLoad: function() {
    // 默认播放歌曲
    this.getPlayList();
    this.getNetInfo();
  },
  getPlayList: function () {
    wx.request({
      url: audioApi.host + audioApi.playlist || '',
      method: 'GET',
      data: {
        id: audioApi.hotlistid
      },
      success: (res) => {
        let rec = []
        let that = this
        let songlist = res.data.result.tracks;
        let code = res.data.code
        let title, author, album, album_title, song_id;
        if (code == 200) {
          for (let i = 0, len = 10; i < len; i++) {
            title = songlist[i].name;
            author = songlist[i].artists[0].name;
            album = songlist[i].album.picUrl;
            album_title = songlist[i].album.name;
            song_id = songlist[i].id;
            rec.push({
              "title": title,
              "author": author,
              "album": album,
              "album_title": album_title,
              "song_id": song_id
            })
          }
          that.setData({
            songRec: rec
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  playSong: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../player/player?id=' + id
    })
  },
  getNetInfo: function () {
    wx.getNetworkType({
      success: (e) => {
        var type = e.networkType
        if (type != 'wifi') {
          wx.showModal({
            content: '您正在使用' + type + '网络。请注意流量。',
            confirmText: '知道了',
            confirmColor: '#D81E06',
            showCancel: false
          })
        }
      }
    })
  }
})