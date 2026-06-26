// 行程資料 — 單一資料來源，改這裡就好
// type: 'stay' = 定點行程；'move' = 移動過程（純文字）；'meal' = 用餐；'hotel' = 住宿
export interface Slot {
  start: string // 'HH:MM'
  end: string
  type: 'stay' | 'move' | 'meal' | 'hotel'
  text: string // 上標：主標題
  note?: string // 下標：說明細節
  addr?: string // 住宿地址（hotel 用）
  map?: string // Google 地圖連結（hotel 用）
  links?: { label: string; url: string }[] // 額外連結：地點、路線導航等
}

export interface Day {
  id: number
  date: string
  dow: string
  title: string
  summary: string
  slots: Slot[]
  tips: string[]
}

export const trip = {
  title: '大阪 × 金澤',
  subtitle: '六天五夜行程',
  axis: '關西專心玩大阪，金澤兩晚從容，最後配合研討會。京都、奈良留待下次。',
}

// Google Maps 連結產生器
const mapSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
const mapDir = (origin: string, dest: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}&travelmode=transit`

// 住宿地圖連結（hotel slot 共用）
const MAP_HEARTON =
  'https://www.google.com/maps/search/?api=1&query=1+Chome-5-24+Nishishinsaibashi+Chuo+Osaka'
const MAP_MYSTAYS =
  'https://www.google.com/maps/search/?api=1&query=1+Chome-10-18+Katamachi+Kanazawa'
const MAP_SMILE =
  'https://www.google.com/maps/search/?api=1&query=6+Chome-1-11+Nishinakajima+Yodogawa+Osaka'

export const days: Day[] = [
  {
    id: 1,
    date: '7/13',
    dow: '一',
    title: '落地直奔臨空城 Outlet → 傍晚進心齋橋',
    summary:
      '中午落地，正好接上 outlet 營業時間。下飛機帶行李一站到臨空城，寄物逛街，傍晚再進大阪，沒有趕班機壓力、從容很多。',
    slots: [
      {
        start: '11:25',
        end: '12:30',
        type: 'move',
        text: '關西機場入境、提行李',
        note: '約 12:30 出關',
        links: [{ label: '關西機場', url: mapSearch('Kansai International Airport Terminal 1') }],
      },
      {
        start: '12:40',
        end: '12:50',
        type: 'move',
        text: '南海電鐵 → 臨空城站',
        note: '1 站約 6 分',
        links: [{ label: '🧭 路線 機場→臨空城', url: mapDir('Kansai Airport Station', 'Rinku-town Station') }],
      },
      { start: '12:50', end: '13:00', type: 'move', text: '站外寄物、走聯絡空橋到 outlet' },
      { start: '13:00', end: '13:40', type: 'meal', text: '午餐', note: '臨空城 outlet 餐廳／美食廣場' },
      {
        start: '13:40',
        end: '16:30',
        type: 'stay',
        text: '臨空城 Rinku Premium Outlets',
        note: '採買逛街',
        links: [{ label: 'Rinku Premium Outlets', url: mapSearch('Rinku Premium Outlets') }],
      },
      {
        start: '16:30',
        end: '17:20',
        type: 'move',
        text: '南海電鐵 → 難波站，步行到飯店',
        note: '取行李，約 50 分',
        links: [{ label: '🧭 路線 臨空城→飯店', url: mapDir('Rinku-town Station', '1-5-24 Nishishinsaibashi Chuo Osaka') }],
      },
      {
        start: '17:20',
        end: '17:40',
        type: 'hotel',
        text: '入住 心齋橋哈頓飯店',
        note: '放行李',
        addr: '〒542-0086 大阪市中央區西心齋橋 1-5-24',
        map: MAP_HEARTON,
      },
      {
        start: '18:30',
        end: '20:00',
        type: 'meal',
        text: '晚餐',
        note: '道頓堀（大牧場燒肉/神戶牛 或 千房大阪燒、今井烏龍麵）',
        links: [{ label: '道頓堀', url: mapSearch('Dotonbori Osaka') }],
      },
      {
        start: '20:00',
        end: '21:30',
        type: 'stay',
        text: '道頓堀夜逛',
        note: '唐吉訶德／心齋橋筋；🔍 柯南《世紀末的魔術師》場景：道頓堀＋格力高廣告牌',
        links: [
          { label: '唐吉訶德 道頓堀', url: mapSearch('Don Quijote Dotonbori') },
          { label: '🔍 格力高廣告牌', url: mapSearch('Glico Sign Dotonbori') },
        ],
      },
    ],
    tips: [
      '行李提醒：到臨空城站務必先寄物再逛；取出後要一路拖進大阪，買多會變重。',
      '退稅提醒：outlet 的「一般物品」只要 7/18 帶出境即可；藥妝、零食類建議改在大阪市區（唐吉訶德）買。',
    ],
  },
  {
    id: 2,
    date: '7/14',
    dow: '二',
    title: '睡飽再出發，下午大阪城',
    summary:
      '前一天累了、早上爬不起來很正常。這天不排早上行程，睡飽自然醒，重點放下午的大阪城（天守閣＋御座船），傍晚回市區購物。',
    slots: [
      { start: '11:00', end: '12:30', type: 'meal', text: '早午餐', note: '起床後悠閒吃' },
      {
        start: '12:30',
        end: '13:30',
        type: 'move',
        text: '搭車前往大阪城公園',
        links: [{ label: '🧭 路線 心齋橋→大阪城', url: mapDir('Shinsaibashi Station Osaka', 'Osaka Castle Park') }],
      },
      {
        start: '13:30',
        end: '14:30',
        type: 'stay',
        text: '大阪城公園散步',
        note: '最晚 14:30 到',
        links: [{ label: '大阪城公園', url: mapSearch('Osaka Castle Park') }],
      },
      {
        start: '14:30',
        end: '16:30',
        type: 'stay',
        text: '大阪城天守閣',
        note: '博物館＋登頂；夏之陣模型、武將頭盔拍照 ¥500；🔍 柯南《名偵探柯南》場景',
        links: [{ label: '大阪城天守閣', url: mapSearch('Osaka Castle Tenshukaku') }],
      },
      {
        start: '16:30',
        end: '16:50',
        type: 'stay',
        text: '御座船 金色遊船遊護城河',
        note: '成人 ¥1,500',
        links: [{ label: '大阪城御座船', url: mapSearch('Osaka Castle Gozabune') }],
      },
      {
        start: '16:50',
        end: '17:15',
        type: 'stay',
        text: '🔍 大阪府警察本部',
        note: '柯南《名偵探柯南》場景；大阪城西南側步行約 10 分',
        links: [
          { label: '大阪府警察本部', url: mapSearch('Osaka Prefectural Police Headquarters') },
          { label: '🧭 路線 大阪城→警察本部', url: mapDir('Osaka Castle Park', 'Osaka Prefectural Police Headquarters') },
        ],
      },
      {
        start: '17:15',
        end: '17:50',
        type: 'move',
        text: '搭車回難波/心齋橋',
        note: '黃昏拍照',
        links: [{ label: '🧭 路線 警察本部→難波', url: mapDir('Osaka Prefectural Police Headquarters', 'Namba Station Osaka') }],
      },
      {
        start: '18:00',
        end: '19:30',
        type: 'meal',
        text: '晚餐',
        note: '心齋橋/難波',
        links: [{ label: '心齋橋筋商店街', url: mapSearch('Shinsaibashisuji Shopping Street') }],
      },
      { start: '19:30', end: '21:00', type: 'stay', text: '心齋橋、難波購物' },
    ],
    tips: [
      '時間關鍵：天守閣末入館 16:30、御座船末班約 16:50。先逛天守閣再搭船最保險，別倒過來。',
      '想加碼：起得早或逛得快，回程可順加梅田藍天大廈夜景，非必要別勉強。',
    ],
  },
  {
    id: 3,
    date: '7/15',
    dow: '三',
    title: '大阪 → 金澤｜不繞京都，移動日從容',
    summary:
      '原本順道下京都的計畫取消，這天單純從大阪直奔金澤。早上退房後到大國町站寄行李，在新世界（通天閣下）吃早午餐、空手去今宮戎神社（柯南聖地），取行李、中午過後從大阪站發車，下午就到金澤，傍晚從容入住、逛片町。',
    slots: [
      {
        start: '09:30',
        end: '10:00',
        type: 'hotel',
        text: '心齋橋哈頓飯店退房',
        note: '行李托著走，不寄飯店；須 12:00 前',
        map: MAP_HEARTON,
      },
      {
        start: '10:00',
        end: '10:25',
        type: 'move',
        text: '心齋橋 → 大國町，寄行李',
        note: '御堂筋線往南 2 站約 6 分；行李寄大國町站置物櫃（大型 ¥500-600、現金、可放到末班車）',
        links: [{ label: '🧭 路線 心齋橋→大國町', url: mapDir('Shinsaibashi Station Osaka', 'Daikokucho Station Osaka') }],
      },
      {
        start: '10:30',
        end: '11:45',
        type: 'meal',
        text: '早午餐＠新世界（通天閣下）',
        note: '大國町步行約 8 分；串カツ、平價食堂，順道看通天閣＋新世界復古老街',
        links: [
          { label: '通天閣', url: mapSearch('Tsutenkaku Osaka') },
          { label: '新世界', url: mapSearch('Shinsekai Osaka') },
        ],
      },
      {
        start: '11:45',
        end: '12:30',
        type: 'stay',
        text: '🔍 今宮戎神社',
        note: '柯南《世紀末的魔術師》劇中難波布袋神社原型；從新世界步行約 8 分，空手去',
        links: [
          { label: '今宮戎神社', url: mapSearch('Imamiya Ebisu Shrine Osaka') },
          { label: '🧭 路線 通天閣→今宮戎', url: mapDir('Tsutenkaku Osaka', 'Imamiya Ebisu Shrine Osaka') },
        ],
      },
      {
        start: '12:30',
        end: '13:20',
        type: 'move',
        text: '大國町取行李 → 大阪站（梅田）',
        note: '步行回大國町取行李，御堂筋線北上梅田約 15 分，買駅弁',
        links: [{ label: '🧭 路線 大國町→大阪站', url: mapDir('Daikokucho Station Osaka', 'Osaka Station Umeda') }],
      },
      {
        start: '13:30',
        end: '16:00',
        type: 'move',
        text: '特急サンダーバード → 敦賀轉北陸新幹線 → 金澤',
        note: '大阪站始發，約 2.5 小時；班次約每 30 分一班，不必趕死 13:00',
        links: [{ label: '🧭 路線 大阪站→金澤', url: mapDir('Osaka Station Umeda', 'Kanazawa Station') }],
      },
      {
        start: '16:00',
        end: '16:30',
        type: 'hotel',
        text: '入住 MYSTAYS 金澤片町飯店',
        note: '放行李',
        addr: '〒920-0981 石川縣金澤市片町 1 丁目 10-18',
        map: MAP_MYSTAYS,
      },
      {
        start: '16:30',
        end: '18:00',
        type: 'stay',
        text: '片町／香林坊一帶散步',
        note: '到得早，先輕鬆逛，大景點留 Day 4',
        links: [{ label: '片町', url: mapSearch('Katamachi Kanazawa') }],
      },
      {
        start: '18:30',
        end: '20:00',
        type: 'meal',
        text: '晚餐',
        note: '金澤片町（金沢おでん、壽司或居酒屋）',
        links: [{ label: '片町', url: mapSearch('Katamachi Kanazawa') }],
      },
    ],
    tips: [
      '這天因為不繞京都最輕鬆——可以睡飽、慢慢退房，下午就到金澤。',
      '訂票：サンダーバード（雷鳥號）建議提前劃位；敦賀換北陸新幹線同站轉乘、跟指標走即可。',
      '行李：全程托著走就好，中途不必寄物。',
    ],
  },
  {
    id: 4,
    date: '7/16',
    dow: '四',
    title: '金澤｜聚焦兼六園，慢遊不趕',
    summary: '不貪多。這天以兼六園為核心慢慢逛，周邊順路的當「有力氣再加」，累了就回飯店休息，保留品質。',
    slots: [
      {
        start: '10:00',
        end: '11:30',
        type: 'meal',
        text: '早午餐',
        note: '近江町市場 海鮮丼（加金箔、能登和牛、喉黑魚；從片町步行約 18-20 分）',
        links: [
          { label: '近江町市場', url: mapSearch('Omicho Market Kanazawa') },
          { label: '🧭 路線 片町→近江町', url: mapDir('Katamachi Kanazawa', 'Omicho Market Kanazawa') },
        ],
      },
      {
        start: '11:30',
        end: '14:00',
        type: 'stay',
        text: '兼六園',
        note: '新綠、霞之池、徽軫石燈籠',
        links: [
          { label: '兼六園', url: mapSearch('Kenrokuen Garden') },
          { label: '🧭 路線 近江町→兼六園', url: mapDir('Omicho Market Kanazawa', 'Kenrokuen Garden') },
        ],
      },
      {
        start: '14:00',
        end: '15:00',
        type: 'stay',
        text: '金澤城公園',
        links: [{ label: '金澤城公園', url: mapSearch('Kanazawa Castle Park') }],
      },
      {
        start: '15:30',
        end: '17:00',
        type: 'stay',
        text: '東茶屋街 金箔甜點',
        links: [{ label: '東茶屋街', url: mapSearch('Higashi Chaya District Kanazawa') }],
      },
      {
        start: '18:30',
        end: '20:00',
        type: 'meal',
        text: '晚餐',
        note: '片町（金沢おでん或壽司）',
        links: [{ label: '片町', url: mapSearch('Katamachi Kanazawa') }],
      },
    ],
    tips: [
      '重點：兼六園是這天唯一一定要走的，其餘全是選配。',
      '兼六園小提醒：清晨最清幽（園內 7:00 開），早上 8 點前人少。禁用自拍棒和腳架。',
    ],
  },
  {
    id: 5,
    date: '7/17',
    dow: '五',
    title: '金澤研討會 → 晚上回大阪',
    summary: '重點日，移動與行李要先安排好。',
    slots: [
      { start: '08:00', end: '08:30', type: 'hotel', text: 'MYSTAYS 金澤片町退房', note: '行李寄放飯店/車站', map: MAP_MYSTAYS },
      {
        start: '08:30',
        end: '10:00',
        type: 'stay',
        text: '研討會前空檔',
        note: '近江町市場買伴手禮、咖啡',
        links: [{ label: '近江町市場', url: mapSearch('Omicho Market Kanazawa') }],
      },
      { start: '11:30', end: '12:30', type: 'meal', text: '午餐', note: '近江町市場或研討會場' },
      { start: '13:00', end: '17:00', type: 'stay', text: '研討會' },
      {
        start: '17:30',
        end: '20:00',
        type: 'move',
        text: '金澤站搭車回大阪',
        note: '取行李，約 2.5 小時；🔍 14 號月台是《青春豬頭少年》EP13 場景，候車時拍一張',
        links: [{ label: '🧭 路線 金澤→新大阪', url: mapDir('Kanazawa Station', 'Shin-Osaka Station') }],
      },
      {
        start: '20:00',
        end: '20:30',
        type: 'hotel',
        text: '入住 新大阪微笑飯店',
        addr: '〒532-0011 大阪市澱川區西中島 6-1-11',
        map: MAP_SMILE,
      },
      { start: '20:30', end: '21:30', type: 'meal', text: '宵夜/晚餐', note: '抵達後簡單吃' },
    ],
    tips: [
      '注意：研討會若較晚結束，回到大阪可能已深夜。建議一早就把行李寄放在金澤站，不必繞回飯店。',
      '北陸新幹線直達新大阪站，下車即到飯店。',
    ],
  },
  {
    id: 6,
    date: '7/18',
    dow: '六',
    title: '大阪｜上午收尾 → 下午飛回台灣',
    summary: 'Outlet 已移到 Day 1，這天就市區輕鬆收尾、從容進機場。住新大阪站旁，去機場很順。',
    slots: [
      { start: '09:00', end: '10:00', type: 'hotel', text: '新大阪微笑飯店退房', note: '最後採買', map: MAP_SMILE },
      { start: '10:00', end: '10:45', type: 'meal', text: '早午餐', note: '市區或飯店周邊' },
      {
        start: '11:00',
        end: '11:50',
        type: 'move',
        text: '新大阪站 JR 特急 HARUKA → 關西機場',
        note: '約 50 分；🔍 月台駅名標是柯南《世紀末的魔術師》《天空的遇難船》場景，候車時拍一張',
        links: [{ label: '🧭 路線 新大阪→關西機場', url: mapDir('Shin-Osaka Station', 'Kansai International Airport') }],
      },
      {
        start: '12:00',
        end: '13:30',
        type: 'stay',
        text: '關西機場',
        note: '登機手續、退稅查驗',
        links: [{ label: '關西機場', url: mapSearch('Kansai International Airport Terminal 1') }],
      },
      { start: '15:20', end: '17:20', type: 'move', text: 'GK055 起飛 → 抵達桃園', note: '17:20 落地' },
    ],
    tips: [
      '回程：捷星 GK055，15:20 KIX → 17:20 TPE。',
      '退稅查驗：在機場海關查驗整趟免稅商品（含 7/13 outlet 買的），收據和商品備妥。',
    ],
  },
]

