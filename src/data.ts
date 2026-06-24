// 行程資料 — 單一資料來源，改這裡就好
// type: 'stay' = 定點行程；'move' = 移動過程（純文字）；'meal' = 用餐；'hotel' = 住宿
export interface Slot {
  start: string // 'HH:MM'
  end: string
  text: string
  type: 'stay' | 'move' | 'meal' | 'hotel'
  addr?: string // 住宿地址（hotel 用）
  map?: string // Google 地圖連結（hotel 用）
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
      { start: '11:25', end: '12:30', type: 'move', text: '關西機場入境、提行李（約 12:30 出關）' },
      { start: '12:40', end: '12:50', type: 'move', text: '南海電鐵 → 臨空城站（1 站約 6 分）' },
      { start: '12:50', end: '13:00', type: 'move', text: '站外寄物、走聯絡空橋到 outlet' },
      { start: '13:00', end: '13:40', type: 'meal', text: '午餐：臨空城 outlet 餐廳／美食廣場' },
      { start: '13:40', end: '16:30', type: 'stay', text: '臨空城 Rinku Premium Outlets 採買' },
      { start: '16:30', end: '17:20', type: 'move', text: '取行李，南海電鐵 → 難波站（約 50 分）' },
      {
        start: '17:20',
        end: '17:40',
        type: 'hotel',
        text: '入住 心齋橋哈頓飯店（放行李）',
        addr: '〒542-0086 大阪市中央區西心齋橋 1-5-24',
        map: MAP_HEARTON,
      },
      { start: '18:30', end: '20:00', type: 'meal', text: '晚餐：道頓堀（大牧場燒肉/神戶牛 或 千房大阪燒、今井烏龍麵）' },
      { start: '20:00', end: '21:30', type: 'stay', text: '道頓堀夜逛（唐吉訶德／心齋橋筋）' },
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
      { start: '11:00', end: '12:30', type: 'meal', text: '早午餐：起床後悠閒吃' },
      { start: '12:30', end: '13:30', type: 'move', text: '搭車前往大阪城公園' },
      { start: '13:30', end: '14:30', type: 'stay', text: '大阪城公園散步（最晚 14:30 到）' },
      { start: '14:30', end: '16:30', type: 'stay', text: '大阪城天守閣（博物館＋登頂；夏之陣模型、武將頭盔拍照 ¥500）' },
      { start: '16:30', end: '16:50', type: 'stay', text: '御座船 金色遊船遊護城河（¥1,500）' },
      { start: '16:50', end: '17:30', type: 'move', text: '公園黃昏拍照，搭車回難波/心齋橋' },
      { start: '18:00', end: '19:30', type: 'meal', text: '晚餐：心齋橋/難波' },
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
    title: '大阪 →（京都中繼）→ 金澤｜訪京大朋友＋鴨川',
    summary:
      '京都剛好在大阪往金澤的雷鳥號線上，順道下車當中繼站。行李寄京都站置物櫃，輕裝去京大找朋友、鴨川散步拍照，再續往金澤。',
    slots: [
      { start: '11:00', end: '11:30', type: 'hotel', text: '心齋橋哈頓飯店退房（須 12:00 前）' },
      { start: '11:30', end: '12:00', type: 'meal', text: '午餐：大阪出發前吃' },
      { start: '12:30', end: '13:00', type: 'move', text: '大阪 → 京都站（JR 約 30 分）' },
      { start: '13:00', end: '13:20', type: 'move', text: '京都站寄行李（置物櫃 ¥700／B1 Crosta 人工寄物）' },
      { start: '13:30', end: '15:30', type: 'stay', text: '京都大學（左京區吉田本町）找朋友' },
      { start: '15:30', end: '17:00', type: 'stay', text: '鴨川三角洲（出町柳）散步拍照' },
      { start: '17:30', end: '20:00', type: 'move', text: '回京都站取行李，特急雷鳥號 → 敦賀轉北陸新幹線 → 金澤（約 2 小時餘）' },
      {
        start: '20:00',
        end: '20:30',
        type: 'hotel',
        text: '入住 MYSTAYS 金澤片町飯店（放行李）',
        addr: '〒920-0981 石川縣金澤市片町 1 丁目 10-18',
        map: MAP_MYSTAYS,
      },
      { start: '20:30', end: '21:30', type: 'meal', text: '晚餐：金澤片町（金沢おでん、壽司或居酒屋）' },
    ],
    tips: [
      '行李關鍵：一定要在京都站把行李寄好再去京大，別拖著行李跑。',
      '時間抓法：這天是「移動＋輕度京都」，別貪心。清水寺、鞍馬寺等太遠已捨棄。',
      '訂票：雷鳥號建議提前劃位，注意班次別太晚免得到金澤過深。',
    ],
  },
  {
    id: 4,
    date: '7/16',
    dow: '四',
    title: '金澤｜聚焦兼六園，慢遊不趕',
    summary: '不貪多。這天以兼六園為核心慢慢逛，周邊順路的當「有力氣再加」，累了就回飯店休息，保留品質。',
    slots: [
      { start: '10:00', end: '11:30', type: 'meal', text: '早午餐：近江町市場 海鮮丼（加金箔、能登和牛、喉黑魚；從片町步行約 18-20 分）' },
      { start: '11:30', end: '14:00', type: 'stay', text: '兼六園（新綠、霞之池、徽軫石燈籠）' },
      { start: '14:00', end: '15:00', type: 'stay', text: '金澤城公園' },
      { start: '15:30', end: '17:00', type: 'stay', text: '東茶屋街 金箔甜點' },
      { start: '18:30', end: '20:00', type: 'meal', text: '晚餐：片町（金沢おでん或壽司）' },
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
      { start: '08:00', end: '08:30', type: 'hotel', text: 'MYSTAYS 金澤片町退房，行李寄放飯店/車站' },
      { start: '08:30', end: '10:00', type: 'stay', text: '研討會前空檔，近江町市場買伴手禮、咖啡' },
      { start: '11:30', end: '12:30', type: 'meal', text: '午餐：近江町市場或研討會場' },
      { start: '13:00', end: '17:00', type: 'stay', text: '研討會' },
      { start: '17:30', end: '20:00', type: 'move', text: '取行李，金澤站搭車回大阪（約 2.5 小時）' },
      {
        start: '20:00',
        end: '20:30',
        type: 'hotel',
        text: '入住 新大阪微笑飯店',
        addr: '〒532-0011 大阪市澱川區西中島 6-1-11',
        map: MAP_SMILE,
      },
      { start: '20:30', end: '21:30', type: 'meal', text: '宵夜/晚餐：抵達後簡單吃' },
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
      { start: '09:00', end: '10:00', type: 'hotel', text: '新大阪微笑飯店退房、最後採買' },
      { start: '10:00', end: '10:45', type: 'meal', text: '早午餐：市區或飯店周邊' },
      { start: '11:00', end: '11:50', type: 'move', text: '新大阪站 JR 特急 HARUKA → 關西機場（約 50 分）' },
      { start: '12:00', end: '13:30', type: 'stay', text: '關西機場：登機手續、退稅查驗' },
      { start: '15:20', end: '17:20', type: 'move', text: 'GK055 起飛 → 17:20 抵達桃園' },
    ],
    tips: [
      '回程：捷星 GK055，15:20 KIX → 17:20 TPE。',
      '退稅查驗：在機場海關查驗整趟免稅商品（含 7/13 outlet 買的），收據和商品備妥。',
    ],
  },
]

