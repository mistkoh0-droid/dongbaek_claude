/** 캠페인에 쓰는 글과 이미지 정보. 문구를 바꿀 때는 이 파일만 고치면 됩니다. */

export type Goods = {
  id: string;
  name: string;
  en: string;
  desc: string;
  story: string;
  /** goods-sheet.png 에서 앞모습이 있는 줄 (0: 볼캡, 1: 파우치, 2: 드로퍼 병) */
  row: 0 | 1 | 2;
};

// 기존 「bLOOM 콜라보 굿즈」 페이지의 이름·설명을 그대로 사용
export const GOODS: Goods[] = [
  {
    id: "cap",
    name: "민트 배지 코튼 볼캡",
    en: "Cotton Ball Cap",
    desc: "따뜻한 미색 코튼 볼캡 앞쪽에 동백마을 민트 배지를 달았어요.",
    story: "둘러보기만 해도 괜찮아요. 동백숲 길을 내 속도로 걸을 때 함께하는 모자예요.",
    row: 0,
  },
  {
    id: "pouch",
    name: "동백씨앗 조임끈 파우치",
    en: "Seed Pouch",
    desc: "조임끈이 달린 코튼 파우치에 동백마을 민트 배지를 달았어요. 안에는 동백 씨앗을 담아요.",
    story: "마을에서 만난 동백을 집으로 데려가요. 씨앗을 심으면 내 일상에서 다시 피어나요.",
    row: 1,
  },
  {
    id: "dropper",
    name: "bLOOM 드로퍼 병",
    en: "Dropper Bottle",
    desc: "아이보리 무광 드로퍼 병에 bLOOM YOUR WAY 3단 레터링을 담았어요.",
    story: "너의 방식대로 피어나. 하루를 내 리듬대로 시작하고 싶은 날을 위한 작은 병이에요.",
    row: 2,
  },
];

export type Scene = {
  src: string;
  title: string;
  line: string;
  alt: string;
};

export const SCENES: Scene[] = [
  {
    src: "/images/scene-walk.png",
    title: "동백숲 길 걷기",
    line: "숲길은 내 속도로 걸어도 괜찮아요.",
    alt: "동백숲 길로 걸어 들어가는 장면",
  },
  {
    src: "/images/scene-seeds.png",
    title: "동백씨앗 고르기",
    line: "떨어진 씨앗 가운데 마음에 드는 한 알을 골라요.",
    alt: "동백 씨앗을 고르는 꽃님이",
  },
  {
    src: "/images/scene-oil.png",
    title: "동백오일 짜기",
    line: "씨앗에서 오일 한 방울이 나오기까지, 기다림도 체험이에요.",
    alt: "동백 씨앗으로 오일을 짜는 체험",
  },
  {
    src: "/images/scene-pasta.png",
    title: "고사리파스타 클래스",
    line: "마을에서 난 재료로 나만의 한 접시를 완성해요.",
    alt: "고사리파스타 쿠킹 클래스",
  },
  {
    src: "/images/scene-meditation.png",
    title: "동백숲 명상",
    line: "꽃 향기를 맡는 데는 서두를 필요가 없어요.",
    alt: "동백숲 속에서 조용히 명상하는 장면",
  },
  {
    src: "/images/scene-picnic.png",
    title: "숲 끝의 피크닉",
    line: "하루의 끝, 동백나무 아래에서 쉬어 가요.",
    alt: "멀리서 바라본 숲속 피크닉 장면",
  },
];
