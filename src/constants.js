/**
 * アプリケーション全体で使用する定数
 */

// Supabase設定
export const CONFIG = {
    TABLE_NAME: 'firewood_locations',
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    DEFAULT_CENTER: [36.5, 138.0],
    DEFAULT_ZOOM: 6,
    REPORT_THRESHOLD: 20
};

// マップ設定
export const MAP_CONFIG = {
    TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '© OpenStreetMap contributors | <b>App By ゆきぬ</b>',
    MAX_ZOOM: 19,
    CLUSTER_RADIUS: 40,
    CLUSTERING_ZOOM_THRESHOLD: 16
};

// 位置情報設定
export const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// UI設定
export const UI_CONFIG = {
    TOAST_DURATION: 3000,
    INITIAL_ZOOM_WITH_LOCATION: 12,
    LOCATE_ZOOM: 15
};

// カラー定数（CSS変数と対応）
export const COLORS = {
    PRIMARY: '#8B4513',
    PRIMARY_DARK: '#6B3410',
    SECONDARY: '#D2691E',
    SUCCESS: '#4CAF50',
    DANGER: '#f44336',
    WARNING: '#ff9800',
    INFO: '#2196F3'
};

// アイコン設定
export const ICONS = {
    MARKER: '<i class="fas fa-fire"></i>',
    CURRENT_LOCATION_STYLE: 'background: #2196F3; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);'
};
