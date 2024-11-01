import { getExcelColumnName } from "@/utils/index.js";

let preTrLength = 0;
// 处理导出数据格式函数 table: 表头 list：导出展示表格数据 name: 导出文件名 mergeDataColumn: 合并单元格列,addLists 多个表格传入参数
export const getExportData = (
  table = [],
  list = [],
  name = "",
  mergeDataColumn = [],
  addLists = [],
  appendFrom = 1
) => {
  let props = []; //所有数据的prop
  let header = []; //最下一级的表头
  let multiHeaders = []; //二级表头的数据
  let multiHeadersThree = []; //三级表头的数据
  let multiHeadersFour = []; //四级表头的数据
  let trNum = 1; // 默认存在一级表头 trNum用来记录存在几级表头
  let start_position = [];
  for (let item of table) {
    //遍历表头用来更新trNum
    if (item.columns && item.columns.length > 0) {
      //存在二级表头
      trNum < 2 && (trNum = 2);
      for (let i = 0; i < item.columns.length; i++) {
        let subItem = item.columns[i];
        if (subItem.columns && subItem.columns.length > 0) {
          //存在三级表头
          trNum < 3 && (trNum = 3);
          if (
            subItem.columns.filter(
              (sub4Item) => sub4Item.columns && sub4Item.columns.length > 0
            )
          ) {
            //存在四级表头
            trNum < 4 && (trNum = 4);
          }
        }
      }
    }
  }

  for (let item of table) {
    if (item.columns && item.columns.length > 0) {
      //存在二级表头
      for (let i = 0; i < item.columns.length; i++) {
        let subItem = item.columns[i];
        if (subItem.columns && subItem.columns.length > 0) {
          //存在三级表头
          for (let j = 0; j < subItem.columns.length; j++) {
            let sonItem = subItem.columns[j];
            if (sonItem.columns && sonItem.columns.length > 0) {
              //存在四级表头
              for (let k = 0; k < sonItem.columns.length; k++) {
                let sub4Item = sonItem.columns[k];
                props.push(sub4Item.prop);
                header.push(sub4Item.label);
                if (trNum == 2) {
                  multiHeaders.push(subItem.label);
                } else if (trNum == 3) {
                  multiHeaders.push(subItem.label);
                  multiHeadersThree.push(item.label);
                } else if (trNum == 4) {
                  multiHeaders.push(sonItem.label);
                  multiHeadersThree.push(subItem.label);
                  multiHeadersFour.push(item.label);
                }
              }
            } else {
              //只有三级
              props.push(sonItem.prop);
              header.push(sonItem.label);
              if (trNum == 2) {
                multiHeaders.push(subItem.label);
              } else if (trNum == 3) {
                multiHeaders.push(subItem.label);
                multiHeadersThree.push(item.label);
              } else if (trNum == 4) {
                multiHeaders.push(sonItem.label);
                multiHeadersThree.push(subItem.label);
                multiHeadersFour.push(item.label);
              }
            }
          }
        } else {
          //只有二级
          props.push(subItem.prop);
          header.push(subItem.label);
          if (trNum == 2) {
            multiHeaders.push(item.label);
          } else if (trNum == 3) {
            multiHeaders.push(subItem.label);
            multiHeadersThree.push(item.label);
          } else if (trNum == 4) {
            multiHeaders.push(subItem.label);
            multiHeadersThree.push(subItem.label);
            multiHeadersFour.push(item.label);
          }
        }
      }
    } else {
      //只有一级
      props.push(item.prop);
      header.push(item.label);
      if (trNum == 2) {
        multiHeaders.push(item.label);
      } else if (trNum == 3) {
        multiHeaders.push(item.label);
        multiHeadersThree.push(item.label);
      } else if (trNum == 4) {
        multiHeaders.push(item.label);
        multiHeadersThree.push(item.label);
        multiHeadersFour.push(item.label);
      }
    }
  }

  let multiHeader = [];
  let merges = [];
  if (header.length > 0) {
    multiHeader.push(header);
    getMergeHeader(header, merges, appendFrom + (trNum - 1));
  }
  if (multiHeaders.length > 0) {
    multiHeader.push(multiHeaders);
    getMergeHeader(multiHeaders, merges, appendFrom + (trNum - 2));
  }
  if (multiHeadersThree.length > 0) {
    multiHeader.push(multiHeadersThree);
    getMergeHeader(multiHeadersThree, merges, appendFrom + (trNum - 3));
  }
  if (multiHeadersFour.length > 0) {
    multiHeader.push(multiHeadersFour);
    getMergeHeader(multiHeadersFour, merges, appendFrom); //+ (trNum - 4)
  }

  let data = list.map((v) => props.map((j) => v[j]));
  let filename = name;

  for (let i = 0; i < header.length; i++) {
    if (trNum == 4) {
      if (
        header[i] == multiHeaders[i] &&
        header[i] == multiHeadersFour[i] &&
        header[i] == multiHeadersThree[i]
      ) {
        let from = getExcelColumnName(i);
        merges.push(from + appendFrom + ":" + from + (appendFrom + 3)); //
      } else if (
        header[i] == multiHeaders[i] &&
        header[i] == multiHeadersThree[i]
      ) {
        let from = getExcelColumnName(i);
        merges.push(from + appendFrom + ":" + from + (appendFrom + 2)); //
      } else if (header[i] == multiHeaders[i]) {
        let from = getExcelColumnName(i);
        merges.push(from + (appendFrom + 1) + ":" + from + (appendFrom + 2)); //
      }
    } else if (trNum == 3) {
      if (header[i] == multiHeaders[i] && header[i] == multiHeadersThree[i]) {
        let from = getExcelColumnName(i);
        merges.push(from + appendFrom + ":" + from + (appendFrom + 2)); //
      } else if (header[i] == multiHeaders[i]) {
        let from = getExcelColumnName(i);
        merges.push(from + (appendFrom + 1) + ":" + from + (appendFrom + 2)); //
      }
    } else if (trNum == 2) {
      if (header[i] == multiHeaders[i]) {
        let from = getExcelColumnName(i);
        merges.push(from + appendFrom + ":" + from + (appendFrom + 1)); //
      }
    }
  }

  for (let i = 0; i < mergeDataColumn.length; i++) {
    let obj = mergeDataColumn[i];
    let rows = getMergeData(
      obj,
      list,
      i,
      multiHeaders.length,
      appendFrom,
      mergeDataColumn
    );
    merges.push(rows);
  }

  let appendData = [];
  let appendDataFromX = 1 + list.length + multiHeader.length + 1;
  const appendOrigin = 1 + list.length + multiHeader.length + 1;
  if (addLists.length > 0) {
    for (let i = 0; i < addLists.length; i++) {
      let appendObj = addLists[i];
      if (i > 0) {
        let preListLength = addLists[i - 1].appendList.length;
        appendDataFromX = appendDataFromX + preListLength + preTrLength + 1;
        appendData.push([]);
      }

      let result = getExportData(
        appendObj,
        appendTable,
        appendObj.appendList,
        "append",
        appendObj.mergeDataColumn,
        [],
        appendDataFromx
      );
      preTrLength = result.multiHeader.length;
      for (let i = result.multiHeader.length - 1; i >= 0; i--) {
        let item = result.multiHeader[i];
        appendData.push(item);
      }
      appendData.push(...result.data);
      merges.push(...result.merges);
    }
  }
  console.log("218----merges", merges);
  merges = mergeRanges(merges);
  return {
    multiHeader,
    header,
    data,
    filename,
    merges,
    appendData,
    appendOrigin,
  };
};

const getMergeHeader = (rows, merges, appendFrom) => {
  let columnPreIndex = 0;
  for (let j = 0; j < rows.length; j++) {
    let item = rows[j];
    if (j > 0) {
      let itemColumnPre = rows[j - 1];
      if (itemColumnPre != item) {
        if (j - columnPreIndex > 1) {
          let from = getExcelColumnName(columnPreIndex);
          let end = getExcelColumnName(j - 1);
          merges.push(from + appendFrom + ":" + end + appendFrom);
        }
        columnPreIndex = j;
      }
    }
  }
};

const getMergeData = (
  prop,
  tableData,
  columnIndex,
  headerRows,
  appendFrom,
  mergeDataColumn = []
) => {
  let mutiRows = [];
  let preIndex = 0;
  let preColumnIndex =
    mergeDataColumn.indexOf(prop) - 1 >= 0
      ? mergeDataColumn.indexOf(prop) - 1
      : 0;
  let preColumn = mergeDataColumn[preColumnIndex];
  for (let i = 1; i < tableData.length; i++) {
    let pre = tableData[i - 1];
    let now = tableData[i];
    if (!pre.hasOwnProperty(prop)) {
      continue;
    }
    if (!(pre[prop] == now[prop] && pre[preColumn] == now[preColumn])) {
      if (i - preIndex > 1) {
        let endColumnIndex = getColumnIndex(
          pre,
          prop,
          mergeDataColumn,
          preIndex,
          i - preIndex,
          tableData
        );
        let from =
          getExcelColumnName(columnIndex) +
          (preIndex + appendFrom + headerRows);
        let end =
          getExcelColumnName(endColumnIndex + endColumnIndex) +
          (i - 1 + appendFrom + headerRows);
        if (from != end) {
          mutiRows.push(from + ":" + end);
        }
      } else if (i - preIndex == 1) {
        let endColumnIndex = getColumnIndex(
          pre,
          prop,
          mergeDataColumn,
          preIndex,
          i - preIndex,
          tableData
        );
        let from =
          getExcelColumnName(columnIndex) +
          (preIndex + appendFrom + headerRows);
        let end =
          getExcelColumnName(columnIndex + endColumnIndex) +
          (preIndex + appendFrom + headerRows);
        if (from != end) {
          mutiRows.push(from + ":" + end);
        }
      }

      preIndex = i;
    }
  
  if (i == tableData.length - 1) {
    if (pre[prop] == now[prop] && pre[preColumn] == now[preColumn]) {
      let endColumnIndex = getColumnIndex(
        now,
        prop,
        mergeDataColumn,
        preIndex,
        i - preIndex + 1,
        tableData
      );
      let from =
        getExcelColumnName(columnIndex) + (preIndex + appendFrom + headerRows);
      let end =
        getExcelColumnName(endColumnIndex + endColumnIndex) +
        (i + appendFrom + headerRows);
      if (from != end) {
        mutiRows.push(from + ":" + end);
      }
    } else {
      let endColumnIndex = getColumnIndex(
        now,
        prop,
        mergeDataColumn,
        preIndex,
        i - preIndex,
        tableData
      );
      let from =
        getExcelColumnName(columnIndex) + (i + appendFrom + headerRows);
      let end =
        getExcelColumnName(endColumnIndex + endColumnIndex) +
        (i + appendFrom + headerRows);
      if (from != end) {
        mutiRows.push(from + ":" + end);
      }
    }
  }
}
  return mutiRows;
};

const getColumnIndex = (
  loopRow,
  prop,
  mergeDataColumn,
  startIndex,
  rowspan,
  tableData
) => {
  let colspan = 0;
  let loopFromIndex = mergeDataColumn.indexOf(prop);
  for (let j = loopFromIndex; i < mergeDataColumn.length; j++) {
    let now = loopRow[mergeDataColumn[j]];
    let firstPre =
      loopFromIndex == 0
        ? "no first column"
        : loopRow[mergeDataColumn[loopFromIndex - 1]];
    let next =
      j < mergeDataColumn.length - 1
        ? loopRow[mergeDataColumn[j + 1]]
        : "no last column";

    if (now != firstPre) {
      if (now == next) {
        if (rowspan > 1) {
          let nextColumnRowSpan = 1;
          let loopNum = (startIndex =
            rowspan < tableData.length
              ? startIndex + rowspan
              : tableData.length);
          for (let i = startIndex; i < loopNum; i++) {
            let row = tableData[i];
            let rowNext = i + 1 < tableData.length ? tableData[i + 1] : {};
            let startColumn =
              loopFromIndex + 1 < mergeDataColumn.length
                ? mergeDataColumn[loopFromIndex + 1]
                : null;
            if (startColumn) {
              let nowValue = row[startColumn];
              let nextValue = rowNext[startColumn];
              if (nowValue == nextValue) {
                nextColumnRowSpan++;
              } else {
                break;
              }
            }
          }
          if (rowspan == nextColumnRowSpan) {
            colspan++;
          }
        } else {
          colspan++;
        }
      } else {
        break;
      }
    } else {
      colspan = 0;
    }
  }
  return colspan;
};
const parseRange = (range) => {
  const cols = range.match(/[A-Z]+/g).map((col) => {
    return col
      .split("")
      .reduce((prev, curr) => prev * 26 + (curr.charCodeAt(0) - 64), 0);
  });
  const rows = range.match(/[0-9]+/g).map(Number);
  return {
    start: {
      col: cols[0],
      row: rows[0],
    },
    end: {
      col: cols[1] || cols[0],
      row: rows[1] || rows[0],
    },
  };
};
const rangeToString = (range) => {
  const colToAlpha = (col) => {
    let alpha = "";
    while (col > 0) {
      const modulo = (col - 1) % 26;
      alpha = String.fromCharCode("A".charCodeAt(0) + modulo) + alpha;
      col = Math((col - modulo - 1) / 26);
    }
    return alpha;
  };
  return `${colToAlpha(range.start.col)}${range.start.row}:${colToAlpha(
    range.end.col
  )}${range.end.row}`;
};
const mergeRanges = (ranges) => {
  let parsedRanges = ranges
    .map(parseRange)
    .sort((a, b) => a.strat.row - b.strat.row || a.strat.col - b.strat.col);
  let mergedRanges = [];
  for (const range of parsedRanges) {
    let merged = false;
    for (const mergedRange of mergedRanges) {
      if (
        range.start.row <= mergedRange.end.row &&
        range.end.row >= mergedRange.start.row &&
        range.start.col <= mergedRange.end.col &&
        range.end.col >= mergedRange.start.col
      ) {
        mergedRange.start.row = Math.min(
          mergedRange.start.row,
          range.start.row
        );
        mergedRange.end.row = Math.max(mergedRange.end.row, range.end.row);
        mergedRange.start.col = Math.min(
          mergedRange.start.col,
          range.start.col
        );

        mergedRange.end.col = Math.max(mergedRange.end.col, range.end.col);
        merged = true;
        break;
      }
    }
    if (!merged) {
      mergedRanges.push({ ...range });
    }
  }
  return mergedRanges.map(rangeToString);
};
