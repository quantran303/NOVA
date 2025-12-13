// DATA THÀNH VIÊN - BẠN HÃY SỬA THÔNG TIN Ở ĐÂY
const members = [{
    name: "Phạm Thị Thanh Ngọc",
    role: "Founder / Leader",
    img: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10B981&color=fff&size=200",
    bio: "Người khởi xướng dự án NOVA với niềm đam mê cháy bỏng về du lịch và công nghệ. Luôn tìm kiếm những giải pháp sáng tạo nhất."
}, {
    name: "Trần Nguyễn Đông Quân",
    role: "Developer/Co-op founder",
    img: "/static/IMG/members/dquan.jpg",
    bio: "Chịu trách nhiệm xây dựng hệ thống website. Luôn đảm bảo trải nghiệm người dùng mượt mà và hiệu ứng bắt mắt"
}, {
    name: "Lê Vân Phong",
    role: "Developer",
    img: "/static/IMG/members/windy.png",
    bio: "Phụ trách phát triển các tính năng backend và tối ưu hiệu suất hệ thống. Đam mê về mã nguồn sạch và kiến trúc phần mềm."
}, {
    name: "Phan Ngọc Minh",
    role: "Designer",
    img: "https://ui-avatars.com/api/?name=Pham+Thi+D&background=EF4444&color=fff&size=200",
    bio: "Người tạo nên vẻ đẹp visual cho dự án. Có gu thẩm mỹ tinh tế và khả năng biến ý tưởng thành hình ảnh sống động."
}];

const carousel = document.getElementById('carousel3D');
const radius = 450; // Đã chỉnh sửa để khớp với CSS (hoặc 400 nếu bạn không muốn tăng kích thước vòng xoay)
let currDeg = 0;

// Thêm biến cho tính năng tự động xoay
let autoRotateInterval;
const autoRotateSpeed = 4000; // Tự động xoay sau mỗi 3000ms (3 giây)

// Hàm khởi tạo Cards
function initCarousel() {
    const total = members.length;
    const angleStep = 360 / total;

    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';

        // Tính toán vị trí 3D cho từng card
        const angle = index * angleStep;
        // Xếp thành vòng tròn
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

        card.innerHTML = `
            <div class="member-img-box">
                <img src="${member.img}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <span class="role">${member.role}</span>
                <p class="bio">${member.bio}</p>
            </div>
            <div class="social-links">
                <a href="#" class="social-icon">f</a>
                <a href="#" class="social-icon">in</a>
                <a href="#" class="social-icon">✉</a>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// Hàm xoay Carousel
function rotateCarousel(direction) {
    const total = members.length;
    const angleStep = 360 / total;

    if (direction === 1) {
        currDeg -= angleStep; // Next
    } else {
        currDeg += angleStep; // Prev
    }

    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currDeg}deg)`;

    // Cập nhật class Active (để highlight card ở giữa)
    updateActiveCard();
}

function updateActiveCard() {
    // Logic đơn giản để tìm card đang đối diện mặt người xem
    // (Phần này có thể tinh chỉnh thêm nếu muốn highlight chính xác)
}

// Hàm khởi động chế độ tự động xoay
function startAutoRotate() {
    // Chỉ khởi động nếu chưa có interval nào đang chạy
    if (!autoRotateInterval) {
        autoRotateInterval = setInterval(() => {
            rotateCarousel(1); // Xoay tới thẻ tiếp theo (next)
        }, autoRotateSpeed);
    }
}

// Hàm dừng chế độ tự động xoay
function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
}


// Xử lý Kéo thả chuột (Drag)
let isDragging = false;
let startX, currentX;
let initialDeg = 0;

const teamScope = document.getElementById('teamScope');

teamScope.addEventListener('mousedown', (e) => {
    stopAutoRotate(); // DỪNG xoay tự động
    isDragging = true;
    startX = e.pageX;
    initialDeg = currDeg;
    carousel.style.cursor = 'grabbing';
    carousel.style.transition = 'none'; // Tắt transition để kéo mượt
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 0.5; // Tốc độ kéo
    currDeg = initialDeg + walk;
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currDeg}deg)`;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
    carousel.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';

    // Tự động căn chỉnh vào card gần nhất (Snap effect)
    const total = members.length;
    const angleStep = 360 / total;
    const remainder = currDeg % angleStep;

    // Làm tròn góc để card luôn chính diện
    if (Math.abs(remainder) > angleStep / 2) {
        currDeg = (remainder > 0) ? currDeg + (angleStep - remainder) : currDeg - (angleStep + remainder);
    } else {
        currDeg -= remainder;
    }

    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currDeg}deg)`;
    startAutoRotate(); // KHỞI ĐỘNG LẠI xoay tự động
});

// Hỗ trợ cảm ứng (Touch) cho mobile
teamScope.addEventListener('touchstart', (e) => {
    stopAutoRotate(); // DỪNG xoay tự động
    isDragging = true;
    startX = e.touches[0].pageX;
    initialDeg = currDeg;
    carousel.style.transition = 'none';
});

teamScope.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 0.8;
    currDeg = initialDeg + walk;
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currDeg}deg)`;
});

teamScope.addEventListener('touchend', () => {
    isDragging = false;
    carousel.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    // Snap logic (tương tự mouseup)
    const total = members.length;
    const angleStep = 360 / total;
    const remainder = currDeg % angleStep;
    if (Math.abs(remainder) > angleStep / 2) {
        currDeg = (remainder > 0) ? currDeg + (angleStep - remainder) : currDeg - (angleStep + remainder);
    } else {
        currDeg -= remainder;
    }
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currDeg}deg)`;
    startAutoRotate(); // KHỞI ĐỘNG LẠI xoay tự động
});

// Chạy khởi tạo
initCarousel();

// KHỞI ĐỘNG TỰ ĐỘNG XOAY
startAutoRotate();

// Điều chỉnh Z-offset ban đầu
carousel.style.transform = `translateZ(-${radius}px)`;