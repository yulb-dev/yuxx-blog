# 通过 nextjs 实现 rest-api 并支持文件上传

在阅读之前，你需要掌握：

- [react 基础知识](https://zh-hans.react.dev/learn)
- [nextjs 基础知识](https://nextjs.org/docs)

## 初始化项目

在命令行输入以下命令初始化 `nextjs` 项目

```shell
npx create-next-app@latest
```

然后根据提示完成初始化，你可以参考下面这个选项：

![next-config.png](/next-config.png)

## 增加 `api` 路由

1. 增加向外提供的 rest 接口 /api/upload：

   向外暴露 `/api/upload` 接口，我们需要创建以下路径：
   `src/app/api/upload`

2. 增加路由处理程序：

   > 路由处理程序允许您使用 Web 请求和响应 API 为给定的路由创建自定义请求处理程序。路由处理程序在 app 目录内的 route.js|ts 文件中定义

   因为此路径不返回页面而是作为接口使用，所以在 `upload` 文件夹内新建 `route.ts` 而不是 `page.tsx`

   ```typescript
   export default async function GET() {}
   ```

3. 接下来就可以在`route.ts`中处理响应，这里为了演示可以先返回一个 `json` 对象用来处理 `GET` 请求:

   ```typescript
   export default async function GET() {
     return Response.json({ message: "哈哈哈" });
   }
   ```

4. 启动项目：
   ```shell
   pnpm dev
   ```
   然后在浏览器或者接口调试工具（[hoppscotch](https://hoppscotch.io/)、[postman](https://www.postman.com/)）中对 `http://localhost:3000/api/upload` 进行调试，你将会得到如下输出的 `json` 对象:
   ```json
   { "message": "哈哈哈" }
   ```
   🎉 恭喜，一个简单的 `rest-api` 接口已经完成了

## 将接口修改为处理文件上传

我们将要使用 post 方法进行文件上传，所以在 `src/app/api/upload/route.ts` 中新增处理 post 请求的方法，这个接口将会返回一个对象，对象中包含一个 size 属性是你上传文件的大小

```typescript
import { NextRequest } from "next/server";

// 处理 post 请求
export async function POST(req: NextRequest) {
  // 获取请求体携带的 formData 对象
  const formData = await req.formData();
  // 拿到 file 字段，这里使用 as File 断言为 File 类型
  const file = formData.get("file") as File;
  console.log("file", file);
  return Response.json({ size: file.size });
}
```

接下来用接口测试工具向该接口发送一个 post 请求，并且向 body 中 添加 file 字段为上传的文件，注意需要设置请求头`Content-Type `的值为 `multipart/form-data`，这样后端才能够正确识别。

如果你用的是 [hoppscotch](https://hoppscotch.io/) ，那么你的请求体应该像这样：
![upload_http_body.png](/upload_http_body.png)

然后点击发送，我们将会得到正确的返回对象：

```json
{ "size": 63368 }
```

## 将文件保存在 “服务器” 并返回地址

我们已经拿到了上传的文件，但是并没有进行任何操作，只是读取了文件的大小并返回

在真实的服务器中，往往会将图片、视频、音频等文件保存在指定位置，但是现在并不重要。我们要做的就是把上传的文件保存到 “服务器” ，这里的服务器其实就是指当前的电脑而已。

继续修改 POST 函数：

```typescript
export async function POST(req: NextRequest) {
  // 获取 formData 对象
  const formData = await req.formData();
  // 拿到 file 字段，这里使用 as File 断言为 File 类型
  const file = formData.get("file") as File;
  // 拿到文件 buffer 对象
  const buffer = await file.arrayBuffer();
  // 转为视图
  const view = new Uint8Array(buffer);
  // 创建写入路径，注意这里不要使用相对路径，因为 next 服务其实是在根目录中.next 里运行
  // 所以结果并不会如你预期所想的那样，这里直接用绝对路径将文件保存在我们的项目中 public 目录下
  const src = path.join(
    "D:",
    "projects",
    "test",
    "rest-next-api",
    "public",
    file.name
  );
  // 通过 nodejs 提供的 fs 库保存我们上传的文件
  await fs.writeFile(src, view);
  return Response.json({ size: file.size });
}
```

然后向上一步一样上传一个文件，之后观察你的 public 目录，你会发现你的文件被保存到了 public 中：

![public.png](/public.png)

现在直接通过浏览器访问 `http://localhost:3000/[上传的文件名称]` 将会在浏览器中呈现刚刚上传的文件，这是因为 next 可以在根目录中名为 public 的文件夹下提供静态文件。

> 注意：只有在构建时位于 public 目录中的资产才会由 next 提供服务。在请求时添加的文件将不可用，所以上方的做法并不使用于生产环境中。

## 提供表单页面

下面我们将创建 uploadFile 页面，并且提供一个简单的表单，只用来文件上传：

```tsx
// src/app/uploadFile/page.tsx

export default function uploadFile() {
  return (
    <form
      action="/api/upload"
      id="myForm"
      method="post"
      encType="multipart/form-data"
    >
      <div>
        <label htmlFor="userfile">上传文件：</label>
        <input type="file" id="userfile" name="file" required />
      </div>
      <input type="submit" value="提交" />
    </form>
  );
}
```

接下来访问 [http://localhost:3000/uploadFile](http://localhost:3000/uploadFile)，你会看到一个文件上传的表单和一个提交按钮，选择文件并且点击提交，同样在 public 中会出现刚刚上传的文件

## 支持多个文件上传

现在我们的文件上传只支持单个文件上传，现在修改表单为多文件上传模式，只需要添加 multiple 属性，并且将 name 字段修改为 files，更符合语义

```html
<input type="file" id="userfile" name="files" required multiple />
```

修改 POST 函数逻辑：

```ts
export async function POST(req: NextRequest) {
  // ...

  // 通过 getAll 拿到所有文件，断言为 File[]
  const files = formData.getAll("files") as File[];
  // 计算所有文件大小之和
  const size = files.reduce(
    (previousValue, currentFile) => previousValue + currentFile.size,
    0
  );
  // 通过 Promise.all 在文件全部保存完成之后在返回响应结果
  await Promise.all(
    files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const view = new Uint8Array(buffer);

      const src = path.join(
        "D:",
        "projects",
        "test",
        "rest-next-api",
        "public",
        file.name
      );

      return fs.writeFile(src, view);
    })
  );
  return Response.json({ size });
}
```

之后在表单页面再次选择文件，进行多选，提交之后会发现多个文件的上传也成功进行了保存。
