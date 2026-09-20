// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
// ═══════════════════════════════════════
// DATA INITIALIZATION (STATIC)
// ═══════════════════════════════════════
let photos = [];
if (typeof staticPhotosData !== 'undefined' && Array.isArray(staticPhotosData)) {
  photos = staticPhotosData;
}

let filteredPhotos = [...photos];
let activeFilter = 'all';
let searchQuery = '';
let sortMode = 'score-desc';
let viewMode = 'grid';
let activeIdx = -1;

// DOM refs
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const sortCustomSelect = document.getElementById('sortCustomSelect');
const sortTrigger = document.getElementById('sortTrigger');
const sortDropdown = document.getElementById('sortDropdown');
const sortCurrentIcon = document.getElementById('sortCurrentIcon');
const sortCurrentLabel = document.getElementById('sortCurrentLabel');
const mFavBtn = document.getElementById('mFavBtn');
const mFavLabel = document.getElementById('mFavLabel');
const filterChips = document.getElementById('filterChips');
const resultCount = document.getElementById('resultCount');
const lightbox = document.getElementById('lightbox');
const mImg = document.getElementById('mImg');
const mFname = document.getElementById('mFname');
const mCounter = document.getElementById('mCounter');
const mTur = document.getElementById('mTur');
const mScore = document.getElementById('mScore');
const mRadialFill = document.getElementById('mRadialFill');
const mMode = document.getElementById('mMode');
const mShutter = document.getElementById('mShutter');
const mAperture = document.getElementById('mAperture');
const mIso = document.getElementById('mIso');
const mFocal = document.getElementById('mFocal');
const mBias = document.getElementById('mBias');
const mFlash = document.getElementById('mFlash');
const mDate = document.getElementById('mDate');
const mTekS = document.getElementById('mTekS');
const mTekBar = document.getElementById('mTekBar');
const mTekD = document.getElementById('mTekD');
const mKompS = document.getElementById('mKompS');
const mKompBar = document.getElementById('mKompBar');
const mKompD = document.getElementById('mKompD');
const mColS = document.getElementById('mColS');
const mColBar = document.getElementById('mColBar');
const mColD = document.getElementById('mColD');
const mOzet = document.getElementById('mOzet');
const toast = document.getElementById('toast');

const mCompare = document.getElementById('mCompare');
const mDownload = document.getElementById('mDownload');
const compareStage = document.getElementById('compareStage');
const cmpContainer = document.getElementById('cmpContainer');
const cmpBeforeImg = document.getElementById('cmpBeforeImg');
const cmpAfterImg = document.getElementById('cmpAfterImg');
const splitBar = document.getElementById('splitBar');
const exportWrap = document.getElementById('exportWrap');
const exportBtn = document.getElementById('exportBtn');
const exportDropdown = document.getElementById('exportDropdown');
const analyticsModal = document.getElementById('analyticsModal');
const navAnalyticsBtn = document.getElementById('navAnalyticsBtn');
const analyticsCloseBtn = document.getElementById('analyticsCloseBtn');

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════
let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('canon-theme') || 'dark';
} catch (e) {
  console.warn('Theme load warning:', e);
}
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

document.getElementById('themeBtn').onclick = () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('canon-theme', next);
  } catch (e) {
    console.warn('Theme save warning:', e);
  }
  updateThemeIcon();
};

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('themeBtn');
  if (btn) {
    btn.innerHTML = isDark
      ? '<svg id="themeIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg id="themeIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }
}

// ═══════════════════════════════════════
// NAVBAR & SCROLL TO TOP EFFECT
// ═══════════════════════════════════════
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════
// ANIMATED COUNTERS (Hero)
// ═══════════════════════════════════════
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isFloat = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
const heroObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounters(); heroObs.disconnect(); }
  });
}, { threshold: 0.3 });
heroObs.observe(document.querySelector('.hero-stats'));

// ═══════════════════════════════════════
// VIEW TOGGLE
// ═══════════════════════════════════════
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    viewMode = btn.dataset.view;
    galleryGrid.className = 'gallery-grid ' + viewMode + '-view';
    renderGrid();
  };
});

// ═══════════════════════════════════════
// EXIF DATE PARSER
// ═══════════════════════════════════════
function parseExifDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0;
  const match = dateStr.trim().match(/(\d{4})[:\-](\d{2})[:\-](\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return 0;
  const [, y, m, d, h, min, s] = match;
  const t = new Date(Number(y), Number(m) - 1, Number(d), Number(h), Number(min), Number(s)).getTime();
  return isNaN(t) ? 0 : t;
}

// ═══════════════════════════════════════
// REAKTİF REDDIT RATE (VOTESTORE)
// ═══════════════════════════════════════
const VoteStore = {
  votesData: {}, // { photoId: { up: number, down: number, score: number } }
  userVotes: {}, // { photoId: 1 | 0 | -1 }

  init() {
    try {
      const stored = localStorage.getItem('user_photo_votes');
      if (stored) this.userVotes = JSON.parse(stored);
    } catch (e) {
      console.warn('VoteStore userVotes load warning:', e);
      this.userVotes = {};
    }

    if (Array.isArray(photos)) {
      photos.forEach(p => {
        this.votesData[p.id] = { up: 0, down: 0, score: 0 };
      });
    }

    this.fetchVotes();
  },

  fetchVotes() {
    fetch('/api/votes')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(data => {
        const votesMap = (data && data.votes) ? data.votes : data;
        if (votesMap && typeof votesMap === 'object') {
          Object.keys(votesMap).forEach(id => {
            const item = votesMap[id];
            const up = Number(item.up || (typeof item === 'number' ? item : 0));
            const down = Number(item.down || 0);
            this.votesData[id] = { up, down, score: up - down };
          });
          this.updateAllPills();
        }
      })
      .catch(() => { });
  },

  getUserVote(id) {
    return this.userVotes[id] || 0;
  },

  getScore(id) {
    if (!this.votesData[id]) {
      this.votesData[id] = { up: 0, down: 0, score: 0 };
    }
    return this.votesData[id].score;
  },

  castVote(id, direction, event) {
    if (event) event.stopPropagation();

    if (!this.votesData[id]) {
      this.votesData[id] = { up: 0, down: 0, score: 0 };
    }

    const currentVote = this.getUserVote(id);
    const newVote = (currentVote === direction) ? 0 : direction;
    const delta = newVote - currentVote;

    // Optimistik skor güncellemesi
    this.votesData[id].score += delta;
    if (newVote === 1) {
      this.votesData[id].up = Math.max(0, (this.votesData[id].up || 0) + 1);
      if (currentVote === -1) this.votesData[id].down = Math.max(0, (this.votesData[id].down || 0) - 1);
    } else if (newVote === -1) {
      this.votesData[id].down = Math.max(0, (this.votesData[id].down || 0) + 1);
      if (currentVote === 1) this.votesData[id].up = Math.max(0, (this.votesData[id].up || 0) - 1);
    } else {
      if (currentVote === 1) this.votesData[id].up = Math.max(0, (this.votesData[id].up || 0) - 1);
      if (currentVote === -1) this.votesData[id].down = Math.max(0, (this.votesData[id].down || 0) - 1);
    }

    this.userVotes[id] = newVote;
    try {
      localStorage.setItem('user_photo_votes', JSON.stringify(this.userVotes));
    } catch (e) {
      console.warn('Failed to save user votes:', e);
    }

    this.updatePillsForId(id);

    if (newVote === 1) showToast(`${id} (+1) oylandı`);
    else if (newVote === -1) showToast(`${id} (-1) oylandı`);
    else showToast(`${id} oyu geri alındı`);

    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, dir: newVote, prevDir: currentVote, vote: newVote, previousVote: currentVote })
    })
      .then(r => r.ok ? r.json() : null)
      .then(res => {
        if (res && res.status === 'ok') {
          this.votesData[id] = { up: res.up, down: res.down, score: res.score };
          this.updatePillsForId(id);
        }
      })
      .catch(err => {
        console.log('Background vote sync notice:', err);
      });

    if (sortMode === 'votes-desc') {
      filterAndSort();
    }
  },

  updatePillsForId(id) {
    const myVote = this.getUserVote(id);
    const score = this.getScore(id);
    const scoreFormatted = score > 0 ? `+${score}` : `${score}`;

    document.querySelectorAll(`.reddit-vote-pill[data-id="${id}"]`).forEach(pill => {
      const upBtn = pill.querySelector('.vote-btn.upvote');
      const downBtn = pill.querySelector('.vote-btn.downvote');
      const scoreEl = pill.querySelector('.vote-score');

      if (upBtn) upBtn.classList.toggle('active', myVote === 1);
      if (downBtn) downBtn.classList.toggle('active', myVote === -1);
      if (scoreEl) {
        scoreEl.textContent = scoreFormatted;
        scoreEl.className = 'vote-score ' + (myVote === 1 ? 'upvoted' : myVote === -1 ? 'downvoted' : '');
      }
    });

    if (activeIdx >= 0 && filteredPhotos[activeIdx] && filteredPhotos[activeIdx].id === id) {
      this.updateModalPill(id);
    }
  },

  updateModalPill(id) {
    const mPill = document.getElementById('mRedditVotePill');
    if (!mPill) return;
    mPill.dataset.id = id;

    const myVote = this.getUserVote(id);
    const score = this.getScore(id);
    const scoreFormatted = score > 0 ? `+${score}` : `${score}`;

    const upBtn = document.getElementById('mUpBtn');
    const downBtn = document.getElementById('mDownBtn');
    const scoreEl = document.getElementById('mScoreVal');

    if (upBtn) upBtn.classList.toggle('active', myVote === 1);
    if (downBtn) downBtn.classList.toggle('active', myVote === -1);
    if (scoreEl) {
      scoreEl.textContent = scoreFormatted;
      scoreEl.className = 'vote-score ' + (myVote === 1 ? 'upvoted' : myVote === -1 ? 'downvoted' : '');
    }
  },

  updateAllPills() {
    if (Array.isArray(photos)) {
      photos.forEach(p => this.updatePillsForId(p.id));
    }
  },

  renderPillHtml(id) {
    const myVote = this.getUserVote(id);
    const score = this.getScore(id);
    const scoreFormatted = score > 0 ? `+${score}` : `${score}`;
    const scoreClass = myVote === 1 ? 'upvoted' : myVote === -1 ? 'downvoted' : '';

    return `
          <div class="reddit-vote-pill" data-id="${id}" onclick="event.stopPropagation();">
            <button type="button" class="vote-btn upvote ${myVote === 1 ? 'active' : ''}" onclick="VoteStore.castVote('${id}', 1, event)" aria-label="Upvote" title="Beğen (+1)">
              <svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor" d="M12 4L4 14h5v6h6v-6h5L12 4z"/></svg>
            </button>
            <span class="vote-score ${scoreClass}">${scoreFormatted}</span>
            <button type="button" class="vote-btn downvote ${myVote === -1 ? 'active' : ''}" onclick="VoteStore.castVote('${id}', -1, event)" aria-label="Downvote" title="Beğenme (-1)">
              <svg viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor" d="M12 20l8-10h-5V4h-6v6H4l8 10z"/></svg>
            </button>
          </div>
        `;
  }
};

// ═══════════════════════════════════════
// FAVORITES SYSTEM (localStorage)
// ═══════════════════════════════════════
let favorites = new Set();

function initFavorites() {
  try {
    const stored = localStorage.getItem('canon-favorites');
    if (stored) favorites = new Set(JSON.parse(stored));
  } catch (e) {
    console.error('Favorites load error:', e);
    favorites = new Set();
  }
  updateFavCounts();
}

function saveFavorites() {
  try {
    localStorage.setItem('canon-favorites', JSON.stringify([...favorites]));
  } catch (e) {
    console.error('Favorites save error:', e);
  }
  updateFavCounts();
}

function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(id + ' favorilerden çıkarıldı');
  } else {
    favorites.add(id);
    showToast(id + ' favorilere eklendi');
  }
  saveFavorites();
  updateFavUI(id);
  if (activeFilter === 'favorite') {
    filterAndSort();
    if (lightbox && lightbox.classList.contains('open')) {
      if (filteredPhotos.length === 0) {
        closeModal();
      } else {
        if (activeIdx >= filteredPhotos.length) {
          activeIdx = filteredPhotos.length - 1;
        }
        openModal(activeIdx, 'next');
      }
    }
  }
}

function isFavorite(id) {
  return favorites.has(id);
}

function updateFavUI(id) {
  const cardBtn = document.querySelector(`.photo-card[data-id="${id}"] .card-fav-btn`);
  if (cardBtn) {
    const fav = isFavorite(id);
    cardBtn.classList.toggle('active', fav);
    cardBtn.setAttribute('title', fav ? 'Favorilerden çıkar' : 'Favorilere ekle');
  }
  if (activeIdx >= 0 && filteredPhotos[activeIdx] && filteredPhotos[activeIdx].id === id) {
    const fav = isFavorite(id);
    if (mFavBtn) mFavBtn.classList.toggle('active', fav);
    if (mFavLabel) mFavLabel.textContent = fav ? 'Favoride' : 'Favorile';
  }
}

function updateFavCounts() {
  const el = document.getElementById('favChipCount');
  if (el) el.textContent = favorites.size;
  const bNavBadge = document.getElementById('bNavFavBadge');
  if (bNavBadge) {
    bNavBadge.textContent = favorites.size;
    bNavBadge.style.display = favorites.size > 0 ? 'inline-block' : 'none';
  }
}

// ═══════════════════════════════════════
// APPLE PRO CUSTOM SELECT LOGIC
// ═══════════════════════════════════════
if (sortTrigger && sortCustomSelect) {
  sortTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sortCustomSelect.classList.toggle('open');
    sortTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  if (sortDropdown) {
    sortDropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.select-option');
      if (!opt) return;
      e.stopPropagation();

      document.querySelectorAll('.select-option').forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-selected', 'false');
      });
      opt.classList.add('active');
      opt.setAttribute('aria-selected', 'true');

      const val = opt.dataset.value;
      sortMode = val;

      const iconEl = opt.querySelector('.opt-icon');
      const labelEl = opt.querySelector('.opt-label');
      if (sortCurrentIcon && iconEl) sortCurrentIcon.textContent = iconEl.textContent;
      if (sortCurrentLabel && labelEl) sortCurrentLabel.textContent = labelEl.textContent;

      sortCustomSelect.classList.remove('open');
      sortTrigger.setAttribute('aria-expanded', 'false');

      filterAndSort();
    });
  }

  document.addEventListener('click', (e) => {
    if (!sortCustomSelect.contains(e.target)) {
      sortCustomSelect.classList.remove('open');
      sortTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ═══════════════════════════════════════
// DYNAMIC STATS UPDATE
// ═══════════════════════════════════════
function updateAllStats() {
  const total = photos.length;
  const avg = total ? (photos.reduce((sum, p) => sum + p.gen_score, 0) / total).toFixed(2) : '0';
  const max = total ? Math.max(...photos.map(p => p.gen_score)).toFixed(1) : '0';
  const star = photos.filter(p => p.gen_score >= 7.0).length;
  const edit = photos.filter(p => /(?:IMG|CRW)_\d+_\d+/.test(p.id) || p.isEdit || p.is_edit || p.id === 'IMG_0053.JPG' || p.id === 'CRW_0062.jpg').length;

  // Kaynak ve AI sayaçları
  const localCount = photos.filter(p => !p.source || p.source === 'local' || (typeof p.source === 'object' && p.source.type === 'local')).length;
  const gphotosCount = photos.filter(p => p.source === 'gphotos' || p.gphotos_id || (typeof p.source === 'object' && p.source.type === 'google_photos')).length;
  const aiCount = photos.filter(p => !!p.ai_metadata).length;

  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    heroDesc.textContent = `${total} karelik koleksiyonun teknik, kompozisyonel ve atmosferik analizini keşfedin. Her fotoğraf profesyonel bir küratör gözüyle değerlendirildi.`;
  }

  const navTotal = document.getElementById('navTotal');
  const navAvg = document.getElementById('navAvg');
  const navMax = document.getElementById('navMax');
  if (navTotal) navTotal.textContent = total;
  if (navAvg) navAvg.textContent = avg;
  if (navMax) navMax.textContent = max;

  const heroTotal = document.getElementById('heroTotal');
  const heroStar = document.getElementById('heroStar');
  const heroEdit = document.getElementById('heroEdit');
  const heroMax = document.getElementById('heroMax');
  if (heroTotal) {
    heroTotal.dataset.count = total;
    heroTotal.textContent = total;
  }
  if (heroStar) {
    heroStar.dataset.count = star;
    heroStar.textContent = star;
  }
  if (heroEdit) {
    heroEdit.dataset.count = edit;
    heroEdit.textContent = edit;
  }
  if (heroMax) {
    heroMax.dataset.count = max;
    heroMax.textContent = max;
  }

  const allChip = document.getElementById('allChipCount');
  const starChip = document.getElementById('starChipCount');
  const editChip = document.getElementById('editChipCount');
  const favChip = document.getElementById('favChipCount');
  const localChip = document.getElementById('localChipCount');
  const gphotosChip = document.getElementById('gphotosChipCount');
  const aiChip = document.getElementById('aiChipCount');

  if (allChip) allChip.textContent = total;
  if (starChip) starChip.textContent = star;
  if (editChip) editChip.textContent = edit;
  if (favChip) favChip.textContent = favorites.size;
  if (localChip) localChip.textContent = localCount;
  if (gphotosChip) gphotosChip.textContent = gphotosCount;
  if (aiChip) aiChip.textContent = aiCount;

  if (resultCount) {
    resultCount.textContent = filteredPhotos.length + ' / ' + photos.length + ' sonuç';
  }

  const footerStats = document.getElementById('footerStats');
  if (footerStats) {
    footerStats.textContent = `${total} fotoğraf · Ortalama ${avg} / 10`;
  }
}

// ═══════════════════════════════════════
// FILTER & SORT
// ═══════════════════════════════════════
function filterAndSort() {
  filteredPhotos = photos.filter(p => {
    if (activeFilter === 'star' && p.gen_score < 7.0) return false;
    if (activeFilter === 'edits' && !/özel seri|fine-art|revize|edit/i.test(p.tur) && !/(?:IMG|CRW)_\d+_\d+/.test(p.id) && !p.isEdit && !p.is_edit && p.id !== 'IMG_0053.JPG' && p.id !== 'CRW_0062.jpg') return false;
    if (activeFilter === 'favorite' && !isFavorite(p.id)) return false;
    if (activeFilter === 'popular') return true;

    // Kaynak ve AI Filtreleri
    const isGP = p.source === 'gphotos' || !!p.gphotos_id || (typeof p.source === 'object' && p.source.type === 'google_photos');
    if (activeFilter === 'source-local' && isGP) return false;
    if (activeFilter === 'source-gphotos' && !isGP) return false;
    if (activeFilter === 'ai-analyzed' && !p.ai_metadata) return false;

    if (activeFilter === 'manzara' && !/manzara|şehir|kentsel|peyzaj|deniz|meydan/i.test(p.tur)) return false;
    if (activeFilter === 'sokak' && !/sokak|belgesel|insan|yaşam|meydan|kültürel/i.test(p.tur)) return false;
    if (activeFilter === 'mimari' && !/mimari|çatı|bina|grafik|geometri/i.test(p.tur)) return false;
    if (activeFilter === 'gece' && !/gece|ay|ışık|karanlık/i.test(p.tur)) return false;
    if (activeFilter === 'macro' && !/natürmort|makro|detay|yemek|iç mekan|terlik/i.test(p.tur)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inBasic = p.id.toLowerCase().includes(q) || p.tur.toLowerCase().includes(q) || p.ozet.toLowerCase().includes(q);
      if (inBasic) return true;

      // AI etiketleri ve küratör eleştirisi içinde semantik arama
      if (p.ai_metadata) {
        if (p.ai_metadata.tags && p.ai_metadata.tags.some(t => t.toLowerCase().includes(q))) return true;
        if (p.ai_metadata.critique && p.ai_metadata.critique.toLowerCase().includes(q)) return true;
        if (p.ai_metadata.caption && p.ai_metadata.caption.toLowerCase().includes(q)) return true;
      }
      return false;
    }
    return true;
  });

  filteredPhotos.sort((a, b) => {
    if (sortMode === 'votes-desc') {
      const diff = VoteStore.getScore(b.id) - VoteStore.getScore(a.id);
      return diff !== 0 ? diff : (b.gen_score - a.gen_score) || a.id.localeCompare(b.id);
    }
    if (sortMode === 'score-desc') return b.gen_score - a.gen_score || a.id.localeCompare(b.id);
    if (sortMode === 'score-asc') return a.gen_score - b.gen_score || a.id.localeCompare(b.id);
    if (sortMode === 'date-desc') {
      const da = parseExifDate(a.exif && a.exif.date);
      const db = parseExifDate(b.exif && b.exif.date);
      if (da === 0 && db === 0) return a.id.localeCompare(b.id);
      if (da === 0) return 1;
      if (db === 0) return -1;
      if (da !== db) return db - da;
      return a.id.localeCompare(b.id);
    }
    if (sortMode === 'date-asc') {
      const da = parseExifDate(a.exif && a.exif.date);
      const db = parseExifDate(b.exif && b.exif.date);
      if (da === 0 && db === 0) return a.id.localeCompare(b.id);
      if (da === 0) return 1;
      if (db === 0) return -1;
      if (da !== db) return da - db;
      return a.id.localeCompare(b.id);
    }
    if (sortMode === 'id-asc') return a.id.localeCompare(b.id);
    if (sortMode === 'id-desc') return b.id.localeCompare(a.id);
    if (sortMode === 'shutter-desc') {
      const getShutterSpeed = s => {
        if (!s || s === 'Bilinmiyor') return -1;
        const clean = s.replace('s', '').trim();
        if (clean.includes('/')) {
          const parts = clean.split('/');
          const num = parseFloat(parts[0]) || 1;
          const den = parseFloat(parts[1]);
          return (den > 0) ? (den / num) : -1;
        }
        const sec = parseFloat(clean);
        return (isNaN(sec) || sec <= 0) ? -1 : (1 / sec);
      };
      return getShutterSpeed(b.exif.shutter) - getShutterSpeed(a.exif.shutter) || a.id.localeCompare(b.id);
    }
    if (sortMode === 'iso-desc') {
      const pi = s => parseInt((s || '').replace(/[^0-9]/g, '')) || 0;
      return pi(b.exif.iso) - pi(a.exif.iso) || a.id.localeCompare(b.id);
    }
    return 0;
  });

  resultCount.textContent = filteredPhotos.length + ' / ' + photos.length + ' sonuç';
  renderGrid();
}

// ═══════════════════════════════════════
// RENDER GRID
// ═══════════════════════════════════════
function renderGrid() {
  galleryGrid.innerHTML = '';
  if (filteredPhotos.length === 0) {
    galleryGrid.innerHTML = '<div class="empty-state">Seçilen kriterlere uygun fotoğraf bulunamadı.</div>';
    return;
  }
  filteredPhotos.forEach((p, idx) => {
    const card = document.createElement('article');
    card.className = 'photo-card';
    card.dataset.id = p.id;
    card.onclick = () => {
      const curIdx = filteredPhotos.findIndex(item => item.id === p.id);
      if (curIdx !== -1) openModal(curIdx);
    };

    const isGold = p.gen_score >= 7.5;
    const isEmerald = p.gen_score >= 6.5 && p.gen_score < 7.5;
    const badgeClass = isGold ? 'gold' : (isEmerald ? 'emerald' : '');
    const isFav = isFavorite(p.id);

    const imgSrc = p.thumbUrl || `thumbs/${p.id}`;
    const fallbackSrc = p.fullUrl || `thumbs/${p.id}`;

    card.innerHTML = `
          <div class="card-frame">
            <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${p.id}" title="${isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}" onclick="event.stopPropagation(); toggleFavorite('${p.id}');">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <div class="card-badges-left"></div>
            <img class="card-img" src="${imgSrc}" loading="lazy" decoding="async" alt="${p.id}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <div class="card-badge ${badgeClass}"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:-1px;margin-right:2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>${p.gen_score.toFixed(1)}</div>
            <div class="card-overlay"><span class="card-overlay-text">Detayları Gör</span></div>
          </div>
          <div class="card-body">
            <div class="card-top-row">
              <span class="card-filename" title="${p.id}">${p.id}</span>
              ${VoteStore.renderPillHtml(p.id)}
            </div>
            <div class="card-exif-row">
              <span>${p.exif.shutter || '-'}</span>
              <span>${p.exif.aperture || '-'}</span>
              <span>${p.exif.iso || '-'}</span>
            </div>
            <p class="card-review">"${p.ozet}"</p>
            <div class="card-meters">
              <div class="mini-meter">
                <div class="mini-meter-header"><span>Teknik</span><strong>${p.tek_score}</strong></div>
                <div class="mini-meter-track"><div class="mini-meter-fill meter-tek" style="width:${p.tek_score * 10}%"></div></div>
              </div>
              <div class="mini-meter">
                <div class="mini-meter-header"><span>Komp</span><strong>${p.komp_score}</strong></div>
                <div class="mini-meter-track"><div class="mini-meter-fill meter-komp" style="width:${p.komp_score * 10}%"></div></div>
              </div>
              <div class="mini-meter">
                <div class="mini-meter-header"><span>Renk</span><strong>${p.col_score}</strong></div>
                <div class="mini-meter-track"><div class="mini-meter-fill meter-col" style="width:${p.col_score * 10}%"></div></div>
              </div>
            </div>
          </div>
        `;
    galleryGrid.appendChild(card);

    // Staggered entrance animation
    setTimeout(() => {
      cardObserver.observe(card);
    }, 10);
  });
}

// Card entrance observer
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 30);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '50px' });

// ═══════════════════════════════════════
// ZERO-RELOAD DYNAMIC DELETE
// ═══════════════════════════════════════
function handlePhotoDeleted(imgName) {
  const card = document.querySelector(`.photo-card[data-id="${imgName}"]`);
  if (card) {
    card.classList.add('deleting');
    setTimeout(() => card.remove(), 360);
  }

  if (favorites.has(imgName)) {
    favorites.delete(imgName);
    saveFavorites();
  }

  const pIdx = photos.findIndex(p => p.id === imgName);
  if (pIdx !== -1) photos.splice(pIdx, 1);

  const fpIdx = filteredPhotos.findIndex(p => p.id === imgName);
  if (fpIdx !== -1) filteredPhotos.splice(fpIdx, 1);

  updateAllStats();

  if (lightbox.classList.contains('open')) {
    if (filteredPhotos.length === 0) {
      closeModal();
    } else {
      if (activeIdx >= filteredPhotos.length) {
        activeIdx = filteredPhotos.length - 1;
      }
      openModal(activeIdx, 'next');
    }
  }

  showToast(`${imgName} başarıyla silindi`);
}

const mDel = document.getElementById('mDelete');
if (mDel) {
  mDel.onclick = () => {
    if (activeIdx < 0 || !filteredPhotos[activeIdx]) return;
    const imgName = filteredPhotos[activeIdx].id;
    if (confirm(imgName + ' dosyasını ve verilerini kalıcı olarak silmek istediğinize emin misiniz?')) {
      fetch('/api/delete?file=' + encodeURIComponent(imgName))
        .then(r => r.json())
        .then(res => {
          if (res.status === 'ok') {
            handlePhotoDeleted(imgName);
          } else {
            showToast('Silme başarısız: ' + (res.error || 'Sunucu hatası'));
          }
        }).catch(e => showToast('Ağ hatası: ' + e));
    }
  };
}

// Zoom & Pan Logic
const modalCanvas = document.getElementById('modalCanvas');
const minimap = document.getElementById('minimap');
const minimapBox = document.getElementById('minimapBox');

mImg.addEventListener('click', (e) => {
  e.stopPropagation();
  mImg.classList.toggle('zoomed');

  if (mImg.classList.contains('zoomed')) {
    const cRect = modalCanvas.getBoundingClientRect();
    minimap.style.width = '200px';
    minimap.style.height = (200 * cRect.height / cRect.width) + 'px';
    minimap.style.backgroundImage = `url(${mImg.src})`;
    minimap.classList.add('visible');

    updatePan(e);
  } else {
    resetZoom();
  }
});

if (modalCanvas) {
  modalCanvas.addEventListener('mousemove', (e) => {
    if (mImg.classList.contains('zoomed')) updatePan(e);
  });
}

function resetZoom() {
  mImg.classList.remove('zoomed');
  if (minimap) minimap.classList.remove('visible');
  mImg.style.setProperty('--x', '50%');
  mImg.style.setProperty('--y', '50%');
}

function updatePan(e) {
  if (!modalCanvas) return;
  const rect = modalCanvas.getBoundingClientRect();
  let x = (e.clientX - rect.left) / rect.width;
  let y = (e.clientY - rect.top) / rect.height;

  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  const xPct = (x * 100).toFixed(2) + '%';
  const yPct = (y * 100).toFixed(2) + '%';

  mImg.style.setProperty('--x', xPct);
  mImg.style.setProperty('--y', yPct);

  if (minimapBox) {
    minimapBox.style.left = xPct;
    minimapBox.style.top = yPct;
  }
}

// LIGHTBOX
// ═══════════════════════════════════════


function openModal(index, direction) {
  activeIdx = index;
  const p = filteredPhotos[index];
  if (!p) return;

  const isAlreadyOpen = lightbox.classList.contains('open');

  const doUpdate = () => {
    mFname.textContent = p.id;
    mCounter.textContent = `[${index + 1} / ${filteredPhotos.length}]`;
    mTur.textContent = p.tur;
    mScore.textContent = p.gen_score.toFixed(1);

    const circ = 2 * Math.PI * 15.5;
    const offset = circ - (circ * (p.gen_score / 10));
    mRadialFill.style.strokeDashoffset = offset;

    mMode.textContent = p.exif.mode || 'Otomatik';
    mShutter.textContent = p.exif.shutter || '-';
    mAperture.textContent = p.exif.aperture || '-';
    mIso.textContent = p.exif.iso || '-';
    mFocal.textContent = p.exif.focal || '-';
    mBias.textContent = p.exif.bias || '-';
    mFlash.textContent = p.exif.flash || '-';
    mDate.textContent = p.exif.date || '-';

    mTekS.textContent = p.tek_score + ' / 10';
    mTekBar.style.width = (p.tek_score * 10) + '%';
    mTekD.textContent = p.tek_desc || '-';

    mKompS.textContent = p.komp_score + ' / 10';
    mKompBar.style.width = (p.komp_score * 10) + '%';
    mKompD.textContent = p.komp_desc || '-';

    mColS.textContent = p.col_score + ' / 10';
    mColBar.style.width = (p.col_score * 10) + '%';
    mColD.textContent = p.col_desc || '-';

    mOzet.textContent = p.ozet;


    const isFav = isFavorite(p.id);
    if (mFavBtn) mFavBtn.classList.toggle('active', isFav);
    if (mFavLabel) mFavLabel.textContent = isFav ? 'Favoride' : 'Favorile';
    VoteStore.updateModalPill(p.id);
  };

  resetZoom();
  closeCompareStage();
  if (mCompare) {
    if (p.pairedId) {
      mCompare.style.display = 'inline-flex';
    } else {
      mCompare.style.display = 'none';
    }
  }
  doUpdate();

  if (!isAlreadyOpen) {
    mImg.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';
    mImg.style.transform = 'translateX(0)';
    const isCloudPhoto = p.source === 'gphotos' || p.source === 'google_photos' || !!p.fullUrl || String(p.id).startsWith('gphoto_');
    mImg.src = (isCloudPhoto && p.fullUrl) ? p.fullUrl : ((isCloudPhoto && p.thumbUrl) ? p.thumbUrl : ('thumbs/' + p.id));
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    direction = direction || 'next';

    const oldImg = mImg.cloneNode();
    oldImg.removeAttribute('id');
    oldImg.classList.remove('zoomed');

    const rect = mImg.getBoundingClientRect();
    const cRect = modalCanvas.getBoundingClientRect();
    oldImg.style.position = 'absolute';
    oldImg.style.top = (rect.top - cRect.top) + 'px';
    oldImg.style.left = (rect.left - cRect.left) + 'px';
    oldImg.style.width = rect.width + 'px';
    oldImg.style.height = rect.height + 'px';
    oldImg.style.margin = '0';
    oldImg.style.objectFit = 'contain';
    oldImg.style.opacity = '1';
    oldImg.style.transform = 'translateX(0)';
    mImg.parentElement.appendChild(oldImg);

    const startX = direction === 'next' ? '150px' : '-150px';
    const endX = direction === 'next' ? '-150px' : '150px';

    mImg.style.transition = 'none';
    mImg.style.transform = `translateX(${startX})`;
    mImg.style.opacity = '0';

    mImg.onload = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mImg.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';
          mImg.style.transform = 'translateX(0)';
          mImg.style.opacity = '1';

          oldImg.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';
          oldImg.style.transform = `translateX(${endX})`;
          oldImg.style.opacity = '0';

          setTimeout(() => {
            if (oldImg.parentElement) oldImg.remove();
          }, 450);
        });
      });
    };
    const isCloudPhoto = p.source === 'gphotos' || p.source === 'google_photos' || !!p.fullUrl || String(p.id).startsWith('gphoto_');
    mImg.src = (isCloudPhoto && p.fullUrl) ? p.fullUrl : ((isCloudPhoto && p.thumbUrl) ? p.thumbUrl : ('thumbs/' + p.id));
  }
}



let slideInterval = null;
function toggleSlide() {
  const btn = document.getElementById('mPlay');
  if (!btn) return;
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span class="btn-text">Slayt</span>';
    btn.style.color = '';
  } else {
    slideInterval = setInterval(nextPhoto, 3000);
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> <span class="btn-text">Durdur</span>';
    btn.style.color = 'var(--gold)';
  }
}

function closeModal() {
  closeCompareStage();
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  activeIdx = -1;
  if (slideInterval) toggleSlide();
}

function nextPhoto() {
  if (activeIdx < filteredPhotos.length - 1) openModal(activeIdx + 1, 'next');
  else openModal(0, 'next');
}
function prevPhoto() {
  if (activeIdx > 0) openModal(activeIdx - 1, 'prev');
  else openModal(filteredPhotos.length - 1, 'prev');
}

// Image zoom toggle


// Finder reveal
function revealInFinder(imgName) {
  fetch('/api/reveal?file=' + encodeURIComponent(imgName))
    .then(r => r.json())
    .then(() => showToast(`Finder'da seçildi: ${imgName}`))
    .catch(() => {
      const fp = '/Users/baris/Desktop/Canon/' + imgName;
      navigator.clipboard.writeText(fp).then(() => showToast('Yol kopyalandı: ' + imgName));
      window.open('../' + imgName, '_blank');
    });
}
const mFinderBtn = document.getElementById('mFinder');
if (mFinderBtn) {
  mFinderBtn.onclick = (e) => {
    e.stopPropagation();
    if (activeIdx >= 0 && filteredPhotos[activeIdx]) revealInFinder(filteredPhotos[activeIdx].id);
  };
}

// ═══════════════════════════════════════
// FEATURE 2: PHOTO PAIRS (BEFORE / AFTER)
// ═══════════════════════════════════════
function buildPhotoPairs(photoList) {
  const editRegex = /^(?:IMG|CRW)_(\d+)_(\d+)\.(?:jpg|jpeg|png)$/i;
  const origRegex = /^(?:IMG|CRW)_(\d+)\.(?:jpg|jpeg|crw)$/i;

  const origMap = new Map();
  const editMap = new Map();

  photoList.forEach(p => {
    p.pairedId = null;
    p.isEdit = false;
    const editMatch = p.id.match(editRegex);
    if (editMatch) {
      p.isEdit = true;
      p.baseNum = editMatch[1];
      if (!editMap.has(editMatch[1])) editMap.set(editMatch[1], []);
      editMap.get(editMatch[1]).push(p);
    } else {
      const origMatch = p.id.match(origRegex);
      if (origMatch) {
        p.baseNum = origMatch[1];
        origMap.set(origMatch[1], p);
      }
    }
  });

  photoList.forEach(p => {
    if (p.isEdit) {
      const orig = origMap.get(p.baseNum);
      if (orig) {
        p.pairedId = orig.id;
        p.beforeId = orig.id;
        p.afterId = p.id;
        if (!orig.pairedId) {
          orig.pairedId = p.id;
          orig.beforeId = orig.id;
          orig.afterId = p.id;
        }
      }
    } else if (p.baseNum && editMap.has(p.baseNum)) {
      const edits = editMap.get(p.baseNum);
      if (edits && edits.length > 0) {
        p.pairedId = edits[0].id;
        p.beforeId = p.id;
        p.afterId = edits[0].id;
      }
    }
  });

  // Özel Tanımlı Eşleşmeler (IMG_0054 ham/IMG_0053 kurgu, IMG_0042 ham/CRW_0062 edit)
  const specialPairs = [
    { before: 'IMG_0054.JPG', after: 'IMG_0053.JPG' },
    { before: 'IMG_0042.JPG', after: 'CRW_0062.jpg' }
  ];
  specialPairs.forEach(sp => {
    const b = photoList.find(x => x.id === sp.before);
    const a = photoList.find(x => x.id === sp.after);
    if (b && a) {
      b.pairedId = a.id;
      b.beforeId = b.id;
      b.afterId = a.id;

      a.pairedId = b.id;
      a.beforeId = b.id;
      a.afterId = a.id;
      a.isEdit = true;
    }
  });

  // pair_id niteliği tanımlanmış fotoğrafları bağla
  photoList.forEach(p => {
    if (p.pair_id && !p.pairedId) {
      const partner = photoList.find(x => x.id === p.pair_id);
      if (partner) {
        const isAfter = p.isEdit || p.is_edit || p.id === 'IMG_0053.JPG';
        p.pairedId = partner.id;
        p.beforeId = isAfter ? partner.id : p.id;
        p.afterId = isAfter ? p.id : partner.id;

        if (!partner.pairedId) {
          partner.pairedId = p.id;
          partner.beforeId = p.beforeId;
          partner.afterId = p.afterId;
        }
      }
    }
  });
}

// Split Stage Drag Logic
let isCompareOpen = false;
let isSplitting = false;

function openCompareStage() {
  if (activeIdx < 0 || !filteredPhotos[activeIdx]) return;
  const p = filteredPhotos[activeIdx];
  if (!p.pairedId) return;

  const bPhoto = photos.find(x => x.id === (p.beforeId || p.id));
  const aPhoto = photos.find(x => x.id === (p.afterId || p.pairedId));
  cmpBeforeImg.src = (bPhoto && bPhoto.fullUrl) ? bPhoto.fullUrl : ((bPhoto && bPhoto.thumbUrl) ? bPhoto.thumbUrl : ('thumbs/' + (p.beforeId || p.id)));
  cmpAfterImg.src = (aPhoto && aPhoto.fullUrl) ? aPhoto.fullUrl : ((aPhoto && aPhoto.thumbUrl) ? aPhoto.thumbUrl : ('thumbs/' + (p.afterId || p.pairedId)));
  cmpContainer.style.setProperty('--split-x', '50%');

  compareStage.style.display = 'flex';
  mImg.style.display = 'none';
  if (minimap) minimap.classList.remove('visible');
  isCompareOpen = true;
  mCompare.classList.add('active');
  mCompare.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> <span class="btn-text">Karşılaştırmadan Çık</span>';
}

function closeCompareStage() {
  if (!isCompareOpen) return;
  compareStage.style.display = 'none';
  mImg.style.display = 'block';
  isCompareOpen = false;
  if (mCompare) {
    mCompare.classList.remove('active');
    mCompare.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"></path></svg> <span class="btn-text">Karşılaştır</span>';
  }
}

function toggleCompareMode() {
  if (isCompareOpen) closeCompareStage();
  else openCompareStage();
}

if (mCompare) {
  mCompare.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCompareMode();
  });
}

function setSplitPosition(clientX) {
  if (!cmpContainer) return;
  const rect = cmpContainer.getBoundingClientRect();
  let x = clientX - rect.left;
  let pct = (x / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  cmpContainer.style.setProperty('--split-x', pct + '%');
}

if (splitBar && cmpContainer) {
  splitBar.addEventListener('pointerdown', (e) => {
    isSplitting = true;
    splitBar.setPointerCapture(e.pointerId);
    setSplitPosition(e.clientX);
    e.preventDefault();
  });

  splitBar.addEventListener('pointermove', (e) => {
    if (isSplitting) setSplitPosition(e.clientX);
  });

  splitBar.addEventListener('pointerup', (e) => {
    isSplitting = false;
    try { splitBar.releasePointerCapture(e.pointerId); } catch (_) { }
  });

  splitBar.addEventListener('pointercancel', () => { isSplitting = false; });

  cmpContainer.addEventListener('pointerdown', (e) => {
    isSplitting = true;
    cmpContainer.setPointerCapture(e.pointerId);
    setSplitPosition(e.clientX);
  });

  cmpContainer.addEventListener('pointermove', (e) => {
    if (isSplitting) setSplitPosition(e.clientX);
  });

  cmpContainer.addEventListener('pointerup', (e) => {
    isSplitting = false;
    try { cmpContainer.releasePointerCapture(e.pointerId); } catch (_) { }
  });

  cmpContainer.addEventListener('pointercancel', () => { isSplitting = false; });
}

// ═══════════════════════════════════════
// FEATURE 4: BATCH DOWNLOAD (EXPORT TO ZIP)
// ═══════════════════════════════════════
async function downloadZip(photoList, zipFilename) {
  if (!photoList || photoList.length === 0) {
    showToast('İndirilecek fotoğraf bulunamadı');
    return;
  }

  showToast(`${photoList.length} fotoğraf paketleniyor (0/${photoList.length})...`);

  if (typeof JSZip === 'undefined') {
    for (let i = 0; i < photoList.length; i++) {
      downloadSinglePhoto(photoList[i]);
      await new Promise(r => setTimeout(r, 400));
    }
    return;
  }

  const zip = new JSZip();
  let completed = 0;

  for (const p of photoList) {
    const url = p.fullUrl || p.thumbUrl || ('thumbs/' + p.id);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      zip.file(p.id, blob);
      completed++;
    } catch (e) {
      try {
        const fallbackRes = await fetch('thumbs/' + p.id);
        if (fallbackRes.ok) {
          const blob = await fallbackRes.blob();
          zip.file(p.id, blob);
          completed++;
        }
      } catch (err) { }
    }
    if (completed % 2 === 0 || completed === photoList.length) {
      showToast(`${photoList.length} fotoğraf paketleniyor (${completed}/${photoList.length})...`);
    }
  }

  if (completed === 0) {
    showToast('Fotoğraflar indirilemedi');
    return;
  }

  showToast('Zip arşivi derleniyor...');
  try {
    const content = await zip.generateAsync({ type: 'blob' });
    const blobUrl = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = zipFilename || 'canon-a570is-fotograflar.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    showToast(`${zipFilename} başarıyla indirildi!`);
  } catch (err) {
    showToast('Zip oluşturma hatası: ' + err.message);
  }
}

if (exportBtn && exportDropdown) {
  exportBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = exportWrap.classList.toggle('open');
    exportBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  if (exportDropdown) {
    exportDropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.export-option');
      if (!opt) return;
      e.stopPropagation();

      exportWrap.classList.remove('open');
      exportBtn.setAttribute('aria-expanded', 'false');

      const type = opt.dataset.export;

      if (type === 'favorites') {
        const favPhotos = photos.filter(p => favorites.has(p.id));
        if (favPhotos.length === 0) {
          showToast('Henüz favorilere eklenmiş fotoğraf yok');
          return;
        }
        downloadZip(favPhotos, 'canon-a570is-favoriler.zip');
      } else if (type === 'stars') {
        const starPhotos = photos.filter(p => p.gen_score >= 7.0);
        if (starPhotos.length === 0) {
          showToast('7+ yıldızlı fotoğraf bulunamadı');
          return;
        }
        downloadZip(starPhotos, 'canon-a570is-yildizli-7plus.zip');
      } else if (type === 'filtered') {
        if (filteredPhotos.length === 0) {
          showToast('Filtrelenmiş fotoğraf bulunamadı');
          return;
        }
        downloadZip(filteredPhotos, 'canon-a570is-filtrelenmis.zip');
      } else if (type === 'gphotos') {
        window.open('https://photos.app.goo.gl/khfqeM93BRyGCsqD9', '_blank');
        showToast('Google Fotoğraflar Albümü açıldı');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (exportWrap && !exportWrap.contains(e.target)) {
      exportWrap.classList.remove('open');
      exportBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ═══════════════════════════════════════
// FEATURE 5: ANALYTICS MODAL & LENS GUIDE
// ═══════════════════════════════════════
function openAnalyticsModal() {
  if (!analyticsModal) return;
  renderAnalytics();
  analyticsModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnalyticsModal() {
  if (!analyticsModal) return;
  analyticsModal.classList.remove('open');
  if (!lightbox.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

if (navAnalyticsBtn) navAnalyticsBtn.onclick = openAnalyticsModal;
if (analyticsCloseBtn) analyticsCloseBtn.onclick = closeAnalyticsModal;
if (analyticsModal) {
  analyticsModal.onclick = (e) => {
    if (e.target === analyticsModal) closeAnalyticsModal();
  };
}

function renderAnalytics() {
  if (!photos || photos.length === 0) return;

  // 1. Lens Sweet Spot
  const comboMap = new Map();
  photos.forEach(p => {
    const f = (p.exif && p.exif.focal) ? p.exif.focal : '23.2mm';
    const a = (p.exif && p.exif.aperture) ? p.exif.aperture : 'f/5.5';
    const key = `${f} @ ${a}`;
    if (!comboMap.has(key)) comboMap.set(key, { count: 0, totalScore: 0, name: key });
    const entry = comboMap.get(key);
    entry.count++;
    entry.totalScore += p.gen_score;
  });
  let bestCombo = null;
  comboMap.forEach(v => {
    v.avg = v.totalScore / v.count;
    if (v.count >= 2) {
      if (!bestCombo || v.avg > bestCombo.avg) bestCombo = v;
    }
  });
  if (!bestCombo && comboMap.size > 0) {
    bestCombo = Array.from(comboMap.values()).sort((a, b) => b.avg - a.avg)[0];
  }
  const sweetSpotEl = document.getElementById('kpiSweetSpot');
  const sweetSpotSub = document.getElementById('kpiSweetSpotSub');
  if (sweetSpotEl && bestCombo) {
    sweetSpotEl.textContent = bestCombo.name;
    sweetSpotSub.textContent = `Ortalama ${bestCombo.avg.toFixed(1)} / 10 (${bestCombo.count} kare)`;
  }

  // 2. Shutter Safety (>= 1/60s)
  let safeCount = 0;
  let shutterCount = 0;
  photos.forEach(p => {
    const s = p.exif && p.exif.shutter;
    if (s && s !== 'Bilinmiyor') {
      shutterCount++;
      const clean = s.replace('s', '').trim();
      let sec = 0;
      if (clean.includes('/')) {
        const parts = clean.split('/');
        sec = (parseFloat(parts[0]) || 1) / (parseFloat(parts[1]) || 1);
      } else {
        sec = parseFloat(clean) || 0;
      }
      if (sec <= 1 / 59.9) safeCount++;
    }
  });
  const safePct = shutterCount ? Math.round((safeCount / shutterCount) * 100) : 0;
  const kpiShutterSafe = document.getElementById('kpiShutterSafe');
  const kpiShutterSafeSub = document.getElementById('kpiShutterSafeSub');
  if (kpiShutterSafe) {
    kpiShutterSafe.textContent = `%${safePct}`;
    kpiShutterSafeSub.textContent = `${safeCount} / ${shutterCount} kare ≥ 1/60s`;
  }

  // 3. CCD Color Purity
  let ccdCount = 0;
  photos.forEach(p => {
    const isoStr = (p.exif && p.exif.iso) ? p.exif.iso.toUpperCase() : '';
    if (isoStr.includes('80') || isoStr.includes('100') || isoStr.includes('75')) {
      ccdCount++;
    }
  });
  const ccdPct = Math.round((ccdCount / photos.length) * 100);
  const kpiCcdPure = document.getElementById('kpiCcdPure');
  const kpiCcdPureSub = document.getElementById('kpiCcdPureSub');
  if (kpiCcdPure) {
    kpiCcdPure.textContent = `%${ccdPct}`;
    kpiCcdPureSub.textContent = `${ccdCount} kare ISO 80/100`;
  }

  // 4. Peak Curator Score
  let maxScore = 0;
  let topPhoto = null;
  photos.forEach(p => {
    if (p.gen_score > maxScore) {
      maxScore = p.gen_score;
      topPhoto = p;
    }
  });
  const kpiPeakScore = document.getElementById('kpiPeakScore');
  const kpiPeakPhoto = document.getElementById('kpiPeakPhoto');
  if (kpiPeakScore) {
    kpiPeakScore.textContent = `${maxScore.toFixed(1)} / 10`;
    kpiPeakPhoto.textContent = topPhoto ? topPhoto.id : 'Zirve rekor';
  }

  // Focal Length Distribution
  const focalGroups = [
    {
      label: 'Geniş Açı (5.8mm)', filter: p => {
        const f = parseFloat(p.exif && p.exif.focal);
        return !isNaN(f) && f <= 6.5;
      }, photos: []
    },
    {
      label: 'Orta Odak (7.0 - 17.0mm)', filter: p => {
        const f = parseFloat(p.exif && p.exif.focal);
        return !isNaN(f) && f > 6.5 && f < 20.0;
      }, photos: []
    },
    {
      label: 'Telefoto (23.2mm)', filter: p => {
        const f = parseFloat(p.exif && p.exif.focal);
        return !isNaN(f) && f >= 20.0;
      }, photos: []
    }
  ];

  focalGroups.forEach(g => {
    g.photos = photos.filter(g.filter);
    g.count = g.photos.length;
    g.pct = Math.round((g.count / photos.length) * 100);
    g.avg = g.count ? (g.photos.reduce((s, p) => s + p.gen_score, 0) / g.count).toFixed(1) : '0';
  });

  const focalDistList = document.getElementById('focalDistList');
  if (focalDistList) {
    focalDistList.innerHTML = focalGroups.map(g => `
          <div class="dist-item">
            <div class="dist-header">
              <span class="dist-name">${g.label}</span>
              <span class="dist-stats"><strong>${g.count} kare</strong> (%${g.pct}) · Ort. ${g.avg}</span>
            </div>
            <div class="dist-bar-track">
              <div class="dist-bar-fill focal" style="width: ${g.pct}%"></div>
            </div>
          </div>
        `).join('');
  }

  // Aperture Sweet Spot
  const apGroups = [
    {
      label: 'f/2.6 – f/3.5 (Açık / Düşük Işık)', filter: p => {
        const ap = parseFloat((p.exif && p.exif.aperture ? p.exif.aperture.replace('f/', '') : '0'));
        return ap > 0 && ap <= 3.5;
      }, photos: []
    },
    {
      label: 'f/4.0 – f/5.6 (Tatlı Nokta / Keskinlik)', filter: p => {
        const ap = parseFloat((p.exif && p.exif.aperture ? p.exif.aperture.replace('f/', '') : '0'));
        return ap > 3.5 && ap <= 5.8;
      }, photos: []
    },
    {
      label: 'f/6.3 – f/8.0 (Derin Alan)', filter: p => {
        const ap = parseFloat((p.exif && p.exif.aperture ? p.exif.aperture.replace('f/', '') : '0'));
        return ap > 5.8;
      }, photos: []
    }
  ];

  apGroups.forEach(g => {
    g.photos = photos.filter(g.filter);
    g.count = g.photos.length;
    g.pct = Math.round((g.count / photos.length) * 100);
    g.avg = g.count ? (g.photos.reduce((s, p) => s + p.gen_score, 0) / g.count).toFixed(1) : '0';
  });

  const apertureDistList = document.getElementById('apertureDistList');
  if (apertureDistList) {
    apertureDistList.innerHTML = apGroups.map(g => `
          <div class="dist-item">
            <div class="dist-header">
              <span class="dist-name">${g.label}</span>
              <span class="dist-stats"><strong>${g.count} kare</strong> (%${g.pct}) · Ort. ${g.avg}</span>
            </div>
            <div class="dist-bar-track">
              <div class="dist-bar-fill aperture" style="width: ${g.pct}%"></div>
            </div>
          </div>
        `).join('');
  }

  // Insights
  const insightsGrid = document.getElementById('insightsGrid');
  if (insightsGrid) {
    const editPhotos = photos.filter(p => /(?:IMG|CRW)_\d+_\d+/.test(p.id));
    const origPhotos = photos.filter(p => !/(?:IMG|CRW)_\d+_\d+/.test(p.id));
    const editAvg = editPhotos.length ? (editPhotos.reduce((s, p) => s + p.gen_score, 0) / editPhotos.length) : 0;
    const origAvg = origPhotos.length ? (origPhotos.reduce((s, p) => s + p.gen_score, 0) / origPhotos.length) : 0;
    const editDiff = (editAvg - origAvg).toFixed(1);

    insightsGrid.innerHTML = `
          <div class="insight-card">
            <div class="insight-header">
              <span class="insight-tag">Optik Sweet Spot</span>
            </div>
            <p class="insight-text">
              Portfolyoda en yüksek başarı <strong>${bestCombo ? bestCombo.name : '23.2mm @ f/5.5'}</strong> ayarında yakalanmış. Telefoto odak uzaklığının oluşturduğu katmanlı perspektif, kompozisyonel netliği doğrudan artırıyor.
            </p>
          </div>

          <div class="insight-card ${safePct >= 80 ? 'emerald' : ''}">
            <div class="insight-header">
              <span class="insight-tag">Enstantane & Netlik</span>
            </div>
            <p class="insight-text">
              Fotoğraflarınızın <strong>%${safePct}'si</strong> güvenli enstantane hızında. 1/60s altındaki düşük ışık çekimlerinde el titremesi (camera shake) tespit edildi; gece sahnelerinde mutlaka sabit bir zemin veya 2s zamanlayıcı tercih edilmelidir.
            </p>
          </div>

          <div class="insight-card blue">
            <div class="insight-header">
              <span class="insight-tag">CCD Renk Karakteri</span>
            </div>
            <p class="insight-text">
              Koleksiyonun <strong>%${ccdPct}'i</strong> saf ISO 80/100 bandında. Canon Digic III CCD sensörün nostaljik renk geçişleri ve pürüzsüz ton skalası, yüksek ISO parazitinden uzak tutulduğunda benzersiz bir analog estetik sunuyor.
            </p>
          </div>

          <div class="insight-card emerald">
            <div class="insight-header">
              <span class="insight-tag">Küratöryel Edit Katkısı</span>
            </div>
            <p class="insight-text">
              Özel olarak düzenlenen ve fine-art renk profili uygulanan kareler, ham çekimlere göre <strong>+${Math.abs(editDiff)} puan</strong> daha yüksek ortalamaya (${editAvg.toFixed(1)} vs ${origAvg.toFixed(1)}) ulaşıyor. Doğru renk düzenlemesi fotoğrafın gücünü katlıyor.
            </p>
          </div>
        `;
  }
}

// ═══════════════════════════════════════
// FEATURE 6: LEARNING & WORKSHOP MODAL
// ═══════════════════════════════════════
const learningModal = document.getElementById('learningModal');
const navLearningBtn = document.getElementById('navLearningBtn');
const learningCloseBtn = document.getElementById('learningCloseBtn');
const learningTabsBar = document.getElementById('learningTabsBar');

function openLearningModal() {
  if (!learningModal) return;
  learningModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLearningModal() {
  if (!learningModal) return;
  learningModal.classList.remove('open');
  if (!lightbox.classList.contains('open') && (!analyticsModal || !analyticsModal.classList.contains('open'))) {
    document.body.style.overflow = '';
  }
}

if (navLearningBtn) navLearningBtn.onclick = openLearningModal;
if (learningCloseBtn) learningCloseBtn.onclick = closeLearningModal;
if (learningModal) {
  learningModal.onclick = (e) => {
    if (e.target === learningModal) closeLearningModal();
  };
}

// Tabs Filtering in Learning Modal
if (learningTabsBar) {
  learningTabsBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.learning-tab');
    if (!btn) return;
    learningTabsBar.querySelectorAll('.learning-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;

    const sections = document.querySelectorAll('.learning-section');
    sections.forEach(sec => {
      if (tab === 'all') {
        sec.style.display = 'block';
      } else {
        sec.style.display = sec.dataset.section === tab ? 'block' : 'none';
      }
    });
  });
}

// Open Photo in Lightbox by ID
function openModalById(id) {
  closeLearningModal();
  // Ensure photo is accessible in filteredPhotos
  const existsInFiltered = filteredPhotos.some(p => p.id === id);
  if (!existsInFiltered) {
    activeFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (filterChips) {
      filterChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
    }
    filterAndSort();
  }

  const targetIdx = filteredPhotos.findIndex(p => p.id === id);
  if (targetIdx !== -1) {
    openModal(targetIdx);
    showToast(`${id} galeride açıldı`);
  } else {
    showToast(`${id} galeride bulunamadı`);
  }
}

// Open Compare Stage directly for two photos
function openCompareForPhotos(origId, editId) {
  closeLearningModal();
  activeFilter = 'all';
  searchQuery = '';
  if (searchInput) searchInput.value = '';
  if (filterChips) {
    filterChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
  }
  filterAndSort();

  const targetIdx = filteredPhotos.findIndex(p => p.id === editId || p.id === origId);
  if (targetIdx !== -1) {
    openModal(targetIdx);
    setTimeout(() => {
      openCompareStage();
      showToast(`${origId} ile ${editId} karşılaştırılıyor`);
    }, 120);
  } else {
    showToast('Fotoğraflar bulunamadı');
  }
}

// Copy Recipe to Clipboard
function copyRecipe(name, text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`"${name}" reçetesi panoya kopyalandı!`);
    }).catch(() => {
      fallbackCopyText(text, name);
    });
  } else {
    fallbackCopyText(text, name);
  }
}

function fallbackCopyText(text, name) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(`"${name}" reçetesi panoya kopyalandı!`);
  } catch (err) {
    showToast('Kopyalama başarısız oldu');
  }
  document.body.removeChild(ta);
}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ═══════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════
searchInput.addEventListener('input', e => { searchQuery = e.target.value.trim(); filterAndSort(); });

filterChips.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  filterAndSort();
});

function downloadSinglePhoto(photo) {
  if (!photo) return;
  const url = photo.fullUrl || photo.thumbUrl || ('thumbs/' + photo.id);
  showToast(`Fotoğraf indiriliyor: ${photo.id}...`);
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('Network error');
      return r.blob();
    })
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = photo.id;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      showToast(`${photo.id} başarıyla indirildi`);
    })
    .catch(() => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = photo.id;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`${photo.id} yeni sekmede açıldı`);
    });
}

if (mFavBtn) {
  mFavBtn.onclick = (e) => {
    e.stopPropagation();
    if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
      toggleFavorite(filteredPhotos[activeIdx].id);
    }
  };
}

if (mDownload) {
  mDownload.onclick = (e) => {
    e.stopPropagation();
    if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
      downloadSinglePhoto(filteredPhotos[activeIdx]);
    }
  };
}

document.getElementById('mPrev').onclick = e => { e.stopPropagation(); prevPhoto(); };
document.getElementById('mNext').onclick = e => { e.stopPropagation(); nextPhoto(); };
document.getElementById('mClose').onclick = closeModal;
document.getElementById('mPlay').onclick = toggleSlide;
lightbox.onclick = e => { if (e.target === lightbox) closeModal(); };

// Keyboard shortcuts
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && sortCustomSelect && sortCustomSelect.classList.contains('open')) {
    sortCustomSelect.classList.remove('open');
    if (sortTrigger) sortTrigger.setAttribute('aria-expanded', 'false');
    return;
  }

  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

  if (lightbox.classList.contains('open')) {
    if (e.key === 'Escape') {
      if (isCompareOpen) { closeCompareStage(); return; }
      closeModal();
      return;
    }
    if (e.key === 'c' || e.key === 'C') {
      if (filteredPhotos[activeIdx] && filteredPhotos[activeIdx].pairedId) {
        toggleCompareMode();
      }
      return;
    }
    if (e.key === 'd' || e.key === 'D') {
      if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
        downloadSinglePhoto(filteredPhotos[activeIdx]);
      }
      return;
    }
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.code === 'Space') { e.preventDefault(); toggleSlide(); }
    if (e.key === 'f' || e.key === 'F') {
      if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
        toggleFavorite(filteredPhotos[activeIdx].id);
      }
    }
    return;
  }

  if (document.getElementById('kbdModal').classList.contains('open')) {
    if (e.key === 'Escape' || e.key === '?') document.getElementById('kbdModal').classList.remove('open');
    return;
  }

  if (e.key === 'Escape') {
    if (analyticsModal && analyticsModal.classList.contains('open')) {
      closeAnalyticsModal();
      return;
    }
    if (learningModal && learningModal.classList.contains('open')) {
      closeLearningModal();
      return;
    }
  }

  if (isInput) return;

  if (e.key === 'a' || e.key === 'A') {
    if (analyticsModal && analyticsModal.classList.contains('open')) closeAnalyticsModal();
    else openAnalyticsModal();
    return;
  }
  if (e.key === 'l' || e.key === 'L') {
    if (learningModal && learningModal.classList.contains('open')) closeLearningModal();
    else openLearningModal();
    return;
  }
  if (e.key === 't' || e.key === 'T') document.getElementById('themeBtn').click();
  if (e.key === '/') { e.preventDefault(); searchInput.focus(); }
  if (e.key === 'v' || e.key === 'V') {
    const next = viewMode === 'grid' ? 'list' : 'grid';
    document.querySelector(`.view-btn[data-view="${next}"]`).click();
  }
  if (e.key === '?') document.getElementById('kbdModal').classList.add('open');
});

document.getElementById('kbdBtn').onclick = () => document.getElementById('kbdModal').classList.toggle('open');


// ═══════════════════════════════════════
// MODAL VOTE BUTTONS & TOUCH SWIPE ENGINE
// ═══════════════════════════════════════
const mUpBtn = document.getElementById('mUpBtn');
const mDownBtn = document.getElementById('mDownBtn');
if (mUpBtn) {
  mUpBtn.onclick = (e) => {
    e.stopPropagation();
    if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
      VoteStore.castVote(filteredPhotos[activeIdx].id, 1, e);
    }
  };
}
if (mDownBtn) {
  mDownBtn.onclick = (e) => {
    e.stopPropagation();
    if (activeIdx >= 0 && filteredPhotos[activeIdx]) {
      VoteStore.castVote(filteredPhotos[activeIdx].id, -1, e);
    }
  };
}

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchEndX = 0;
let touchEndY = 0;
let isSwiping = false;

function toggleImmersiveMode() {
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.toggle('immersive-mode');
}

if (modalCanvas) {
  modalCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    if (mImg.classList.contains('zoomed') || isCompareOpen) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    touchEndX = touchStartX;
    touchEndY = touchStartY;
    isSwiping = true;
  }, { passive: true });

  modalCanvas.addEventListener('touchmove', (e) => {
    if (!isSwiping || e.touches.length > 1) return;
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
  }, { passive: true });

  modalCanvas.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const duration = Date.now() - touchStartTime;

    if (absX < 14 && absY < 14 && duration < 320) {
      if (!e.target.closest('button') && !e.target.closest('.reddit-vote-pill')) {
        toggleImmersiveMode();
      }
      return;
    }

    if (deltaY > 90 && deltaY > absX * 1.3) {
      closeModal();
      return;
    }

    if (deltaX < -50 && absX > absY * 1.2) {
      nextPhoto();
      return;
    }

    if (deltaX > 50 && absX > absY * 1.2) {
      prevPhoto();
      return;
    }
  }, { passive: true });
}

// Reset immersive mode on modal close
const prevCloseModalFunc = closeModal;
closeModal = function () {
  lightbox.classList.remove('immersive-mode');
  prevCloseModalFunc();
};

// ═══════════════════════════════════════
// MOBILE BOTTOM NAV & POPULAR LOGIC
// ═══════════════════════════════════════
function updateBottomNavActive(navId) {
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.nav === navId);
  });
}

function activatePopularSort() {
  sortMode = 'votes-desc';
  activeFilter = 'popular';

  if (sortCurrentIcon) sortCurrentIcon.textContent = '';
  if (sortCurrentLabel) sortCurrentLabel.textContent = 'En Çok Oy Alanlar';

  if (sortDropdown) {
    sortDropdown.querySelectorAll('.select-option').forEach(opt => {
      const match = opt.dataset.value === 'votes-desc';
      opt.classList.toggle('active', match);
      opt.setAttribute('aria-selected', match ? 'true' : 'false');
    });
  }

  if (filterChips) {
    filterChips.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('active', c.dataset.filter === 'popular');
    });
  }

  updateBottomNavActive('popular');
  filterAndSort();

  const target = document.getElementById('controlsSection') || document.getElementById('galleryGrid');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showToast('En çok oy alan popüler fotoğraflar listelendi');
}

const bottomNav = document.getElementById('bottomNav');
if (bottomNav) {
  bottomNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.bottom-nav-item');
    if (!btn) return;
    const nav = btn.dataset.nav;

    if (nav === 'gallery') {
      activeFilter = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (filterChips) {
        filterChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
      }
      updateBottomNavActive('gallery');
      filterAndSort();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'favorites') {
      activeFilter = 'favorite';
      if (filterChips) {
        filterChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'favorite'));
      }
      updateBottomNavActive('favorites');
      filterAndSort();
      const target = document.getElementById('controlsSection') || document.getElementById('galleryGrid');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (nav === 'popular') {
      activatePopularSort();
    } else if (nav === 'learning') {
      openLearningModal();
      updateBottomNavActive('learning');
    } else if (nav === 'analytics') {
      openAnalyticsModal();
      updateBottomNavActive('analytics');
    }
  });
}

// Filter Chips: update active state on bottom nav if needed
if (filterChips) {
  filterChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    if (btn.dataset.filter === 'popular') {
      activatePopularSort();
    } else if (btn.dataset.filter === 'favorite') {
      updateBottomNavActive('favorites');
    } else {
      updateBottomNavActive('gallery');
    }
  });
}

// Mobile Header Search Button Click
const mobileSearchBtn = document.getElementById('mobileSearchBtn');
if (mobileSearchBtn) {
  mobileSearchBtn.addEventListener('click', () => {
    const controls = document.getElementById('controlsSection');
    if (controls) controls.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 250);
  });
}

// Update bottom nav badge when favorites change
const originalSaveFavs = saveFavorites;
saveFavorites = function () {
  originalSaveFavs();
  const bNavBadge = document.getElementById('bNavFavBadge');
  if (bNavBadge) {
    bNavBadge.textContent = favorites.size;
    bNavBadge.style.display = favorites.size > 0 ? 'inline-block' : 'none';
  }
};


function applyTagSearch(tag) {
  if (lightbox && lightbox.classList.contains('open')) {
    closeModal();
  }
  activeFilter = 'all';
  searchQuery = tag;
  if (searchInput) {
    searchInput.value = tag;
    searchInput.focus();
  }
  if (filterChips) {
    filterChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
  }
  filterAndSort();
  showToast(`"${tag}" etiketine göre filtrelendi`);
}

function copyHexColor(hex) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(hex).then(() => {
      showToast(`Renk kodu kopyalandı: ${hex}`);
    });
  } else {
    showToast(`Renk: ${hex}`);
  }
}


// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
buildPhotoPairs(photos);
initFavorites();
VoteStore.init();
filterAndSort();
updateAllStats();
