# 🎨 Belkern GmbH — Design System & Visual DNA (`design.md`)
## "Modern European Clean × Cinematic Commodity Editorial"
### B2B Agricultural Commodity Export Architecture (Frankfurt am Main × Vietnam Origin)

> **Core Philosophy:** Sự giao thoa giữa **Tính chuẩn xác, kỷ luật thương mại Châu Âu (European Commercial Precision)** và **Chiều sâu thị giác điện ảnh từ vùng nguyên liệu nông nghiệp Việt Nam (Cinematic Agricultural Depth)**.  
> **Tech Stack Constraint:** 100% Semantic HTML5 + 100% TailwindCSS Utility Classes + Vanilla JavaScript. **Tuyệt đối không pha trộn class BEM tự chế**.  
> **Nguyên tắc cốt lõi:** 100% Nền sáng thanh lịch (`bg-white`, `bg-[#FBFBFA]`, `bg-brand-canvas`) kết hợp có chủ đích với các khối hình ảnh điện ảnh tràn viền (Cinematic Full-Bleed Portals) có lớp phủ tối tự nhiên (`bg-black/25`, `from-black/90 via-black/35 to-transparent`).  
> **Đối tượng tiếp nhận:** Giám đốc thu mua quốc tế (Procurement Directors), Nhà rang công nghiệp Châu Âu (Industrial Roasters), Tập đoàn chế biến thực phẩm & gia vị (Food Processors / Grinders tại Đức, Hà Lan, Ý, EU).

---

## 1. Bản sắc thị giác tổng thể của Trang chủ (Homepage Visual DNA)

Trang chủ Belkern thành công và tạo cảm giác ấn tượng, đắt giá, chuyên nghiệp là nhờ tuân thủ nghiêm ngặt **5 trụ cột thị giác**:

### 1.1. Tỷ lệ màu thương hiệu 60 – 30 – 10 (European Deep Slate & Belkern Green Palette)
* **60% Nền sáng thanh khiết (Clean Surface & Canvas):**
  * `bg-white`: Bề mặt chính của các khối nội dung, card thông số, form nhập liệu.
  * `bg-[#FBFBFA]` / `bg-brand-canvas` (`#F8FAFC`): Nền canvas xen kẽ giữa các section tạo nhịp thở thị giác (Visual Breathing Cadence) nhẹ nhàng, không gây lóa mắt.
  * `bg-slate-100`: Dành riêng cho Footer pháp lý chuẩn Đức.
* **30% Bản sắc Xanh Belkern, Navy Đậm & Xám Than Sâu (Belkern Green `#046738`, Deep Slate `#182639` & Text `#293649`):**
  * `text-brand-dark` (`#182639` — **Cập nhật từ `#071F14` theo chỉ đạo**): Màu xanh đen Navy Châu Âu cho tiêu đề chính (H1, H2, H3), số liệu lớn. Độ tương phản tối đa **12.63:1** trên nền trắng (**Đạt chuẩn WCAG AAA**).
  * `text-slate-600` / `brand.text` / `brand.charcoal` (`#293649` — **Tăng độ đậm từ `#475569` theo chỉ đạo**): Màu chữ đọc chính cho đoạn văn, mô tả, nhãn form. Loại bỏ hoàn toàn cảm giác xám mờ nhạt, đem lại độ tương phản sắc sảo **10.22:1** trên nền trắng và **9.88:1** trên canvas `#F8FAFC` (**Đạt chuẩn WCAG AAA**).
  * `text-slate-500` (`#3D4F66` — Tăng độ đậm từ `#64748b`): Dành cho phụ đề phụ, chú thích nhỏ, đảm bảo không bị mờ nhạt khi thu nhỏ.
  * `bg-brand-green` / `text-brand-green` (`#046738`): **Màu xanh chính xác từ logo Belkern**.
    * Độ tương phản trên nền trắng (`#FFFFFF`): **7.19:1** (**Đạt chuẩn WCAG AAA**).
    * Dùng làm màu nhận diện chủ đạo, tiêu đề phụ, kicker trên nền sáng, nút bấm chính (CTA) với chữ trắng.
  * `hover:bg-brand-greenDark` (`#034E2B`): Trạng thái hover cho nút bấm (Tương phản **9.81:1** trên nền trắng).
* **10% Điểm sáng Luminous Mint cho Nền Tối (`#34D399` / `#10B981`):**
  * **LOẠI BỎ HOÀN TOÀN MÀU VÀNG (`#D97706` / `#D4AF37`) theo chỉ đạo của ban lãnh đạo.**
  * Do màu xanh logo `#046738` là tone xanh đậm (luminance 0.096), khi đặt lên nền tối (`#182639` / ảnh chụp nông sản tối) sẽ chỉ có tương phản 2.3:1 (không đạt chuẩn WCAG).
  * Vì vậy, hệ thống tính toán nhánh màu **Luminous Mint (`#34D399`)** cùng họ quang phổ xanh (Hue 152°):
    * Độ tương phản trên nền tối `#182639`: **9.45:1** (**Đạt chuẩn WCAG AAA**).
    * Độ tương phản trên nền đen `#000000`: **11.60:1** (**Đạt chuẩn WCAG AAA**).
    * Dùng cho Kicker trên Hero tối, điểm radar nhấp nháy (`w-1.5 h-1.5 bg-brand-mint`), từ khóa nhấn mạnh trong H1/H2 trên Hero, hover menu khi chưa cuộn trang.

### 1.2. Typography Editorial chuẩn Châu Âu (Roboto Condensed System)
* **Font chữ duy nhất:** `Roboto Condensed` (Google Fonts, weights 300 to 900) cho toàn bộ tiêu đề, nội dung, số liệu, nhãn form và navigation. Khắc phục triệt để nhược điểm font béo lùn, mang lại tỷ lệ chữ thanh cao, vững chãi, cô đọng không gian ngang và tôn vinh phong cách Swiss International Style chuyên nghiệp.

* **Bảng Tiêu Chuẩn Thang Kích Thước Chữ (Standardized Type Scale Hierarchy):**
  Do đặc thù font condensed có độ rộng hẹp hơn font thông thường, hệ thống quy chuẩn chặt chẽ kích thước để **không bao giờ quá nhỏ gây mỏi mắt, và không bao giờ quá to tùy tiện**:

  | Vai trò (Role) | Cặp Utility Classes Tailwind | Cỡ chữ thực tế | Đặc điểm & Ứng dụng |
  | :--- | :--- | :--- | :--- |
  | **Hero Display H1** | `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.03]` | 36px → 72px | Tiêu đề lớn nhất trên Hero trang chủ, cực kỳ hoành tráng nhưng gọn gàng. |
  | **Page Hero H1** | `text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05]` | 30px → 48px | Tiêu đề đầu trang sản phẩm, về chúng tôi, liên hệ. |
  | **Section Heading H2** | `text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1]` | 30px → 48px | Tiêu đề mở đầu mỗi section chính trên toàn bộ website. |
  | **Card / Modal H3** | `text-xl sm:text-2xl font-bold leading-snug` | 20px → 24px | Tên card nông sản, tiêu đề modal, tên chuyên mục lớn. |
  | **Minor Subheading H4** | `text-base sm:text-lg font-bold leading-normal` | 16px → 18px | Tiêu đề cột footer, tiêu đề accordion, nhãn phân nhóm lớn. |
  | **Lead / Intro Text** | `text-sm sm:text-base leading-relaxed` | 14px → 16px | Đoạn văn mở đầu dưới H2, lời dẫn nhập trang trọng. |
  | **Body Text (Đoạn đọc)** | `text-sm leading-relaxed` | 14px | Nội dung mô tả sản phẩm, điều khoản, văn bản chi tiết. Màu `#293649`. |
  | **Kicker / Eyebrow** | `text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em]` | 13px → 14px | Dòng nhãn định danh đầu mỗi section. Dầy, nổi bật, không bị lọt thỏm. |
  | **Form Labels & Table Head** | `text-xs font-bold uppercase tracking-wider` | 12px | Nhãn trường form, tiêu đề cột bảng TDS, bảng mùa vụ. |
  | **Metadata / Badges / Chips** | `text-xs font-semibold` | 12px | Chip chứng nhận, pill cảng biển, thông số phụ. |
  | **⛔ Anti-Pattern cấm kỵ** | `text-[9px]`, `text-[10px]`, `text-[11px]` | < 12px | **TUYỆT ĐỐI CẤM SỬ DỤNG** kích thước < 12px trong Roboto Condensed vì chữ sẽ bị teo tóp, vỡ nét, không đạt chuẩn đọc B2B. |

* **Quy chuẩn Kicker Toàn Diện & Đồng Bộ với Hero (Kicker Design & Contrast System):**
  * **Kích thước & Độ dày (Size & Weight):**
    * Đồng bộ kích thước toàn diện với Kicker ở Hero: `text-xs sm:text-sm` (12px trên Mobile, 14px trên Desktop sm+).
    * Font weight: Chuẩn `font-bold` (700) — Tuyệt đối không dùng `font-black` (900) hay `font-extrabold` (800).
    * Letter-spacing: `tracking-[0.18em]` kết hợp `uppercase`.
    * **Bỏ hoàn toàn hình vuông/chấm trang trí:** Trên toàn bộ các dòng kicker phía trên Section Title (`h2`), **không sử dụng bất kỳ ô vuông (`w-1.5 h-1.5`) hay chấm nào**, giữ chữ thuần khiết, thanh thoát theo đúng chuẩn Swiss Minimalist Editorial.
  * **Quy tắc Phối Màu theo Nền (Background-Aware Color System):**
    * 🌑 **Trường hợp 1 — Trên Nền Tối / Ảnh Hero / Scrim Điện Ảnh / Drawer:**
      * **Màu chữ:** `text-brand-mint` (`#34D399`) kết hợp `drop-shadow-sm`.
      * **Chỉ số tương phản:** Đạt **9.45:1 trên `#182639`** và **11.60:1 trên `#000000`** (**Chuẩn WCAG AAA**).
      * **Code mẫu (Hero Kicker):**
        `<div class="inline-flex items-center gap-2 text-brand-mint text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-2 sm:mb-2.5 drop-shadow-sm"><span class="w-1.5 h-1.5 bg-brand-mint shrink-0 shadow-2xs"></span><span>B2B COMMODITY SOURCING &middot; EU GATEWAY</span></div>`
    * ☀️ **Trường hợp 2 — Trên Nền Sáng / Section Title Kickers (`bg-white`, `bg-[#FBFBFA]`, `bg-brand-canvas`):**
      * **Màu chữ:** `text-brand-green` (`#046738`) hoặc `text-brand-gold` (`#D97706`).
      * **Chỉ số tương phản:** Đạt **7.19:1 trên `#FFFFFF`** và **6.95:1 trên `#F8FAFC`** (**Chuẩn WCAG AAA**).
      * **Code mẫu (Section Title Kicker — Không hình vuông):**
        `<div class="text-brand-green text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-2 sm:mb-2.5">COMPLIANCE &amp; TRACEABILITY</div>`

* **Quy chuẩn Chuẩn Hóa Bố Cục Header Section (Standardized Section Header Architecture):**
  * **Lưới chia đều 2 cột trên Desktop (>= 1024px):** `grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start mb-8 sm:mb-10 lg:mb-12` (mỗi bên chiếm đúng 50% độ rộng ngang, 1fr - 1fr).
  * **Cột bên trái:** Chứa **Kicker + H2 Title** (Kicker phía trên, theo sau là tiêu đề H2 `text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1]`).
  * **Cột bên phải:** Chứa **Subtitle + Cặp nút hành động (CTAs) hoặc Callout**.
    * **Quy tắc căn chỉnh ngang bằng H2 (Vertical Alignment Rule):** Cột bên phải bắt buộc thêm lớp `lg:pt-[30px]` (tương ứng với chiều cao dòng text kicker ~20px cộng với margin-bottom ~10px của kicker). Nhờ đó, đỉnh dòng chữ Subtitle sẽ ngang bằng với đỉnh chữ tiêu đề H2 ở cột bên trái trên màn hình desktop, tạo nên đường gióng chuẩn xác của phong cách kiến trúc Swiss Design.
    * Trên thiết bị mobile/tablet (< 1024px), cột phải xếp chồng tự nhiên bên dưới với khoảng cách `gap-6` mà không bị áp khoảng padding 30px này.

### 1.3. Chiều sâu thị giác ảnh thực & Kính mờ (Photographic Depth & Glassmorphism)
* **Tuyệt đối không dùng icon hoạt hình, vector rẻ tiền hay hình minh họa đồ họa:** Toàn bộ trang web sử dụng ảnh chụp thực tế chất lượng cao (nông trường cà phê, hạt tiêu, ớt tươi, nhà máy tiệt trùng hơi nước, skyline Frankfurt).
* **Lớp phủ Scrim Gradient tinh tế:** Không bao giờ phủ màu bệt che mất ảnh. Ảnh luôn sáng rõ 60% ở vùng trên, chỉ chuyển dần gradient tối ở chân ảnh (`from-black/90 via-black/35 to-transparent`) để đặt chữ màu trắng tương phản cao.
* **Translucent Glass Chips:** Thẻ thông tin nổi trên ảnh dùng kính mờ cao cấp:
  `bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white/95 font-semibold`.

### 1.4. Thiết kế Hệ thống Nút bấm Toàn diện (Universal Button Design System)
* **Quy chuẩn Kích thước & Typography Nút (Button Dimension & Font Scale):**
  * **Chiều cao chuẩn:** `h-11 sm:h-12` (44px mobile, 48px desktop sm+), đạt chuẩn WCAG Touch Target ≥ 44px.
  * **Cỡ chữ chuẩn:** **Bắt buộc `text-sm font-bold tracking-wide` (14px)**. Tuyệt đối không dùng `text-xs` (12px) cho nút bấm chính/phụ để tránh chữ bị nhỏ, khó đọc trên font hẹp `Roboto Condensed`.
  * **Độ đậm:** Chuẩn mực **`font-bold` (700)**. Tuyệt đối không dùng 800/900.
  * **Bán kính góc:** `rounded-xl` (12px) thống nhất toàn trang, không dùng bo tròn `rounded-full` kiểu app tiêu dùng B2C.

* **Quy tắc Bố cục & Vị trí Icon (Icon Alignment & Ordering Rule):**
  * **QUY TẮC BẤT BIẾN:** **Chữ đứng TRƯỚC, Icon nằm bên PHẢI** (`<span>Label</span> <icon>`).
  * Tuyệt đối không đảo icon sang bên trái đối với các nút điều hướng/hành động chính (CTAs).

* **Ma trận Màu sắc & Trạng thái theo Nền (Background-Aware Button Matrix):**
  * 🌑 **Trường hợp 1 — Trên Nền Tối (Dark Surface: Hero, Banner tối, Full-screen Takeover):**
    * **Primary Button (Green Solid + White Squircle Disc):**
      `h-11 sm:h-12 inline-flex items-center justify-center gap-3 pl-5 sm:pl-6 pr-2 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer`
      Icon đĩa vuông bo góc màu trắng: `<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 shadow-2xs shrink-0"><i data-lucide="arrow-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]"></i></span>` (hoặc `arrow-down` cho scroll anchor).
    * **Secondary Button (Glass / Outline Frosted trên Nền Tối):**
      `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl border border-white/25 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer group shrink-0`
      **Màu Icon trên nền tối:** Bắt buộc là **MÀU TRẮNG** (`text-white/80 group-hover:text-white`), **TUYỆT ĐỐI KHÔNG dùng icon màu xanh (mint) hay vàng (gold) trên nền nút tối**.
  * ☀️ **Trường hợp 2 — Trên Nền Sáng (Light Surface: Body sections, thẻ card, modals):**
    * **Primary Button (Green Solid trên Nền Sáng):**
      `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer`
      Icon mũi tên trắng bên phải: `<i data-lucide="arrow-right" class="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5"></i>`
    * **Secondary Button (Outline trên Nền Sáng):**
      `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl border border-slate-300 hover:border-brand-green bg-white hover:bg-brand-green/5 text-slate-800 hover:text-brand-green font-bold text-sm tracking-wide transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs`
      Icon màu slate chuyển sang brand-green khi hover: `<i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all"></i>`

* **Quy chuẩn Phân Cấp Tiêu Đề Hero (Hero Headline Typographic Hierarchy):**
  * **Trang chủ (`index.html`):** Flagship scale `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.03]` (36px → 48px → 60px → 72px).
  * **Tất cả các trang con (`about.html`, `products.html`, `product-*.html`, `certificates.html`, `sustainability.html`, `contact.html`, `careers.html`, `faq.html`, `agb.html`):** Chuẩn hóa đồng nhất lên **`text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.04]`** (36px → 48px → 60px), cao hơn 1 bậc rõ rệt so với tiêu đề Section H2 bên dưới (`text-3xl sm:text-4xl lg:text-5xl font-bold`).

### 1.5. Nhịp điệu không gian & Bố cục thở (Universal Section Rhythm)
* **Khoảng đệm trên/dưới chuẩn hóa:** `pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24`.
* **Container chuẩn:** `max-w-7xl mx-auto px-5 sm:px-10 lg:px-12`.
* **Đường viền ngăn cách:** Rất mảnh, thanh nhã `border-slate-200/80` hoặc `border-slate-200/60`, không dùng viền đậm dày cộm.

---

## 2. Danh mục Sản phẩm & Chuẩn Hóa Tên Gọi Nông Sản (Commodity Lines)

Hệ thống cung ứng xuất khẩu của Belkern bao gồm 9 dòng hàng hóa chiến lược được chuẩn hóa danh xưng B2B quốc tế:

1. **Robusta Coffee** (Robusta Green Coffee)
2. **Arabica Coffee** (Arabica Specialty Green Coffee)
3. **Black Pepper & White Pepper** (*Chuẩn hóa từ tên gọi cũ Black & White Pepper theo chỉ đạo*)
4. **Vietnamese Dried Chili**
5. **Cassia Cinnamon**
6. **Star Anise**
7. **Turmeric** (Turmeric Finger & Powder)
8. **Cashews** (Raw Cashew Kernels)
9. **Desiccated Coconut**

---

## 3. Quy chuẩn xây dựng Trang Chi Tiết Sản Phẩm (Product Page Architecture Blueprint)

Mỗi trang sản phẩm (như `product-chili.html`, `product-pepper.html`, `product-coffee.html`) phải tuân theo cấu trúc chuẩn 7 khối sau:

### Khối 1: Header Navigation (Comaxx System & Dynamic Logo Scale)
* **Trạng thái đỉnh trang (Unscrolled / scrollY <= 10):** Nền trong suốt (`bg-transparent`), Logo thương hiệu kích thước mở rộng uy nghi: `height: 3.6rem;` (`h-[3.6rem]`). Sử dụng logo âm bản `DM-Belkern-2.png` trên nền hero tối.
* **Trạng thái cuộn trang (Scrolled / scrollY > 10):** Tự động chuyển sang thanh trắng cố định (`bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs`), logo tự động co nhỏ về kích thước compact chuẩn `h-8 sm:h-9 lg:h-10` và tráo sang logo dương bản `LM-Belkern-1.png`. Hiệu ứng chuyển động mượt mà với `transition-all duration-300`.

### Khối 2: Product Cinematic Hero (Open Canvas Architecture)
* Không gian điện ảnh với ảnh thực tế vùng nguyên liệu hoặc sản phẩm chất lượng cao, tối đa hóa khoảng thở thị giác.
* Kicker xanh mint: `text-brand-mint text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-2 drop-shadow-sm`.
* Headline hoành tráng: Tên sản phẩm tiếng Anh ngắn gọn, súc tích (ví dụ: `Arabica Coffee`, `Black Pepper & White Pepper`) với tỷ lệ chữ chuẩn `text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.04]`.
* Lời dẫn ngắn gọn, trung tính, không chứa cam kết sai lệch hay số liệu lab cứng nhắc.
* Cặp nút hành động kiến trúc kép (Dual Architectural CTAs): Nút chính FCL Quotation (nền xanh thương hiệu + đĩa vuông bo góc màu trắng chứa mũi tên bên phải) và Nút phụ Inquire Specifications (nền kính mờ + viền trắng + icon chat trắng).
* **Open Canvas Architecture:** Loại bỏ hoàn toàn 4 box trụ cột ở chân Hero (loại bỏ tuyên bố sai về nhà máy riêng, sản lượng 10.000+ MT và chứng chỉ cứng nhắc). Hero giữ trọn khoảng thở thanh khiết, khối nội dung được căn giữa tự nhiên (`my-auto`) với thanh đệm đáy thoáng đãng (`<div class="h-8 sm:h-12 shrink-0 pointer-events-none"></div>`).

### Khối 3: Commodity Fast-Switcher (Thanh chuyển đổi nông sản siêu tốc)
* Ghim cố định `sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90`.
* Cho phép khách mua hàng duyệt nhanh qua lại giữa 9 mặt hàng nông sản mà không cần quay lại trang chủ.
* Thiết kế thanh nhã, pill bo góc `rounded-xl`, chấm radar active.

### Khối 4: Commodity Specimen & Sourcing (Visual Gallery & Contract Declaration — Hướng 2)
* **Triết lý:** Chuyển đổi toàn diện từ bảng chỉ số phòng lab cố định sang **Thư viện ảnh thực tế + 1 lời tuyên bố thương mại linh hoạt theo đơn đặt hàng** (tránh rủi ro pháp lý, phản ánh đúng thực tế hàng nông sản thu mua theo từng hợp đồng của người mua):
  * **Bên trái (Visual Photography Slider):** Slider trình chiếu 4 bước ảnh thực tế chất lượng cao của lô hàng nông sản (Tổng quan mẫu, Làm sạch & phân loại màu quang học, Độ đồng đều & kết cấu, Quy cách đóng gói xuất khẩu FCL). Mỗi ảnh có badge kính mờ mô tả trực quan, tuyệt đối không gắn các chỉ số ppm/ppb/ISO cứng nhắc.
  * **Bên phải (Contract-Tailored Procurement Showcase):** Khối nội dung ổn định 100% (không giật khung), khẳng định rõ nguồn cung đa xuất xứ (Vietnam, Brazil, Indonesia, India, Africa) từ các hợp tác xã và nhà máy đối tác uy tín, phân loại và chứng nhận nghiêm ngặt theo **quy cách hợp đồng của người mua (Buyer Contract Specifications)**.
  * **3 Trụ cột cam kết thương mại:**
    1. *Tailored Grading & Selection* (Sàng lọc, phân loại quang học, độ ẩm, dung sai khuyết tật theo đơn đặt hàng).
    2. *Independent Pre-Shipment Inspection (COA)* (Giám định độc lập SGS / Eurofins / Cafecontrol trước khi niêm phong chì).
    3. *Flexible Export Packaging & Logistics* (Đóng gói bao Kraft, Jute GrainPro®, Big Bags hoặc nhãn riêng theo yêu cầu).
  * **Hệ thống điều khiển:** Thanh đếm bước `01 Specimen Overview / 04` và cặp nút squircle Belkern (`stepCertPanorama(-1)`, `stepCertPanorama(1)`).

### Khối 5: Interactive Grades & Cuts (Các cấp độ chế biến công nghiệp)
* Trình bày các hình thái sản phẩm (Ví dụ Tiêu: Tiêu đen sạch tiệt trùng HTST, Tiêu sọ trắng rửa kép; Ớt: Nguyên quả bỏ cuống, Nguyên quả có cuống, Mảnh vảy pizza, Bột ớt mịn).
* Thiết kế card đồng nhất với card `#commodities` trên trang chủ.

### Khối 6: Laboratory TDS Matrix (Bảng kiểm nghiệm phòng lab ISO 17025)
* Thể hiện các chỉ số an toàn thực phẩm khắt khe của EU: Độ ẩm, Aflatoxin, Ochratoxin A, vi sinh Salmonella, dư lượng thuốc BVTV (MRLs).
* Tích hợp chức năng in ấn / xuất file PDF TDS chính thức.

### Khối 7: Pre-configured RFQ Desk & Cross-Commodities Grid
* Form báo giá B2B đầy đủ 4 bước (Cargo Scope -> Buyer Commercial Identity -> Accreditations & Notes -> DSGVO Agreement), đã điền sẵn tên sản phẩm, cho phép chọn cảng đến (Hamburg, Rotterdam).
* Lưới 8 nông sản còn lại chuẩn hình ảnh trang chủ để kích thích đặt gộp container (Consolidated Multi-Product FCL).

---

## 4. Quy chuẩn Trang Danh mục Sản phẩm (`products.html`)

1. **Card tương tác toàn diện (Full-Card Clickability):**
   * Toàn bộ khối card sản phẩm `.commodity-card` được bọc trực tiếp bởi thẻ `<a href="product-[name].html">`.
   * Khách hàng click vào bất kỳ vị trí nào trên card (ảnh, nền tối, tiêu đề, nút bấm) đều chuyển hướng ngay lập tức tới trang chi tiết.
   * Tiêu đề `<h3>` kích hoạt hiệu ứng đổi màu vàng (`group-hover:text-brand-gold`), nút mũi tên tự động nổi bật (`group-hover:bg-brand-green group-hover:translate-x-0.5`).
   * Tuyệt đối không lồng thẻ con `<a>` bên trong để tuân thủ 100% chuẩn Semantic HTML5.
2. **Loại bỏ section Chứng nhận rườm rà:**
   * Bỏ hoàn toàn section "Standardized Food Safety & Environmental Governance" theo đúng chỉ đạo của bà Nhung (không khoe logo chứng chỉ, hàng hóa tuân thủ theo tiêu chuẩn đơn đặt hàng / hợp đồng mua bán của đối tác uy tín).
3. **Quy chuẩn Mixed FCL Container Flexibility:**
   * Giữ vững giá trị thương mại: Đóng gộp đa nông sản trong 1 FCL, cấp 1 Bill of Lading, kiểm dịch thực vật & thông quan gộp.
   * **Nghiêm cấm:** Không đề cập lưu mẫu thử 500g tại Frankfurt (vi phạm lệnh bỏ sample và rủi ro pháp lý lưu kho).
   * **Tên hàng hóa tinh giản:** Chỉ thể hiện tên hàng thương mại chung (`Black Pepper & White Pepper`, `Cassia Cinnamon`, `Star Anise`, `Arabica Coffee`), không ghi chi tiết mật độ (570 g/l), phương pháp tiệt trùng (HTST) hay tiểu vùng địa phương (Yên Bái, Cầu Đất) trên manifest.