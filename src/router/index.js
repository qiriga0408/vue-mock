import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        hidden: true,
        children: [{
            path: 'home',
            name: 'home',
            component: () =>
                import ('@/views/home/index'),
            meta: { title: '平台管理系统', icon: 'dashboard' }
        }]
    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path:'/userQuery',
        component:Layout,
        redirect:'/userQuery/userlist',
        name:'userlist',
        meta:{title:'用户查询',icon:'el-icon-user',roles: ['admin']},
        children:[{
                path:'userlist',
                name:'userList',
                component:()=>import('@/views/userQuery/userList/index'),
                meta:{title:'用户列表',icon:'el-icon-user',roles: ['admin']}
            },
            {
                path:'userlistdetail',
                name:'userListDetail',
                component:()=>import('@/views/userQuery/userListDetail'),
                meta:{title:'用户信息详情',icon:'el-icon-user',roles: ['admin']},
                hidden:true
            },
            {
                path:'kfc',
                name:'Kfc',
                component:()=>import('@/views/userQuery/kfc/index'),
                meta:{title:'海外kfc审核',icon:'el-icon-user',roles: ['admin']}
            }
        ]
    },
    {
        path:'/transactionQuery',
        component:Layout,
        redirect:'/transactionQuery/holdquery',
        name:'holdquery',
        meta:{title:'交易查询',icon:'el-icon-user-solid',roles: ['admin']},
        children:[{
            path:'holdquery',
            name:'holdquery',
            component:()=>import('@/views/transactionQuery/holdQuery/index'),
            meta:{title:'持仓查询',icon:'el-icon-user',roles: ['admin']}
        },
        {
            path:'levelquery',
            name:'levelquery',
            component:()=>import('@/views/transactionQuery/levelQuery/index'),
            meta:{title:'平仓查询',icon:'el-icon-user',roles: ['admin']}
        },
        {
            path:'openquery',
            name:'openquery',
            component:()=>import('@/views/transactionQuery/openQuery/index'),
            meta:{title:'开仓查询',icon:'el-icon-user',roles: ['admin']}
        },
    ]
    },
    {
        path:'/fundQuery',
        component:Layout,
        redirect:'/fundQuery/assetquery',
        name:'assetquery',
        meta:{title:'资金查询',icon:'el-icon-user-solid',roles: ['admin']},
        children:[{
            path:'assetquery',
            name:'assetquery',
            component:()=>import('@/views/fundQuery/assetquery/index'),
            meta:{title:'用户资产查询',icon:'el-icon-user',roles: ['admin']}
        },
        {
            path:'goldquery',
            name:'goldquery',
            component:()=>import('@/views/fundQuery/goldquery/index'),
            meta:{title:'用户出入金查询',icon:'el-icon-user',roles: ['admin']}
        },
        {
            path:'financialRecords',
            name:'financialrecords',
            component:()=>import('@/views/fundQuery/financialRecords/index'),
            meta:{title:'用户财务记录',icon:'el-icon-user',roles: ['admin']}
        },
        {
            path:'withdrawalAdminister',
            name:'withdrawaladminister',
            component:()=>import('@/views/fundQuery/withdrawalAdminister/index'),
            meta:{title:'用户提币管理',icon:'el-icon-user',roles: ['admin']}
        }
    ]
    },
    {
        path:'/rebateQuery',
        component:Layout,
        redirect:'/rebateQuery/rebateList',
        name:'rebateList',
        meta:{title:'返佣查询',icon:'el-icon-user-solid',roles: ['admin']},
        children:[{
            path:'rebateList',
            name:'rebatelist',
            component:()=>import('@/views/rebateQuery/rebateList/index'),
            meta:{title:'手续费返佣',icon:'el-icon-user',roles: ['admin']},
        },
        {
            path:'rebateListDetail',
            name:'rebateListDetail',
            component:()=>import('@/views/rebateQuery/rebateListDetail/index'),
            meta:{title:'手续费返佣',icon:'el-icon-user',roles: ['admin']},
            hidden:true
        },
        
    ]
    },
    {
        path:'/platformFinance/overView',
        component:Layout,
        redirect:'/platformFinance/overView',
        name:'overView',
        meta:{title:'平台财务',icon:'el-icon-coin',roles: ['admin']},
        children:[{
            path:'overView',
            name:'overView',
            component:()=>import('@/views/platformFinance/overView/index'),
            meta:{title:'概览',icon:'el-icon-coin',roles: ['admin']},
        },
        {
            path:'assetAccount',
            name:'assetAccount',
            component:()=>import('@/views/platformFinance/assetAccount/index'),
            meta:{title:'资产账户',icon:'el-icon-coin',roles: ['admin']},
        },
        {
            path:'assetHistoryRecord',
            name:'assetHistoryRecord',
            component:()=>import('@/views/platformFinance/assetAccount/assetHistoryRecord'),
            meta:{title:'历史记录',icon:'el-icon-coin',roles: ['admin']},
            hidden:true
        },
        {
            path:'transactionAccount',
            name:'transactionAccount',
            component:()=>import('@/views/platformFinance/transactionAccount/index'),
            meta:{title:'交易账户',icon:'el-icon-coin',roles: ['admin']},
        }, 
        {
            path:'transactionHistoryRecord',
            name:'transactionHistoryRecord',
            component:()=>import('@/views/platformFinance/transactionAccount/transactionHistoryRecord'),
            meta:{title:'历史记录',icon:'el-icon-coin',roles: ['admin']},
            hidden:true
        },
    ]
    },
    {
        path:'/contract/assetAccount',
        component:Layout,
        redirect:'/contract/assetAccount',
        name:'assetAccount',
        meta:{title:'合约配置',icon:'el-icon-coin',roles: ['admin']},
        children:[
        {
            path:'assetAccount',
            name:'assetAccount',
            component:()=>import('@/views/contract/assetAccount/index'),
            meta:{title:'资产账户',icon:'el-icon-coin',roles: ['admin']},
        },
        {
            path:'assetHistoryRecord',
            name:'assetHistoryRecord',
            component:()=>import('@/views/contract/assetAccount/assetHistoryRecord'),
            meta:{title:'历史记录',icon:'el-icon-coin',roles: ['admin']},
            hidden:true
        },
        {
            path:'transactionAccount',
            name:'transactionAccount',
            component:()=>import('@/views/contract/transactionAccount/index'),
            meta:{title:'交易账户',icon:'el-icon-coin',roles: ['admin']},
        }, 
        {
            path:'transactionHistoryRecord',
            name:'transactionHistoryRecord',
            component:()=>import('@/views/contract/transactionAccount/transactionHistoryRecord'),
            meta:{title:'历史记录',icon:'el-icon-coin',roles: ['admin']},
            hidden:true
        },
    ]
    },
    {
        path:'/riskAdminister/lebelAdminister',
        component:Layout,
        redirect:'/riskAdminister/lebelAdminister',
        name:'lebelAdminister',
        meta:{title:'风控管理',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        children:[
        {
            path:'lebelAdminister',
            name:'lebelAdminister',
            component:()=>import('@/views/riskAdminister/lebelAdminister/index'),
            meta:{title:'标签管理',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        },
       
    ]
    },
    {
        path:'/systemAdminister/roleAdminister',
        component:Layout,
        redirect:'/systemAdminister/roleAdminister',
        name:'roleAdminister',
        meta:{title:'系统管理',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        children:[
        {
            path:'roleAdminister',
            name:'roleAdminister',
            component:()=>import('@/views/systemAdminister/roleAdminister/index'),
            meta:{title:'角色管理',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        },
        {
            path:'authorityGrouping',
            name:'authorityGrouping',
            component:()=>import('@/views/systemAdminister/authorityGrouping/index'),
            meta:{title:'权限分组',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        },
        {
            path:'addGroup',
            name:'addGroup',
            component:()=>import('@/views/systemAdminister/authorityGrouping/addGroup/index'),
            meta:{title:'添加分组',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
            hidden:true
        },
        {
            path:'operatingLog',
            name:'operatingLog',
            component:()=>import('@/views/systemAdminister/operatingLog/index'),
            meta:{title:'操作日志',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        },
        {
            path:'securityCenter',
            name:'securityCenter',
            component:()=>import('@/views/systemAdminister/securityCenter/index'),
            meta:{title:'安全中心',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
        },
        {
            path:'changePassword',
            name:'changePassword',
            component:()=>import('@/views/systemAdminister/securityCenter/changePassword/index'),
            meta:{title:'修改密码',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
            hidden:true
        },
        {
            path:'changeGoogle',
            name:'changeGoogle',
            component:()=>import('@/views/systemAdminister/securityCenter/changeGoogle/index'),
            meta:{title:'修改谷歌验证器',icon:'el-icon-chat-dot-square',roles: ['aaaaaaa']},
            hidden:true
        }
       
    ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router