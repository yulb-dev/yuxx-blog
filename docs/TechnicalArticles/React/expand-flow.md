# 使用 x6 实现简单的 `flow` 并支持节点 `展开/收起`

## 效果演示

我们的效果如下图所示：

## 定义数据

我们的数据结构和测试数据如下所示：

```ts
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

const data: Tree = {
  id: "1",
  label: "第1项",
  children: [
    {
      id: "1.1",
      label: "第1.1项",
      children: [
        {
          id: "1.1.1",
          label: "第1.1.1项",
        },
      ],
    },
    {
      id: "1.2",
      label: "第1.2项",
      children: [
        {
          id: "1.2.1",
          label: "第1.2.1项",
        },
      ],
    },
    {
      id: "1.3",
      label: "第1.3项",
    },
  ],
};
```

## 自定义节点组件

> src\components\CustomNode\index.module.css

```css
.custom_node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  color: #262626;
  background: rgba(240, 245, 255, 0.5);
  border: 1px solid #597ef7;
}

.mr_1 {
  margin-right: 4px;
}
```

> src\components\CustomNode\index.tsx

```ts
import { Node } from "@antv/x6";
import { useState } from "react";
import expandIcon from "../../assets/expand.png";
import retractIcon from "../../assets/retract.png";
import styles from "./index.module.css";

export default ({ node }: { node: Node }) => {
  // node 为当前节点实例，node.prop 获取节点上的某个属性
  const label = node.prop("label");
  const [expand, setExpand] = useState(true);

  const icon = expand ? retractIcon : expandIcon;

  const handleClick = () => {
    const result = !expand;
    setExpand(result);
  };

  return (
    <div className={styles.custom_node}>
      <span className={styles.mr_1}>{label}</span>
      <img style={{ width: "18px" }} onClick={handleClick} src={icon} />
    </div>
  );
};
```

测试 CustomNode：组件中的 `node` prop 由 x6 提供，为了方便测试，我们可以自己传入 node

> src\App.tsx

```ts
import CustomNode from "./components/CustomNode";

const node: any = {
  prop() {
    return "标签一";
  },
};

export default () => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: 172, height: 32 }}>
        <CustomNode node={node} />
      </div>
    </div>
  );
};
```

效果如下所示：
![test.png](/expand-flow/1.png)

## 安装依赖

```shell
npm install @antv/x6 @antv/x6-react-shape dagre @types/dagre  --save
```

其中 `x6` 、`x6-react-shape` 提供 flow 组件，`dagre` 提供自动布局

## 编写工具类函数

### 转换数据结构为 x6 支持的格式(formatData)

> src\utils\index.tsx

```ts
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

const formatData = (
  data: Tree[] = [],
  resultData: any = { nodes: [], edges: [] },
  parentNode?: { id: string; label: string; children?: string[] }
): any => {
  const { nodes, edges } = resultData;
  data.forEach((item) => {
    const { label, id, children = [] } = item || {};

    // 节点配置，具体参见文档
    const node = {
      shape: "custom-node",
      label,
      id,
      children: [...children.map(({ id }) => id)],
      movable: false,
    };

    nodes.push(node);
    if (parentNode != null) {
      // 连接线配置，具体参见文档
      const edge = {
        shape: "dag-edge",
        source: parentNode.id,
        target: id,
        connector: "rounded",
      };
      edges.push(edge);
    }
    formatData(children, resultData, node);
  });

  return resultData;
};
export { formatData };
```

### 自动布局(layout)

在 `src\utils\index.tsx` 中添加以下代码：

```ts
import Dagre from "dagre";

// 布局风格，默认 TB
type Dir = "LR" | "RL" | "TB" | "BT";

function layout(graph?: Graph, dir: Dir = "TB") {
  if (!graph) return;
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  const dagre: any = Dagre;
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: dir, nodesep: 16, ranksep: 16 });
  g.setDefaultEdgeLabel(() => ({}));

  const width = 200;
  const height = 60;
  nodes.forEach((node) => {
    g.setNode(node.id, { width, height });
  });

  edges.forEach((edge: any) => {
    const source = edge.getSource();
    const target = edge.getTarget();
    g.setEdge(source.cell, target.cell);
  });

  dagre.layout(g);

  g.nodes().forEach((id: any) => {
    const node = graph.getCellById(id);
    if (node) {
      const pos = g.node(id);
      (node as any).position(pos.x, pos.y);
    }
  });

  edges.forEach((edge) => {
    const source = edge.getSourceNode()!;
    const target = edge.getTargetNode()!;
    const sourceBBox = source.getBBox();
    const targetBBox = target.getBBox();

    if ((dir === "LR" || dir === "RL") && sourceBBox.y !== targetBBox.y) {
      const gap =
        dir === "LR"
          ? targetBBox.x - sourceBBox.x - sourceBBox.width
          : -sourceBBox.x + targetBBox.x + targetBBox.width;
      const fix = dir === "LR" ? sourceBBox.width : 0;
      const x = sourceBBox.x + fix + gap / 2;
      edge.setVertices([
        { x, y: sourceBBox.center.y },
        { x, y: targetBBox.center.y },
      ]);
    } else if (
      (dir === "TB" || dir === "BT") &&
      sourceBBox.x !== targetBBox.x
    ) {
      const gap =
        dir === "TB"
          ? targetBBox.y - sourceBBox.y - sourceBBox.height
          : -sourceBBox.y + targetBBox.y + targetBBox.height;
      const fix = dir === "TB" ? sourceBBox.height : 0;
      const y = sourceBBox.y + fix + gap / 2;
      edge.setVertices([
        { x: sourceBBox.center.x, y },
        { x: targetBBox.center.x, y },
      ]);
    } else {
      edge.setVertices([]);
    }
  });
}

export { formatData, layout };
```

## DataFlow 组件

增加 DataFlow 组件：

> src\components\DataFlow\index.tsx

```ts
import { Graph } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import { useEffect, useMemo, useRef } from "react";
import { formatData, layout, Tree } from "../../utils";
import CustomNode from "../CustomNode";

//注册自定义组件
register({
  shape: "custom-node",
  width: 172,
  height: 32,
  component: CustomNode,
});

//修改连接线样式
Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#CFD2DC",
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true
);

export default (props: { value?: Tree }) => {
  const { value } = props;
  //画布渲染的div元素
  const divRef = useRef<any>();
  // Graph 实例
  const graphRef = useRef<Graph>();

  const showData = useMemo(() => {
    if (!value) return [];
    const result = formatData([value]);
    return result;
  }, [value]);

  const fromJSON = () => {
    //更改数据
    graphRef.current?.fromJSON(showData);
    //重新布局
    layout(graphRef.current);
    // 修改缩放使内容完全展示在画布当中
    graphRef.current?.zoomToFit({ maxScale: 1 });
  };

  const init = () => {
    if (!divRef.current) return;
    // 初始化 Graph 实例，具体配置可参见文档
    const graph = new Graph({
      container: divRef.current,
      height: 400,
      panning: true,
      mousewheel: true,
      background: {
        color: "#fafafa",
      },
      grid: {
        visible: true,
        type: "dot",
        size: 7,
        args: {
          color: "#e6e6e6", // 网点颜色
          thickness: 1, // 网点大小
        },
      },
      translating: {
        restrict: true,
      },
      interacting: false,
    });
    graphRef.current = graph;
    fromJSON();
  };

  useEffect(fromJSON, [showData]);

  useEffect(() => {
    init();
    return () => {
      graphRef.current?.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div id="container" ref={divRef}></div>
    </div>
  );
};
```

## 使用 DataFlow 组件

回到 `src\App.tsx` 中，修改以下代码：

```ts
import DataFlow from "./components/DataFlow";
import { Tree } from "./utils";

export default () => {
  // 省略 data 定义，可复制定义数据中的 data 数据
  // ...
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "500px", height: "500px" }}>
        <DataFlow value={data} />
      </div>
    </div>
  );
};
```

效果如下所示：
![test2.png](/expand-flow/2.png)

## 展开和收起

现在的基本浏览功能已经实现，但是点击的时候并不能进行展开和收起，因为我们还没有做任何相关的逻辑处理。接下来，添加这些逻辑

回到 `src\utils\index.tsx` 中，添加 setVisible 函数

```ts
import { Cell, Graph } from "@antv/x6";

const setVisible = (nodes: Cell<Cell.Properties>[], value = true) => {
  nodes?.forEach((child) => {
    if (child.children) {
      setVisible(child.children, value);
    }
    child.setVisible(value);
  });
};

export { formatData, layout, setVisible };
```

在 `src\components\CustomNode\index.tsx` 中使用该函数处理节点的展开和收起

```ts
import { setVisible } from "../../utils";
// 省略...
const handleClick = () => {
  const result = !expand;
  setVisible(node.children ?? [], result);
  setExpand(result);
};
// 省略...
```

再次回到页面当中，展开/收起功能已经可以正常使用了
