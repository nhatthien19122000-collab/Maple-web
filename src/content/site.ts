export const siteConfig = {
  name: "Maple Furniture",
  legalName: "Maple Furniture Manufacturing Co., Ltd.",
  domain: "https://www.maplefurniture.vn",
  email: "lam@maplefurniture.vn",
  careersEmail: "careers@maplefurniture.vn",
  phone: "(0084) 908 186 798",
  phoneRole: "CEO",
  whatsapp: "+84908186798",
  address: "Lot 9, D4 Street, Chau Duc Industrial Park, Nghia Thanh Ward, Ho Chi Minh City, Vietnam, 790000",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Lot+9+D4+Street+Chau+Duc+Industrial+Park+Nghia+Thanh+Ward+Ho+Chi+Minh+City+Vietnam&output=embed",
  mapLinkSrc:
    "https://www.google.com/maps/search/?api=1&query=Lot+9+D4+Street+Chau+Duc+Industrial+Park+Nghia+Thanh+Ward+Ho+Chi+Minh+City+Vietnam",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
  markets: ["USA", "Canada", "Australia", "Europe"],
  stats: {
    projects: "20+",
    countries: "5+",
    factoryArea: "17,000 m²",
    yearsInBusiness: "10",
  },
  factory: {
    area: "175,000 sq.ft",
    lines: "9",
    capacity: "10,000",
    staff: "150+",
  },
} as const;

export function whatsappHref(message: string) {
  const digits = siteConfig.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
