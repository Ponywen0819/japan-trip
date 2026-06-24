# 大阪 × 金澤 六天五夜行程

互動式行程網站（Vite + React + TypeScript）。

🔗 **線上瀏覽：https://ponywen0819.github.io/japan-trip/**

## 功能
- Day 1–6 分頁切換
- 行李/待辦清單，勾選狀態存 `localStorage`
- 深色模式切換（記住偏好）
- 住宿 Google 地圖連結

## 開發
```bash
npm install
npm run dev                    # 本機開發
npm run build && npm run preview   # 預覽 production build
```

## 更新行程
行程內容都在 `src/data.ts`，改完 commit + push 即可：
```bash
git add -A && git commit -m "更新行程" && git push
```
push 到 `main` 後，GitHub Actions（`.github/workflows/deploy.yml`）會自動 build 並部署，幾分鐘後網站更新。

## 部署
GitHub Pages，來源設為 **GitHub Actions**（Settings → Pages → Source）。
