# react + pdfjs 实现预览 pdf 文件

## 初始化项目

> 这里通过 vite 构建 react 项目

```shell
pnpm create vite
```

然后按照提示操作

安装依赖：

```shell
pnpm i
```

启动项目：

```shell
pnpm dev
```

## 安装 pdfjs

> 在 npm 中，pdfjs 的预构建版本的名字为 pdfjs-dist，所以直接安装 pdfjs-dist

```shell
pnpm i pdfjs-dist
```

## 封装组件

> src/components/CustomPdf.tsx

```tsx
import { useEffect, useRef } from "react";

export default (props: { filePath?: string }) => {
  const { filePath } = props;

  const divRef = useRef<any>();

  const init = async () => {
    // 不能顶层导入，否则会报错
    let pdfjsLib = await import("pdfjs-dist");
    // 此处的版本号需要和安装的包版本号对应，
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://unpkg.com/pdfjs-dist@4.7.76/build/pdf.worker.mjs";

    // 创建 DocumentFragment 用来存储canvas
    const canvasFragment = new DocumentFragment();
    // 加载 PDF 并与之交互的主要入口点
    const loadingTask = pdfjsLib.getDocument(filePath);
    // 等待加载文档完成
    const pdf = await loadingTask.promise;
    // 获取 PDF文件中的总页数
    const numPages = pdf.numPages;

    // 循环 numPages 动态创建pdf页面
    for (let index = 1; index <= numPages; index++) {
      // 获取指定页的 pdf 页面
      const page = await pdf.getPage(index);

      //设置缩放级别 1.5
      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });
      const outputScale = window.devicePixelRatio || 1;

      const canvas = document.createElement("canvas");
      //存储 canvas，减少浏览器回流重绘
      canvasFragment.appendChild(canvas);

      const context = canvas.getContext("2d");

      //pdf 显示大小的控制，可自行进行修改
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

      const renderContext: any = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      };
      console.log("render", index);

      // 将 pdf 页面进行渲染
      page.render({ ...renderContext });
    }
    //添加到 dom 中
    divRef.current.append(canvasFragment);
  };

  useEffect(() => {
    init();
  }, []);

  return <div ref={divRef}></div>;
};
```

这里的 workerSrc 链接的是外部地址，我们可以将它放在自己的服务器上，减少对外部请求。

1. 将 `node_modules\pdfjs-dist\build\pdf.worker.min.mjs` 移动到 public 目录中
2. 修改 workerSrc 链接地址

```tsx
// ...
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
// ...
```

## 使用组件

可以在 public 文件夹下放一个 test.pdf 文件用来测试，然后修改 App.tsx

> src/App.tsx

```tsx
import { useState } from "react";
import CustomPdf from "./components/CustomPdf";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>显示</button>
      <button onClick={() => setIsOpen(false)}>隐藏</button>
      {isOpen && <CustomPdf filePath="/test.pdf" />}
    </>
  );
}

export default App;
```

效果：
![1.gif](/preview-img/5.png)
