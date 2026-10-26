import type { ImageKey } from './types'

/** Every id below was verified to return HTTP 200 image/jpeg. */
const IDS: Record<string, string> = {
  heroPortrait: '1594465919760-441fe5908ab0',
  heroDetail: '1512496015851-a90fb38ba796',
  makeupApply1: '1709477542149-f4e0e21d590b',
  makeupApply2: '1773688189414-7637b9b138e1',
  makeupApply3: '1709477542170-f11ee7d471a0',
  palette: '1764333746348-1df13b3a4aae',
  vanity: '1551723454-7565a1f5b161',
  bridal1: '1610173827043-9db50e0d8ef9',
  bridal2: '1600685890506-593fdf55949b',
  bridal3: '1654764746225-e63f5e90facd',
  bridal4: '1684868268327-7e5590bcfbd6',
  bridal5: '1788156343796-ec36cf6d7694',
  bridal6: '1774814305054-3f411d69211a',
  hairCut: '1634449571010-02389ed0f9b0',
  hairBlow: '1580618672591-eb180b1a973f',
  hairUpdo: '1774660810725-fb04e002003d',
  hairCape: '1761839256791-6a93f89fb8b0',
  hairCurler: '1560869713-7d0a29430803',
  hairColour: '1595475884562-073c30d45670',
  hairSmile: '1761839256840-7780a45b85dc',
  interior1: '1781450090585-1a511b7066d9',
  interior2: '1600948836101-f9ffda59d250',
  interior3: '1633681926022-84c23e8cb2d6',
  interior4: '1773904215697-e6c21fc27ac2',
  interior5: '1746723378067-83a345ff3160',
  interior6: '1637777277435-3c44f82fd0c9',
  skin1: '1616394584738-fc6e612e71b9',
  skin2: '1570172619644-dfd03ed5d881',
  skin3: '1761718210089-ba3bb5ccb54f',
  skin4: '1586220742613-b731f66f7743',
  skin5: '1598440947619-2c35fc9aa908',
  skin6: '1552693673-1bf958298935',
  nails1: '1632345031435-8727f6897d53',
  nails2: '1604654894610-df63bc536371',
  nails3: '1610992015762-45dca7fa3a85',
  nails4: '1777287216954-2b4b22bb6bf2',
  nails5: '1762373349045-c2decd4ec3f3',
  nails6: '1607779097040-26e80aa78e66',
  spa1: '1757689314932-bec6e9c39e51',
  spa2: '1648203276014-20f97ba1f817',
}

export const IMAGE_WIDTHS = [480, 800, 1200, 1800, 2400] as const

export function imageUrl(key: ImageKey, width: number, quality = 72): string {
  const id = IDS[key]
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=${quality}&w=${width}`
}

export function imageSrcSet(key: ImageKey): string {
  return IMAGE_WIDTHS.map((w) => `${imageUrl(key, w)} ${w}w`).join(', ')
}

export function hasImage(key: ImageKey): boolean {
  return key in IDS
}
