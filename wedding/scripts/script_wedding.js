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

document.getElementById('rsvpForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('lottie-loader').style.display = 'block'; // Hiển thị loading
    animation.play(); // Bắt đầu animation
    submitBtn.classList.add('loading');
    submitBtn.textContent = ''; // Xóa văn bản

    const formData = new FormData(rsvpForm);
    var dataSend = {
        name: formData.get("your-name"),
        coming: formData.get("radio-coming"),
        total: formData.get("menu-coming"),
        type: formData.get("radio-holder")
    };
    fetch(scriptURL, {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        }
    })
        .then(response => {
            showConfirmation('Cảm ơn bạn đã xác nhận! ❤️');
            e.target.reset();
        })
        .catch(error => {
            showConfirmation('Có lỗi xảy ra, vui lòng thử lại...', true);
        }).finally(() => {
            showConfirmation('Cảm ơn bạn đã xác nhận!!! ❤️');
            e.target.reset();
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
let isPlaying = false;

// Phát nhạc sau khi người dùng tương tác với trang
document.addEventListener('click', function () {
  if (!isPlaying) {
    backgroundMusic.play();
    isPlaying = true;
    musicControl.textContent = '⏸';
  }
});
// window.addEventListener('scroll', function () {
//     const scrollY = window.scrollY; // Lấy vị trí cuộn hiện tại
//     const triggerPoint = 5000; // Điểm kích hoạt (ví dụ: 500px)
  
//     if (scrollY > triggerPoint && !isPlaying) {
//       backgroundMusic.play();
//       isPlaying = true;
//       musicControl.textContent = '⏸';
//     }
//   });
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