/**
 * storage.js - Quản lý lưu trữ giao dịch bằng localStorage
 * Hợp đồng chung:
 * - Đối tượng toàn cục: Storage
 * - Khóa localStorage: 'expense_tracker_v1'
 * - Cấu trúc 1 giao dịch: { id: string, type: "income" | "expense", amount: number, category: string, note: string, date: "YYYY-MM-DD" }
 * - API:
 *   + Storage.getAll(): trả về mảng giao dịch (mảng rỗng nếu chưa có dữ liệu hoặc JSON hỏng)
 *   + Storage.add(tx): thêm giao dịch, tự sinh id, trả về giao dịch đã lưu
 *   + Storage.remove(id): xóa giao dịch theo id
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'expense_tracker_v1';

  const StorageAPI = {
    /**
     * Lấy toàn bộ danh sách giao dịch từ localStorage
     * @returns {Array} Mảng các giao dịch, trả về mảng rỗng nếu chưa có dữ liệu hoặc JSON hỏng
     */
    getAll: function () {
      try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        if (!rawData) {
          return [];
        }
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    },

    /**
     * Thêm một giao dịch mới vào localStorage
     * @param {Object} tx - Giao dịch cần thêm { type, amount, category, note, date }
     * @returns {Object} Giao dịch đã được lưu kèm id
     */
    add: function (tx) {
      const transactions = this.getAll();

      // Tự sinh id dạng chuỗi duy nhất nếu chưa có
      const generatedId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
      const newTx = Object.assign({}, tx, {
        id: tx && tx.id ? String(tx.id) : generatedId,
        type: tx && tx.type === 'income' ? 'income' : 'expense',
        amount: Number(tx && tx.amount) || 0,
        category: tx && tx.category ? String(tx.category) : 'Khác',
        note: tx && tx.note ? String(tx.note) : '',
        date: tx && tx.date ? String(tx.date) : new Date().toISOString().split('T')[0]
      });

      transactions.push(newTx);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      } catch (error) {
        // Bắt lỗi an toàn nếu xảy ra lỗi ghi localStorage (ví dụ: quota exceeded)
      }

      return newTx;
    },

    /**
     * Xóa một giao dịch theo id
     * @param {string} id - ID của giao dịch cần xóa
     * @returns {Array} Danh sách giao dịch còn lại sau khi xóa
     */
    remove: function (id) {
      const transactions = this.getAll();
      const filtered = transactions.filter(function (item) {
        return String(item.id) !== String(id);
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (error) {
        // Bắt lỗi an toàn nếu xảy ra lỗi ghi localStorage
      }

      return filtered;
    }
  };

  // Gắn các hàm vào đối tượng toàn cục Storage (trên window hoặc globalThis)
  const globalObj = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this);

  if (globalObj) {
    if (!globalObj.Storage) {
      globalObj.Storage = StorageAPI;
    } else {
      try {
        globalObj.Storage.getAll = StorageAPI.getAll.bind(StorageAPI);
        globalObj.Storage.add = StorageAPI.add.bind(StorageAPI);
        globalObj.Storage.remove = StorageAPI.remove.bind(StorageAPI);
      } catch (e) {
        globalObj.Storage = StorageAPI;
      }
    }
  }
})();
