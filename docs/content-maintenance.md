# 内容与素材维护说明

网站的视觉结构仍保留原 Webflow DOM、类名和动效标记；日后维护时，请优先改 `src/content/`，不要直接编辑 `src/reference/` 内的原始 HTML。

## 文字、链接与 SEO

| 内容 | 编辑位置 |
| --- | --- |
| 公司名、Logo、电话、邮箱、社媒、导航、页脚、全站默认 SEO | `src/content/settings/site.json` |
| 首页全部模块、首页图片、首页链接、首页 SEO | `src/content/pages/home.json` |
| About、Contact、Models、搜索、404、Blog 列表 | `src/content/pages/*.json` |
| 品牌、车型分类、功能筛选、辅助页 SEO 与页面标题 | `src/content/pages/luxora.json`、`velox.json`、`aurion.json`、`coupe.json`、`sedan.json`、`suv.json`、各功能页 JSON |
| 车型名称、价格、参数、图库、车型 SEO | `src/content/models/*.json` |
| 品牌名称、描述、Logo、品牌 SEO | `src/content/brands/*.json` |
| 文章标题、封面、作者、正文、SEO | `src/content/articles/*.json` |
| OEM/ODM B2B 落地页 | `src/content/landing-pages/oem-manufacturer.json` |

每个页面的 SEO 使用 `seo.title`、`seo.description`、`seo.ogImage`。`ogImage` 建议使用横向 1200×630 图片。

`about.json` 的 `metrics` 可修改四个数字、单位和标签；`contact.json` 的 `copy` 可修改询盘表单的字段提示、提交按钮和成功/错误提示。电话、邮箱、社媒与导航链接统一在 `settings/site.json` 维护。

## 替换图片的方式

1. 把新图片放进 `public/assets/` 对应的语义化目录，例如 `public/assets/home/`、`public/assets/models/车型名/`、`public/assets/articles/文章名/`。
2. 在相应 JSON 的图片字段填入以 `/assets/` 开头的路径，例如 `/assets/models/rapt-horizon/gallery-1.webp`。
3. 同时更新 Alt 文本：车型使用 `imageAlt` / `mediaAlt`，文章使用 `coverAlt`；素材清单中也有对应 Alt 建议。
4. 运行 `npm run check` 与 `npm run build`，再在本地页面检查桌面与手机效果。

## 图片用途与推荐尺寸

完整的用途、Alt、建议尺寸及网页位置在以下内容集合内：

- `src/content/assets/home.json`
- `src/content/assets/about.json`
- `src/content/assets/models.json`
- `src/content/assets/articles.json`
- `src/content/assets/shared.json`
- `src/content/assets/oem-manufacturer.json`

这些清单是维护资料，不会改变前台版式。图标通常为 SVG；无障碍装饰性图标可以保留为空 Alt，内容型图片应填写描述性 Alt。

所有前台图片引用现已指向 `/assets/` 的语义化目录；不需要再到 `public/static/picture/` 中按原 Webflow 数字文件名查找素材。

## 不应直接改动的目录

- `src/reference/`：下载的原 Webflow 页面，用于高保真结构与对照。
- `public/static/`：原始静态备份与 Webflow 运行时资源。
- `src/data/`：仅存放“原始文本/资源定位锚点”和替换逻辑，不应把新业务文案写回这里。
