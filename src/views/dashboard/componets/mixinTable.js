import Tips from "@/components/Tips/index";

export default {
  components: {
    Tips,
  },
  data() {
    return {
      tableColumnsFour: [],
      tableColumnsProp: [],
      levelCount: 2,
    };
  },
  created() {},
  methods: {
    getColumnsFour(table, columnsData, columnsDesData) {
      try {
        
     
      const columns = 'busiType1,busiType2,busiType3,财富-固收$货币$2024/9/1$A'.split(",");
      const columnsDesc = '业务类型1,业务类型2,业务类型3,财富-固收$货币$2024/9/1$时点规模（亿元）'.split(",");
      // const columns = columnsData;
      // const columnsDes = columnsDesData.map((item, index) => {
      //   return `${item}${"*".repeat(index)}`;
      // });

      // columnsDesc
      const level1Set = new Set();
      const labelLevel1Set = new Set();
      const level2Set = new Set();
      const labelLevel2Set = new Set();
      const level3Set = new Set();
      const labelLevel3Set = new Set();
      const level4Set = new Set();
      const labelLevel4Set = new Set();

      // const columnKeys = []
      columns.forEach((prop, index) => {
        if (!prop.includes("$")) {
          level1Set.add(prop);
          labelLevel1Set.add(columnsDesc[index]);
        } else {
          const allLevelProps = prop.split("$"); //['财富-固收','货币', '2024/9/1','A']
          const allLevelLabels = columnsDesc[index].split("$"); //['财富-固收','货币', '2024/9/1','时点规模（亿元）']
          level1Set.add(allLevelProps[0]);
          labelLevel1Set.add(allLevelLabels[0]);
          level2Set.add(`${allLevelProps[0]}$${allLevelProps[1]}`);
          labelLevel2Set.add(`${allLevelLabels[0]}$${allLevelLabels[1]}`);
          if (allLevelProps.length >= 3) {
            level3Set.add(
              `${allLevelProps[0]}$${allLevelProps[1]}$${allLevelProps[2]}`
            );
            labelLevel3Set.add(
              `${allLevelLabels[0]}$${allLevelLabels[1]}$${allLevelLabels[2]}`
            );
          }
          if (allLevelProps.length >= 4) {
            level4Set.add(
              `${allLevelProps[0]}$${allLevelProps[1]}$${allLevelProps[2]}$${allLevelProps[3]}`
            );
            labelLevel4Set.add(
              `${allLevelLabels[0]}$${allLevelLabels[1]}$${allLevelLabels[2]}$${allLevelLabels[3]}`
            );
          }
        }
      });
      const level1 = Array.from(level1Set).map((prop, index) => ({
        prop: prop,
        label: Array.from(labelLevel1Set)[index],
      }));
      const level2 = Array.from(level2Set).map((prop, index) => ({
        prop: prop,
        label: Array.from(labelLevel2Set)[index],
      }));
      const level3 = Array.from(level3Set).map((prop, index) => ({
        prop: prop,
        label: Array.from(labelLevel3Set)[index],
      }));
      const level4 = Array.from(level4Set).map((prop, index) => ({
        prop: prop,
        label: Array.from(labelLevel4Set)[index],
      }));
      console.log(level1, level2, level3, level4);
      const allColumns = level1.map((info, index) => {
        return {
          prop: info.prop,
          label: info.label.replaceAll("*", ""),
          selected: true,
          fixed: ["业务资产分类", "统一资产分类", "基准组合分类"].includes(
            info.label.replaceAll("*", "")
          ),
          renderHeader: (h, { column, $index }, index) => {
            if (column.label.includes("~")) {
              return (
                <Tips label={column.label}>
                  <span>展示信息</span>
                </Tips>
              );
            } else {
              return column.label;
            }
          },
          columns: level2
            .filter((info2) => info2.prop.startsWith(info.prop + "$"))
            .map((info2) => {
              this.levelCount = 2;

              return {
                prop: info2.prop,
                label: info2.label
                  .replace(info.label + "$", "")
                  .replaceAll("*", ""),
                selected: true,
                align: "right",
                columns: level3
                  .filter((info3) => info3.prop.startsWith(info2.prop + "$"))
                  .map((info3) => {
                    this.levelCount = 3;
                    return {
                      prop: info3.prop,
                      label: info3.label
                        .replace(info2.label + "$", "")
                        .replaceAll("*", ""),
                      selected: true,
                      align: "right",
                      columns: level4
                        .filter((info4) =>
                          info4.prop.startsWith(info3.prop + "$")
                        )
                        .map((info4) => {
                          this.levelCount = 4;
                          return {
                            prop: info4.prop,
                            label: info4.label
                              .replace(info3.label + "$", "")
                              .replaceAll("*", ""),
                            selected: true,
                            align: "right",
                          };
                        }),
                    };
                  }),
              };
            }),
        };
      });
      console.log("columns--", allColumns);
      // -----------合并成一列-----------
      const combinedLabel = allColumns[0].label;
      this.combinedColumnCount = 0;
      allColumns.forEach((item) => {
        if (item.label === combinedLabel) {
          this.combinedColumnCount += 1;
        }
      });

      if (this.combinedColumnCount > 1) {
        const combineColumn = {
          label: combinedLabel,
          prop: allColumns[0].prop + "combined",
          align: "center",
          width: this.combinedColumnCount * 150,
          fixed: true,
          columns: allColumns.slice(0, this.combinedColumnCount).map((item) => {
            return { ...item, width: 150, fixed: false };
          }),
        };
        this.tableColumnsFour = [
          combineColumn,
          ...allColumns.slice(this.combinedColumnCount),
        ];
      } else {
        this.tableColumnsFour = allColumns;
      }
      // -----------end 合并成一列-----------

      this.tableColumnsProp = allColumns;
      console.log("tableColumnsProp--", this.tableColumnsProp);
      return this.tableColumnsFour;
    } catch (error) {
        console.log("error--", error);
    }
      
    },
  },
};
