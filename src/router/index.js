import Vue from "vue";
import Router from "vue-router";
//登录注册
const Login = () => import("@/page/login.vue");
const Register = () => import("@/page/register.vue");
//会员
const Member = () => import("@/layout/member.vue");
const Attention = () => import("@/layout/member/attention.vue");
const Main = () => import("@/layout/member/main.vue");
const CoachingCourse = () => import("@/layout/member/coaching-course.vue");
const MyCourse = () => import("@/layout/member/my-course.vue");
const MessageBar = () => import("@/layout/member/message-bar.vue");
const Memberceshi = () => import("@/layout/member/memberceshi.vue");
const SearchCourse = () => import("@/layout/member/searchCourse.vue");
const Experience = () => import("@/layout/member/experience.vue");
//教练
const Coach = () => import("@/layout/coach.vue");
const Homepage = () => import("@/layout/coach/main.vue");
const MyRelease = () => import("@/layout/coach/my-release.vue");
const MyTrainee = () => import("@/layout/coach/my-trainee.vue");
const CMessageBar = () => import("@/layout/coach/message-bar.vue");
const Coachceshi = () => import("@/layout/coach/coachceshi.vue");
//课程管理
const Cadministrator = () => import("@/layout/Cadministrator.vue");
const CMain = () => import("@/layout/cadministrator/main.vue");
const CourseManagement = () =>
  import("@/layout/cadministrator/course-management.vue");
//系统管理
const Sadministrator = () => import("@/layout/Sadministrator.vue");
const Announcement = () => import("@/layout/sadministrator/announcement.vue");
const CoachingManagement = () =>
  import("@/layout/sadministrator/coaching-management");
const MembershipManagement = () =>
  import("@/layout/sadministrator/membership-management.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  linkExactActiveClass: "exact",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/member",
      name: "member",
      component: Member,
      meta: {
        login: false
      },
      redirect: "/member/main",
      children: [
        {
          path: "main",
          name: "main",
          component: Main
        },
        {
          path: "attention",
          name: "attention",
          component: Attention
        },
        {
          path: "coachingcourse",
          name: "coachingcourse",
          component: CoachingCourse
        },
        {
          path: "mycourse",
          name: "mycourse",
          component: MyCourse
        },
        {
          path: "messagebar",
          name: "messagebar",
          component: MessageBar
        },
        {
          path: "memberceshi",
          name: "memberceshi",
          component: Memberceshi
        },
        {
          path: "searchCourse/:searchWord",
          name: "searchCourse",
          component: SearchCourse
        },
        {
          path: "experience",
          name: "experience",
          component: Experience
        }
      ]
    },
    {
      path: "/coach",
      name: "coach",
      meta: {
        login: false
      },
      component: Coach,
      redirect: "/coach/homepage",
      children: [
        {
          path: "homepage",
          name: "homepage",
          component: Homepage
        },
        {
          path: "myrelease",
          name: "myrelease",
          component: MyRelease
        },
        {
          path: "mytrainee",
          name: "mytrainee",
          component: MyTrainee
        },
        {
          path: "cmessagebar",
          name: "cmessagebar",
          component: CMessageBar
        },
        {
          path: "coachceshi",
          name: "coachceshi",
          component: Coachceshi
        }
      ]
    },
    {
      path: "/cadministrator",
      name: "cadministrator",
      meta: {
        login: false
      },
      component: Cadministrator,
      redirect: "/cadministrator/carousel",
      children: [
        {
          path: "carousel",
          name: "carousel",
          component: CMain
        },
        {
          path: "coursemanagement",
          name: "coursemanagement",
          component: CourseManagement
        }
      ]
    },
    {
      path: "/sadministrator",
      name: "sadministrator",
      meta: {
        login: false
      },
      component: Sadministrator,
      redirect: "/sadministrator/announcement",
      children: [
        {
          path: "announcement",
          name: "announcement",
          component: Announcement
        },
        {
          path: "coachingmanagement",
          name: "coachingmanagement",
          component: CoachingManagement
        },
        {
          path: "membershipmanagement",
          name: "membershipmanagement",
          component: MembershipManagement
        }
      ]
    }
  ]
});
