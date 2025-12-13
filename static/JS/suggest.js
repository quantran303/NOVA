document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultForm');
    const resultDiv = document.getElementById('consultResult');
    const resultContent = document.getElementById('resultContent');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form gửi đi mặc định

        // 1. Thu thập dữ liệu
        const formData = {
            tuoi: form.querySelector('input[name="tuoi"]:checked')?.nextSibling.textContent.trim(),
            menh: form.querySelector('input[name="menh"]:checked')?.value.trim(), // Lấy value (Kim, Mộc, Thủy, Hỏa, Thổ)
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

        // 3. Logic Tư vấn Cải tiến
        let suggestion = [];

        // Dữ liệu Ngũ Hành
        let menhData = {
            "Kim": {
                text: "Kim (Kim loại)",
                sinh: "Thổ (Đất sinh Kim)",
                hop: "Kim",
                sinhColors: "Vàng, Nâu Đất",
                hopColors: "Trắng, Xám, Ghi",
                stones: "Thạch anh Trắng, Kim cương, Đá Mặt Trăng, Thạch anh Tóc Vàng (Tương sinh)",
                avoid: "Đỏ, Hồng, Tím (Hỏa khắc Kim); Xanh lá (Kim khắc Mộc)"
            },
            "Mộc": {
                text: "Mộc (Cây cối)",
                sinh: "Thủy (Nước nuôi Mộc)",
                hop: "Mộc",
                sinhColors: "Đen, Xanh dương, Xanh nước biển",
                hopColors: "Xanh lá cây",
                stones: "Ngọc Bích, Peridot, Emerald, Thạch anh Xanh (Tương sinh)",
                avoid: "Trắng, Xám, Ghi (Kim khắc Mộc); Vàng, Nâu Đất (Mộc khắc Thổ)"
            },
            "Thủy": {
                text: "Thủy (Nước)",
                sinh: "Kim (Kim loại tan chảy tạo Thủy)",
                hop: "Thủy",
                sinhColors: "Trắng, Xám, Ghi",
                hopColors: "Đen, Xanh dương, Xanh nước biển",
                stones: "Sapphire, Aquamarine, Topaz Xanh, Đá Mặt Trăng (Tương sinh)",
                avoid: "Vàng, Nâu Đất (Thổ khắc Thủy); Đỏ, Hồng, Tím (Thủy khắc Hỏa)"
            },
            "Hỏa": {
                text: "Hỏa (Lửa)",
                sinh: "Mộc (Cây khô cháy tạo Hỏa)",
                hop: "Hỏa",
                sinhColors: "Xanh lá cây",
                hopColors: "Đỏ, Hồng, Tím",
                stones: "Ruby, Amethyst, Garnet, Thạch anh Hồng/Tím, Ngọc Bích (Tương sinh)",
                avoid: "Đen, Xanh dương (Thủy khắc Hỏa); Trắng, Xám, Ghi (Hỏa khắc Kim)"
            },
            "Thổ": {
                text: "Thổ (Đất)",
                sinh: "Hỏa (Lửa đốt tạo ra tro, thành Thổ)",
                hop: "Thổ",
                sinhColors: "Đỏ, Hồng, Tím",
                hopColors: "Vàng, Nâu Đất",
                stones: "Citrine, Thạch anh Vàng, Hổ Phách, Đá Mắt Hổ (Tương hợp)",
                avoid: "Xanh lá cây (Mộc khắc Thổ); Đen, Xanh dương (Thổ khắc Thủy)"
            },
            "KhongBiet": {
                text: "Chưa rõ Mệnh",
                stones: "Thạch anh Tím (tăng trí tuệ), Thạch anh Hồng (tình yêu/hòa hợp) là các loại đá đa dụng, phù hợp với hầu hết mọi người."
            }
        };

        let currentMenh = menhData[formData.menh] || menhData["KhongBiet"];
        
        // 3a. Gợi ý dựa trên Mệnh (Câu 2)
        if (formData.menh && formData.menh !== "KhongBiet") {
            suggestion.push(`
                <p>✅ Mệnh của bạn: ${currentMenh.text}</p>
                <ul class="list-disc list-inside ml-4">
                    <li>Màu Tương Sinh (tốt nhất - ${currentMenh.sinh}): ${currentMenh.sinhColors}. *Ưu tiên các loại đá có màu này.*</li>
                    <li>Màu Tương Hợp (tốt): ${currentMenh.hopColors}.</li>
                    <li>Loại đá tiêu biểu: ${currentMenh.stones}</li>
                    <li>Màu nên tránh: ${currentMenh.avoid}</li>
                </ul>
            `);
        } else {
             suggestion.push(`<p>✅ **Gợi ý chung cho bạn (Chưa rõ Mệnh):** ${currentMenh.stones}</p>`);
        }

        // 3b. Gợi ý dựa trên Mục đích (Câu 3)
        let purposeSuggestions = [];
        if (formData.mucDich.includes('Thu hút tài lộc – May mắn')) {
            purposeSuggestions.push(`💰 Tài Lộc: Ưu tiên Tỳ Hưu, Thiềm Thừ, Quả cầu Thạch anh Vàng/Citrine, Vòng tay Đá Mắt Hổ. (Đặc biệt tốt nếu bạn mệnh Thổ/Kim)`);
        }
        if (formData.mucDich.includes('Bình an – Hộ thân')) {
            purposeSuggestions.push(`🛡️ Bình An: Khuyên dùng vật phẩm chế tác từ Ngọc Bích, Thạch anh Trắng (giúp thanh lọc), Tượng Quan Âm/Phật Di Lặc.`);
        }
        if (formData.mucDich.includes('Sức khỏe – Giảm căng thẳng')) {
            purposeSuggestions.push(`🧘 Sức Khỏe: Thạch anh Tím (giảm stress), Đá Tourmaline, Đá Cẩm Thạch. Nên dùng dạng đá năng lượng thô đặt cạnh giường.`);
        }
        if (formData.mucDich.includes('Cân bằng năng lượng – Thiền/Trị liệu')) {
             purposeSuggestions.push(`✨ Cân Bằng: Thạch anh Trắng/Tím/Hồng, Đá Selenite. Nên chọn dạng quả cầu hoặc đá thô để hấp thụ năng lượng tốt hơn.`);
        }

        if (purposeSuggestions.length > 0) {
            suggestion.push(`
                <h4 class="font-semibold text-lg mt-4">🎯 Gợi ý theo Mục đích:</h4>
                <ul class="list-disc list-inside ml-4">
                    ${purposeSuggestions.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `);
        } else {
            suggestion.push(`<p>🎯 Mục đích của bạn: Vui lòng chọn mục đích để có gợi ý loại đá/vật phẩm cụ thể hơn.</p>`);
        }

        // 3c. Gợi ý dựa trên Loại sản phẩm (Câu 4) và Ưu tiên (Câu 6)
        let productAction = '';
        if (formData.loaiSP.includes('Chưa rõ')) {
            let suggestProduct = 'Vòng tay phong thủy (dễ mang theo, tiện dụng)';
            if (formData.mucDich.includes('Trưng bày – Trang trí không gian')) {
                suggestProduct = 'Quả cầu phong thủy hoặc Đá năng lượng dạng thô';
            }
            productAction = `❓Gợi ý Sản phẩm: Dựa trên mục đích, chúng tôi gợi ý bạn nên xem xét ${suggestProduct} để trải nghiệm trước.`;
        }
        if (formData.uuTien.includes('Được khắc chế tác thủ công tại địa phương') || formData.uuTien.includes('Có gợi ý từ chuyên gia')) {
            productAction += `<p>⚒️ Ưu tiên của bạn là chế tác thủ công/Chuyên gia. Bạn nên ghé thăm cửa hàng Tài Thảo (chuyên điêu khắc) hoặc Thái Thành (đa dạng phong thủy) để xem trực tiếp. (Xem mục Cửa hàng bên dưới)</p>`;
        }
        if (productAction) {
            suggestion.push(`<div class="mt-4 border-t pt-3">${productAction}</div>`);
        }


        // 4. Tổng hợp và hiển thị
        let summary = `
            <div class="mb-4">
                <p class="font-bold text-lg text-theme-secondary">Dữ liệu bạn đã chọn:</p>
                <ul class="list-disc list-inside ml-4 text-sm text-gray-600">
                    <li>Mệnh: ${currentMenh.text}</li>
                    <li>Mục đích: ${formData.mucDich.join(', ') || 'Không rõ'}</li>
                    <li>Loại SP: ${formData.loaiSP.join(', ') || 'Không rõ'}</li>
                    <li>Mức giá: ${formData.gia.join(', ') || 'Không rõ'}</li>
                </ul>
            </div>
            ${suggestion.join('')}
            <div class="mt-6 p-4 bg-gray-100 rounded-lg">
                <p class="font-bold text-red-600">LƯU Ý QUAN TRỌNG:</p>
                <p class="text-sm">Đây là gợi ý áp dụng theo quy luật Ngũ Hành cơ bản (Tương Sinh - Tương Hợp). Phong thủy chính xác cần dựa vào **Tuổi (Thiên Can, Địa Chi) và Cung Mệnh**. Vui lòng liên hệ (mục 📶) hoặc tìm chuyên gia tại khu du lịch để được tư vấn CHI TIẾT và CHÍNH XÁC nhất!</p>
            </div>
        `;

        resultContent.innerHTML = summary;
        resultDiv.classList.remove('hidden');
        
        // Cuộn tới kết quả
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});