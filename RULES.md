# QUY TẮC LÀM VIỆC CỦA HỆ THỐNG AI

## 1. Phân chia vai trò

- Claude App (Tầng 1): Lập kế hoạch, chia nhỏ công việc vào TASKS.md, phân tích lỗi khó.
- Antigravity (Tầng 2): Chỉ viết code cho đúng 1 nhiệm vụ được giao trong TASKS.md.

## 2. Quy tắc tiết kiệm Token và Chống lặp lỗi (Bắt buộc)

- Chỉ đọc các file thực sự liên quan đến nhiệm vụ hiện tại. Không tự ý quét toàn bộ dự án.
- Nếu chạy lệnh hoặc sửa lỗi thất bại quá 2 lần liên tiếp: DỪNG NGAY LẬP TỨC, báo nguyên nhân cho người dùng, tuyệt đối không tự thử lại.
- Luôn in ra câu lệnh và hỏi ý kiến người dùng trước khi chạy bất kỳ lệnh hệ thống (Terminal) nào.

## 3. Quy tắc bàn giao sau mỗi nhiệm vụ

- Khi làm xong 1 mục trong TASKS.md: đánh dấu [x] vào TASKS.md.
- Ghi tóm tắt 2–3 dòng những gì vừa làm vào cuối file MEMORY.md.

## 4. Quy tắc sao lưu an toàn (Git)

- Sau khi hoàn thành mỗi Task và người dùng xác nhận đạt, nhắc người dùng chạy 2 lệnh `git add .` và `git commit -m "Hoan thanh Task X"` để lưu mốc an toàn trước khi mở phiên chat mới.

## 5. Quy trình Kiểm định tự động (Tầng 3)

- Sau khi hoàn thành code giao diện hoặc chức năng web, bắt buộc dùng trình duyệt tích hợp (Browser Sub-agent) mở trang web lên tự kiểm thử:
  1. Thử nhập dữ liệu và bấm các nút chức năng như người dùng thật.
  2. Kiểm tra Console trình duyệt xem có dòng lỗi màu đỏ nào không.
  3. Nếu phát hiện lỗi, tự sửa ngay (tối đa 2 lần theo quy tắc ngắt mạch) trước khi báo hoàn thành cho người dùng.
