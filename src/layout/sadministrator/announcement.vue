<template>
  <div class="announcement">
    <div
      v-if="show"
      class="announcement-list"
    >
      <el-button
        class="new-announcement"
        type="primary"
        size="medium"
        @click="dialog = true"
      >发布新的公告</el-button>
      <el-divider></el-divider>

      <el-table
        :data="currentPage"
        style="width: 100%;min-height:460px;"
      >
        <el-table-column
          label="标题"
          width="450"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="450"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ptime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleShow(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <!-- 编辑公告 -->
            <el-dialog
              title="编辑公告"
              :visible.sync="dialogFormVisible"
              width="60%"
              top="80px"
              :close-on-click-modal="false"
            >
              <el-form :model="formChange">
                <el-form-item
                  label="标题"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="formChange.title"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="内容"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="formChange.context"
                    autocomplete="off"
                    style="width:100%;"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="changeNodes"
                >确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 公告详情页 -->
    <div
      v-else
      class="along-announcement"
    >
      <div class="time">{{ currentForm.ptime }}</div>
      <div class="title">{{ currentForm.title}}</div>
      <div class="context">{{ currentForm.context }}</div>
      <button @click="quit">退出</button>
    </div>

    <!-- 发布公告消息 -->
    <el-drawer
      class="ttb-announcement"
      title="发布新公告"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      :close-on-click-modal="false"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="标题"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.title"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="内容"
            :label-width="formLabelWidth"
          >
            <textarea
              v-model="form.context"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[6,8,10,12]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import cookie from "@/cookie/cookie.js";
import { deepClone, formatDate } from "@/utils/deepClone.js";
import api from "@/api/index.js";
export default {
  // beforeRouteEnter(to,from,next){
  //   cookie.getCookie("sadministrator",function (data) {
  //     if(data !== "undefined"){
  //       to.matched[0].meta.login = true;
  //       next();
  //       return
  //     }else {
  //       const answer = confirm('你还没有登陆，要登陆后才能浏览信息，确定登陆吗？');
  //       if(answer) {
  //         next('/')
  //       }else{
  //         next('/')
  //       }
  //     }
  //   })
  // },
  data() {
    return {
      nid: 0,
      //每页多少数据
      n: 8,
      //当前页
      m: 1,
      dialogFormVisible: false,
      // 存放临时数据
      formChange: {},
      show: true,
      dialog: false,
      loading: false,
      // 当前条操作
      form: {
        title: "",
        context: "",
        ptime: ""
      },
      formLabelWidth: "80px",

      tableData: [],
      // 详情页信息
      currentForm: {}
    };
  },
  async created() {
    await this.getData();
  },
  computed: {
    currentPage() {
      return this.tableData.slice(
        (this.m - 1) * this.n,
        (this.m - 1) * this.n + this.n
      );
    }
  },
  methods: {
    timeSort(a, b) {
      let oDate1 = new Date(a);
      let oDate2 = new Date(b);
      if (oDate1.getTime() > oDate2.getTime()) {
        return -1;
      } else {
        return 1;
      }
    },
    getData() {
      let list;
      api
        .getMessage()
        .then(res => {
          list = res.data.data.list.map(v => {
            v.ptime = formatDate(v.ptime);
            return v;
          });
          list.sort((a, b) => {
            return this.timeSort(a.ptime, b.ptime);
          });
          this.tableData = list;
        })
        .catch(rej => {});
    },
    getTime() {
      var ct = new Date();
      var year = ct.getFullYear();
      var month = ct.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = ct.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var time = year + "-" + month + "-" + day;
      return time;
    },
    // 提交新公告
    handleClose(done) {
      if (this.form.title && this.form.context) {
        this.form.ptime = this.getTime();
        this.$confirm("确定要提交内容吗？")
          .then(_ => {
            this.loading = true;
            let form = deepClone(this.form);
            api
              .saveMessage({
                title: form.title,
                context: form.context,
                ptime: form.ptime
              })
              .then(res => {
                if (res.data.code === 1) {
                  setTimeout(() => {
                    this.$message({
                      message: "添加成功！",
                      type: "success"
                    });
                    this.loading = false;
                    this.form.title = "";
                    this.form.context = "";
                    this.getData();
                    done();
                  }, 1000);
                }
              })
              .catch(rej => {});
          })
          .catch(_ => {});
      } else {
        this.$alert("请完善所有的信息！", "", {
          confirmButtonText: "确定"
        });
        return;
      }
    },
    // 编辑公告
    handleEdit(index, row) {
      console.log(index, row);
      this.formChange = deepClone(row);
      this.nid = row.nid;
      this.dialogFormVisible = true;
    },
    // 确认修改公告
    changeNodes() {
      if (this.formChange.title && this.formChange.context) {
        api
          .saveMessage({
            nid: this.nid,
            title: this.formChange.title,
            ptime: this.formChange.ptime,
            context: this.formChange.context
          })
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.getData();
            }
          })
          .catch(rej => {});
        this.dialogFormVisible = false;
      } else {
        this.$alert("请完善所有的信息！", "", {
          confirmButtonText: "确定"
        });
        return;
      }
    },
    // 查看详情
    handleShow(index, row) {
      console.log("查看详情", index, row);
      this.currentForm = row;
      this.show = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.nid = row.nid;
      this.$confirm("确定要删除吗？")
        .then(_ => {
          api
            .deleteMessage({
              nid: this.nid
            })
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.getData();
              } else {
                console.log(res);
              }
            })
            .catch(rej => {
              console.log(rej);
            });
        })
        .catch(_ => {});
    },
    quit() {
      this.show = true;
    },
    //每页多少条数据  `${val}`
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.n = parseInt(`${val}`);
    },
    //当前页数  parseInt`${val}`
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.m = parseInt(`${val}`);
    }
  }
};
</script>
<style lang="scss">
.announcement {
  width: 90%;
  margin: 0 auto;
  .announcement-list {
    width: 100%;
    overflow: hidden;
    min-height: 450px;
    .new-announcement {
      float: right;
    }
    .el-divider {
      margin-top: 50px;
    }
    .el-table.el-table--fit.el-table--enable-row-hover {
      margin: 0 auto;
      tbody {
        .el-button--mini {
          // background-color: mediumblue;
          span {
            color: #fff;
          }
        }
        .el-button--small {
          background-color: red;
          span {
            color: #fff;
          }
          &.success {
            background-color: #ccc;
          }
        }
        .el-buttom--medium {
          background-color: red;
        }
      }
    }
  }

  .along-announcement {
    width: 100%;
    height: 500px;
    background-color: #ccc;
    overflow: hidden;
    .time {
      float: right;
      width: 130px;
      height: 140px;
      line-height: 160px;
    }
    .title {
      height: 140px;
      font-size: 30px;
      font-weight: bolder;
      line-height: 140px;
      text-align: center;
    }
    .context {
      text-indent: 2em;
    }
    button {
      float: right;
      width: 80px;
      height: 40px;
      margin-top: -160px;
      background-color: cadetblue;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
  .block {
    position: relative;
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
    .el-pagination {
      width: 50%;
      margin: 0 auto;
      span {
        font-size: 12px;
      }
    }
  }
}
.ttb-announcement {
  width: 80%;
  margin: 0 auto;
  height: 1300px;
  .el-drawer__container {
    .el-drawer.ttb.demo-drawer {
      .el-drawer__body .demo-drawer__content {
        form .el-form-item {
          .el-input {
            width: 30%;
          }
          textarea {
            width: 70%;
            height: 150px;
          }
        }
        .demo-drawer__footer {
          button {
            float: right;
            margin-right: 10px;
            & + button {
              margin-right: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
