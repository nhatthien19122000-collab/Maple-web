import type { LocalizedList, LocalizedText, Project, ProjectCategory } from "./types";

export const projectCategories: { value: ProjectCategory; labelKey: ProjectCategory }[] = [
  { value: "multifamily", labelKey: "multifamily" },
  { value: "seniorLiving", labelKey: "seniorLiving" },
  { value: "hospitality", labelKey: "hospitality" },
  { value: "publicSpaces", labelKey: "publicSpaces" },
  { value: "luxuryResidential", labelKey: "luxuryResidential" },
];

// Fallback cover photo per category, used for real projects that don't yet have a
// dedicated project photo supplied by the client.
const categoryFallbackImage: Record<ProjectCategory, string> = {
  multifamily: "/cap-multifamily.jpg",
  seniorLiving: "/cap-seniorliving.jpg",
  hospitality: "/cap-hospitality.png",
  publicSpaces: "/cap-publicspaces.jpg",
  luxuryResidential: "/cap-luxuryresidential.png",
};

// Builds an ordered gallery from client-supplied photos named
// `project-<slug>-1.<ext>`, `project-<slug>-2.<ext>`, ... in /public.
function projectGallery(slug: string, exts: string[]): string[] {
  return exts.map((ext, i) => `/project-${slug}-${i + 1}.${ext}`);
}

// Generic, category-level scope/materials copy. These are honest, non-specific
// capability statements (not fabricated project-specific claims) used for real
// client projects where only a name and address were provided, no scope/photos yet.
const categoryContent: Record<
  ProjectCategory,
  {
    summary: (location?: string) => { en: string; vi: string };
    description: (location?: string) => { en: string; vi: string };
    scope: { en: string[]; vi: string[] };
    materials: { en: string; vi: string };
  }
> = {
  multifamily: {
    summary: (loc) => ({
      en: loc ? `Kitchen cabinetry for a multifamily residential development in ${loc}.` : "Kitchen cabinetry for a multifamily residential development.",
      vi: loc ? `Tủ bếp cho dự án chung cư đa hộ tại ${loc}.` : "Tủ bếp cho dự án chung cư đa hộ.",
    }),
    description: (loc) => ({
      en: `Maple Furniture supplied kitchen cabinetry for this multifamily development${loc ? ` in ${loc}` : ""}, engineered for consistent quality and rapid installation across every unit.`,
      vi: `Maple Furniture cung cấp tủ bếp cho dự án chung cư này${loc ? ` tại ${loc}` : ""}, đảm bảo chất lượng đồng nhất và thi công nhanh cho mọi căn hộ.`,
    }),
    scope: {
      en: ["Kitchen cabinetry design & shop drawings", "Multi-unit production scheduling", "Site delivery & installation coordination"],
      vi: ["Thiết kế tủ bếp & bản vẽ thi công", "Lịch sản xuất cho nhiều căn hộ", "Điều phối giao hàng & lắp đặt tại công trình"],
    },
    materials: {
      en: "MFC/MDF carcass, laminate or veneer fronts, soft-close hardware.",
      vi: "Thân tủ MFC/MDF, mặt tủ laminate hoặc veneer, phụ kiện giảm chấn.",
    },
  },
  seniorLiving: {
    summary: (loc) => ({
      en: loc ? `Accessible-design furniture for a senior living community in ${loc}.` : "Accessible-design furniture for a senior living community.",
      vi: loc ? `Nội thất thiết kế tiếp cận cho khu dân cư cao tuổi tại ${loc}.` : "Nội thất thiết kế tiếp cận cho khu dân cư cao tuổi.",
    }),
    description: (loc) => ({
      en: `Maple Furniture provided furniture for this senior living community${loc ? ` in ${loc}` : ""}, designed to accessibility and safety standards.`,
      vi: `Maple Furniture cung cấp nội thất cho khu dân cư cao tuổi này${loc ? ` tại ${loc}` : ""}, thiết kế theo tiêu chuẩn tiếp cận và an toàn.`,
    }),
    scope: {
      en: ["Accessibility-compliant design", "Anti-tip & safety hardware", "Site delivery & installation"],
      vi: ["Thiết kế đạt chuẩn tiếp cận", "Phụ kiện chống lật & an toàn", "Giao hàng & lắp đặt tại công trình"],
    },
    materials: {
      en: "Rounded-edge veneer casegoods, durable easy-clean finishes.",
      vi: "Case goods veneer cạnh bo tròn, hoàn thiện bền, dễ vệ sinh.",
    },
  },
  hospitality: {
    summary: (loc) => ({
      en: loc ? `Guestroom and F&B furniture for a hospitality property in ${loc}.` : "Guestroom and F&B furniture for a hospitality property.",
      vi: loc ? `Nội thất phòng khách sạn & F&B cho một khách sạn tại ${loc}.` : "Nội thất phòng khách sạn & F&B cho một khách sạn.",
    }),
    description: (loc) => ({
      en: `Maple Furniture supplied furniture for this hospitality property${loc ? ` in ${loc}` : ""}, matched to brand FF&E standards.`,
      vi: `Maple Furniture cung cấp nội thất cho khách sạn này${loc ? ` tại ${loc}` : ""}, theo đúng tiêu chuẩn FF&E thương hiệu.`,
    }),
    scope: {
      en: ["Brand-standard drawing review", "Guestroom casegoods & furniture", "Rollout manufacturing & installation"],
      vi: ["Rà soát bản vẽ tiêu chuẩn thương hiệu", "Nội thất & case goods phòng khách sạn", "Sản xuất triển khai & lắp đặt"],
    },
    materials: {
      en: "Veneer-faced casegoods, upholstered seating, brand-matched finishes.",
      vi: "Case goods phủ veneer, ghế bọc nệm, hoàn thiện theo thương hiệu.",
    },
  },
  publicSpaces: {
    summary: () => ({
      en: "Lobby and common-area furniture for a hospitality property.",
      vi: "Nội thất sảnh & không gian chung cho một khách sạn.",
    }),
    description: () => ({
      en: "Maple Furniture supplied lobby and public-space furniture for this property, engineered for daily commercial use.",
      vi: "Maple Furniture cung cấp nội thất sảnh và không gian công cộng cho khách sạn này, được kỹ thuật hóa cho sử dụng thương mại hàng ngày.",
    }),
    scope: {
      en: ["Lobby & common-area furniture", "Custom joinery", "Installation coordination"],
      vi: ["Nội thất sảnh & khu vực chung", "Mộc theo yêu cầu", "Điều phối lắp đặt"],
    },
    materials: {
      en: "Solid wood & veneer casegoods, commercial-grade upholstery.",
      vi: "Case goods gỗ tự nhiên & veneer, vải bọc chuẩn thương mại.",
    },
  },
  luxuryResidential: {
    summary: (loc) => ({
      en: loc ? `Bespoke cabinetry and furniture for a private residence in ${loc}.` : "Bespoke cabinetry and furniture for a private residence.",
      vi: loc ? `Tủ và nội thất theo yêu cầu cho một tư gia tại ${loc}.` : "Tủ và nội thất theo yêu cầu cho một tư gia.",
    }),
    description: (loc) => ({
      en: `Maple Furniture delivered bespoke cabinetry and furniture for this private residence${loc ? ` in ${loc}` : ""}, tailored to the homeowner's design and material palette.`,
      vi: `Maple Furniture cung cấp tủ và nội thất theo yêu cầu cho tư gia này${loc ? ` tại ${loc}` : ""}, phù hợp với thiết kế và bảng vật liệu của gia chủ.`,
    }),
    scope: {
      en: ["Bespoke design consultation", "Custom cabinetry & built-ins", "Installation & handover"],
      vi: ["Tư vấn thiết kế theo yêu cầu", "Tủ & nội thất âm tường theo yêu cầu", "Lắp đặt & bàn giao"],
    },
    materials: {
      en: "Solid wood & veneer, custom finishes to specification.",
      vi: "Gỗ tự nhiên & veneer, hoàn thiện theo yêu cầu.",
    },
  },
};

function buildProject(input: {
  id: string;
  slug: string;
  category: ProjectCategory;
  name: string;
  location?: string;
  coverImage?: string;
  images?: string[];
  featured?: boolean;
  year?: number;
  description?: LocalizedText;
  scope?: LocalizedList;
  scale?: LocalizedText;
}): Project {
  const { id, slug, category, name, location, coverImage, images, featured, year, description, scope, scale } = input;
  const content = categoryContent[category];
  const gallery = images ?? (coverImage ? [coverImage] : [categoryFallbackImage[category]]);
  const cover = coverImage ?? gallery[0];

  return {
    id,
    slug,
    category,
    title: { en: name, vi: name },
    location,
    year,
    summary: content.summary(location),
    description: description ?? content.description(location),
    scope: scope ?? content.scope,
    scale,
    materials: content.materials,
    coverImage: cover,
    images: gallery,
    featured,
  };
}

export const projects: Project[] = [
  // ---------- Multifamily Apartments ----------
  buildProject({
    id: "p1",
    slug: "clarkston-family-haven",
    category: "multifamily",
    name: "Holy Family Haven",
    location: "Clarkston, WA, USA",
    images: projectGallery("clarkston-family-haven", ["png", "png", "png", "png", "png", "png", "png", "jpg"]),
    description: {
      en: "Holy Family Haven is a modern residential development located in Spokane, Washington. The project combines contemporary design with everyday practicality, offering residents well-planned spaces and quality finishes. Maple Furniture was responsible for the supply and installation of kitchen cabinets and vanities in all residential units.\n\nThe development reflects Maple's commitment to delivering large-scale solutions without compromising the final product's quality — each cabinet was designed to maximize space usage and ensure long-term durability.",
      vi: "Holy Family Haven là một khu dân cư hiện đại tọa lạc tại Spokane, Washington. Dự án kết hợp thiết kế đương đại với tính thực dụng hàng ngày, mang đến cho cư dân không gian được bố trí hợp lý và hoàn thiện chất lượng cao. Maple Furniture chịu trách nhiệm cung cấp và lắp đặt tủ bếp cùng tủ lavabo cho toàn bộ các căn hộ.\n\nDự án thể hiện cam kết của Maple trong việc triển khai các giải pháp quy mô lớn mà không đánh đổi chất lượng sản phẩm cuối cùng — mỗi chiếc tủ đều được thiết kế để tối ưu không gian sử dụng và đảm bảo độ bền lâu dài.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "76 units · 980 cabinets · 2,240 LF", vi: "76 căn hộ · 980 tủ · 2.240 LF" },
    year: 2024,
  }),
  buildProject({
    id: "p2",
    slug: "garland-apartments",
    category: "multifamily",
    name: "Garland Multi-Family",
    location: "951 West Walton Avenue, Spokane, WA 99205, USA",
    images: projectGallery("garland-apartments", ["png", "jpg", "jpg", "jpg", "jpg"]),
    description: {
      en: "The Garland Multi-Family is a modern residential development located in Spokane, Washington. The project combines contemporary design with everyday practicality, offering residents well-planned spaces and quality finishes. Maple Furniture was responsible for the supply and installation of kitchen cabinets and vanities in all residential units.\n\nThe development reflects Maple's commitment to delivering large-scale solutions without compromising the final product's quality — each cabinet was designed to maximize space usage and ensure long-term durability.",
      vi: "Garland Multi-Family là một khu dân cư hiện đại tọa lạc tại Spokane, Washington. Dự án kết hợp thiết kế đương đại với tính thực dụng hàng ngày, mang đến cho cư dân không gian được bố trí hợp lý và hoàn thiện chất lượng cao. Maple Furniture chịu trách nhiệm cung cấp và lắp đặt tủ bếp cùng tủ lavabo cho toàn bộ các căn hộ.\n\nDự án thể hiện cam kết của Maple trong việc triển khai các giải pháp quy mô lớn mà không đánh đổi chất lượng sản phẩm cuối cùng — mỗi chiếc tủ đều được thiết kế để tối ưu không gian sử dụng và đảm bảo độ bền lâu dài.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "44 units · 800 cabinets · 2,000 LF", vi: "44 căn hộ · 800 tủ · 2.000 LF" },
    year: 2024,
  }),
  buildProject({
    id: "p3",
    slug: "2nd-ave-multi-family",
    category: "multifamily",
    name: "2nd Ave Multi-Family",
    location: "209 E 2nd Ave, Post Falls, ID 83854, USA",
    images: projectGallery("2nd-ave-multi-family", [
      "png", "png", "png", "png", "png", "png", "png", "png", "jpg", "png",
    ]),
  }),
  buildProject({
    id: "p4",
    slug: "wenatchee-riverfront-multi-family",
    category: "multifamily",
    name: "Wenatchee River Front Multi-Family",
    location: "1021 Walla Walla Ave, Wenatchee, WA 98801, USA",
    images: projectGallery("wenatchee-riverfront-multi-family", [
      "png", "png", "png", "png", "png", "png", "png", "png", "jpg", "png",
    ]),
    description: {
      en: "Wenatchee River Front is a modern residential development located in Spokane, Washington. The project combines contemporary design with everyday practicality, offering residents well-planned spaces and quality finishes. Maple Furniture was responsible for the supply and installation of kitchen cabinets and vanities in all residential units.\n\nThe development reflects Maple's commitment to delivering large-scale solutions without compromising the final product's quality — each cabinet was designed to maximize space usage and ensure long-term durability.",
      vi: "Wenatchee River Front là một khu dân cư hiện đại tọa lạc tại Spokane, Washington. Dự án kết hợp thiết kế đương đại với tính thực dụng hàng ngày, mang đến cho cư dân không gian được bố trí hợp lý và hoàn thiện chất lượng cao. Maple Furniture chịu trách nhiệm cung cấp và lắp đặt tủ bếp cùng tủ lavabo cho toàn bộ các căn hộ.\n\nDự án thể hiện cam kết của Maple trong việc triển khai các giải pháp quy mô lớn mà không đánh đổi chất lượng sản phẩm cuối cùng — mỗi chiếc tủ đều được thiết kế để tối ưu không gian sử dụng và đảm bảo độ bền lâu dài.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "125 units · 1,830 cabinets · 3,890 LF", vi: "125 căn hộ · 1.830 tủ · 3.890 LF" },
    year: 2025,
  }),
  buildProject({
    id: "p5",
    slug: "jadwin-multi-family",
    category: "multifamily",
    name: "Jadwin Multi-Family",
    location: "1866 Jadwin Ave, Richland, WA 99354, USA",
    images: projectGallery("jadwin-multi-family", ["png", "png", "jpg", "png", "png", "jpg", "jpg"]),
    description: {
      en: "Jadwin is a modern residential development located in Spokane, Washington. The project combines contemporary design with everyday practicality, offering residents well-planned spaces and quality finishes. Maple Furniture was responsible for the supply and installation of kitchen cabinets and vanities in all residential units.\n\nThe development reflects Maple's commitment to delivering large-scale solutions without compromising the final product's quality — each cabinet was designed to maximize space usage and ensure long-term durability.",
      vi: "Jadwin là một khu dân cư hiện đại tọa lạc tại Spokane, Washington. Dự án kết hợp thiết kế đương đại với tính thực dụng hàng ngày, mang đến cho cư dân không gian được bố trí hợp lý và hoàn thiện chất lượng cao. Maple Furniture chịu trách nhiệm cung cấp và lắp đặt tủ bếp cùng tủ lavabo cho toàn bộ các căn hộ.\n\nDự án thể hiện cam kết của Maple trong việc triển khai các giải pháp quy mô lớn mà không đánh đổi chất lượng sản phẩm cuối cùng — mỗi chiếc tủ đều được thiết kế để tối ưu không gian sử dụng và đảm bảo độ bền lâu dài.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "115 units · 1,550 cabinets · 3,045 LF", vi: "115 căn hộ · 1.550 tủ · 3.045 LF" },
    year: 2025,
  }),
  buildProject({
    id: "p6",
    slug: "east-wenatchee-1st-street",
    category: "multifamily",
    name: "Wenatchee East Multi-Family",
    location: "2635–2655 2nd St SE, East Wenatchee, WA 98802, USA",
    images: projectGallery("east-wenatchee-1st-street", [
      "png", "jpg", "png", "jpg", "jpg", "png", "png", "png", "jpg", "png", "jpg", "png", "png", "jpg", "jpg",
    ]),
    description: {
      en: "Wenatchee East is a modern residential development located in Spokane, Washington. The project combines contemporary design with everyday practicality, offering residents well-planned spaces and quality finishes. Maple Furniture was responsible for the supply and installation of kitchen cabinets and vanities in all residential units.\n\nThe development reflects Maple's commitment to delivering large-scale solutions without compromising the final product's quality — each cabinet was designed to maximize space usage and ensure long-term durability.",
      vi: "Wenatchee East là một khu dân cư hiện đại tọa lạc tại Spokane, Washington. Dự án kết hợp thiết kế đương đại với tính thực dụng hàng ngày, mang đến cho cư dân không gian được bố trí hợp lý và hoàn thiện chất lượng cao. Maple Furniture chịu trách nhiệm cung cấp và lắp đặt tủ bếp cùng tủ lavabo cho toàn bộ các căn hộ.\n\nDự án thể hiện cam kết của Maple trong việc triển khai các giải pháp quy mô lớn mà không đánh đổi chất lượng sản phẩm cuối cùng — mỗi chiếc tủ đều được thiết kế để tối ưu không gian sử dụng và đảm bảo độ bền lâu dài.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "193 units · 3,555 cabinets · 6,330 LF", vi: "193 căn hộ · 3.555 tủ · 6.330 LF" },
    year: 2026,
  }),
  buildProject({
    id: "p7",
    slug: "perry-district-apartments",
    category: "multifamily",
    name: "Perry District Apartments",
    location: "1225 East Newark Avenue, Spokane, WA 99202, USA",
    images: projectGallery("perry-district-apartments", [
      "png", "png", "jpg", "jpg", "jpg", "png", "png", "jpg", "png", "png", "jpg", "png", "png", "png",
    ]),
    featured: true,
  }),
  buildProject({
    id: "p21",
    slug: "thrive-at-green-mountain",
    category: "multifamily",
    name: "Thrive at Green Mountain",
    location: "Camas, WA, USA",
    images: projectGallery("thrive-at-green-mountain", ["png", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg"]),
  }),

  // ---------- Senior Living ----------
  buildProject({
    id: "p8",
    slug: "affinity-at-badger-mountain",
    category: "seniorLiving",
    name: "Affinity at Badger Mountain",
    location: "2201 Stonehouse Ave, Richland, WA 99352, USA",
    images: projectGallery("affinity-at-badger-mountain", [
      "png", "jpg", "png", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "png", "png", "png", "png",
    ]),
    description: {
      en: "The Affinity at Badger Mountain is a large-scale senior living residential development in Richland, Washington. The project required functional, safe, and aesthetically refined furniture solutions, aligned with the specific needs of this segment. Maple Furniture was responsible for the complete supply of kitchen cabinets and vanities for all units.",
      vi: "Affinity at Badger Mountain là một khu dân cư cao tuổi quy mô lớn tại Richland, Washington. Dự án đòi hỏi các giải pháp nội thất chức năng, an toàn và tinh tế về mặt thẩm mỹ, phù hợp với nhu cầu đặc thù của phân khúc này. Maple Furniture chịu trách nhiệm cung cấp toàn bộ tủ bếp và tủ lavabo cho tất cả các căn hộ.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "170 units · 3,000 cabinets · 2,000 LF", vi: "170 căn hộ · 3.000 tủ · 2.000 LF" },
    year: 2025,
  }),
  buildProject({
    id: "p9",
    slug: "affinity-at-missoula",
    category: "seniorLiving",
    name: "Affinity at Missoula",
    location: "1955 Mary Jane Blvd, Missoula, MT 59808, USA",
    images: projectGallery("affinity-at-missoula", [
      "png", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "png", "png", "png", "png",
    ]),
    description: {
      en: "The Affinity at Missoula is a large-scale senior living residential development in Missoula, Montana. The project required functional, safe, and aesthetically refined furniture solutions, aligned with the specific needs of this segment. Maple Furniture was responsible for the complete supply of kitchen cabinets and vanities for all units.",
      vi: "Affinity at Missoula là một khu dân cư cao tuổi quy mô lớn tại Missoula, Montana. Dự án đòi hỏi các giải pháp nội thất chức năng, an toàn và tinh tế về mặt thẩm mỹ, phù hợp với nhu cầu đặc thù của phân khúc này. Maple Furniture chịu trách nhiệm cung cấp toàn bộ tủ bếp và tủ lavabo cho tất cả các căn hộ.",
    },
    scope: { en: ["Kitchen cabinets and vanities"], vi: ["Tủ bếp và tủ lavabo"] },
    scale: { en: "178 units · 3,500 cabinets · 2,000 LF", vi: "178 căn hộ · 3.500 tủ · 2.000 LF" },
    year: 2026,
  }),

  // ---------- Hospitality ----------
  buildProject({
    id: "p10",
    slug: "cambria-hotel-colorado",
    category: "hospitality",
    name: "Cambria at Colorado",
    location: "Colorado, USA",
    images: projectGallery("cambria-hotel-colorado", [
      "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png",
    ]),
    description: {
      en: "Cambria Hotel Colorado represents one of Maple Furniture's most significant hospitality projects. We were entrusted to design, manufacture, and supply furniture solutions throughout the property, including guest rooms and public spaces. From concept development to final production, every piece was carefully crafted to meet the brand's design vision, durability requirements, and guest experience standards, showcasing Maple's capability to deliver complete furniture packages for large-scale hospitality projects.",
      vi: "Cambria Hotel Colorado là một trong những dự án khách sạn quan trọng nhất của Maple Furniture. Chúng tôi được tin tưởng giao phó thiết kế, sản xuất và cung cấp nội thất cho toàn bộ khách sạn, bao gồm phòng nghỉ và khu vực công cộng. Từ giai đoạn phát triển ý tưởng đến sản xuất hoàn thiện, từng sản phẩm đều được chế tác tỉ mỉ để đáp ứng tầm nhìn thiết kế của thương hiệu, yêu cầu về độ bền và tiêu chuẩn trải nghiệm khách hàng, thể hiện năng lực của Maple trong việc cung cấp trọn gói nội thất cho các dự án khách sạn quy mô lớn.",
    },
    scope: {
      en: ["Bedroom furniture, Bathroom vanity and Public space furniture"],
      vi: ["Nội thất phòng ngủ, tủ lavabo phòng tắm và nội thất khu vực công cộng"],
    },
    scale: { en: "97 units", vi: "97 phòng" },
    year: 2026,
    featured: true,
  }),
  buildProject({
    id: "p11",
    slug: "fairfield-by-marriott-chicago",
    category: "hospitality",
    name: "Fairfield by Marriott",
    location: "Chicago, IL, USA",
    images: projectGallery("fairfield-by-marriott-chicago", ["png", "jpg", "jpg", "jpg", "jpg", "jpg"]),
  }),
  buildProject({
    id: "p12",
    slug: "swiftwater",
    category: "hospitality",
    name: "Swiftwater",
    location: "Pennsylvania, USA",
    images: projectGallery("swiftwater", ["png", "jpg", "jpg", "jpg", "jpg", "webp"]),
    description: {
      en: "For The Swiftwater Hotel, Maple Furniture provided custom bathroom vanity solutions that combine modern design, durable construction, and hospitality-grade functionality, contributing to a refined and comfortable guest experience.",
      vi: "Với The Swiftwater Hotel, Maple Furniture cung cấp giải pháp tủ lavabo phòng tắm theo yêu cầu riêng, kết hợp thiết kế hiện đại, kết cấu bền bỉ và công năng đạt chuẩn khách sạn, góp phần mang đến trải nghiệm lưu trú tinh tế và thoải mái cho khách hàng.",
    },
    scope: { en: ["Bathroom vanity"], vi: ["Tủ lavabo phòng tắm"] },
    scale: { en: "101 units", vi: "101 phòng" },
    year: 2024,
  }),
  buildProject({
    id: "p13",
    slug: "sandpiper",
    category: "hospitality",
    name: "Sandpiper",
    location: "Florida, USA",
    images: projectGallery("sandpiper", ["png", "jpg", "png", "jpg", "jpg"]),
    description: {
      en: "For Sandpiper Resort, Maple Furniture crafted custom tables and full-length mirrors designed to complement the property's relaxed luxury aesthetic, combining durability, refined detailing, and functionality for the guestroom environment.",
      vi: "Với Sandpiper Resort, Maple Furniture chế tác bàn và gương toàn thân theo yêu cầu riêng, được thiết kế để tôn lên phong cách sang trọng, phóng khoáng của khu nghỉ dưỡng, kết hợp độ bền, chi tiết hoàn thiện tinh tế và công năng phù hợp cho không gian phòng khách.",
    },
    scope: { en: ["Table and Full length Mirror"], vi: ["Bàn và gương toàn thân"] },
    scale: { en: "305 units", vi: "305 phòng" },
    year: 2023,
  }),
  buildProject({
    id: "p14",
    slug: "cq-midtown",
    category: "hospitality",
    name: "CQ Midtown",
    location: "New York, NY, USA",
    images: projectGallery("cq-midtown", ["png", "jpg", "jpg", "jpg", "jpg"]),
    description: {
      en: "Maple Furniture supplied custom bathroom vanity solutions for CQ Midtown New York, featuring a clean contemporary design, durable solid-surface countertop, and space-efficient functionality tailored to the modern urban hospitality experience.",
      vi: "Maple Furniture cung cấp giải pháp tủ lavabo phòng tắm theo yêu cầu riêng cho CQ Midtown New York, với thiết kế đương đại tối giản, mặt đá solid-surface bền bỉ và công năng tối ưu không gian, phù hợp với trải nghiệm khách sạn đô thị hiện đại.",
    },
    scope: { en: ["Bathroom vanities"], vi: ["Tủ lavabo phòng tắm"] },
    scale: { en: "126 units", vi: "126 phòng" },
    year: 2024,
  }),

  // ---------- Public Spaces ----------
  buildProject({
    id: "p15",
    slug: "cambria-hotels-public-spaces",
    category: "publicSpaces",
    name: "Cambria Hotels",
    images: projectGallery("cambria-hotels-public-spaces", [
      "png", "png", "png", "jpg", "png", "png", "png", "png", "png", "png", "png", "png", "jpg", "png", "png", "png", "png", "png", "png", "png", "png", "png",
    ]),
    description: {
      en: "Designed for Connection. Crafted for Everyday Hospitality. Maple designs and manufactures custom furniture for hospitality public spaces, including lounge seating, reception furniture, tables, banquettes, outdoor collections, and collaborative areas. Every piece is crafted to combine comfort, durability, and timeless design, creating welcoming environments that elevate the guest experience.",
      vi: "Được Thiết Kế Để Kết Nối. Chế Tác Cho Sự Hiếu Khách Mỗi Ngày. Maple thiết kế và sản xuất nội thất theo yêu cầu riêng cho các không gian công cộng trong ngành khách sạn, bao gồm khu vực tiếp khách (lounge), quầy lễ tân, bàn, ghế băng dài (banquette), bộ sưu tập ngoài trời và khu vực sinh hoạt chung. Mỗi sản phẩm đều được chế tác để kết hợp sự thoải mái, độ bền và thiết kế vượt thời gian, tạo nên không gian chào đón giúp nâng tầm trải nghiệm của khách lưu trú.",
    },
    scope: { en: ["Custom cabinetry & premium finishes"], vi: ["Tủ đặt riêng & hoàn thiện cao cấp"] },
  }),
  buildProject({
    id: "p16",
    slug: "fairfield-by-marriott-public-spaces",
    category: "publicSpaces",
    name: "Fairfield by Marriott",
    images: projectGallery("fairfield-by-marriott-public-spaces", [
      "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png",
    ]),
  }),

  // ---------- Luxury Residential ----------
  buildProject({
    id: "p17",
    slug: "ashford-residence",
    category: "luxuryResidential",
    name: "Ashford Residence",
    location: "Arizona, USA",
    images: projectGallery("hiend-residential-apt", [
      "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png",
    ]),
    description: {
      en: "Nestled within a private Arizona villa, this project embodies understated luxury, exceptional craftsmanship, and purposeful living.\n\nWe are honored by our client's trust in Maple Furniture to bring this vision to life through bespoke cabinetry and furniture, crafted with premium materials and meticulous attention to detail.\n\nThe result is a seamless integration of design, functionality, and architectural harmony—an expression of Maple's commitment to elevated residential living.",
      vi: "Tọa lạc trong một biệt thự riêng tư tại Arizona, dự án này thể hiện sự sang trọng tinh giản, tay nghề chế tác xuất sắc và lối sống có chủ đích.\n\nMaple Furniture vinh dự nhận được sự tin tưởng của khách hàng để hiện thực hóa tầm nhìn này thông qua nội thất và tủ đặt riêng, được chế tác từ vật liệu cao cấp với sự tỉ mỉ trong từng chi tiết.\n\nKết quả là sự hòa quyện liền mạch giữa thiết kế, công năng và kiến trúc — một minh chứng cho cam kết của Maple đối với không gian sống cao cấp.",
    },
    scope: { en: ["Custom cabinetry & premium finishes"], vi: ["Tủ đặt riêng & hoàn thiện cao cấp"] },
    year: 2025,
    featured: true,
  }),
  buildProject({
    id: "p18",
    slug: "aurelia-residence",
    category: "luxuryResidential",
    name: "Aurelia Residence",
    location: "Washington, USA",
    images: projectGallery("travis-residence", ["png", "png", "png", "png", "png", "png", "png"]),
  }),
  buildProject({
    id: "p19",
    slug: "sterling-residence",
    category: "luxuryResidential",
    name: "Sterling Residence",
    location: "Oregon, USA",
    images: projectGallery("hawks-residence", [
      "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png", "png",
    ]),
  }),
  buildProject({
    id: "p20",
    slug: "weston-residence",
    category: "luxuryResidential",
    name: "Weston Residence",
    location: "Washington, USA",
    images: projectGallery("sean-residence", ["png", "jpg", "jpg", "jpg", "jpg"]),
  }),
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getRelatedProjects(current: Project, limit = 3) {
  return projects.filter((p) => p.id !== current.id && p.category === current.category).slice(0, limit);
}
