const scriptURL = 'https://script.google.com/macros/s/AKfycbxx9HZdV78NTnSNSUT9OnzQStx-Itzqx7vNtzsbPHDyR2zzqsbLqrRpAhBvul0ApB7z4g/exec';
// Tải animation từ LottieFiles
const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-loader'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'https://assets10.lottiefiles.com/packages/lf20_raiw2hpe.json' // Link JSON animation
});
const submitBtn = document.getElementById('submitBtn');
let isPlaying = false;

window.onload = function() {
    const audio = document.getElementById('background-music');
    const playButton = document.getElementById('music-control');
  
    try {
        audio.play()
        musicControl.textContent = '⏸';
        isPlaying = true;
    } catch (error) {
        playButton.style.display = 'block';
    }
  };

document.getElementById('rsvpForm').addEventListener('submit', e => {
    e.preventDefault();

    // Lấy giá trị của trường "your-name"
    const yourName = document.getElementById('your-name').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Kiểm tra nếu trường "your-name" trống
    if (yourName === '') {
        // Hiển thị thông báo lỗi
        errorMessage.style.display = 'block';
        return; // Dừng lại và không gửi form
    } else {
        // Ẩn thông báo lỗi nếu có
        errorMessage.style.display = 'none';
    }
    submitBtn.disabled = true;

    // Hiển thị loading và bắt đầu animation
    document.getElementById('lottie-loader').style.display = 'block';
    animation.play();
    submitBtn.classList.add('loading');
    submitBtn.textContent = ''; // Xóa văn bản

    // Lấy dữ liệu từ form
    const formData = new FormData(rsvpForm);
    var dataSend = {
        name: formData.get("your-name"),
        coming: formData.get("radio-coming"),
        total: formData.get("menu-coming"),
        type: formData.get("radio-holder")
    };

    // Gửi dữ liệu bằng fetch
    fetch(scriptURL, {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        }
    })
        .then(response => {
            // Hiển thị thông báo thành công
            showConfirmation('Cảm ơn bạn đã xác nhận! ❤️');
            e.target.reset(); // Reset form
        })
        .catch(error => {
            // Hiển thị thông báo lỗi
            showConfirmation('Có lỗi xảy ra, vui lòng thử lại...', true);
        })
        .finally(() => {
            // Ẩn loading và reset animation
            document.getElementById('lottie-loader').style.display = 'none';
            animation.stop();
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Xác nhận tham dự'; // Khôi phục văn bản
    submitBtn.disabled = false;

        });
});

function showConfirmation(message, isError = false) {
    const div = document.getElementById('confirmationMessage');
    div.textContent = message;
    div.style.color = isError ? 'red' : 'green';
    document.getElementById('lottie-loader').style.display = 'none'; // Ẩn loading
    animation.stop(); // Dừng animation
    submitBtn.classList.remove('loading'); // Xóa lớp loading
    submitBtn.textContent = 'Xác nhận tham dự'; // Khôi phục văn bản
    setTimeout(() => {
        div.textContent = ''
    }, 3000);
}


const musicControl = document.getElementById('music-control');
const backgroundMusic = document.getElementById('background-music');

// Biến để kiểm tra trạng thái nhạc

// Xử lý sự kiện click nút
musicControl.addEventListener('click', function (event) {
    event.stopPropagation();
    if (isPlaying) {
        backgroundMusic.pause(); // Dừng nhạc
        musicControl.textContent = '🎵'; // Đổi biểu tượng
    } else {
        backgroundMusic.play(); // Phát nhạc
        musicControl.textContent = '⏸'; // Đổi biểu tượng
    }
    isPlaying = !isPlaying; // Đảo trạng thái
});
backgroundMusic.addEventListener('waiting', function () {
    musicControl.classList.add('loading');
});
document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('banner-318390681');
    const bg = banner.querySelector('.bg');

    bg.onload = function () {
        banner.classList.add('loaded');
    };

    // Đảm bảo hiệu ứng chạy ngay cả khi ảnh đã được cache
    if (bg.complete) {
        banner.classList.add('loaded');
    }
});
