<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              :class="{ item_on: currerentIndex === index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="moveInItem(index)"
            >
              <h3>
                <!-- 事件委派的写法 -->
                <a
                  href="javascript:;"
                  :data-category1Id="c1.categoryId"
                  :data-categoryName="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >

                <!-- 编程式写法,click事件，点击之后是需要调用函数的，
                  同样每个 标签都添加了点击事件，那么内存中就会定义很多个函数，
                  内存占用也比较打，效率也不高 -->
                <!-- <a href="javascript:;" @click="$router.push({
                    name:'search',
                    query: {
                      category1Id: c1.categoryId,
                      categoryName: c1.categoryName,
                      }
                    },
                )"
                 >
                {{c1.categoryName}}
                </a> -->
                <!-- 声明式写法，因为组件标签太多，导致内存当中组件对象太多，效率不高 -->
                <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      category1Id: c1.categoryId,
                      categoryName: c1.categoryName,
                    },
                  }"
                >
                  {{ c1.categoryName }}
                </router-link> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:;"
                        :data-category2Id="c2.categoryId"
                        :data-categoryName="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                      <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            category2Id: c2.categoryId,
                            categoryName: c2.categoryName,
                          },
                        }"
                      >
                        {{ c2.categoryName }}
                      </router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-category3Id="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "Typenav",
  data() {
    return {
      currerentIndex: -1,
      isShow:true
    };
  },
  mounted() {
    // dispatch本质其实就是在调用action函数
    // this.$store.dispatch("getCategoryList");
    if (this.$route.path !== '/home') {
      // 证明这个组件再search里面的，需要一上来就隐藏
      this.isShow = false
    }
  },
  methods: {
    moveInItem: throttle(
      function (index) {
        this.currerentIndex = index;
        console.log(index);
      },
      20,
      { trailing: false }
    ),
    toSearch(event){
      let targetNode = event.target
      // console.log(targetNode)
      let data = targetNode.dataset;
       console.log(data);
       let { category1id, category2id, category3id, categoryname } = data;
        if (categoryname) {
          // categoryname存在证明就是a标签
          // 
          let location = {
            name:"search"
          }
          let query = {
            categoryName:categoryname
          }
          //确定是一级还是二级还是三级的id
          if (category1id) {
            query.category1Id = category1id
          }if (category2id) {
            query.category2Id = category2id
          } else {
            query.category3Id = category3id
          }
           //找到所有的query参数以后，最后把query放到location里面
          location.query = query
           // 最终把location对象就构造好了，跳转
          // this.$router.push(location)
          // 如果是从home跳转到search那就push
            // 如果是从search到search那就replace
          if (this.$route.path !== "/home") {
            this.$router.replace(location)
          } else {
            this.$router.push(location)
          }
        }
    },
    moveOutDiv(){
      this.currerentIndex = -1;
       if (this.$route.path !== '/home') {
      // 证明这个组件再search里面的，需要一上来就隐藏
      this.isShow = false
    }
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
  .type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background:skyblue;
      z-index: 999;

      &.sort-enter{
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to{
        height: 461px;
        opacity: 1;
      }
      &.sort-enter-active{
        transition: all 5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 616px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>