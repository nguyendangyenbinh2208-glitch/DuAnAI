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
- [ ] **Task 2 – Lưu trữ dữ liệu (storage.js)**
  Viết các hàm `getAll`, `add`, `remove` theo đúng API ở Hợp đồng chung, lưu bằng `localStorage`. Xử lý trường hợp dữ liệu trống hoặc JSON hỏng (trả về mảng rỗng, không báo lỗi). Không thao tác DOM trong file này.
- [ ] **Task 3 – Xử lý giao diện và tính toán (app.js)**
  Bắt sự kiện gửi form, kiểm tra dữ liệu hợp lệ (số tiền > 0, có ngày), gọi `Storage.add`, rồi vẽ lại bảng `tx-list`. Gắn sự kiện cho nút Xóa gọi `Storage.remove`. Tính và hiển thị tổng thu, tổng chi, số dư theo định dạng tiền Việt Nam (ví dụ 1.250.000 ₫). Tải và hiển thị dữ liệu có sẵn khi mở trang. Chỉ dùng các ID và API đã nêu ở Hợp đồng chung, không tự đổi tên.
