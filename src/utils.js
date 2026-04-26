/**
 * ユーティリティ関数集
 */

import { UI_CONFIG } from './constants.js';

/**
 * HTMLエスケープ（XSS防止）
 * @param {*} str - エスケープする値
 * @returns {string} エスケープされた文字列
 */
export function escHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

/**
 * 座標で場所をグループ化
 * @param {Array} locations - 場所の配列
 * @returns {Object} 座標をキーとしたグループ化されたオブジェクト
 */
export function groupLocationsByCoords(locations) {
    const groups = {};
    locations.forEach(loc => {
        const key = `${loc.latitude},${loc.longitude}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(loc);
    });
    return groups;
}

/**
 * ポップアップコンテンツを作成
 * @param {Array} locations - 同じ座標の場所の配列
 * @returns {string} HTMLコンテンツ
 */
export function createPopupContent(locations) {
    let html = '<div style="max-height: 300px; overflow-y: auto; min-width: 250px;">';

    // 場所名とボタンを先に表示（最初の場所のみ）
    if (locations.length > 0) {
        const firstLoc = locations[0];
        const safeNameAttr = escHtml(JSON.stringify(firstLoc.location_name || ''));
        html += `
            <div style="text-align: center; margin-bottom: 0.8rem; padding-bottom: 0.8rem; border-bottom: 2px solid #8B4513;">
                <h3 style="margin: 0 0 0.6rem 0; color: #8B4513; font-size: 1.1rem; font-weight: bold;">${escHtml(firstLoc.location_name) || '名称未設定'}</h3>
                <button
                    onclick="window.openAddToLocationModal(${firstLoc.latitude}, ${firstLoc.longitude}, ${safeNameAttr})"
                    style="padding: 0.3rem 0.6rem; background-color: #e26d37; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">
                    <i class="fas fa-plus"></i> 追加登録
                </button>
            </div>
        `;
    }

    // 薪の情報を表示
    locations.forEach((loc, index) => {
        const noteText = loc.description || loc.notes;
        html += `
            <div style="${index > 0 ? 'margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc;' : ''}">
                <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>🪵 種類:</strong> ${escHtml(loc.wood_type) || '未設定'}</p>
                <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>💰 価格:</strong> ${escHtml(loc.price) || '未設定'}円${loc.amount ? ' / ' + escHtml(loc.amount) : ''}</p>

                ${noteText
                    ? `<p style="margin: 0.2rem 0; font-size: 0.85rem; color: #666;"><strong>📝 詳細:</strong> ${escHtml(noteText)}</p>`
                    : ''
                }

                ${loc.sales_period
                    ? `<p style="margin: 0.2rem 0; font-size: 0.85rem;"><strong>📅 販売時期:</strong> ${escHtml(loc.sales_period)}</p>`
                    : ''
                }

                ${loc.contact_info
                    ? `<p style="margin: 0.2rem 0; font-size: 0.85rem;"><strong>📞 連絡先:</strong> ${escHtml(loc.contact_info)}</p>`
                    : ''
                }

                <button
                    onclick="window.showDetail('${escHtml(loc.id)}')"
                    style="margin-top: 0.4rem; padding: 0.25rem 0.5rem; background-color: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.7rem; width: 100%;">
                    <i class="fas fa-info-circle"></i> 詳細を見る
                </button>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

/**
 * 表示高さを設定（モバイル対応）
 */
export function setFillHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * トーストメッセージを表示
 * @param {string} message - 表示するメッセージ
 * @param {string} type - トーストのタイプ ('success', 'error', 'info')
 */
export function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, UI_CONFIG.TOAST_DURATION);
}

/**
 * ローディング表示
 */
export function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('active');
}

/**
 * ローディング非表示
 */
export function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('active');
}

/**
 * モーダルを開く
 * @param {string} modalId - モーダルのID
 */
export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

/**
 * モーダルを閉じる
 * @param {string} modalId - モーダルのID
 */
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

/**
 * フォームをリセット
 * @param {string} formId - フォームのID
 */
export function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
}

/**
 * フィルターパネルを開閉
 */
export function toggleFilter() {
    const content = document.querySelector('.filter-content');
    if (content) content.classList.toggle('active');
}

/**
 * 住所検索結果をクリア
 */
export function clearSearchResults() {
    const resultsList = document.getElementById('searchResults');
    if (resultsList) {
        resultsList.innerHTML = '';
        resultsList.style.display = 'none';
    }
}

/**
 * 検索結果項目をクリックした際の処理
 * @param {number} lat - 緯度
 * @param {number} lon - 経度
 * @param {string} displayName - 表示名
 */
export function selectSearchResult(lat, lon, displayName) {
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lon;
    document.getElementById('addressInput').value = displayName;
    clearSearchResults();
    showToast('住所を選択しました', 'success');
}

/**
 * 要素にイベントリスナーを一括設定
 * @param {Object} listeners - {id: handlerFunction} の形式
 */
export function setupEventListeners(listeners) {
    Object.entries(listeners).forEach(([id, handler]) => {
        const el = document.getElementById(id);
        if (el) {
            const event = (id.includes('Form')) ? 'submit' : 'click';
            el.addEventListener(event, handler);
        }
    });
}
