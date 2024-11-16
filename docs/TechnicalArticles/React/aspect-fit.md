# 封装 AspectFitImg

## 封装组件

> 使图片在规定大小下，优先将长边展示出来，也就是完整展示整个图片

```javascript
import { ReactEventHandler, useRef, useState } from "react";

export default (props: {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { src, className, style } = props;
  // 图片 style 状态
  const [imgStyle, setImageStyle] = useState<React.CSSProperties>();
  // 容器 ref
  const divRef = useRef<any>();

  const handleLoad: ReactEventHandler<HTMLImageElement> = (img) => {
    // 判断是否已经完成，防止过度修改
    if (imgStyle) return;
    // 获取图片原始高度
    const { naturalWidth, naturalHeight } = img.currentTarget;
    // 获取容器大小
    const { clientWidth, clientHeight } = (divRef.current ||
      {}) as HTMLDivElement;

    const num1 = (naturalHeight / naturalWidth) * 100000;
    const num2 = (clientHeight / clientWidth) * 100000;
    // 通过比例判断如何展示图片
    const result = num2 > num1 ? { width: "100%" } : { height: "100%" };
    // 动态设置图片 style
    setImageStyle(result);
  };

  return (
    <>
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        ref={divRef}
      >
        <img src={src} onLoad={handleLoad} style={imgStyle} />
      </div>
    </>
  );
};
```

## 使用

```javascript
import image1 from "./assets/images/1.png";
import image2 from "./assets/images/2.png";
import CustomImg from "./components/CustomImg";
import "./index.css";

export default () => {
  return (
    <div style={{ display: "flex" }}>
      <CustomImg
        style={{ width: "200px", height: "200px", border: "1px solid pink" }}
        src={image1}
      />
      <CustomImg
        style={{ width: "200px", height: "200px", border: "1px solid pink" }}
        src={image2}
      />
    </div>
  );
};
```

效果如下：
![result.png](/result.png)
