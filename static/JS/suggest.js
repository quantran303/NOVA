document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultForm');
    const resultDiv = document.getElementById('consultResult');
    const resultContent = document.getElementById('resultContent');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form gửi đi mặc định

        // 1. Thu thập dữ liệu
        const formData = {
            tuoi: form.querySelector('input[name="tuoi"]:checked')?.nextSibling.textContent.trim(),
            menh: form.querySelector('input[name="menh"]:checked')?.nextSibling.textContent.trim(),
            mucDich: getCheckedValues('mucDich'),
            loaiSP: getCheckedValues('loaiSP'),
            gia: getCheckedValues('gia'),
            uuTien: getCheckedValues('uuTien'),
            muaSam: getCheckedValues('muaSam'),
        };

        // 2. Hàm hỗ trợ lấy giá trị checkbox
        function getCheckedValues(name) {
            const checkedBoxes = Array.from(form.querySelectorAll(`input[name="${name}"]:checked`));
            return checkedBoxes.map(cb => cb.parentNode.textContent.trim());
        }

        // 3. Logic Tư vấn Cơ bản (Ví dụ)
        let suggestion = [];

        // Gợi ý dựa trên Mệnh (Câu 2)
        let menhText = formData.menh || "Chưa rõ";
        let stones = {
            "Kim": "Thạch anh Trắng, Kim cương, Đá mặt trăng. (Màu tương sinh: Vàng, Nâu; Màu tương hợp: Trắng, Xám)",
            "Mộc": "Ngọc Bích, Peridot, Emerald. (Màu tương sinh: Đen, Xanh dương; Màu tương hợp: Xanh lá)",
            "Thủy": "Sapphire, Aquamarine, Topaz Xanh. (Màu tương sinh: Trắng, Xám; Màu tương hợp: Đen, Xanh dương)",
            "Hỏa": "Ruby, Amethyst, Garnet. (Màu tương sinh: Xanh lá; Màu tương hợp: Đỏ, Hồng, Tím)",
            "Thổ": "Citrine, Thạch anh Vàng, Hổ Phách. (Màu tương sinh: Đỏ, Hồng, Tím; Màu tương hợp: Vàng, Nâu)",
            "Tôi không biết": "Vui lòng chọn mệnh hoặc để chúng tôi tư vấn loại đá đa dụng như Thạch anh Tím hoặc Thạch anh Hồng."
        };
        suggestion.push(`<p>✅ Mệnh của bạn (${menhText}): Gợi ý các loại đá/màu sắc phù hợp: ${stones[formData.menh] || stones["Tôi không biết"]}</p>`);

        // Gợi ý dựa trên Mục đích (Câu 3)
        if (formData.mucDich.includes('Thu hút tài lộc – May mắn')) {
            suggestion.push(`<p>💰 Mục đích Tài Lộc: Bạn nên ưu tiên các vật phẩm như Tỳ Hưu, quả cầu Thạch anh Vàng/Citrine, hoặc vòng tay Đá Mắt Hổ.</p>`);
        }
        if (formData.mucDich.includes('Bình an – Hộ thân')) {
            suggestion.push(`<p>🛡️ Mục đích Bình An: Khuyên dùng các vật phẩm chế tác từ **Ngọc Bích**, **Thạch anh Trắng**, hoặc tượng **Quan Âm/Phật Di Lặc**.</p>`);
        }

        // Gợi ý dựa trên Loại sản phẩm (Câu 4)
        if (formData.loaiSP.includes('Chưa rõ')) {
            let suggestProduct = 'Vòng tay phong thủy';
            if (formData.mucDich.includes('Trưng bày – Trang trí không gian')) {
                suggestProduct = 'Quả cầu phong thủy hoặc Đá năng lượng dạng thô';
            }
            suggestion.push(`<p>❓Gợi ý Sản phẩm: Dựa trên mục đích, chúng tôi gợi ý bạn nên xem xét **${suggestProduct}**.</p>`);
        }

        // 4. Tổng hợp và hiển thị
        let summary = `
            <div class="mb-4">
                <p class="font-bold text-lg text-theme-secondary">Dữ liệu bạn đã chọn:</p>
                <ul class="list-disc list-inside ml-4 text-sm text-gray-600">
                    <li>Mục đích: ${formData.mucDich.join(', ') || 'Không rõ'}</li>
                    <li>Loại SP: ${formData.loaiSP.join(', ') || 'Không rõ'}</li>
                    <li>Mức giá: ${formData.gia.join(', ') || 'Không rõ'}</li>
                </ul>
            </div>
            ${suggestion.join('')}
            <div class="mt-6 p-4 bg-gray-100 rounded-lg">
                <p class="font-bold text-red-600">LƯU Ý:</p>
                <p class="text-sm">Đây chỉ là gợi ý cơ bản. Vui lòng liên hệ (mục 📶) hoặc tìm chuyên gia tại khu du lịch để có tư vấn chi tiết và chính xác nhất theo Ngũ Hành, tuổi, và nhu cầu cụ thể của bạn.</p>
            </div>
        `;

        resultContent.innerHTML = summary;
        resultDiv.classList.remove('hidden');
        
        // Cuộn tới kết quả
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});