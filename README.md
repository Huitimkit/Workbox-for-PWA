![](https://user-images.githubusercontent.com/110953/28352645-7a8a66d8-6c0c-11e7-83af-752609e7e072.png)
# Workbox-for-PWA
通过Workbox创建一个简单的离线web app

## Workbox
Workbox既是是一个库也是一个构建工具，使用Workbox可以非常方便的在用户设备上保存站点资源（静态资源、数据等）从而实现web app的离线访问，以及高性能的加载体验。

Workbox主要由**workbox-webpack-plugin**和**workbox-sw**组成

## 项目配置
- 添加**workbox-webpack-plugin**、**workbox-sw**两个包
```
npm install workbox-webpack-plugin --save-dev

npm install workbox-sw --save
```

- 创建sw.js
```
importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

workbox.router.registerRoute(
  new RegExp('^https://hacker-news.firebaseio.com'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precache([]);
```

- 配置webpack.config.js
```
const workboxPlugin = require('workbox-webpack-plugin')
   
plugins: [
  ...
  new workboxPlugin({
    globDirectory: dist,
    globPatterns: ['**/*.{html,js}'],
    swSrc: './src/sw.js',
    swDest: path.join(dist, 'sw.js')
  })
]

```

- 初始化时注册servic worker
```
function init() {
  ...
  
  // register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
        registration.pushManager.subscribe({userVisibleOnly: true});
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}
```

## 参考
[https://developers.google.com/web/tools/workbox/overview](https://developers.google.com/web/tools/workbox/overview)

[https://developers.google.com/web/tools/workbox/get-started/webpack](https://developers.google.com/web/tools/workbox/get-started/webpack)
