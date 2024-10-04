// Import hàm getSubtitles từ youtube-captions-scraper
var getSubtitles = require('youtube-captions-scraper').getSubtitles;

// ID của video YouTube
var videoID = 'dQw4w9WgXcQ'; // Thay thế bằng ID video thật

// Hàm lấy phụ đề từ video
function fetchSubtitles(videoID, lang) {
  lang = lang || 'en'; // Ngôn ngữ mặc định là tiếng Anh

  getSubtitles({
    videoID: videoID,
    lang: lang // Mã ngôn ngữ, ví dụ 'fr' cho tiếng Pháp, mặc định là 'en'
  }).then(function(captions) {
    // Hiển thị phụ đề nhận được
    console.log('Phụ đề:', captions);

    // Thực hiện xử lý thêm với phụ đề nếu cần
    captions.forEach(function(caption) {
      console.log(caption.start + ': ' + caption.text);
    });
  }).catch(function(err) {
    console.error('Lỗi khi lấy phụ đề:', err);
  });
}

// Gọi hàm với videoID và mã ngôn ngữ mong muốn
fetchSubtitles(videoID, 'en');
