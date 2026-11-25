/**
 * app.js - Xử lý giao diện và tính toán ứng dụng Quản lý Chi tiêu Cá nhân
 * Tuân thủ Hợp đồng chung:
 * - Các ID bắt buộc: tx-form, tx-type, tx-amount, tx-category, tx-note, tx-date, tx-list, total-income, total-expense, balance
 * - API: Storage.getAll(), Storage.add(tx), Storage.remove(id)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Tham chiếu các phần tử DOM
  const form = document.getElementById('tx-form');
  const typeInput = document.getElementById('tx-type');
  const amountInput = document.getElementById('tx-amount');
  const categoryInput = document.getElementById('tx-category');
  const noteInput = document.getElementById('tx-note');
  const dateInput = document.getElementById('tx-date');

  const txList = document.getElementById('tx-list');
  const totalIncomeEl = document.getElementById('total-income');
  const totalExpenseEl = document.getElementById('total-expense');
  const balanceEl = document.getElementById('balance');

  // Đặt ngày mặc định là hôm nay nếu ô ngày trống
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  /**
   * Định dạng số tiền theo định dạng tiền tệ Việt Nam (ví dụ: 1.250.000 ₫)
   * @param {number} amount
   * @returns {string}
   */
  function formatCurrency(amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
  }

  /**
   * Escape HTML để tránh lỗi bảo mật XSS
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Tính toán và hiển thị tổng thu, tổng chi và số dư
   * @param {Array} transactions
   */
  function updateSummary(transactions) {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (tx) {
      const amount = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        totalIncome += amount;
      } else if (tx.type === 'expense') {
        totalExpense += amount;
      }
    });

    const balance = totalIncome - totalExpense;

    if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(totalIncome);
    if (totalExpenseEl) totalExpenseEl.textContent = formatCurrency(totalExpense);
    if (balanceEl) balanceEl.textContent = formatCurrency(balance);
  }

  /**
   * Vẽ lại danh sách giao dịch trong bảng tx-list
   * @param {Array} transactions
   */
  function renderTable(transactions) {
    if (!txList) return;

    txList.innerHTML = '';

    if (!transactions || transactions.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">Chưa có giao dịch nào</td>';
      txList.appendChild(emptyRow);
      return;
    }

    // Hiển thị giao dịch mới nhất lên đầu
    const sorted = [...transactions].reverse();

    sorted.forEach(function (tx) {
      const row = document.createElement('tr');

      const isIncome = tx.type === 'income';
      const typeBadgeClass = isIncome ? 'badge-income' : 'badge-expense';
      const typeText = isIncome ? 'Thu' : 'Chi';
      const amountClass = isIncome ? 'amount-income' : 'amount-expense';
      const amountPrefix = isIncome ? '+' : '-';

      row.innerHTML = `
        <td>${escapeHtml(tx.date || '')}</td>
        <td><span class="badge ${typeBadgeClass}">${typeText}</span></td>
        <td>${escapeHtml(tx.category || '')}</td>
        <td>${escapeHtml(tx.note || '')}</td>
        <td class="${amountClass}">${amountPrefix}${formatCurrency(Number(tx.amount) || 0)}</td>
        <td>
          <button type="button" class="btn-delete" data-id="${escapeHtml(tx.id)}">Xóa</button>
        </td>
      `;

      txList.appendChild(row);
    });
  }

  /**
   * Hàm render toàn bộ dữ liệu (bảng danh sách và tổng hợp)
   */
  function renderApp() {
    const transactions = Storage.getAll();
    renderTable(transactions);
    updateSummary(transactions);
  }

  // 2. Lắng nghe sự kiện gửi form
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const type = typeInput ? typeInput.value : 'expense';
      const amount = amountInput ? parseFloat(amountInput.value) : 0;
      const category = categoryInput ? categoryInput.value : 'Khác';
      const note = noteInput ? noteInput.value.trim() : '';
      const date = dateInput ? dateInput.value : '';

      // Kiểm tra tính hợp lệ: số tiền > 0, có ngày
      if (isNaN(amount) || amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ lớn hơn 0!');
        if (amountInput) amountInput.focus();
        return;
      }

      if (!date) {
        alert('Vui lòng chọn ngày giao dịch!');
        if (dateInput) dateInput.focus();
        return;
      }

      const newTx = {
        type: type,
        amount: amount,
        category: category,
        note: note,
        date: date
      };

      Storage.add(newTx);

      // Đặt lại ô nhập số tiền và ghi chú
      if (amountInput) amountInput.value = '';
      if (noteInput) noteInput.value = '';

      // Vẽ lại giao diện
      renderApp();
    });
  }

  // 3. Lắng nghe sự kiện click nút Xóa trên bảng tx-list (Event Delegation)
  if (txList) {
    txList.addEventListener('click', function (event) {
      const deleteBtn = event.target.closest('.btn-delete');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        if (id) {
          Storage.remove(id);
          renderApp();
        }
      }
    });
  }

  // 4. Tải và hiển thị dữ liệu có sẵn khi mở trang
  renderApp();
});
