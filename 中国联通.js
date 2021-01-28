//联通话费查询小组件
//作者：kzddck
//微信公众号：kzddck
//更新时间2020.10.26
//支持自动签到


// chavy_tokenurl_10010
//修改为你的手机号
const Tel = ''
//修改为你的cookie，cookie获取方法，需安装Stream在联通客户端中进行抓包，不会操作请关注微信公众号：kzddck，回复201027获取使用方法
const Cookie = ''

let data = await getData()
let widget = await createWidget(data)
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()

async function createWidget(data) {
  let title = "中国联通"
  let img_url = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-imgbed/1b18de0d-38d2-4403-85a0-cba4d8e20f3c.png"
  const req = new Request(img_url)
  let img = await req.loadImage()
  let clr = new Color("fe8900")
  let w = new ListWidget()
  w.setPadding(16, 16, 12, 16)
//  let clr = Color.dynamic(new Color("000000", 1), new Color("ffffff", 1))
//  let w = new ListWidget()
//  w.setPadding(8, 16, 0, 16)
//  w.addSpacer(8)
  
// 透明背景配置
  const widgetConfigs = {
  widgetUsePicBackground: false, // 如需使用透明背景，请将false改为true，图片需要自己事先截好
  widgetPicBgCacheKey: "picBgCache",
 }
  const name = Script.name()
  const fm = FileManager.local()
  let bg_pic_cache_path = fm.joinPath(fm.documentsDirectory(), `lsp-bg_pic-cache-${name}`)
  if (widgetConfigs.widgetUsePicBackground) {
  let widgetBgImg = undefined
  if (config.runsInApp) {
    widgetBgImg = await Photos.fromLibrary()
    fm.writeImage(bg_pic_cache_path, widgetBgImg)
 } else {
    widgetBgImg = fm.readImage(bg_pic_cache_path)
}
  w.backgroundImage = widgetBgImg
}

// 显示图标和标题
  let titleStack = w.addStack()
  let topStack = titleStack.addStack()
  titleStack.layoutVertically()
  topStack.layoutHorizontally()
  topStack.centerAlignContent()
  let imgElement = topStack.addImage(img)
  topStack.addSpacer()
  let huafei = data.data.dataList[1];
  let titleElement = topStack.addText(huafei.number)
  titleElement.font = Font.boldSystemFont(22)
  titleElement.textColor = new Color("fa2d19")
  imgElement.imageSize = new Size(40, 40)
  titleStack.addSpacer()
// 流量
  let centerStack = titleStack.addStack()
  centerStack.layoutVertically()
  let c1 = centerStack.addStack()
  let t = "中国联通"
  let t1 = c1.addText(t)
  t1.font = Font.boldSystemFont(15)
  t1.textColor = new Color("#FF1493")
  centerStack.addSpacer(6)
  let c2 = centerStack.addStack()
  c2.layoutHorizontally()
  c2.centerAlignContent()
  let liuliang = data.data.dataList[0];
  /*let icon1 = c2.addImage(SFSymbol..named("antenna.radiowaves.left.and.right").image)*/
  const ic1 = SFSymbol.named("antenna.radiowaves.left.and.right")
  ic1.applyBlackWeight()
  let icon1 = c2.addImage(ic1.image)
  icon1.imageSize = new Size(13, 13)
  icon1.tintColor = clr
  c2.addSpacer(4)
  let date1 = c2.addText((liuliang.remainTitle)+'   '+(liuliang.number)+(liuliang.unit))
  date1.font = Font.systemFont(13)
  centerStack.addSpacer(8)


// 语音
  let c3 = centerStack.addStack()
  c3.layoutHorizontally()
  c3.centerAlignContent()
  let yuyin = data.data.dataList[2]; 
  let icon2 = c3.addImage(SFSymbol.named("phone.fill").image)
  icon2.imageSize = new Size(13, 13)
  icon2.tintColor = clr
  c3.addSpacer(4)
  let date3 = c3.addText((yuyin.remainTitle)+'   '+(yuyin.number)+(yuyin.unit))
  date3.font = Font.systemFont(13)
  centerStack.addSpacer(8)

// 积分
  let c4 = centerStack.addStack()
  c4.layoutHorizontally()
  c4.centerAlignContent()
  let jifen = data.data.dataList[3];
  let icon3 = c4.addImage(SFSymbol.named("tag.fill").image)
  icon3.imageSize = new Size(13, 13)
  icon3.tintColor = clr
  c4.addSpacer(4)
  let date4 = c4.addText((jifen.remainTitle)+'   '+(jifen.number)+"积分")
  date4.font = Font.systemFont(13)
//   titleStack.addSpacer(4)
// 签到
  /*let butoomStack = titleStack.addStack()
  butoomStack.layoutHorizontally()
  butoomStack.addSpacer()
  butoomStack.setPadding(0, 0, 0, 4)
  let gx = data.flush_date_time;
  let body = butoomStack.addText(gx)
  body.font = Font.lightRoundedSystemFont(10)
  body.textOpacity = 0.5*/
//   w.addSpacer()
  return w
}
async function getData() {
  var url= 'https://m.client.10010.com/mobileService/home/queryUserInfoSeven.htm?showType=3&version=iphone_c@7.0600&desmobiel='+Tel;
  var url1 = 'https://act.10010.com/SigninApp/signin/daySign'
  var req = new Request(url)
  
  req.headers = {'cookie': Cookie }
  console.log(req)
  var data = await req.loadJSON()
  console.log(data)
  var req1 = new Request(url1);
  req1.headers = {'cookie': Cookie }
  var data1 = await req1.loadJSON();
  return data
}
