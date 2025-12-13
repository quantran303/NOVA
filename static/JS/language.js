// translate_utils.js

/**
 * Khởi tạo Google Translate Element.
 * Đây là hàm callback được gọi sau khi script của Google Translate được tải.
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
            pageLanguage: 'vi', // Ngôn ngữ gốc của trang (ví dụ: Tiếng Việt)
            autoDisplay: false // Không hiển thị giao diện mặc định
        },
        'google_translate_element' // ID của phần tử mà bạn muốn đặt widget vào
    );
}

/**
 * Thay đổi ngôn ngữ hiển thị của Google Translate.
 * @param {string} lang Mã ngôn ngữ (ví dụ: 'en' cho Tiếng Anh, 'fr' cho Tiếng Pháp).
 */
function changeLanguage(lang) {
    if (!lang) return;

    // Tìm phần tử <select> được tạo bởi Google Translate
    const select = document.querySelector('.goog-te-combo');

    if (!select) {
        console.warn("Google Translate chưa được tải hoặc phần tử select chưa có.");
        return;
    }

    // Thiết lập giá trị ngôn ngữ mới và kích hoạt sự kiện 'change'
    select.value = lang;
    select.dispatchEvent(new Event('change'));
}