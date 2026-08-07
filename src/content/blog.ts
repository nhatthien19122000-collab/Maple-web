import type { BlogPost } from "./types";

function img(seed: string, w = 1400, h = 900) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "choosing-panel-materials-for-export-kitchens",
    title: {
      en: "Choosing Panel Materials for Export Kitchen Projects",
      vi: "Chọn Vật Liệu Ván Cho Dự Án Tủ Bếp Xuất Khẩu",
    },
    excerpt: {
      en: "MFC, MDF, or plywood — how substrate choice affects cost, humidity resistance, and finish quality on international kitchen programs.",
      vi: "MFC, MDF hay plywood — lựa chọn vật liệu nền ảnh hưởng thế nào đến chi phí, khả năng chống ẩm và chất lượng hoàn thiện trong các chương trình tủ bếp quốc tế.",
    },
    content: {
      en: "Selecting the right panel substrate is one of the most consequential decisions in a kitchen manufacturing program, affecting everything from unit cost to how the finished product performs in humid climates years after installation.\n\nMelamine-faced chipboard (MFC) remains the most cost-effective option for large-volume residential rollouts, offering consistent dimensional stability at scale. Medium-density fibreboard (MDF) is preferred where profiled or routed door fronts are required, since it machines cleanly without chipping. Marine or moisture-resistant plywood is reserved for high-humidity environments — coastal resorts, for example — where standard particleboard substrates risk swelling over time.\n\nAt Maple Furniture, every substrate is matched to the destination climate and project budget during the design engineering phase, with samples tested for moisture resistance before a material is approved for production.",
      vi: "Lựa chọn vật liệu nền phù hợp là một trong những quyết định quan trọng nhất trong chương trình sản xuất tủ bếp, ảnh hưởng đến mọi thứ từ chi phí đơn vị đến khả năng vận hành của sản phẩm hoàn thiện trong môi trường ẩm nhiều năm sau khi lắp đặt.\n\nVán dăm phủ melamine (MFC) vẫn là lựa chọn tiết kiệm chi phí nhất cho các chương trình nhà ở quy mô lớn, mang lại độ ổn định kích thước nhất quán ở sản lượng cao. Ván sợi mật độ trung bình (MDF) được ưu tiên khi cần mặt tủ tạo hình hoặc phay soi, vì gia công sạch mà không bị sứt mẻ. Plywood chống ẩm hoặc chuẩn hàng hải được dành riêng cho môi trường độ ẩm cao — ví dụ như khu nghỉ ven biển — nơi vật liệu nền dăm gỗ tiêu chuẩn có nguy cơ phồng rộp theo thời gian.\n\nTại Maple Furniture, mỗi loại vật liệu nền đều được lựa chọn phù hợp với khí hậu điểm đến và ngân sách dự án trong giai đoạn thiết kế kỹ thuật, với mẫu được kiểm tra khả năng chống ẩm trước khi được duyệt đưa vào sản xuất.",
    },
    coverImage: img("blog-panel-materials"),
    category: { en: "Materials", vi: "Vật Liệu" },
    author: "Maple Furniture Engineering Team",
    date: "2025-11-04",
    readTimeMinutes: 6,
    featured: true,
  },
  {
    id: "b2",
    slug: "inside-our-cnc-precision-line",
    title: { en: "Inside Our CNC Precision Line", vi: "Bên Trong Dây Chuyền CNC Chính Xác" },
    excerpt: {
      en: "A look at how automated cutting and routing deliver consistent tolerances across thousand-unit production runs.",
      vi: "Cái nhìn về cách cắt và phay tự động mang lại dung sai nhất quán trên các lô sản xuất hàng nghìn đơn vị.",
    },
    content: {
      en: "Consistency at volume is the hardest problem in furniture manufacturing. A single kitchen program can require thousands of identically dimensioned panels — and even a millimetre of drift compounds into visible gaps once cabinetry is installed on-site.\n\nOur CNC precision line pairs automated panel saws with multi-axis routing centres, all fed directly from approved CAD files rather than manually re-entered dimensions. This eliminates a common source of error in contract manufacturing: transcription mistakes between design and production.\n\nEvery batch begins with a calibration run, checked against a reference template before full production starts. Combined with in-process dimensional spot-checks, this keeps tolerances within 0.3mm across runs of any size.",
      vi: "Tính nhất quán ở sản lượng lớn là bài toán khó nhất trong sản xuất nội thất. Một chương trình tủ bếp có thể yêu cầu hàng nghìn tấm ván có kích thước giống hệt nhau — và chỉ một milimet sai lệch cũng có thể tích tụ thành khoảng hở rõ rệt khi tủ được lắp đặt tại công trình.\n\nDây chuyền CNC chính xác của chúng tôi kết hợp máy cưa panel tự động với trung tâm gia công đa trục, tất cả đều nhận dữ liệu trực tiếp từ file CAD đã duyệt thay vì nhập lại kích thước thủ công. Điều này loại bỏ một nguồn lỗi phổ biến trong gia công hợp đồng: sai sót khi chuyển đổi giữa thiết kế và sản xuất.\n\nMỗi lô sản xuất đều bắt đầu bằng một lượt hiệu chuẩn, được kiểm tra so với mẫu chuẩn trước khi sản xuất hàng loạt. Kết hợp với các điểm kiểm tra kích thước trong quá trình sản xuất, điều này giữ dung sai trong khoảng 0.3mm cho mọi quy mô lô hàng.",
    },
    coverImage: img("blog-cnc-line"),
    category: { en: "Manufacturing", vi: "Sản Xuất" },
    author: "Maple Furniture Engineering Team",
    date: "2025-09-18",
    readTimeMinutes: 5,
  },
  {
    id: "b3",
    slug: "hospitality-design-trends-2026",
    title: { en: "Hospitality Furniture Trends to Watch in 2026", vi: "Xu Hướng Nội Thất Khách Sạn Đáng Chú Ý Năm 2026" },
    excerpt: {
      en: "From warm minimalism to regionally sourced materials, what's shaping hotel FF&E specifications this year.",
      vi: "Từ chủ nghĩa tối giản ấm áp đến vật liệu tìm nguồn theo vùng, điều gì đang định hình thông số FF&E khách sạn năm nay.",
    },
    content: {
      en: "Hotel design briefs are shifting away from stark minimalism toward what designers are calling 'warm minimalism' — restrained forms paired with tactile, natural materials: raw oak, linen, unlacquered brass, and hand-finished stone.\n\nWe're also seeing a rise in regionally sourced material specifications, driven both by sustainability commitments and by guests' growing appetite for a sense of place. Manufacturers who can offer traceable, regionally appropriate material options — without slowing down production schedules — have an advantage in RFPs for 2026 openings.\n\nFinally, modularity is becoming a specification requirement rather than a nice-to-have: hotel groups increasingly want casegoods platforms that can be re-finished or partially replaced during a soft renovation, rather than fully re-procured.",
      vi: "Các bản yêu cầu thiết kế khách sạn đang chuyển dịch khỏi chủ nghĩa tối giản khô cứng sang cái mà các nhà thiết kế gọi là 'tối giản ấm áp' — hình khối tiết chế kết hợp với vật liệu tự nhiên, giàu xúc cảm: gỗ sồi thô, vải lanh, đồng thau không sơn phủ và đá hoàn thiện thủ công.\n\nChúng tôi cũng nhận thấy xu hướng gia tăng thông số vật liệu tìm nguồn theo vùng, được thúc đẩy bởi cả cam kết bền vững lẫn nhu cầu ngày càng tăng của khách về cảm giác bản địa. Các nhà sản xuất có thể cung cấp vật liệu truy xuất được nguồn gốc, phù hợp theo vùng — mà không làm chậm tiến độ sản xuất — sẽ có lợi thế trong các RFP cho các khách sạn khai trương năm 2026.\n\nCuối cùng, tính module đang trở thành yêu cầu bắt buộc trong thông số kỹ thuật thay vì chỉ là điểm cộng: các tập đoàn khách sạn ngày càng muốn nền tảng case goods có thể hoàn thiện lại hoặc thay thế một phần trong quá trình cải tạo nhẹ, thay vì phải mua sắm lại toàn bộ.",
    },
    coverImage: img("blog-trends-2026"),
    category: { en: "Design Trends", vi: "Xu Hướng Thiết Kế" },
    author: "Maple Furniture Design Studio",
    date: "2026-01-12",
    readTimeMinutes: 7,
    featured: true,
  },
  {
    id: "b4",
    slug: "export-packing-engineering-explained",
    title: { en: "Export Packing Engineering, Explained", vi: "Giải Thích Về Kỹ Thuật Đóng Gói Xuất Khẩu" },
    excerpt: {
      en: "Why custom packing design — not just bubble wrap — is what actually protects furniture on a six-week sea voyage.",
      vi: "Vì sao thiết kế đóng gói riêng biệt — chứ không chỉ là màng bọc khí — mới thực sự bảo vệ nội thất trong hành trình sáu tuần trên biển.",
    },
    content: {
      en: "Furniture that survives a showroom rarely survives a shipping container without engineering the packaging as carefully as the product itself. Ocean freight exposes goods to vibration, humidity swings, and repeated handling across multiple ports.\n\nFor every new SKU, our packing engineers design a dedicated foam or corner-protection profile, drop-tested before approval. Cartons are sized to the exact product footprint to prevent movement in transit, and moisture-indicator cards are included in shipments bound for high-humidity destinations.\n\nContainer loading plans are engineered to maximise cube utilisation without stacking pressure on finished surfaces — often the difference between a shipment that arrives ready to install and one that requires costly on-site rework.",
      vi: "Nội thất sống sót qua showroom hiếm khi sống sót qua một container vận chuyển nếu bao bì không được thiết kế kỹ lưỡng như chính sản phẩm. Vận chuyển đường biển khiến hàng hóa chịu rung động, biến động độ ẩm và xử lý nhiều lần qua các cảng.\n\nVới mỗi mã sản phẩm mới, đội ngũ kỹ thuật đóng gói của chúng tôi thiết kế riêng biên dạng mút xốp hoặc bảo vệ góc cạnh, được kiểm tra rơi trước khi duyệt. Thùng carton được đóng đúng kích thước sản phẩm để tránh xê dịch trong vận chuyển, và thẻ chỉ báo độ ẩm được đính kèm cho các lô hàng đến những nơi có độ ẩm cao.\n\nKế hoạch xếp container được tính toán để tối đa hóa thể tích sử dụng mà không gây áp lực chồng lên bề mặt hoàn thiện — thường là yếu tố quyết định giữa một lô hàng sẵn sàng lắp đặt ngay và một lô hàng cần gia công lại tốn kém tại công trình.",
    },
    coverImage: img("blog-packing"),
    category: { en: "Logistics", vi: "Logistics" },
    author: "Maple Furniture Logistics Team",
    date: "2025-07-22",
    readTimeMinutes: 5,
  },
  {
    id: "b5",
    slug: "what-a-pre-shipment-qc-report-should-include",
    title: { en: "What a Pre-Shipment QC Report Should Include", vi: "Báo Cáo QC Trước Xuất Hàng Cần Có Những Gì" },
    excerpt: {
      en: "A buyer's checklist for reviewing quality documentation before signing off on a furniture shipment.",
      vi: "Danh sách kiểm tra cho người mua khi rà soát hồ sơ chất lượng trước khi ký duyệt xuất hàng.",
    },
    content: {
      en: "A thorough pre-shipment inspection report protects both manufacturer and buyer. At minimum, it should include dimensional verification against approved shop drawings, photographic documentation of finish and hardware on a statistically representative sample, and a record of any defects found with disposition notes.\n\nBuyers should also ask for material certification references — formaldehyde emission class for panel products, for instance — and confirm that packing has been inspected, not just the product itself.\n\nWe issue a pre-shipment QC report for every order as standard practice, available for review before container loading is confirmed.",
      vi: "Một báo cáo kiểm tra trước xuất hàng đầy đủ bảo vệ cả nhà sản xuất lẫn người mua. Tối thiểu, báo cáo cần bao gồm xác minh kích thước theo bản vẽ thi công đã duyệt, hình ảnh minh chứng về lớp hoàn thiện và phụ kiện trên mẫu đại diện thống kê, cùng ghi nhận mọi lỗi phát hiện được kèm ghi chú xử lý.\n\nNgười mua cũng nên yêu cầu tham chiếu chứng nhận vật liệu — ví dụ như cấp phát thải formaldehyde cho sản phẩm ván — và xác nhận rằng bao bì cũng đã được kiểm tra, không chỉ riêng sản phẩm.\n\nChúng tôi phát hành báo cáo QC trước xuất hàng cho mọi đơn hàng như một quy trình chuẩn, sẵn sàng để rà soát trước khi xác nhận xếp container.",
    },
    coverImage: img("blog-qc-report"),
    category: { en: "Quality", vi: "Chất Lượng" },
    author: "Maple Furniture Quality Team",
    date: "2025-05-30",
    readTimeMinutes: 4,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured);
}

export function getRelatedPosts(current: BlogPost, limit = 3) {
  return blogPosts.filter((p) => p.id !== current.id).slice(0, limit);
}
