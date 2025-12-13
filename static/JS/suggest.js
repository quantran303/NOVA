document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultForm');
    const resultDiv = document.getElementById('consultResult');
    const resultContent = document.getElementById('resultContent');

    // Bảng tra cứu Mệnh, Màu Sắc Tương Sinh và Màu Sắc Tương Hợp CHUẨN NẠP ÂM (1940-2030)
    const menhLookup = {
        // [Năm]: { menh: 'X', sinhColors: 'Y', hopColors: 'Z' }
        1940: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1941: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1942: { menh: 'Mộc', sinhColors: 'Đen, Xanh dương', hopColors: 'Xanh lá cây' },
        1943: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1944: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Đen, Xanh dương, Đen' },
        1945: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Đen, Xanh dương, Đen' },
        1946: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1947: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1948: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1949: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1950: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1951: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1952: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1953: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1954: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1955: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1956: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1957: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1958: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1959: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1960: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1961: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1962: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1963: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1964: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1965: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1966: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1967: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1968: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1969: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1970: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1971: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1972: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1973: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1974: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1975: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1976: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1977: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1978: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1979: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1980: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1981: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1982: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1983: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1984: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1985: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1986: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1987: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1988: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1989: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        1990: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1991: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1992: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1993: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        1994: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1995: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        1996: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1997: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        1998: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        1999: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2000: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2001: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2002: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2003: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2004: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2005: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2006: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2007: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2008: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2009: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2010: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2011: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2012: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2013: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2014: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2015: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2016: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2017: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2018: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2019: { menh: 'Mộc', sinhColors: 'Đen, Xám, Xanh dương', hopColors: 'Xanh lá cây' },
        2020: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2021: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2022: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2023: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' },
        2024: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2025: { menh: 'Hỏa', sinhColors: 'Xanh lá cây', hopColors: 'Đỏ, Hồng, Cam, Tím' },
        2026: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2027: { menh: 'Thủy', sinhColors: 'Trắng, Xám', hopColors: 'Xanh dương, Đen' },
        2028: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2029: { menh: 'Thổ', sinhColors: 'Đỏ, Hồng, Cam, Tím', hopColors: 'Vàng, Nâu Đất' },
        2030: { menh: 'Kim', sinhColors: 'Vàng, Nâu Đất', hopColors: 'Trắng, Xám' }
    };

    // Hàm tra cứu Mệnh từ năm sinh
    function getMenhDataByYear(year) {
        if (year in menhLookup) {
            return menhLookup[year];
        }
        return null; 
    }
    
    // Khởi tạo các Menh Data cơ bản để phục vụ hiển thị chi tiết (bổ sung thông tin Tương Sinh/Tương Khắc)
    const baseMenhData = {
        "Kim": {
            text: "Kim (Kim loại)",
            sinh: "Thổ (Đất sinh Kim)",
            hop: "Kim",
            stones: "Thạch anh Trắng, Kim cương, Đá Mặt Trăng, Thạch anh Tóc Vàng (Tương sinh)",
            avoid: "Đỏ, Hồng, Tím (Hỏa khắc Kim); Xanh lá (Kim khắc Mộc)"
        },
        "Mộc": {
            text: "Mộc (Cây cối)",
            sinh: "Thủy (Nước nuôi Mộc)",
            hop: "Mộc",
            stones: "Ngọc Bích, Peridot, Emerald, Thạch anh Xanh (Tương sinh)",
            avoid: "Trắng, Xám, Ghi (Kim khắc Mộc); Vàng, Nâu Đất (Mộc khắc Thổ)"
        },
        "Thủy": {
            text: "Thủy (Nước)",
            sinh: "Kim (Kim loại tan chảy tạo Thủy)",
            hop: "Thủy",
            stones: "Sapphire, Aquamarine, Topaz Xanh, Đá Mặt Trăng (Tương sinh)",
            avoid: "Vàng, Nâu Đất (Thổ khắc Thủy); Đỏ, Hồng, Tím (Thủy khắc Hỏa)"
        },
        "Hỏa": {
            text: "Hỏa (Lửa)",
            sinh: "Mộc (Cây khô cháy tạo Hỏa)",
            hop: "Hỏa",
            stones: "Ruby, Amethyst, Garnet, Thạch anh Hồng/Tím, Ngọc Bích (Tương sinh)",
            avoid: "Đen, Xanh dương (Thủy khắc Hỏa); Trắng, Xám, Ghi (Hỏa khắc Kim)"
        },
        "Thổ": {
            text: "Thổ (Đất)",
            sinh: "Hỏa (Lửa đốt tạo ra tro, thành Thổ)",
            hop: "Thổ",
            stones: "Citrine, Thạch anh Vàng, Hổ Phách, Đá Mắt Hổ (Tương hợp)",
            avoid: "Xanh lá cây (Mộc khắc Thổ); Đen, Xanh dương (Thổ khắc Thủy)"
        }
    };

    // Hàm hỗ trợ lấy giá trị checkbox
    function getCheckedValues(name) {
        const checkedBoxes = Array.from(form.querySelectorAll(`input[name="${name}"]:checked`));
        return checkedBoxes.map(cb => cb.parentNode.textContent.trim());
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form gửi đi mặc định

        // Lấy và xử lý Năm Sinh một cách chắc chắn nhất
        const namSinhInput = form.querySelector('input[name="namSinh"]');
        let namSinhValue = null;

        if (namSinhInput && namSinhInput.value.trim()) {
            // Chuyển đổi sang số nguyên, dùng base 10
            let tempValue = parseInt(namSinhInput.value.trim(), 10); 
            // Kiểm tra: Phải là số và nằm trong phạm vi cho phép của input type="number" (1940-2030)
            if (!isNaN(tempValue) && tempValue >= 1940 && tempValue <= 2030) {
                namSinhValue = tempValue;
            }
        }
        
        // 1. Thu thập dữ liệu
        const formData = {
            // Sử dụng giá trị đã kiểm tra ở trên
            namSinh: namSinhValue, 
            mucDich: getCheckedValues('mucDich'), // Câu 2
            loaiSP: getCheckedValues('loaiSP'),   // Câu 3
            gia: getCheckedValues('gia'),         // Câu 4
            uuTien: getCheckedValues('uuTien'),   // Câu 5
            muaSam: getCheckedValues('muaSam'),   // Câu 6
        };
        
        let suggestion = [];
        let finalMenh = "KhongBiet"; 
        let currentMenhData = {};
        let menhSource = "Chưa có dữ liệu";

        // LOGIC DỰ ĐOÁN MỆNH TỪ NĂM SINH
        if (formData.namSinh) {
            const predictedData = getMenhDataByYear(formData.namSinh);
            
            if (predictedData) {
                finalMenh = predictedData.menh;
                menhSource = `dự đoán từ năm sinh (${formData.namSinh}) - Dựa trên Bảng Nạp Âm chuẩn.`;
                
                // Ghép dữ liệu tra cứu màu sắc vào dữ liệu cơ bản
                currentMenhData = {
                    ...baseMenhData[finalMenh],
                    sinhColors: predictedData.sinhColors, 
                    hopColors: predictedData.hopColors,
                    menh: finalMenh
                };
                
                suggestion.push(`
                    <div class="p-3 bg-yellow-50 border-l-4 border-yellow-500 mt-4">
                        <p class="font-bold text-yellow-800">✨ Hệ thống đã tra cứu Mệnh cho bạn:</p>
                        <p class="text-sm">Dựa trên Năm Sinh **${formData.namSinh}**, Niên Mệnh (Mệnh theo năm sinh) của bạn là **${currentMenhData.text}**.</p>
                        <p class="text-sm">Chúng tôi sẽ dùng Mệnh **${finalMenh}** để tiếp tục tư vấn.</p>
                    </div>
                `);

            } else {
                 menhSource = "Năm sinh nằm ngoài phạm vi tra cứu (1940-2030)";
                 finalMenh = "KhongBiet";
                 currentMenhData = {
                    text: "Chưa rõ Mệnh (Gợi ý chung)",
                    stones: "Thạch anh Tím (tăng trí tuệ), Thạch anh Hồng (tình yêu/hòa hợp) là các loại đá đa dụng, phù hợp với hầu hết mọi người."
                 };
                 suggestion.push(`
                    <div class="p-3 bg-red-50 border-l-4 border-red-500 mt-4">
                        <p class="font-bold text-red-800">⚠️ Không thể tra cứu Mệnh:</p>
                        <p class="text-sm">Năm sinh bạn nhập nằm ngoài phạm vi tra cứu chính xác (1940-2030). Chúng tôi sẽ đưa ra gợi ý chung.</p>
                    </div>
                `);
            }
        } else {
            // Nếu người dùng không nhập năm sinh hoặc nhập không hợp lệ
            currentMenhData = {
                text: "Chưa rõ Mệnh (Gợi ý chung)",
                stones: "Thạch anh Tím (tăng trí tuệ), Thạch anh Hồng (tình yêu/hòa hợp) là các loại đá đa dụng, phù hợp với hầu hết mọi người."
            };
        }
        
        // 3a. Gợi ý dựa trên Mệnh
        if (finalMenh && finalMenh !== "KhongBiet") {
            suggestion.push(`
                <h4 class="font-semibold text-lg mt-4">✨ Gợi ý theo Mệnh:</h4>
                <p>✅ Mệnh được sử dụng: **${currentMenhData.text}**</p>
                <ul class="list-disc list-inside ml-4">
                    <li>Màu Tương Sinh (tốt nhất - ${currentMenhData.sinh}): **${currentMenhData.sinhColors}**. *Ưu tiên các loại đá có màu này.*</li>
                    <li>Màu Tương Hợp (tốt): **${currentMenhData.hopColors}**.</li>
                    <li>Loại đá tiêu biểu: ${currentMenhData.stones}</li>
                    <li>Màu nên tránh: ${currentMenhData.avoid}</li>
                </ul>
            `);
        } else {
             suggestion.push(`<h4 class="font-semibold text-lg mt-4">✨ Gợi ý theo Mệnh:</h4><p>✅ **Gợi ý chung:** **${currentMenhData.text}**. ${currentMenhData.stones}</p>`);
        }

        // 3b. Gợi ý dựa trên Mục đích (Câu 2)
        let purposeSuggestions = [];
        if (formData.mucDich.includes('Bình an – Hộ thân')) {
            purposeSuggestions.push(`🛡️ Bình An: Khuyên dùng vật phẩm chế tác từ Ngọc Bích, Thạch anh Trắng (giúp thanh lọc), Tượng Quan Âm/Phật Di Lặc.`);
        }
        if (formData.mucDich.includes('Thu hút tài lộc – May mắn')) {
            purposeSuggestions.push(`💰 Tài Lộc: Ưu tiên Tỳ Hưu, Thiềm Thừ, Quả cầu Thạch anh Vàng/Citrine, Vòng tay Đá Mắt Hổ. (Đặc biệt tốt nếu bạn mệnh Thổ/Kim)`);
        }
        if (formData.mucDich.includes('Cân bằng năng lượng – Thiền/Trị liệu')) {
             purposeSuggestions.push(`✨ Cân Bằng: Thạch anh Trắng/Tím/Hồng, Đá Selenite. Nên chọn dạng quả cầu hoặc đá thô để hấp thụ năng lượng tốt hơn.`);
        }
        if (formData.mucDich.includes('Sức khỏe – Giảm căng thẳng')) {
            purposeSuggestions.push(`🧘 Sức Khỏe: Thạch anh Tím (giảm stress), Đá Tourmaline, Đá Cẩm Thạch. Nên dùng dạng đá năng lượng thô đặt cạnh giường.`);
        }
        
        if (purposeSuggestions.length > 0) {
            suggestion.push(`
                <h4 class="font-semibold text-lg mt-4">🎯 Gợi ý theo Mục đích:</h4>
                <ul class="list-disc list-inside ml-4">
                    ${purposeSuggestions.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `);
        } else {
            suggestion.push(`<h4 class="font-semibold text-lg mt-4">🎯 Gợi ý theo Mục đích:</h4><p>Vui lòng chọn mục đích để có gợi ý loại đá/vật phẩm cụ thể hơn.</p>`);
        }

        // 3c. Gợi ý dựa trên Loại sản phẩm (Câu 3) và Ưu tiên (Câu 5)
        let productAction = '';
        if (formData.loaiSP.includes('Chưa rõ')) {
            let suggestProduct = 'Vòng tay phong thủy (dễ mang theo, tiện dụng)';
            if (formData.mucDich.includes('Trưng bày – Trang trí không gian')) {
                suggestProduct = 'Quả cầu phong thủy hoặc Đá năng lượng dạng thô';
            }
            productAction = `❓Gợi ý Sản phẩm: Dựa trên mục đích, chúng tôi gợi ý bạn nên xem xét **${suggestProduct}** để trải nghiệm trước.`;
        }
        if (formData.uuTien.includes('Được khắc chế tác thủ công tại địa phương') || formData.uuTien.includes('Có gợi ý từ chuyên gia')) {
            productAction += `<p>⚒️ Ưu tiên của bạn là **Chế tác thủ công/Chuyên gia**. Bạn nên ghé thăm **Cửa hàng Tài Thảo** (chuyên điêu khắc) hoặc **Thái Thành** (đa dạng phong thủy) để xem trực tiếp. (Xem mục Cửa hàng bên dưới)</p>`;
        }
        if (productAction) {
            suggestion.push(`<div class="mt-4 border-t pt-3">${productAction}</div>`);
        }


        // 4. Tổng hợp và hiển thị
        let summary = `
            <div class="mb-4">
                <p class="font-bold text-lg text-theme-secondary">Dữ liệu bạn đã chọn:</p>
                <ul class="list-disc list-inside ml-4 text-sm text-gray-600">
                    <li>Năm sinh: ${formData.namSinh || 'Chưa nhập'}</li>
                    <li>Mệnh: ${currentMenhData.text || 'Chưa rõ'}</li>
                    <li>Mục đích: ${formData.mucDich.join(', ') || 'Không rõ'}</li>
                    <li>Loại SP: ${formData.loaiSP.join(', ') || 'Không rõ'}</li>
                    <li>Mức giá: ${formData.gia.join(', ') || 'Không rõ'}</li>
                </ul>
            </div>
            ${suggestion.join('')}
            <div class="mt-6 p-4 bg-gray-100 rounded-lg">
                <p class="font-bold text-red-600">LƯU Ý QUAN TRỌNG:</p>
                <p class="text-sm">Hệ thống đã sử dụng Mệnh theo năm sinh (Niên Mệnh) theo **Bảng Tra Cứu Nạp Âm 60 Năm Chuẩn** (1940-2030). Tuy nhiên, kết quả này là dự đoán vì không tính đến thời điểm **Lập Xuân** (thời điểm chuyển giao năm Âm lịch) và cần xác định theo **Giới tính** để tính **Cung Mệnh**. Vui lòng liên hệ (mục 📶) hoặc tìm chuyên gia tại khu du lịch để được tư vấn CHI TIẾT và CHÍNH XÁC nhất!</p>
            </div>
        `;

        resultContent.innerHTML = summary;
        resultDiv.classList.remove('hidden');
        
        // Cuộn tới kết quả
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});