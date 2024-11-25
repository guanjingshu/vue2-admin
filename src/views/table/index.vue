<template>
  <div class="app-container">
    <van-icon name="question" @click="showTips()"></van-icon>
    <!-- <div @click="showPicker = true">筛选</div> -->
    <div @click="showPicker1 = true">筛选-组件化</div>
    <div class="rowstart" @click="showPicker2 = true">
      <van-icon name="info-o"></van-icon>
      
      <div></div>
      指标说明
    </div>
    <van-popup
      v-model="showPicker"
      closeable
      close-icon-position="top-right"
      round
      position="bottom"
      :style="{ height: '90%' }"
    >
      <div class="wrap-outter">
        <!-- 筛选面板 -->
        <div class="wrap">
          <div class="wrap-top">
            <p>赛道：</p>
            <div
              @click="seledAllBtn3('type3')"
              :class="{
                'seled-btn': allBtn3Checked,
                'seled-btn-half': isHalfCheckAllBtn3,
              }"
            >
              全部赛道
            </div>
            <div class="item">
              <div
                v-for="(item, index) in typeList3"
                :key="index"
                @click="seledBtn(index, 'type', item)"
                class="btn sel-btn"
                :class="{ 'seled-btn': typeSeled3.includes(index) }"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <p>单选一个:</p>
          <div>
            <div
              v-for="(item, index) in typeList2"
              :key="index"
              @click="seledBtn2(index, 'type1', item)"
              class="btn sel-btn"
              :class="{ 'seled-btn': typeSeled2.includes(index) }"
            >
              {{ item }}
            </div>
          </div>
          <div></div>
          <p>投资部门:</p>
          <div
            @click="seledAllBtn4('type4')"
            class="btn all-btn4 sel-btn font14rem block"
            :class="{
              'seled-btn': allBtn4Checked,
              'seled-btn-half': isHalfCheckAllBtn4,
            }"
          >
            公司
          </div>
          <div class="columncenter">
            <div
              v-for="(item, index) in this.bigTypeHalfCheckedKV"
              class="rowstart fullwidth"
              :key="item.label"
            >
              <div class="left-col">
                <div
                  class="btn btn4 sel-btn font14rem ellipsis"
                  :class="{
                    'seled-btn': item.checked,
                    'seled-btn-half': item.halfChecked,
                  }"
                  @click="seledBtn4Big(index, item)"
                >
                  {{ item.label }}
                </div>
              </div>
              <div class="right-col item item4 flexwrap">
                <div
                  v-for="(subItem, subIndex) in item.list"
                  :key="subItem.label"
                  @click="seledBtn4(index, subIndex, subItem)"
                  class="btn btn4 sel-btn font14rem item-btn"
                  :class="{ 'seled-btn': subItem.checked }"
                >
                  <!-- {{ subItem }} -->
                  {{ subItem.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-foot-box fullwidth">
          <div class="wrap-foot">
            <div class="btn btn1" @click="onCancel">重置</div>
            <div class="btn btn2" @click="onSure">确定</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      round
      v-model="showPicker2"
      :style="{ width: '90%', height: '96%' }"
    >
      <div class="textcenter explain">
        <div class="explain1">测试测是</div>
        <div class="explain2">测试测是测试测是测试测是测试测是</div>
      </div>
      <div class="h"></div>
      <div class="explain-content">
        <div class="blue-bottom relative quality">质量类标准</div>
        <div class="ec-item rowstart">
          <span class="blue-dot relative"
            >测试测试: <span>测试测试测试测试测试测试</span>
          </span>
        </div>

        <div class="bottom-style relative">
          <p>温馨提示</p>
          <p>温馨提示温馨提示温馨提示温馨提示</p>
          <p>温馨提示温馨提示温馨提示温馨提示</p>
          <p>温馨提示温馨提示温馨提示温馨提示</p>
          <p>温馨提示温馨提示温馨提示温馨提示</p>
          <p>温馨提示温馨提示温馨提示温馨提示</p>
        </div>
        <div class="foot-know">
          <div class="btn-know" @click="showPicker2 = false">我知道了</div>
        </div>
      </div>
    </van-popup>
    <FilterPanel :showFilter.sync="showPicker1" @change="filterChange" />
    <!-- 自定义图片 tab标签页-->
    <div class="relative">
      <img class="absolute" :style="tabMoveLineStyle" />
      <div class="move-line absolute" :style="tabMoveLineStyle"></div>
      <div v-for="(item, index) in []" :key="index" @click="tabChange(index)">
        <div>{{ item }}</div>
      </div>
    </div>
    <!-- tab标签页 -->
    <div class="demo_warp" id="my">
      <ul class="tab_tit">
        <li
          v-for="(v, i) in lists"
          :class="n == i ? 'active' : ''"
          @click="n = i"
        >
          {{ v }}
        </li>
      </ul>
      <!-- neirong -->
      <div class="tab_con">
        <div v-for="(v, i) in lists" v-show="n == i">{{ v }}</div>
      </div>
    </div>
    <!-- 图片按钮 -->
    <!-- <div>
    <img :style="SelectStyles" :src="require(`@/assets/images/${chartImages[selectChartIndex]}`)" @click="chartClick"/>
    <img :style="SelectStyles" :src="require(`@/assets/images/${tableImages[selectTableIndex]}`)" @click="tableClick"/>
  </div> -->
    <!-- 按钮 -->
    <!-- <div class="rowstart">
    <div class="btn-main" :class="{'btn-main1': isActive1, 'btn-main2': isActive2}" @click="afterBtn">后</div>
    <div class="btn-main" :class="{'btn-main3': !isActive1, 'btn-main4': !isActive2}" @click="beforeBtn">前</div>
  </div> -->
    <!-- el-table -->
    <!-- <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pagedivs" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pagedivs }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table> -->

    <div class="table_title">分类规则</div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="addNewRuleGroup(maxRuleGroup)"
      >新建条件组</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="addTestData()"
      >增加测试数据</el-button
    >
    <div v-for="(rule_group, groupIndex) in groupList" :key="rule_group">
      <section class="rowbetween aligncenter">
        <span class="rowstart">条件组{{ groupIndex + 1 }}</span>
        <Confirm
          message="确定删除该条件组吗？"
          @confirm="hanleDelGroup(rule_group)"
        >
          <span class="aligncenter point"
            ><i class="el-icon-delete"> </i> 删除条件组</span
          >
        </Confirm>
      </section>
      <el-table
        class="rule_table"
        border
        :data="filterDimensionList(rule_group)"
        height="192px"
      >
        <el-table-column
          label="规则字段"
          prop="field_desc"
          :show-overflow-tooltip="false"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.rule_field"
              placeholder="请选择"
              size="small"
              @change="handleChange(scope.row.rule_field, scope.row.index)"
            >
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.label"
                :value="{ value: item.value, label: item.label }"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="规则条件"
          prop="cond_desc"
          :show-overflow-tooltip="false"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.judge_cond"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in scope.row.conditionList"
                :key="index"
                :label="item.label"
                :value="{ value: item.value, label: item.label }"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="规则值"
          prop="value_desc"
          :show-overflow-tooltip="false"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.rule_value"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in scope.row.childRuleList"
                :key="index"
                :label="item.label"
                :value="{ value: item.value, label: item.label }"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              class="point"
              style="color: #3573f3"
              @click="handleDelete(scope.row.index, scope.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="add_rule">
        <div @click="handleAdd(rule_group)">添加统计规则</div>
      </div>

      <div
        v-if="groupIndex < groupList.length - 1"
        class="rowbetween aligncenter relative"
      >
        <span>或</span>
        <el-divider />
      </div>
    </div>
  </div>
</template>

<script>
import TermStructrueChartPie from "@/components/TermStructrueChartPie.vue";
import FilterPanel from "@/components/MainRespon";
import Confirm from "@/components/Confirm";
import { getList } from "@/api/table";
import { Toast } from "vant";

export default {
  components: {
    TermStructrueChartPie,
    FilterPanel,
    Confirm,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
    calcTotal(list) {
      const total = list.reduce((total, item) => {
        return total + item.pagedivs;
      }, 0);
      return total;
    },
  },
  data() {
    return {
      list: null,
      lists: ["产品", "运营", "设计", "前端", "后端", "测试", "其他"],
      n: 0,
      listLoading: true,
      typeList: ["类型1", "类型2"],
      // 是否点击
      typeSeled: [],
      isActive1: true,
      isActive2: false,
      tableImages: ["t1", "t2"],
      chartImages: ["c1", "c2"],
      selectTableIndex: 0,
      selectChartIndex: 0,
      isChartOrTable: "chart",
      imgName: "1",
      typeSeled1: [],
      typeSeled2: [],
      typeSeled3: [],
      typeSeled4: [],
      typeList1: ["类型typeList1", "类型typeList1"],
      typeList2: ["类型typeList1", "类型typeList1"],
      typeList3: ["类型1", "类型2"],
      typeList4: [],
      typeList4DeptList: [],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      dimensionList: [
        {
          rule_field: "",
          fied: "",
          rule_value: "",
          value: "",
          judge_cond: "",
          cond: "",
          rule_group: 0,
        },
      ],
      selectList: [
        { code: "1001", label: "销售机构", value: "dis_name" },
        { code: "1002", label: "销售机构类型1", value: "dis_name1" },
        { code: "1003", label: "销售机构类型2", value: "dis_name2" },
      ],
      selectOptions: [
        {
          code: "1001",
          items: [
            { cond: ["="], label: "test1", value: "test1" },
            { cond: ["="], label: "test2", value: "test2" },
          ],
          label: "销售机构",
          rowIndex: 1000,
          value: "dis_name",
        },
      ],
    };
  },
  computed: {
    tabMoveLineStyle() {
      let style = {
        top: "-0.106rem",
        height: "1.2rem",
        backgrouondImage:
          "linear-gradient(270deg, rgba(0,171,254,0) 0%, #0072fc 100%)",
      };
      if (this.selectTableIndex == 0) {
        style.width = "";
        style.left = "";
      } else if (this.selectTableIndex == 1) {
        style.width = "";
        style.left = "";
      } else if (this.selectTableIndex == 2) {
        style.width = "";
        style.left = "";
      }
    },
    // 全部类型是否半选
    isHalfCheckAllBtn3() {
      if (this.typeList3) {
        if (
          this.typeSeled3.length > 0 &&
          this.typeSeled3.length < this.typeList3.length
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    isHalfCheckAllBtn4() {
      if (this.typeList4DeptList) {
        let allSubOptions = [];
        this.typeList4DeptList.forEach((item) => {
          allSubOptions = [...allSubOptions, ...item.list];
        });
        const checkedOptionCount = allSubOptions.filter(
          (item) => item.checked
        ).length;
        if (
          checkedOptionCount > 0 &&
          checkedOptionCount < allSubOptions.length
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    // 全部赛道选中
    allBtn3Checked() {
      return this.typeList3.length === this.typeSeled3.length;
    },
    // 公司选中状态
    allBtn4Checked() {
      // 左侧大分类都选中则，则‘公司’选中
      if (this.bigTypeHalfCheckedKV) {
        return (
          this.bigTypeHalfCheckedKV.filter((item) => item.checked).length ===
          this.bigTypeHalfCheckedKV.length
        );
      }
      return false;
    },
    bigTypeHalfCheckedKV() {
      if (this.typeList4DeptList) {
        return this.typeList4DeptList.map((item, index) => {
          const optionCheckedLen = item.list.filter(
            (subItem) => subItem.checked
          ).length;
          if (optionCheckedLen > 0 && optionCheckedLen < item.list.length) {
            item.halfChecked = true;
          } else {
            item.halfChecked = false;
          }
          return item;
        });
      }
    },
    SelectStyles() {
      let style = {
        top: "1px",
        height: "40px",
      };
      style.width = "20px";
      style.height = "20px";
      return style;
    },
    groupList() {
      const ruleGroupSet = new Set();
      this.dimensionList.forEach((ruleRow) =>
        ruleGroupSet.add(ruleRow.rule_group)
      );
      const ruleGroupArr = [...ruleGroupSet].sort((a, b) => a - b);
      return ruleGroupArr;
    },
    maxRuleGroup() {
      if (this.groupList.length > 0) {
        return Math.max(...this.groupList);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.fetchData();
    this.getData();
    document
      .querySelector("#app")
      .addEventListener("touchstart", this.removeToast);
  },
  beforeDestroy() {
    document
      .querySelector("#app")
      .removeEventListener("touchstart", this.removeToast);
  },
  // deactivated() {
  //   document
  //     .querySelector("#app")
  //     .removeEventListener("touchstart", this.removeToast);
  // },
  methods: {
    addTestData() {
      this.selectOptions = [];
      for (let index = 0; index < this.dimensionList.length; index++) {
        let ind = res.findIndex(
          (i) => i.label == this.dimensionList[index].rule_field
        );
        this.$set(
          this.dimensionList[index],
          "childRuleList",
          this.selectOptions[ind].item
        );
      }
    },
    // tips时间设置
    showTips() {
      Toast.setDefaultOptions({ duration: 8000 });
      Toast({ message: "提示信息", icon: "warning",className: "toast"});
      Toast.resetDefaultOptions();
    },
    removeToast() {
      Toast.clear();
    },
    // end tips时间设置
    filterChange(params, filterTxt) {
      console.log("params,filterTxt", params, filterTxt);
    },
    seledBtn2(index, type, itemVal) {
      if (this.typeSeled2.includes(index)) {
        this.typeSeled2 = this.typeSeled2.filter((item) => item == index);
      } else {
        this.typeSeled2.pop(index);
        this.typeSeled2.push(index);
      }
    },
    getData() {
      // 返回重组后的对象
      const formObj = [{ id: 3001, name: "imgr_line", label: "图片" }].reduce(
        (prev, curr) => {
          console.log("prev,curr", prev, curr);
          if (Array.isArray(prev[curr.name])) {
            prev[curr.name].push(curr.label);
          } else {
            prev[curr.name] = [curr.label];
          }
          return prev;
        },
        {}
      );
      console.log("formObj", formObj);
      this.listPara = [
        {
          id: 1003,
          label: "部门条线",
          list: [
            {
              id: 2001,
              label: "财富",
              list: [
                { id: 2012, label: "财富/固收1" },
                { id: 2012, label: "财富/固收2" },
                { id: 2012, label: "财富/固收3" },
              ],
            },
            {
              id: 2001,
              label: "财富2",
              list: [
                { id: 2012, label: "财富/固收1" },
                { id: 2012, label: "财富/固收2" },
                { id: 2012, label: "财富/固收3" },
              ],
            },
          ],
        },
      ];
      this.typeList4DeptList = this.listPara.find(
        (item) => item.label === "部门条线"
      ).list;
      this.typeList4DeptList.map((item) => {
        item.list = item.list.map((subItem) => ({ ...subItem, checked: true }));
        return {
          ...item,
          checked: true,
        };
      });
      console.log("this.typeList4DeptList", this.typeList4DeptList);
    },

    seledAllBtn4(type) {
      const checked = !this.allBtn4Checked;
      this.typeList4DeptList = this.typeList4DeptList.map((item, index) => {
        item.checked = checked;
        item.list = item.list.map((subItem) => {
          subItem.checked = checked;
          return subItem;
        });
        return item;
      });
    },
    //
    seledAllBtn3() {
      if (this.allBtn3Checked) {
        this.typeSeled3 = [];
      } else {
        this.typeSeled3 = this.typeList3.map((_, index) => index);
      }
    },
    seledAllBtn4(type) {
      const checked = !this.allBtn4Checked;
      this.typeList4DeptList = this.typeList4DeptList.map((item, index) => {
        item.checked = checked;
        item.list = item.list.map((subItem) => {
          subItem.checked = checked;
          return subItem;
        });
        return item;
      });
    },
    // 部门左侧大分类
    seledBtn4Big(index, itemVal) {
      const checked = !this.typeList4DeptList[index].checked;
      this.typeList4DeptList[index].checked = checked;
      this.typeList4DeptList[index].list = this.typeList4DeptList[
        index
      ].list.map((subItem) => {
        return {
          ...subItem,
          checked,
        };
      });
    },
    // 部门右侧小分类
    seledBtn4(index, subIndex, itemVal) {
      console.log("index, subIndex, itemVal", index, subIndex, itemVal);
      const checked = !itemVal.checked;
      // 先更新右侧二级分类
      const parent = this.typeList4DeptList.find((_, idx) => idx === index);
      parent.list = parent.list.map((item, idx) => {
        if (idx === subIndex) {
          return {
            ...item,
            checked,
          };
        }
        return item;
      });
      console.log("parent.list", parent.list);
      console.log("this.bigTypeHalfCheckedKV", this.bigTypeHalfCheckedKV);
      // this.$forceUpdate()
      // 再更新左侧一级分类checked
      if (
        parent.list.filter((item) => item.checked).length === parent.list.length
      ) {
        parent.checked = true;
      } else {
        parent.checked = false;
      }
    },
    afterBtn() {
      this.isActive1 = true;
      this.isActive2 = false;
    },
    beforeBtn() {
      this.isActive1 = false;
      this.isActive2 = true;
    },
    chartClick() {
      this.selectChartIndex = 0;
      this.selectTableIndex = 0;
      this.isChartOrTable = "chart";
    },
    tableClick() {
      this.selectChartIndex = 1;
      this.selectTableIndex = 1;
      this.isChartOrTable = "table";
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    // 点击搜索
    searchClick() {
      this.$emit("singleClick", this.val);
    },
    // 选中某一个条件
    seledBtn(index, type, itemVal) {
      // console.log('type', type);
      if (type == "type") {
        if (this.typeSeled3.includes(index)) {
          // 筛掉【当前选中的】和【数组中】不一致的下标
          this.typeSeled3 = this.typeSeled3.filter((item) => item != index);
        } else {
          // 未选中就添加进数组中
          this.typeSeled3.push(index);
        }
      }
    },
    onCancel() {},
    onSure() {},
    addNewRuleGroup(maxRuleGroup) {
      this.handleAdd(maxRuleGroup + 1);
    },
    // 添加新规则
    handleAdd(rule_group) {
      var _this = this;
      let list = {
        rule_field: "",
        fied: "",
        rule_value: "",
        value: "",
        judge_cond: "",
        cond: "",
        rule_group: rule_group,
      };
      _this.dimensionList.push(list);
    },
    // 删除规则
    hanleDelGroup(rule_group) {
      this.dimensionList = this.dimensionList.filter(
        (ruleRow) => ruleRow.rule_group !== rule_group
      );
    },
    filterDimensionList(rule_group) {
      // 记录比较关键的index索引，替代scope.$index
      this.dimensionList.forEach((ruleInfo, index) => (ruleInfo.index = index));
      return this.dimensionList.filter(
        (ruleInfo) => ruleInfo.rule_group == rule_group
      );
    },
    handleChange(obj, index) {
      console.log(obj, index);
      let ind = this.selectOptions.findIndex((item) => item.value == obj.value);
      this.$set(this.dimensionList[index], 'rule_value', '')
      this.$set(this.dimensionList[index], 'childRuleList', this.selectOptions[ind].items)
      this.dimensionList.forEach((ele)=>{
        ele.conditionList = [{value:'=',label:'='}]
      })
    },
  },
};
</script>

<style lang="scss">
.explain {
  padding-bottom: 28px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 26%,
    rgba(57, 117, 198, 0.3082) 111%
  );
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 100px;
  &1 {
    padding-top: 20px;
    padding-bottom: 12px;
  }
  &2 {
    color: #3573f3;
  }
}
.explain-content {
  height: calc(100vh - 100px);
  padding: 0 16px 16px 16px;
  overflow-y: auto;

  .blue-bottom {
    margin-bottom: 8px;
  }
  .blue-bottom::before {
    content: "";
    display: inline-block;
    width: 80px;
    height: 8px;
    position: absolute;
    top: 12px;
    z-index: -99;
    background: linear-gradient(270deg, rgba(0, 171, 254, 0) 27%, #3573f3 99%);
  }

  .ec-item {
    line-height: 22px;
    margin-bottom: 10px;
    .blue-dot {
      margin-left: 10px;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 4px;
        position: absolute;
        top: 9px;
        z-index: -99;
        background: #3573f3;
      }
    }
  }
}
.bottom-style {
  font-size: 12px;
  color: #969799;
  padding-bottom: 20px;
  .tip {
    margin-top: 20px;
  }
  p {
    line-height: 20px;
    margin: 0;
  }
}
.foot-know {
  .btn-know {
    text-align: center;
    color: #fff;
    padding: 9px 0 9px 0;
    background: #3573f3;
    border-radius: 4px;
  }
}
.h {
  height: 100px;
}
.rowstart {
  display: flex;
}
.seled-btn {
  background-color: #ebf1fe;
  border: 1px solid #3573f3;
  color: #3573f3;
}
.seled-btn-half {
  background-color: #fff;
  border: 1px solid #3573f3;
  color: #3573f3;
}
.btn-main {
  padding: 6px 10px;
  cursor: pointer;
  border-bottom: 1px solid #e0e3e9;
  border-top: 1px solid #e0e3e9;
}
.btn-main1 {
  border-radius: 4px 0 0 4px;
  background: #3975c6;
  color: #fff;
  border-left: 1px solid #e0e3e9;
}
.btn-main2 {
  border-radius: 4px 0 0 4px;
  background: #fff;
  color: #646566;
  border-left: 1px solid #e0e3e9;
}
.btn-main3 {
  border-radius: 0 4px 4px 0;
  background: #3975c6;
  color: #fff;
  border-right: 1px solid #e0e3e9;
}
.btn-main4 {
  border-radius: 0 4px 4px 0;
  background: #fff;
  color: #646566;
  border-right: 1px solid #e0e3e9;
}
.wrap-outter {
  height: 100%;
  overflow-y: auto;
}
.wrap {
  padding: 0 15px 60px 15px;
  .wrap-top {
    margin-top: 10px;

    > p {
      color: #4f4b46;
    }

    .item {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .btn {
      margin-top: 5px;
      margin-right: 8px;
      width: 30%;
      text-align: center;
      padding: 5px;
      border-radius: 8px;
    }

    .sel-btn {
      background-color: #f5f7f8;
      color: #717171;
      border: 1px solid #f0f0f0;
    }

    .seled-btn {
      background-color: #edf5ff;
      border: 1px solid #6aa4ec;
      color: #6aa4ec;
    }
  }
}

.btn-con {
  border-radius: 8px;
  width: 48%;
  padding: 0.23rem 1.71rem;
  border: 1px solid #f0f0f0;
}
::v-deep .u-btn--default {
  color: #b7b8b8 !important;
  border-radius: 0px;
}

.wrap-foot {
  position: fixed;
  margin-top: 5px;
  bottom: -1px;
  width: 100%;
}

::v-deep uni-button {
  width: 100%;
}

.container {
  display: flex;
  background-color: white;
  padding: 5px;
  border-radius: 8px;

  .right-icon {
    margin-top: 7px;
    margin-left: 10px;
  }
}

::v-deep .u-action-active {
  color: gray;
}

::v-deep .u-content {
  border: 1px solid #ccc !important;
}
.demo_warp .tab_tit {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 1% 1% 1% 0;
}
::-webkit-scrollbar {
  display: none;
}
.demo_warp .active {
  color: red;
  background-color: cadetblue;
}
.demo_warp ul li {
  list-style: none;
  padding: 1.2% 3.2%;
  text-align: center;
  background-color: #ccc;
  margin-left: 1%;
}
.demo_warp .tab_con {
  width: 100%;
  height: 3rem;
  border: 1px solid rgb(85, 85, 177);
  text-align: center;
}
</style>
