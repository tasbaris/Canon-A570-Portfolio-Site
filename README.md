# Canon A570 IS — Küratöryel Portfolyo

![Static Website](https://img.shields.io/badge/Type-Static%20Website-1f6feb?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-181717?style=for-the-badge&logo=github)

Küçük, özgün ve estetik bir fotoğraf sergisi için tasarlanmış bu proje, Canon PowerShot A570 IS ile çekilen kareleri sanatsal ve analitik bir bakışla sunar. Fotoğrafları galeri formatında göstermek, puanlamak, filtrelemek ve teknik detaylara erişmek için hazırlanmıştır.

## Özellikler

- Görsel bazlı fotoğraf galerisi
- Arama ve filtreleme desteği
- Puan sıralama ve tarih sıralaması
- Favori / yıldızlı fotoğraflar
- Toplu indirme ve ZIP export
- Detaylı inceleme modalı
- EXIF, shutter, aperture, ISO ve focal bilgileri
- Dark / light tema desteği
- Mobil uyumlu kullanıcı arayüzü
- Statik hosting için hazır yapı

## Teknoloji Yığını

- HTML5
- CSS3
- Vanilla JavaScript
- JSZip
- Statik veri yapıları (JSON / JS)

## Proje Yapısı

```text
Canon-Static/
├── app.js              # Ana uygulama mantığı
├── data.js             # Fotoğraf verilerinin JS kaynağı
├── data.json           # Fotoğraf verilerinin JSON kaynağı
├── index.html          # Arayüz yapısı
├── style.css           # Tasarım ve responsive stiller
├── jszip.min.js        # ZIP export için kütüphane
├── thumbs/             # Küçük görsel dosyaları
├── README.md           # Proje açıklaması
└── .gitignore          # Opsiyonel git ayarı
```

## Çalıştırma

Bu proje statik bir web uygulaması olduğu için ek bir kurulum gerektirmez.

- `index.html` dosyasını tarayıcıda açın.

## Özelleştirme

Aşağıdaki alanları kolayca değiştirebilirsiniz:

- Fotoğraf listesi ve meta verileri: `data.js` / `data.json`
- Tema ve görsel düzen: `style.css`
- Filtreleme ve sıralama mantığı: `app.js`
- Başlık, açıklama ve buton metinleri: `index.html`


## Kullanım Senaryosu

Bu site, kişisel fotoğraf sergisi, sanatçı portfolyosu, kutuplaşmış fotoğraf değerlendirmeleri ya da kuratöryel koleksiyon sunumları için idealdir. Görsel kalite, teknik detay ve değerlendirme mantığı birlikte sunulur.

## Lisans

Bu proje için özel bir lisans dosyası bulunmamaktadır. İsterseniz kendi kullanımınıza göre uyarlayabilir, fork edebilir ve geliştirebilirsiniz.
