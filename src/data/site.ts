import type {
  InteriorSlide,
  PetSize,
  PetType,
  PriceRow,
  SelectOption,
  ServiceCard,
  ServiceType
} from "@/types/site";

export const facts = [
  { value: "1 对 1", label: "美容师全程跟护" },
  { value: "45-120 分钟", label: "按体型与毛量安排" },
  { value: "可视洗护", label: "护理前后照片回传" },
  { value: "晚 9 点", label: "工作日最晚可约" }
];

export const services: ServiceCard[] = [
  {
    imageSrc:
      "https://images.pexels.com/photos/19145895/pexels-photo-19145895.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "美容师正在给狗狗洗澡",
    tags: [
      { label: "犬类" },
      { label: "新客推荐", tone: "coral" }
    ],
    title: "基础洁净洗护",
    description: "温和洗剂、耳眼清洁、足底毛修剪、指甲打磨和吹干梳顺，适合日常维护。",
    price: "¥98 起",
    meta: "小型犬约 60 分钟"
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/6131157/pexels-photo-6131157.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "美容师正在修剪小型犬毛发",
    tags: [
      { label: "造型", tone: "sky" },
      { label: "预约制" }
    ],
    title: "精修造型套餐",
    description: "根据品种、季节和主人偏好设计线条，含洗护、剃脚底、腹底和整体造型。",
    price: "¥198 起",
    meta: "造型前确认样式"
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/6816837/pexels-photo-6816837.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "宠物美容师在护理小狗",
    tags: [
      { label: "舒缓", tone: "coral" },
      { label: "敏感肌" }
    ],
    title: "皮毛舒缓护理",
    description: "针对换毛期、毛结和异味问题，加入除味、护毛和局部舒缓护理，减少应激。",
    price: "¥158 起",
    meta: "适合猫犬加购"
  }
];

export const careFeatures = [
  {
    index: "01",
    title: "一宠一清洁",
    description: "洗护台、梳具、毛巾和围脖按宠物独立更换，台面完成后即时消毒。"
  },
  {
    index: "02",
    title: "低噪音吹干",
    description: "分段吹干和手梳同步进行，避免过热、过近和长时间固定。"
  },
  {
    index: "03",
    title: "护理记录回传",
    description: "发现耳垢、皮屑、红点或毛结，会用照片标注并给出后续护理建议。"
  },
  {
    index: "04",
    title: "猫咪独立时段",
    description: "猫咪预约避开犬只高峰，减少气味和声音刺激，安排熟悉猫护理的美容师。"
  }
];

export const priceRows: PriceRow[] = [
  {
    item: "小型犬洗护",
    includes: "洗澡、基础清洁、吹干梳顺、足底毛与指甲护理",
    price: "¥98"
  },
  {
    item: "中大型犬洗护",
    includes: "加强冲洗、分层吹干、换毛期基础梳理",
    price: "¥168"
  },
  {
    item: "猫咪洗护",
    includes: "独立时段、温和洗剂、低刺激吹干和基础清洁",
    price: "¥188"
  },
  {
    item: "造型修剪",
    includes: "含洗护、整体造型、局部细修和主人确认",
    price: "¥198"
  },
  {
    item: "皮毛舒缓加护",
    includes: "除味护理、护毛精华、重点部位梳结",
    price: "¥60"
  }
];

export const interiorSlides: InteriorSlide[] = [
  {
    imageSrc: "/assets/interior-reception.png",
    imageAlt: "中国高端宠物洗护店接待休息区，温暖木质、黄铜和浅绿色装饰",
    title: "接待休息区",
    description: "弧形前台、产品展示和靠窗等候位，让主人和宠物进店第一刻就放松下来。",
    dotLabel: "查看接待休息区"
  },
  {
    imageSrc: "/assets/interior-bathing.png",
    imageAlt: "中国高端宠物洗护店洗护水疗区，独立浴缸、玻璃隔断和整洁毛巾",
    title: "洗护水疗区",
    description: "独立洗护池、低刺激灯光和分区收纳，适合犬猫日常清洁与皮毛舒缓护理。",
    dotLabel: "查看洗护水疗区"
  },
  {
    imageSrc: "/assets/interior-styling.png",
    imageAlt: "中国高端宠物洗护店造型修剪区，美容台、拱形镜和专业工具",
    title: "造型修剪区",
    description: "升降美容台、工具抽屉和独立烘干柜，支撑精修造型和一宠一消毒流程。",
    dotLabel: "查看造型修剪区"
  }
];

export const petTypeOptions: SelectOption<PetType>[] = [
  { value: "dog", label: "狗狗" },
  { value: "cat", label: "猫咪" }
];

export const petSizeOptions: SelectOption<PetSize>[] = [
  { value: "small", label: "小型" },
  { value: "medium", label: "中型" },
  { value: "large", label: "大型" }
];

export const serviceOptions: SelectOption<ServiceType>[] = [
  { value: "wash", label: "基础洁净洗护" },
  { value: "style", label: "精修造型套餐" },
  { value: "soothe", label: "皮毛舒缓护理" }
];

export const basePrices: Record<ServiceType, number> = {
  wash: 98,
  style: 198,
  soothe: 158
};

export const sizeAddons: Record<PetSize, number> = {
  small: 0,
  medium: 70,
  large: 150
};
