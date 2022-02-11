/**
 * @description 将树平铺为数组
 * @param { object } tree 数据
 * @param { String } children 树形结构关联的属性
 */
const getTreeMap = (tree: any, children = "children") => {
  if (!(tree instanceof Array)) return;

  const treeMap: any[] = [];

  tree.forEach((node) => {
    treeMap.push(...getNodeMap(node, tree, children));
  });

  return treeMap;
};

const getNodeMap = (node: any, parentNodea: any, children: string) => {
  //   node.parentNode = JSON.parse(JSON.stringify(parentNode));
  const nodeMap = [node];

  if (node[children] && node[children].length) {
    node[children].forEach((item: any) =>
      nodeMap.push(...getNodeMap(item, node, children))
    );
  }

  return nodeMap;
};

/**
 * @description 将数组变成tree非递归
 * @param {*} arr
 * @param {*} nodeKey 节点标识
 * @param {*} parentKey 父节点标识
 * @param {*} children 子节点属性
 * @returns
 */
const arrayToTree = (
  arr: any,
  nodeKey = "id",
  parentKey = "parentId",
  children = "children"
) => {
  const result: any[] = [];

  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }

  const map: any = {};

  arr.forEach((item) => (map[item[nodeKey]] = item));
  arr.forEach((item) => {
    const parent = map[item[parentKey]];

    if (parent) {
      (parent[children] || (parent[children] = [])).push(item);
      return;
    }

    result.push(item);
  });
  return result;
};

/**
 * @description 查找节点在树中的路径
 * @param {*} tree 树的数据
 * @param {*} id 查找的id
 * @param {*} nodeKey 节点标识符
 * @param {*} children 子节点标识
 * @returns
 */
const getNodePath = (
  tree: any,
  id: string | number,
  nodeKey = "id",
  children = "children"
): any => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  const path: any[] = [];

  const treeFindPath = (tree: any, id: string | number, path: any[]): any => {
    for (const item of tree) {
      path.push(item[nodeKey]);

      if (item[nodeKey] === id) return path;

      if (item[children]) {
        const findChildren = treeFindPath(item[children], id, path);

        if (findChildren.length) {
          return findChildren;
        }
      }

      path.pop();
    }

    return [];
  };

  return treeFindPath(tree, id, path);
};

/**
 * @description 模糊匹配树
 * @param {*} arr 树数据
 * @param {*} value  匹配的数据
 * @param {*} nameKey 查询的属性
 * @param {*} children 子节点属性
 * @returns
 */
const fuzzyQueryTree = (
  arr: any,
  value: any,
  nameKey = "name",
  children = "children"
) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  const result: any[] = [];

  arr.forEach((item) => {
    if (item[nameKey].indexOf(value) > -1) {
      const childrenNode = fuzzyQueryTree(item[children], value);
      const obj = { ...item, childrenNode };

      result.push(obj);
      return;
    }

    if (item[children] && item[children].length > 0) {
      const childrenNode = fuzzyQueryTree(item[children], value);
      const obj = { ...item, childrenNode };

      if (childrenNode && childrenNode.length > 0) {
        result.push(obj);
      }
    }
  });

  return result;
};

/**
 * @description 对树节点的属性进行操作
 * @param {Array} tree 树节点数据
 * @param { Function } callBack 回调函数
 * @param { string } children 子节点
 * @returns
 */
const operationAttrToNodes = (
  tree: any,
  callback: Function,
  children = "children"
) => {
  tree.forEach((item: { [x: string]: any }) => {
    callback(item);

    if (item[children] && item[children].length > 0) {
      operationAttrToNodes(item[children], callback, children);
    }
  });

  return tree;
};

/**
 * @description 删除树的空节点
 * @param {*} tree 数据
 * @param {*} children children = children
 * @returns
 */
const removeEmptyChildren = (tree: any, children = "children") => {
  tree.forEach((item: any) => {
    if (item[children] && item[children].length === 0) {
      // eslint-disable-next-line no-param-reassign
      delete item[children];
      return;
    }

    if (item[children] && item[children].length > 0) {
      removeEmptyChildren(item[children]);
    }
  });

  return tree;
};

/**
 * @description 获取所有的叶子节点
 * @param {*} tree
 * @param {*} children
 * @returns
 */
const getAllLeaf = (tree: any, children = "children") => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  const result: any[] = [];
  const getLeaf = (tree: any) => {
    tree.forEach((item: any) => {
      if (!item[children] || item[children].length === 0) {
        result.push(item);
        return;
      }

      if (item[children] && item[children].length > 0) {
        getLeaf(item[children]);
      }
    });
  };

  getLeaf(tree);
  return result;
};

export {
  getTreeMap,
  getNodeMap,
  getNodePath,
  fuzzyQueryTree,
  operationAttrToNodes,
  removeEmptyChildren,
  getAllLeaf,
  arrayToTree,
};
