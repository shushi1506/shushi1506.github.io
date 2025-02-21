const scriptURL = 'https://script.google.com/macros/s/AKfycbxx9HZdV78NTnSNSUT9OnzQStx-Itzqx7vNtzsbPHDyR2zzqsbLqrRpAhBvul0ApB7z4g/exec';
document.getElementById('rsvpForm').addEventListener('submit', e => {
    e.preventDefault();
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
            showConfirmation('Cảm ơn bạn đã xác nhận! ❤️');
            e.target.reset();
        });
});
function showConfirmation(message, isError = false) {
    const div = document.getElementById('confirmationMessage');
    div.textContent = message;
    div.style.color = isError ? 'red' : 'green';
    setTimeout(() => div.textContent = '', 3000);
}