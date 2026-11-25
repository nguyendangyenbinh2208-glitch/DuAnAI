# DANH SÁCH NHIỆM VỤ

Dự án: Trang web quản lý chi tiêu cá nhân đơn giản, chạy trực tiếp trên trình duyệt (HTML + CSS + JavaScript thuần, không dùng framework, không cần server).

Mỗi nhiệm vụ độc lập: chỉ làm đúng 1 mục, chỉ tạo/sửa đúng các file được liệt kê, tuân thủ phần "Hợp đồng chung" bên dưới để ghép lại không bị lỗi.

## Hợp đồng chung (cả 3 nhiệm vụ phải tuân theo)

**Cấu trúc file** (cùng thư mục `D:\DuAnAI\expense-app\`):
`index.html`, `style.css`, `storage.js`, `app.js`

**Thứ tự nạp script trong index.html:** `storage.js` trước, `app.js` sau.

**Cấu trúc 1 giao dịch:**
`{ id: string, type: "income" | "expense", amount: number, category: string, note: string, date: "YYYY-MM-DD" }`

**Các ID bắt buộc trong index.html:**

- Form: `tx-form`
- Ô nhập: `tx-type` (select: income/expense), `tx-amount` (number), `tx-category` (select), `tx-note` (text), `tx-date` (date)
- Danh sách giao dịch: `tx-list` (thẻ `<tbody>`)
- Tổng hợp: `total-income`, `total-expense`, `balance`

**API trong storage.js** (gắn vào đối tượng toàn cục `Storage`, khóa localStorage là `expense_tracker_v1`):

- `Storage.getAll()` trả về mảng giao dịch (mảng rỗng nếu chưa có dữ liệu)
- `Storage.add(tx)` thêm giao dịch, tự sinh `id`, trả về giao dịch đã lưu
- `Storage.remove(id)` xóa giao dịch theo `id`

---

## Nhiệm vụ

- [X] **Task 1 – Giao diện (index.html + style.css)**
  Dựng khung trang theo đúng các ID ở phần Hợp đồng chung: form nhập giao dịch, 3 ô tổng hợp (thu, chi, số dư), bảng danh sách giao dịch có cột Ngày / Loại / Danh mục / Ghi chú / Số tiền / nút Xóa. Danh mục gồm: Ăn uống, Đi lại, Học tập, Giải trí, Khác (và "Lương" cho khoản thu). Giao diện gọn, hiển thị tốt trên cả máy tính và điện thoại. Không viết logic JavaScript trong task này.
- [X] **Task 2 – Lưu trữ dữ liệu (storage.js)**
  Viết các hàm `getAll`, `add`, `remove` theo đúng API ở Hợp đồng chung, lưu bằng `localStorage`. Xử lý trường hợp dữ liệu trống hoặc JSON hỏng (trả về mảng rỗng, không báo lỗi). Không thao tác DOM trong file này.
- [X] **Task 3 – Xử lý giao diện và tính toán (app.js)**
  Bắt sự kiện gửi form, kiểm tra dữ liệu hợp lệ (số tiền > 0, có ngày), gọi `Storage.add`, rồi vẽ lại bảng `tx-list`. Gắn sự kiện cho nút Xóa gọi `Storage.remove`. Tính và hiển thị tổng thu, tổng chi, số dư theo định dạng tiền Việt Nam (ví dụ 1.250.000 ₫). Tải và hiển thị dữ liệu có sẵn khi mở trang. Chỉ dùng các ID và API đã nêu ở Hợp đồng chung, không tự đổi tên.
- [ ] **Task 4 – Biểu đồ tròn chi tiêu theo danh mục (Chart.js)**
  Điều kiện: làm sau khi Task 3 hoàn thành. Chỉ tạo/sửa 3 file: `index.html`, `chart-view.js` (tạo mới), và `app.js` (chỉ thêm đúng 1 dòng gọi hàm vẽ lại, không sửa logic có sẵn).

  - `index.html`: nạp Chart.js bằng thẻ `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>` (cú pháp nhúng CDN theo tài liệu chính thức Chart.js, tra cứu qua context7), đặt trước `storage.js`. Thêm một khối "Chi tiêu theo danh mục" chứa `<canvas id="category-chart">` bọc trong một thẻ `<div>` có chiều cao cố định (để biểu đồ co giãn tốt trên điện thoại) và một thẻ `<p id="chart-empty">` hiển thị dòng "Chưa có khoản chi để thống kê". Thêm `<script src="chart-view.js">` sau `storage.js`, trước `app.js`.
  - `chart-view.js`: gắn vào đối tượng toàn cục `ChartView` với phương thức `ChartView.render()`. Hàm tự lấy dữ liệu bằng `Storage.getAll()`, chỉ cộng dồn các giao dịch `type === "expense"` theo `category`, rồi vẽ biểu đồ `type: 'pie'` với `labels` là tên danh mục, `data` là tổng tiền từng danh mục, `backgroundColor` là mảng màu (mỗi danh mục một màu), `options.responsive: true`, `plugins.legend.position: 'bottom'`. Tooltip hiển thị số tiền theo định dạng tiền Việt Nam (ví dụ 1.250.000 ₫). Giữ biểu đồ trong một biến duy nhất; nếu đã có thì gọi `.destroy()` trước khi tạo mới để tránh lỗi "Canvas is already in use". Khi không có khoản chi nào: hủy biểu đồ, ẩn `category-chart` và hiện `chart-empty`. Không thao tác với bảng giao dịch và không ghi vào `localStorage`.
  - `app.js`: thêm lời gọi `ChartView.render()` ở cuối hàm vẽ lại danh sách/tổng hợp (để biểu đồ cập nhật sau mỗi lần thêm, xóa và khi tải trang).
  - Kiểm tra hoàn thành: thêm vài khoản chi ở các danh mục khác nhau thì biểu đồ đổi theo; xóa hết khoản chi thì hiện dòng thông báo; khoản thu không xuất hiện trong biểu đồ.
- [ ] **Task 5 – Xuất giao dịch ra file CSV mở được bằng Excel (không lỗi font tiếng Việt)**
  Điều kiện: có thể làm độc lập với Task 4. Chỉ tạo/sửa 2 file: `index.html` và `csv-export.js` (tạo mới). Không sửa `app.js`.

  - `index.html`: thêm nút `<button id="export-csv-btn" type="button">Xuất CSV</button>` phía trên bảng giao dịch. Thêm `<script src="csv-export.js">` sau `storage.js`, trước `app.js` (nếu Task 4 đã làm thì giữ nguyên thứ tự: Chart.js CDN, `storage.js`, `chart-view.js`, `csv-export.js`, `app.js`).
  - `csv-export.js`: tự gắn sự kiện `click` cho `export-csv-btn` khi trang đã tải xong. Khi bấm, lấy dữ liệu bằng `Storage.getAll()`, nếu mảng rỗng thì `alert("Chưa có giao dịch để xuất")` và dừng. Nếu có dữ liệu thì dựng chuỗi CSV với các quy tắc sau:
    - Bắt đầu bằng ký tự BOM `\uFEFF` để Excel nhận đúng UTF-8, sau đó là dòng `sep=,` để Excel dùng dấu phẩy làm ngăn cách bất kể cài đặt vùng (máy đặt vùng Việt Nam thường dùng dấu chấm phẩy nên thiếu dòng này sẽ dồn cả hàng vào một cột).
    - Dòng tiêu đề: Ngày, Loại, Danh mục, Ghi chú, Số tiền. Cột Loại ghi "Thu" hoặc "Chi". Cột Số tiền ghi số thuần (không có dấu phân cách hàng nghìn, không có ký hiệu ₫) để Excel nhận là số.
    - Mỗi ô bọc trong dấu nháy kép, dấu nháy kép bên trong được nhân đôi (`"` thành `""`); riêng ô Ghi chú nếu bắt đầu bằng `=`, `+`, `-`, `@` thì thêm dấu nháy đơn `'` ở đầu để tránh Excel diễn giải thành công thức.
    - Tạo `Blob` với `type: 'text/csv;charset=utf-8;'`, tải xuống bằng thẻ `<a download>` tạm thời, tên file `giao-dich-YYYY-MM-DD.csv` (ngày hiện tại), sau đó gọi `URL.revokeObjectURL`.
  - Kiểm tra hoàn thành: thêm giao dịch có ghi chú tiếng Việt có dấu và có dấu phẩy, xuất file rồi mở bằng Excel bằng cách bấm đúp; chữ tiếng Việt hiển thị đúng, mỗi trường nằm đúng một cột, cột Số tiền căn lề phải như số.
