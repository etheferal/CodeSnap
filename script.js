const codeInput = document.getElementById('code-input');
const previewCode = document.getElementById('preview-code');
const windowTitleInput = document.getElementById('window-title');
const previewTitle = document.getElementById('preview-title');
const bgThemeSelect = document.getElementById('bg-theme');
const paddingRange = document.getElementById('padding-range');
const paddingVal = document.getElementById('padding-val');
const captureArea = document.getElementById('capture-area');
const downloadBtn = document.getElementById('download-btn');

// Başlangıç değerlerini yükle
previewCode.textContent = codeInput.value;

// 1. Kod metni değiştikçe kartı güncelle
codeInput.addEventListener('input', (e) => {
  previewCode.textContent = e.target.value || '// Kodunuzu buraya yazın...';
});

// 2. Pencere başlığı değiştikçe güncelle
windowTitleInput.addEventListener('input', (e) => {
  previewTitle.textContent = e.target.value || 'untitled';
});

// 3. Arka plan temasını değiştir
bgThemeSelect.addEventListener('change', (e) => {
  captureArea.style.background = e.target.value;
});

// 4. Dış boşluk (Padding) değerini değiştir
paddingRange.addEventListener('input', (e) => {
  const val = `${e.target.value}px`;
  paddingVal.textContent = val;
  captureArea.style.padding = val;
});

// 5. Kartı yüksek kaliteli PNG olarak indir
downloadBtn.addEventListener('click', () => {
  const originalText = downloadBtn.textContent;
  downloadBtn.textContent = '⏳ Hazırlanıyor...';
  downloadBtn.disabled = true;

  html2canvas(captureArea, {
    scale: 2, // Yüksek çözünürlük (Retina kalitesi)
    backgroundColor: null,
  }).then((canvas) => {
    const link = document.createElement('a');
    const fileName = windowTitleInput.value.trim() || 'code-card';
    link.download = `${fileName}-snap.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    downloadBtn.textContent = originalText;
    downloadBtn.disabled = false;
  });
});