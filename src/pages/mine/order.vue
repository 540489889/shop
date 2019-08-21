<template>
  <scroll class="mineOrder wrapper recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div>
      <div class="mine-header">
        <ul class="flex-box">
          <li class="box-1"><span :class="{active:active1}" @click="toggleTab('1')" >积分订单</span></li>
          <li class="box-1"><span :class="{active:active2}" @click="toggleTab('2')">影票订单</span></li>
        </ul>
      </div>
      <order-com
        :list="list"
        :listTwo="listTwo"
        @changeRefundClick="refundClick"
        :active2="active2"></order-com>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <span>确认退款吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="primaryClick">确 定</el-button>
  </span>
    </el-dialog>
  </scroll>
</template>
<script>
  import orderCom from './components/orderCom.vue'
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'mineOrder',
    data () {
      return {
        currentTab: 'goodsTemp',
        isActive: true,
        active1:true,
        active2:false,
        list:[],
        listTwo: [],
        fullscreenLoading: false,
        dialogVisible: false,
        id: '',
      }
    },
    components: {
      Scroll,
      orderCom
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      primaryClick(){
        this.dialogVisible = false
        let _this = this
        let params = new URLSearchParams();
        params.append('order_sn', this.id);
        axios({
          method: 'post',
          url: '/Home/Film/refund',
          data:params
        }).then(function (res) {
          console.log(res)
          const data = res.data
          if(!data.status){
            _this.$notify.error({
              title: '错误',
              message: data.msg,
              showClose: false,
              duration: 2000
            });
          }else{
            _this.$notify({
              title: '成功',
              type: 'success',
              message: data.msg,
              showClose: false,
              duration: 1000,
              onClose: function () {
                _this.toggleTab('2')
              }
            });
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      //退款
      refundClick(id){
        this.dialogVisible = true
        this.id = id
        return false

      },
      getUserOrder () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/myOrder')
          .then(this.getUserOrderSucc)
      },
      getUserOrderSucc (res) {
        if(res){
          const data = res.data
          this.list = data.data
          console.log(this.list)
          this.listTwo = []
          this.fullscreenLoading = false
        }
      },
      toggleTab: function(tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
        switch (tab){
          case '1':
            this.active1 = true
            this.active2 = false
            this.getUserOrder()

            break
          case '2':
            this.active1 = false
            this.active2 = true
            let _this = this
            axios.get('/Home/Person/forder')
              .then(function (res) {
                const data = res.data.data
                _this.list = []
                _this.listTwo = data
                console.log(res)
              })
            break
        }
      }
    },
    mounted (){
      this.getUserOrder()
    }
  }
</script>
<style lang="less" scoped>
  .mineOrder{
    position:absolute;
    width:100%;
    height:100%;
    background-color:#f5f5f5;
    .mine-header{
      background-color:#3ac5fa;
      color:white;
      ul{
        li{
          line-height:0.9rem;
          text-align: center;
          position:relative;
          span{
            position:relative;
            padding:10px 0;
          }
          .active:before{
            content: "";
            position:absolute;
            width:18px;
            height:4px;
            left:50%;
            bottom:2px;
            transform: translateX(-50%);
            background-color:white;
            border-radius: 2px;
          }
        }
        li:nth-child(2):before{
          content: "";
          display: inline-block;
          width:1px;
          height:14px;
          left:-1px;
          opacity: 0.7;
          background-color:white;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }

  }
</style>
