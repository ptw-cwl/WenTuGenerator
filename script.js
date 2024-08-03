document.getElementById('generateButton').addEventListener('click', function() {
    let text = document.getElementById('textInput').value;
    const errorContainer = document.getElementById('errorContainer');
    const downloadButton = document.getElementById('downloadButton');
    const imageContainer = document.getElementById('imageContainer');

    // 清除之前的错误消息
    errorContainer.textContent = '';

    // 限制最多10个字符
    if (text.length > 10) {
        errorContainer.textContent = '输入的文字不能超过10个字符！';
        downloadButton.style.display = 'none';
        return;
    }

    // 移除之前生成的文字（如果存在）
    const previousText = document.getElementById('generatedText');
    if (previousText) {
        previousText.remove();
    }

    // 创建新的文字元素
    const textElement = document.createElement('div');
    textElement.id = 'generatedText';
    textElement.textContent = text;
    
    imageContainer.innerHTML = '';
    imageContainer.style.backgroundImage = "url('your-background-image.jpg')";
    imageContainer.appendChild(textElement);

    // 调整字体大小以适应图片
    adjustFontSize(textElement);

    // 显示下载按钮
    downloadButton.style.display = 'inline';

    // 保存输入的文字
    downloadButton.setAttribute('data-text', text);
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const imageContainer = document.getElementById('imageContainer');
    const text = document.getElementById('downloadButton').getAttribute('data-text');
    const filename = text ? `ptw-cwl-${text}.png` : 'ptw-cwl.png';

    html2canvas(imageContainer).then(function(canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename;
        link.click();
    });
});

function adjustFontSize(textElement) {
    let fontSize = 4; // 初始字体大小
    textElement.style.fontSize = fontSize + 'rem';
    
    while (textElement.scrollWidth > textElement.offsetWidth || textElement.scrollHeight > textElement.offsetHeight) {
        fontSize -= 0.1;
        textElement.style.fontSize = fontSize + 'rem';
        if (fontSize <= 1) break; // 防止字体过小
    }
}
