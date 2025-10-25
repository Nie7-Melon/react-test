import React, { useState } from "react";
import { Tree } from "antd";

const DraggableTreeMenu = () => {
  const [treeData, setTreeData] = useState([
    {
      key: "1",
      title: "一级菜单1",
      children: [
        { key: "1-1", title: "二级菜单1-1" },
        { key: "1-2", title: "二级菜单1-2" },
        { key: "1-3", title: "二级菜单1-3" },
      ],
    },
    {
      key: "2",
      title: "一级菜单2",
      children: [
        { key: "2-1", title: "二级菜单2-1" },
        { key: "2-2", title: "二级菜单2-2" },
      ],
    },
  ]);

  const onDrop = (info) => {
    console.log("drop", info);
    //info参数包含拖拽相关的所有信息（比如被拖拽节点、目标移动节点、位置等）
    const movedNodeKey = info.dragNode.key; // 被拖动的节点
    const finalMovedNodeKey = info.node.key; // 最终移动到的位置的节点

    const dropPos = info.node.pos.split("-"); // 节点移动在树中的位置路径（例如 "0-0" 表示第 1 个一级菜单的第 1 个子菜单）
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // 目标节点的位置信息（0表示插入到目标节点前面，1表示插入到目标节点后面）

    console.log(movedNodeKey, finalMovedNodeKey, dropPos, dropPosition);

    // 获取拖拽节点和目标节点的父级key
    const movedNodeParentKey = movedNodeKey.toString().split("-")[0]; //先将movedNodeKey转换为字符串，从movedNodeKey中提取以 - 分隔的第一部分内容
    const finalMovedNodeKeyParentKey = finalMovedNodeKey
      .toString()
      .split("-")[0];

    console.log(movedNodeParentKey, finalMovedNodeKeyParentKey);
    // 禁止不同父级之间的拖拽
    if (
      (finalMovedNodeKey === "1" && dropPosition === -1) ||
      movedNodeParentKey !== finalMovedNodeKeyParentKey
    ) {
      return;
    }

    //loop函数：
    //比如点了1-1，拖拽到1-2，
    //那么第一次data.length为2（两个一级菜单），走到第二个if, data[i].children（第一个一级菜单）作为data丢进loop
    //再次调用loop。这时data.length为3(一级菜单下有三个子菜单)，在第一个if里能找到key对应的node，把信息(data[i] key值对应的node, i索引, data节点所在父节点下的所有子数据)传给callback
    const loop = (data, key, callback) => {
      console.log(data, data.length, key, callback);
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          console.log(data[i], i, data);
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = [...treeData];

    let movedNodeObj;
    //找到被拖拽的节点，在它所在的chlidren中把它删掉
    loop(data, movedNodeKey, (item, index, arr) => {
      arr.splice(index, 1); // 从数组中删除被拖拽节点
      console.log("arr:", arr);
      movedNodeObj = item; // 保存被拖拽的节点对象
      console.log("movedNodeObj:", movedNodeObj);
    });

    //如果二级菜单下还有三级菜单，用这个判断控制
    if (!info.dropToGap) {
      //info.dropToGap：布尔值，false表示拖拽到目标节点内部（成为其子节点），true表示拖拽到目标节点的相邻位置（同级调整顺序）
      loop(data, finalMovedNodeKey, (item) => {
        //把被删除的节点重新添加回item的children中（不对的情况，万一能用到）
        item.children = item.children || [];
        item.children.unshift(movedNodeObj);
      });
    } else {
      let finalArr;
      let nodeIndex;
      loop(data, finalMovedNodeKey, (item, index, arr) => {
        finalArr = arr;
        nodeIndex = index;
      });

      if (dropPosition === -1) {
        // 拖拽到前面
        finalArr.splice(nodeIndex, 0, movedNodeObj); //在i索引前插入movedNodeObj
      } else {
        // 拖拽到后面
        finalArr.splice(nodeIndex + 1, 0, movedNodeObj); //在i索引后插入movedNodeObj
      }
    }

    setTreeData(data);
  };

  return (
    <Tree
      className="draggable-tree"
      treeData={treeData} // 树数据
      defaultExpandAll // 默认展开所有节点
      // draggable // 开启拖拽功能
      draggable={{
        icon: false, // 开启拖拽功能，但是隐藏默认拖拽图标
      }}
      blockNode // 节点可拖拽
      onDrop={onDrop} // 拖拽结束事件
      showLine // 显示连接线
      // titleRender自定义拖拽节点的渲染
      titleRender={(nodeData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* 只有二级菜单显示拖拽图标 */}
          {nodeData.key.toString().includes("-") && (
            <span
              style={{
                marginRight: 8,
                cursor: "grab",
                userSelect: "none",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              ⋮⋮
            </span>
          )}
          <span>{nodeData.title}</span>
        </div>
      )}
    />
  );
};

export default DraggableTreeMenu;
