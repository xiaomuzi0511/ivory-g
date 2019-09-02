import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import privacypolicy from '@/pages/privacypolicy/privacypolicy'
import agreement from '@/pages/agreement/agreement'
import passlogin from '@/pages/passlogin/passlogin'
import register from '@/pages/register/register'
import forgetpass from '@/pages/forgetpass/forgetpass'
import home from '@/pages/home/home'
import my from '@/pages/my/my'
import details from '@/pages/details/details'
import attendance from '@/pages/attendance/attendance'
import statistics from '@/pages/statistics/statistics'
import certification from '@/pages/certification/certification'
import skillDetails from "@/pages/skillDetails/skillDetails"
import regulation from "@/pages/regulation/regulation"
import withdraw from "@/pages/withdraw/withdraw"
import addCard from '@/pages/addCard/addCard'
import income from '@/pages/income/income'
import worktype from "@/pages/worktype/worktype"
import verifycomplete from '@/pages/verifycomplete/verifycomplete'
import site from '@/pages/site/site'
import SystemMessages from '@/pages/SystemMessages/SystemMessages'  //系统消息
//import index from '@/pages/index/index'
import essentialInfo from '@/pages/essentialInfo/essentialInfo'     //基础信息
import personalData from '@/pages/personalData/personalData'        //个人资料
import authentication from "@/pages/authentication/authentication"  //身份验证
import fill_In_infon from '@/pages/fill_In_infon/fill_In_infon'
import viewInformation from '@/pages/viewInformation/viewInformation'   //个人资料查看信息
import certificate from '@/pages/certificate/certificate'
import book from '@/pages/book/book'
import bookList from '@/pages/bookList/bookList'
import bookPersonal from '@/pages/bookPersonal/bookPersonal'
import bookmyteam from '@/pages/bookmyteam/bookmyteam'
import settingUp from "@/pages/settingUp/settingUp"
import feedback from '@/pages/feedback/feedback'
import familiarIssue from "@/pages/familiarIssue/familiarIssue"

import toolManger from '../pages/toolManger/toolManger' //工具管理
import searchTool from "@/pages/queryTool/searchTool"   //工具查找
import toolDetail from "@/pages/toolDetail/toolDetail"   //工具详情
import releaseToolList from '@/pages/releaseToolList/releaseToolList'   //发放工具列表
import releaseTool from '@/pages/releaseTool/releaseTool'          //工具发放
import toolList from '@/pages/toolList/toolList'    //工具清单
import toolReturn from '@/pages/toolReturn/toolReturn'   //工具归还列表
import toolReturnList from '@/pages/toolReturnList/toolReturnList'  //用户归还清单
import toolReturnDetail from '@/pages/toolReturnDetail/toolReturnDetail'  //用户归还清单
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
//  {
//  	path:'/index',
//  	name:'index',
//  	component :index
//  },
    {
    	path: '/privacypolicy',   //订单
    	name :'privacypolicy',
    	component: privacypolicy
    },
    {
			path: '/my/withdraw/addCard/agreement',
			name :'agreement',
			component:agreement
		},
		{
			path: '/my/personalData',    //个人资料
			name :'personalData',
			component:personalData
		},
		{
			path: '/my/personalData/authentication',    //身份验证
			name :'authentication',
			component:authentication
		},
		{
			path: '/my/personalData/fill_In_infon',    //个人资料
			name :'fill_In_infon',
			component:fill_In_infon
		},
		{
			path: '/my/personalData/viewInformation',    //个人资料查看
			name :'viewInformation',
			component:viewInformation
		},
		{
			path: '/my/personalData/certificate',    //证件上传
			name :'certificate',
			component:certificate
		},
		{
			path: '/my/settingUp',    //设置
			name :'settingUp',
			component:settingUp
		},
		{
			path: '/my/settingUp/feedback',   //意见反馈
			name :'feedback',
			component:feedback
		},
		{
			path: '/my/settingUp/familiarIssue',   //常见问题
			name :'familiarIssue',
			component:familiarIssue
		},
		{
    	path:'/passlogin',
    	name :'passlogin',
    	component: passlogin
    },
    {
    	path:'/passlogin/register',
    	name :'register',
    	component: register
    },
    {
    	path:'/passlogin/forgetpass',
    	name :'forgetpass',
    	component: forgetpass
    },
    {
    	path: '/',   //订单
    	name :'home',
    	component: home
    },
   	{
    	path: '/details',  //订单-》订单详情
    	name :'details',
    	component: details
    },
    {
    	path: '/details/attendance', //订单详情-》考勤打卡
    	name :'attendance',
    	component: attendance
    },
    {
    	path: '/details/statistics', //订单详情-》考勤统计
    	name :'statistics',
    	component: statistics
    },
    {
    	path: '/my',   //我的
    	name :'my',
    	component: my
    },
    {
			path: '/certification',
			name :'certification',
			component: certification,
			meta:{
				keepAlive:true
			}
		},
		{
			path: '/essentialInfo',      //基础信息
			name :'essentialInfo',
			component: essentialInfo,
			meta:{
				keepAlive:true
			}
		},
		{
			path: '/my/skillDetails',
			name:'skillDetails',
			component:skillDetails
		},
    {
			path: '/my/skillDetails/regulation',
			name:'regulation',
			component:regulation
		},
		{
			path: '/my/withdraw',
			name :'withdraw',
			component:withdraw
		},
		{
			path: '/my/withdraw/addCard',
			name :'addCard',
			component:addCard
		},
		{
			path: '/my/withdraw/income',
			name :'income',
			component:income
		},
		{
			path: '/certification/worktype',
			name: 'worktype',
			component:worktype
		},
		{
			path: '/certification/verifycomplete',
			name: 'verifycomplete',
			component:verifycomplete
		},
		{
			path: '/my/SystemMessages',  //系统消息
			name: 'SystemMessages',
			component:SystemMessages
		},
		{
			path: '/certification/site',
			name :'site',
			component:site
		},
		{
			path: '/book',
			name :'book',
			component:book
		},
		{
			path: '/book/bookList',
			name :'bookList',
			component:bookList
		},
		{
			path: '/book/bookList/bookPersonal',
			name :'bookPersonal',
			component:bookPersonal
		},
		{
			path: '/book/bookmyteam',
			name :'bookmyteam',
			component:bookmyteam
		},
    {
      path: '/queryTool/searchTool',
      name :'searchTool',
      component:searchTool
    },
    {
      path: '/toolDetail/toolDetail',
      name :'toolDetail',
      component:toolDetail
    },
    {
      path:'/releaseTool/releaseTool',
      name:'releaseTool',
      component:releaseTool
    },
    {
      path:'/releaseToolList/releaseToolList',
      name:'releaseToolList',
      component:releaseToolList
    },
    {
      path:'/toolList/toolList',
      name:'toolList',
      component:toolList
    },
    {
      path:'/toolManger/toolManger',
      name:'toolManger',
      component:toolManger
    },
    {
      path:'/toolReturn/toolReturn',
      name:'toolReturn',
      component:toolReturn
    },
    {
      path:'/toolReturnList/toolReturnList',
      name:'toolReturnList',
      component:toolReturnList
    },
    {
      path:'/toolReturnDetail/toolReturnDetail',
      name:'toolReturnDetail',
      component:toolReturnDetail
    }
  ]
})
