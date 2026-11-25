# BỘ NHỚ CHUNG CỦA DỰ ÁN (MEMORY)

## Mục tiêu dự án

- Xây dựng dự án thử nghiệm đầu tiên bằng hệ thống AI phân tầng.

## Tiến độ hiện tại

- Đã tạo xong 3 file bộ nhớ chung tại thư mục gốc dự án.
- Đã hoàn thành Task 1 (Giao diện HTML + CSS).
- Đã hoàn thành Task 2 (Lưu trữ dữ liệu storage.js).
- Đã hoàn thành Task 3 (Xử lý giao diện và tính toán app.js).

## Ghi chú kỹ thuật quan trọng

- Task 1: Đã xây dựng khung giao diện tại `expense-app/index.html` và định kiểu responsive tại `expense-app/style.css` với đầy đủ các ID theo Hợp đồng chung (`tx-form`, các ô input, `tx-list`, `total-income`, `total-expense`, `balance`).
- Đã khai báo nạp `storage.js` trước, `app.js` sau trong `index.html`.
- Task 2: Đã tạo `expense-app/storage.js` gắn vào đối tượng toàn cục `Storage` với 3 phương thức `getAll`, `add`, `remove` sử dụng khóa `expense_tracker_v1`. Xử lý an toàn khi rỗng/lỗi JSON và không can thiệp DOM.
- Task 3: Đã hoàn thiện `expense-app/app.js` xử lý submit form, validate dữ liệu (số tiền > 0, có ngày), gọi `Storage.add`, vẽ lại bảng `tx-list`, xóa giao dịch qua `Storage.remove`, tính tổng thu/chi/số dư chuẩn tiền Việt (`1.250.000 ₫`) và tự động tải dữ liệu khi mở trang. Đã kiểm định không có lỗi Console.

Claude đã kết nối thành công!
