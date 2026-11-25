# 🤖 AI Command Center - Antigravity IDE + Claude Code

Trung tâm chỉ huy tự động hóa hoàn toàn kết hợp Antigravity IDE và Claude Code.

## 📁 Cấu trúc dự án

```
ai-command-center/
├── .agents/              # Agent Teams config cho Antigravity
│   ├── teams.json        # Định nghĩa các tác nhân phụ song song
│   └── GEMINI.md         # Rules cho Antigravity agents
├── mcp-servers/          # Custom MCP servers
│   └── custom-server.js  # Server tùy chỉnh
├── .github/
│   └── workflows/
│       └── ai-pipeline.yml  # CI/CD tự động với Claude Code
├── mcp.json              # Cấu hình MCP cho cả Antigravity & Claude Code
├── .env.example          # Template biến môi trường
└── README.md             # Tài liệu này
```

## 🚀 Cài đặt nhanh

### Bước 1: Yêu cầu hệ thống
- Node.js >= 18 (đã cài ✅)
- Python >= 3.12 (đã có ✅)
- Git

### Bước 2: Cài proxy
```bash
npm install -g antigravity-claude-proxy
```

### Bước 3: Đăng nhập Google
```bash
antigravity-claude-proxy accounts add
# Hoặc dùng shorthand:
acc accounts add
```

### Bước 4: Khởi động proxy
```bash
acc start
# Dashboard: http://localhost:8080
```

### Bước 5: Cài Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

### Bước 6: Kiểm tra kết nối
```bash
claude --version
# Proxy sẽ tự route qua Google AI
```

## 🏗️ Giai đoạn 1: Antigravity IDE - Trung tâm chỉ huy

### Agent Teams (Chạy song song)
Cấu hình trong `.agents/teams.json`:
- **Unit Test Agent**: Chuyên viết test cho mọi function mới
- **UI Design Agent**: Thiết kế và review giao diện người dùng
- **Code Review Agent**: Review và refactor code
- **Documentation Agent**: Viết tài liệu tự động

### Planning Mode
Với feature lớn, dùng Antigravity Planning Mode:
```
/plan Thiết kế hệ thống authentication với JWT + OAuth2
```

### Chromium Sub-agent
Tự động phát hiện visual bug:
```
Hãy mở http://localhost:3000 và kiểm tra responsive trên mobile/desktop
```

## 🔌 Giai đoạn 2: Claude Code + Proxy

### Kiến trúc proxy
```
Claude Code CLI ──> antigravity-claude-proxy ──> Google Antigravity API
                     (localhost:8080)              (Miễn phí với Google account)
```

### Cấu hình `~/.claude/settings.json`
```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:8080",
    "ANTHROPIC_API_KEY": "PROXY_USES_GOOGLE_AUTH"
  }
}
```

### Lệnh thường dùng trong terminal Antigravity
```bash
# Review file cụ thể
claude "Review và refactor file app.py, tối ưu performance"

# Commit code
claude "Phân tích git diff và tạo commit message semantic"

# Debug lỗi
claude "Tìm nguyên nhân lỗi trong stack trace này: [paste error]"
```

## 🌐 Giai đoạn 3: MCP - Kết nối thế giới thực

### Servers đã cấu hình (mcp.json)
| Server | Chức năng |
|--------|-----------|
| `filesystem` | Đọc/ghi file project |
| `github` | Quản lý issues, PRs, repos |
| `postgres` | Truy cập database trực tiếp |
| `brave-search` | Web search không giới hạn |
| `memory` | Lưu context dài hạn |
| `puppeteer` | Điều khiển browser headless |
| `sequential-thinking` | Chain-of-thought planning |
| `sentry` | Theo dõi lỗi production |

### Workflow với MCP
```
1. Sentry MCP phát hiện lỗi production
2. Claude Code đọc log qua MCP
3. Antigravity Agent Team phân tích và viết lại hàm bị lỗi
4. GitHub MCP tạo PR tự động
```

## ⚙️ Giai đoạn 4: CI/CD Pipeline tự động

### GitHub Actions (`.github/workflows/ai-pipeline.yml`)

| Job | Khi nào | Chức năng |
|-----|---------|-----------|
| `ai-code-review` | Mỗi PR | Claude review và comment |
| `generate-tests` | Mỗi PR | Tự động viết unit tests |
| `nightly-issue-triage` | 2AM mỗi ngày | Fix good-first-issues |
| `visual-bug-detection` | Mỗi PR | Chụp ảnh & phát hiện visual bugs |

### Secrets cần thiết (GitHub Settings > Secrets)
```
ANTHROPIC_API_KEY   = PROXY_USES_GOOGLE_AUTH
GITHUB_TOKEN        = (tự động bởi GitHub Actions)
SENTRY_AUTH_TOKEN   = (lấy từ sentry.io)
DATABASE_URL        = postgresql://user:pass@host/db
```

## 📊 Dashboard & Monitoring

### Proxy Dashboard
```
http://localhost:8080
```
- Theo dõi request/response
- Quản lý tài khoản Google
- Rate limit status

### Antigravity Scheduled Tasks
Cấu hình trong Antigravity IDE > Settings > Scheduled Tasks:
```
Cron: 0 2 * * *
Task: Phân loại 5 issues mới nhất có label 'good-first-issue' trên GitHub,
      tạo PR fix tự động cho từng issue
```

## 🔐 Bảo mật

> ⚠️ **Lưu ý**: Không commit file `.env` hoặc bất kỳ API key nào lên Git!

### Setup biến môi trường
```bash
cp .env.example .env
# Chỉnh sửa .env với thông tin thực của bạn
```

## 🆘 Troubleshooting

### Proxy không khởi động
```bash
acc status          # Kiểm tra trạng thái
acc stop && acc start  # Restart proxy
acc logs            # Xem logs
```

### Claude Code không kết nối
```bash
# Xác nhận proxy đang chạy
curl http://localhost:8080/health

# Test request
curl -X POST http://localhost:8080/v1/messages \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-5","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
```

### MCP server lỗi
```bash
# Test từng server
npx @modelcontextprotocol/server-filesystem --help
npx @modelcontextprotocol/server-github --help
```
