document.addEventListener('DOMContentLoaded', function() {
    const initialGreeting = document.getElementById('initialGreeting');
    const greetingText = document.getElementById('greetingText');
    const countdownText = document.getElementById('countdownText');
    const countdownNumber = document.getElementById('countdownNumber');
    const startBtn = document.getElementById('startBtn');

    // Show initial greeting for 7 seconds
    setTimeout(() => {
        greetingText.classList.add('hidden');
        countdownText.classList.remove('hidden');

        // Start countdown from 5 to 0
        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownNumber.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownText.classList.add('hidden');
                startBtn.classList.remove('hidden');
            }
        }, 1000);
    }, 7000);

    startBtn.addEventListener('click', function() {
        this.classList.add('fade-out');
        setTimeout(() => {
            this.classList.add('hidden');
            document.getElementById('inputName').classList.remove('hidden');
            document.getElementById('inputName').classList.add('fade-in');
        }, 1000);
    });

    document.getElementById('submitName').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        document.getElementById('inputName').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('inputName').classList.add('hidden');
            document.getElementById('climateChange').classList.remove('hidden');
            document.getElementById('climateChange').classList.add('fade-in');
            document.getElementById('userName').textContent = name;
        }, 1000);
    });

    document.getElementById('climateBtn').addEventListener('click', function() {
        this.classList.add('fade-out');
        setTimeout(() => {
            this.classList.add('hidden');
            document.getElementById('earthGlobe').classList.remove('hidden');
            document.getElementById('earthGlobe').classList.add('fade-in');
            const video = document.getElementById('earthGlobeVideo');
            
            // Set the video to stop at 20.5 seconds
            const stopTime = 20;

            video.addEventListener('loadedmetadata', function() {
                video.currentTime = 0;
                video.play();
            });

            video.addEventListener('timeupdate', function onTimeUpdate() {
                console.log('Current time:', video.currentTime); // Log current time for debugging
                if (video.currentTime >= stopTime) {
                    video.pause();
                    video.currentTime = stopTime;
                    video.muted = true; // Mute the video
                    transitionToNextPage();
                    video.removeEventListener('timeupdate', onTimeUpdate); // Remove the event listener
                }
            });

            function transitionToNextPage() {
                console.log('Transitioning to next page'); // Log transition for debugging
                setTimeout(() => {
                    document.getElementById('earthGlobe').classList.add('fade-out');
                    setTimeout(() => {
                        document.getElementById('earthGlobe').classList.add('hidden');
                        document.getElementById('infoSections').classList.remove('hidden');
                        document.getElementById('infoSections').classList.add('fade-in');
                        startInfoTransition();
                    }, 1000);
                }, 1500); // Delay for smoother transition
            }
        }, 1000);
    });

    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    function startInfoTransition() {
        if (currentSectionIndex < sections.length) {
            sections[currentSectionIndex].classList.remove('hidden');
            sections[currentSectionIndex].classList.add('fade-in');
            displayText(sections[currentSectionIndex]);
        } else {
            document.getElementById('infoSections').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('infoSections').classList.add('hidden');
                displayThankYou(); // Gọi hàm hiển thị lời cảm ơn
            }, 1000);
        }
    }

    function displayText(section) {
        const paragraphs = section.querySelectorAll('p');
        let i = 0;

        function showNextParagraph() {
            if (i < paragraphs.length) {
                paragraphs[i].style.display = 'block';
                paragraphs[i].style.opacity = 1; // Hiển thị đoạn văn
                paragraphs[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1250 });
                i++;
                setTimeout(showNextParagraph, 1250); // Hiển thị từng đoạn văn bản
            } else {
                document.getElementById('nextBtn').classList.remove('hidden'); // Hiện nút "Tiếp theo"
                document.getElementById('nextBtn').classList.add('fade-in');
            }
        }

        showNextParagraph();
    }

    // Xử lý nút "Tiếp theo"
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', function() {
        if (currentSectionIndex < sections.length) {
            // Mute the video of the current section
            const currentSection = sections[currentSectionIndex];
            const video = currentSection.querySelector('video');
            if (video) {
                video.muted = true;
            }

            sections[currentSectionIndex].classList.add('fade-out');
            setTimeout(() => {
                sections[currentSectionIndex].classList.add('hidden');
                currentSectionIndex++;
                startInfoTransition();
            }, 1000);
        } else {
            // On the thank you page, act as an exit button
            window.location.href = 'https://shopee.vn'; // Chuyển tới trang Shopee
        }
    });

    // Hiển thị thông điệp cảm ơn và nút thoát
    function displayThankYou() {
        const thankYouSection = document.getElementById('thankYou');
        thankYouSection.classList.remove('hidden');
        thankYouSection.classList.add('fade-in');
        document.getElementById('thanksAudio').play(); // Phát nhạc tự động

        // Ẩn nút Tiếp theo
        nextBtn.textContent = 'Thoát'; // Change the text of the button to "Exit"
    }

    sections[0].innerHTML = `
        <h2>Nhiệt độ tăng cao</h2>
        <div style="text-align: left;">
            <p>Nhiệt độ toàn cầu đang gia tăng với tốc độ đáng báo động. Việt Nam cũng không nằm ngoài xu hướng này. Sự gia tăng nhiệt độ ảnh hưởng đến nông nghiệp, sức khỏe con người và hệ sinh thái.</p>
            <p>Nhiệt độ toàn cầu đang gia tăng, dẫn đến nhiều hệ lụy cho môi trường và con người. Các hiện tượng nắng nóng cực đoan trở nên phổ biến hơn, gây ra tình trạng thiếu nước, mất mùa và ảnh hưởng đến sức khỏe cộng đồng.</p>
            <p><strong>Bằng chứng:</strong> Nhiệt độ trung bình toàn cầu đã tăng khoảng 1,1°C từ thời kỳ tiền công nghiệp (khoảng năm 1880). Theo báo cáo của Tổ chức Khí tượng Thế giới (WMO), năm 2020 là một trong ba năm nóng nhất từng được ghi nhận.</p>
            <p>Tháng 6 năm 2020, nhiệt độ tại Hà Nội đạt mức 40°C, gây ra tình trạng nắng nóng kỷ lục, ảnh hưởng nghiêm trọng đến sức khỏe của người dân.</p>
            <p><strong>Hậu quả:</strong> Nhiệt độ tăng cao dẫn đến các hiện tượng thời tiết cực đoan như nắng nóng kéo dài. Điều này đã gây ra hàng nghìn ca tử vong và bệnh tật liên quan đến nhiệt độ cao.</p>
            <img src="images/temperature_graph.png" alt="Temperature Graph" style="width: 25%; height: auto;">
            <video controls autoplay muted loop style="width: 25%;">
                <source src="videos/temperature_video.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    sections[1].innerHTML = `
        <h2>Bão và thời tiết khắc nghiệt</h2>
        <div style="text-align: left;">
            <p>Việt Nam là một trong những quốc gia chịu ảnh hưởng nặng nề nhất từ bão. Các hiện tượng thời tiết khắc nghiệt như lũ lụt và hạn hán ngày càng trở nên phổ biến, gây thiệt hại lớn về kinh tế và sinh mạng.</p>
            <p>Biến đổi khí hậu làm tăng tần suất và cường độ của các hiện tượng thời tiết khắc nghiệt như bão, lũ lụt, hạn hán và sóng nhiệt. Điều này gây ra thiệt hại nghiêm trọng về tài sản, cơ sở hạ tầng và cả tính mạng con người.</p>
            <p><strong>Bằng chứng:</strong> Theo Cơ quan Quản lý Khí quyển và Đại dương Quốc gia Hoa Kỳ (NOAA), số lượng bão mạnh (cấp 4 và 5) trên toàn thế giới đã tăng lên trong những thập kỷ gần đây.</p>
            <p>Ví dụ, bão Haiyan (Yolanda) năm 2013 là một trong những cơn bão mạnh nhất từng được ghi nhận, gây thiệt hại nghiêm trọng ở Philippines và ảnh hưởng đến Việt Nam.</p>
            <p><strong>Hậu quả:</strong> Bão mạnh và xuất hiện thường xuyên hơn gây ra thiệt hại lớn về tài sản và con người. Bão số 9 (Molave) năm 2020 tại Việt Nam đã gây thiệt hại nghiêm trọng với hơn 100 người chết và mất tích, hàng trăm ngôi nhà bị phá hủy.</p>
            <img src="images/storm_image.png" alt="Storm Image" style="width: 25%; height: auto;">
            <video controls autoplay muted loop style="width: 25%;">
                <source src="videos/storm_video.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    sections[2].innerHTML = `
        <h2>Mực nước biển dâng</h2>
        <div style="text-align: left;">
            <p>Mực nước biển dâng đe dọa các vùng ven biển của Việt Nam, đặc biệt là đồng bằng sông Cửu Long. Nhiều vùng đất nông nghiệp bị xâm nhập mặn, ảnh hưởng đến sản xuất lương thực và đời sống của người dân.</p>
            <p>Băng tan ở các cực và các sông băng trên thế giới làm mực nước biển dâng cao. Hàng triệu người sống ở các khu vực ven biển có nguy cơ bị mất nhà cửa và đất canh tác do ngập lụt và xâm nhập mặn. Điều này cũng đe dọa đến các hệ sinh thái ven biển.</p>
            <p><strong>Bằng chứng:</strong> Mực nước biển toàn cầu đã tăng khoảng 20 cm kể từ năm 1880, và tốc độ dâng mực nước biển hiện nay là khoảng 3,2 mm mỗi năm. Báo cáo của Ủy ban Liên chính phủ về Biến đổi Khí hậu (IPCC) dự báo rằng mực nước biển có thể tăng từ 0,3 đến 1 mét vào cuối thế kỷ 21.</p>
            <p>Đồng bằng sông Cửu Long, nơi sinh sống và canh tác của hàng triệu người, đang chịu ảnh hưởng nặng nề bởi xâm nhập mặn, gây thiệt hại lớn cho sản xuất lúa gạo.</p>
            <p><strong>Hậu quả:</strong> Mực nước biển dâng cao đe dọa các khu vực ven biển và đảo quốc. Ví dụ, Maldives và Tuvalu đang đối mặt với nguy cơ bị ngập lụt hoàn toàn, đe dọa đến cuộc sống của hàng trăm nghìn người.</p>
            <img src="images/sea_level_graph.png" alt="Sea Level Graph" style="width: 25%; height: auto;">
            <video controls autoplay muted loop style="width: 25%;">
                <source src="videos/sea_level_video.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    sections[3].innerHTML = `
        <h2>Hạn hán và thiếu nước</h2>
        <div style="text-align: left;">
            <p>Hạn hán ngày càng kéo dài và thường xuyên hơn, gây thiếu nước nghiêm trọng cho sản xuất nông nghiệp và sinh hoạt. Điều này làm giảm năng suất cây trồng và gây khủng hoảng nguồn nước.</p>
            <p>Biến đổi khí hậu gây ra tình trạng hạn hán kéo dài và thiếu nước ở nhiều khu vực trên thế giới. Điều này ảnh hưởng nghiêm trọng đến nông nghiệp, nguồn cung cấp nước sạch và sinh kế của hàng triệu người.</p>
            <p><strong>Bằng chứng:</strong> Theo IPCC, tần suất và cường độ của các đợt hạn hán đã gia tăng tại nhiều khu vực trên thế giới, đặc biệt là ở vùng Địa Trung Hải, Tây Phi và Tây Nam Hoa Kỳ.</p>
            <p>Ví dụ, hạn hán ở California từ năm 2011 đến 2017 đã làm giảm sản lượng nông nghiệp và gây thiệt hại kinh tế lớn. Tại Việt Nam, hạn hán và thiếu nước đang trở thành vấn đề nghiêm trọng, ảnh hưởng đến đời sống của hàng triệu người dân.</p>
            <p>Tại các tỉnh Tây Nguyên, hạn hán kéo dài đã gây ra thiệt hại lớn cho sản xuất cà phê và các cây trồng khác. Người dân phải đối mặt với tình trạng thiếu nước sinh hoạt và nước tưới tiêu.</p>
            <img src="images/drought_image.jpg" alt="Drought Image" style="width: 25%; height: auto;">
            <video controls autoplay muted loop style="width: 25%;">
                <source src="videos/drought_video.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
});