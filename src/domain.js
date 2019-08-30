const domin = 'http://192.168.1.198:8085'
export default {
	httpUrl:domin,
	realnameCheck:'',  //实名认证状态
	tabactive:0,
	masterOrderTakingId:'', //工人订单  -- 列表ID
	projectOrderNo:'',      //订单号
	masterId:'',             //工人ID
	operatingId:'',         //运营ID
	projectOrderItemId:'',   //订单中项目ID
	getCode:'/api/master/login/getCode',                                                //获取验证码接口
	phoneLogin:'/api/master/phoneLogin',                                                   //工人手机验证码登录
	findByMasterOrderList:'/api/masterOrderTaking/findByMasterOrderList',                  //订单列表 根据订单状态拉取订单列表
	realnameStatus:'/api/master/realnameStatus',							               //获取实名认证信息
	masterAcceptance:'/api/masterOrderTaking/masterAcceptance',                            //订单列表 订单详情 工人点击接单
	masterOrderDetail:'/api/masterOrderTaking/masterOrderDetail',                          //订单详情接口
	masterOrderCheckTheAcceptance:'/api/masterOrderTaking/masterOrderCheckTheAcceptance',  //点击验收订单
	acceptanceUploadImage:'/api/masterOrderTaking/acceptanceUploadImage',                  //Base64编码图片上传
	masterClockin:'/api/masterClockinRecord/masterClockin',                                //打卡
	findByDateClockinRecord:'/api/masterClockinRecord/findByDateClockinRecord',			   //根据日期返回打卡记录
	realnameCheck:'/api/master/realnameCheck',                                             //工人端实名认证信息提交
	realnameStatus:'/api/master/realnameStatus',                                           //获取实名认证信息
	getMonthTotalHour:'/api/masterClockinRecord/getMonthTotalHour',                        //工人本月累计工时
	findByMonthClockinRecord:"/api/masterClockinRecord/findByMonthClockinRecord",          //选择月份，根据月份查询当月打卡记录
	findBySkillList:'/api/skill/findBySkillList',                                          //获取工人端技能列表
	logout:'/api/master/logout',															//退出
	acceptanceUploadImage:'/api/masterOrderTaking/acceptanceUploadImage',                   //图片上传接口
	selectByDateClockIns:'/api/masterOrderTaking/selectByDateClockIns',                     //个人中心打卡接口
	updateMasterInfo:'/api/master/updateMasterInfo',                                        //个人资料 - 修改工人信息
	findByMasterOne:'/api/master/findByMasterOne',                                          //查询工人信息，根据工人ID
	getWorkingHoursBalance:'/api/master/getWorkingHoursBalance',                            //查询工人总工时(已结算)、本月工时(未结算)、余额
	getAnnouncementListByMasterId:'/api/announcement/getAnnouncementListByMasterId',        //公告页面 - 消息反馈通知接口
	selectIsNotNewAnnouncement:'/api/announcement/selectIsNotNewAnnouncement',              //个人中心 - 根据返回状态展示消息图标上的红点
	updateNoticeReadTimeByMasterId:'/api/master/updateNoticeReadTimeByMasterId',            //公告页面 - 修改工人端公告通知阅读时间
	authCode:'/api/master_wx/authCode',                                                     //查询openid,返回用户登录状态码
	insert:'/api/feedback/insert'                                                           //意见反馈
}
