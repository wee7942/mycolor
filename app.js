/**
 * 오늘 마음의 색깔은? | Wee Class 웹사이트 스크립트
 */

const ADMIN_PIN = "7942";
const STORAGE_KEY_POSTS = "wee_heart_color_posts_v1";
const STORAGE_KEY_FIREBASE = "wee_heart_firebase_config_v1";

// 선생님의 wee-color 파이어베이스 기본 연동 설정
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyB_jtM931uKpGUc9wxLo5s_9wDRBj7XMwE",
  authDomain: "wee-color.firebaseapp.com",
  projectId: "wee-color",
  storageBucket: "wee-color.firebasestorage.app",
  messagingSenderId: "655020876661",
  appId: "1:655020876661:web:39269670dcf0eb374e293c"
};

const HEART_COLORS = [
  {
    id: "red",
    name: "빨간색",
    emoji: "❤️",
    hex: "#ef4444",
    softBg: "#fff1f2",
    stroke: "#dc2626",
    emotions: ["사랑", "열정", "분노", "짜증", "설렘", "에너지"],
    guide: "주변에서 빨간색이 들어간 물건이나 풍경을 찾아 찍어보세요!"
  },
  {
    id: "orange",
    name: "주황색",
    emoji: "🧡",
    hex: "#f97316",
    softBg: "#fff7ed",
    stroke: "#ea580c",
    emotions: ["활기", "신남", "기대감", "긴장", "따뜻함", "용기"],
    guide: "주변에서 주황색이나 따뜻한 빛깔이 담긴 순간을 찍어보세요!"
  },
  {
    id: "yellow",
    name: "노란색",
    emoji: "💛",
    hex: "#eab308",
    softBg: "#fefce8",
    stroke: "#ca8a04",
    emotions: ["희망", "행복", "기쁨", "부러움", "뿌듯함", "반가움"],
    guide: "주변에서 노란색이 들어간 밝고 귀여운 순간을 찍어보세요!"
  },
  {
    id: "green",
    name: "초록색",
    emoji: "💚",
    hex: "#22c55e",
    softBg: "#f0fdf4",
    stroke: "#16a34a",
    emotions: ["편안함", "평온", "안정", "휴식", "여유", "회복"],
    guide: "주변의 나무, 화분, 혹은 초록색 물건을 찾아 찍어보세요!"
  },
  {
    id: "blue",
    name: "파란색",
    emoji: "💙",
    hex: "#3b82f6",
    softBg: "#eff6ff",
    stroke: "#2563eb",
    emotions: ["우울함", "슬픔", "차분함", "상쾌함", "그리움", "진지함"],
    guide: "하늘이나 파란색 소품 등 내 마음과 닮은 파란빛을 찍어보세요!"
  },
  {
    id: "purple",
    name: "보라색",
    emoji: "💜",
    hex: "#a855f7",
    softBg: "#faf5ff",
    stroke: "#9333ea",
    emotions: ["불안", "걱정", "외로움", "신비로움", "고민", "섬세함"],
    guide: "보라색 물건이나 오묘한 분위기가 담긴 장면을 찍어보세요!"
  },
  {
    id: "white",
    name: "흰색",
    emoji: "🤍",
    hex: "#94a3b8",
    fillHex: "#ffffff",
    softBg: "#f8fafc",
    stroke: "#64748b",
    emotions: ["아무생각 없음", "비움", "후련함", "순수", "새출발", "멍함"],
    guide: "하얀 종이, 구름, 우유 등 깨끗한 흰색이 담긴 사진을 찍어보세요!"
  },
  {
    id: "black",
    name: "검은색",
    emoji: "🖤",
    hex: "#334155",
    fillHex: "#1e293b",
    softBg: "#f1f5f9",
    stroke: "#0f172a",
    emotions: ["지침", "무기력", "스트레스", "답답함", "피곤함", "혼자있고 싶음"],
    guide: "검은색 소품이나 그림자 등 지금 내 마음을 표현하는 사진을 찍어보세요!"
  }
];

const PRESCRIPTIONS = [
  {
    colors: ["red", "black", "purple"],
    quote: "화가 나거나 마음이 답답할 땐, 내 마음이 '나 지금 힘들어, 나를 좀 돌봐줘'라고 보내는 신호예요. 잠시 멈춰도 괜찮아요.",
    author: "위클래스 마음 편지",
    methodTitle: "🌬️ 감정의 온도를 낮추는 '4-7-8 호흡법'",
    methodDesc: "코로 4초 동안 천천히 숨을 들이마시고, 7초 동안 숨을 멈춘 뒤, 입으로 8초 동안 '후-' 소리를 내며 길게 내쉬어 보세요. 3번만 반복해도 심장 박동이 차분해지고 화와 긴장이 가라앉아요."
  },
  {
    colors: ["blue", "purple", "black"],
    quote: "비 오는 날이 있어야 무지개도 뜨고 나무도 자라나듯, 우울하고 슬픈 날도 우리 삶에 꼭 필요한 자연스러운 날씨랍니다.",
    author: "위클래스 마음 편지",
    methodTitle: "🦋 나를 토닥이는 '나비 포옹법 (Butterfly Hug)'",
    methodDesc: "두 팔을 가슴 앞에서 교차해 양손을 양쪽 어깨에 올린 뒤, 나비가 날개짓하듯 번갈아 가며 내 어깨를 토닥토닥 다독여 주세요. '오늘도 잘 버텼어, 괜찮아'라고 속삭여 주면 불안과 슬픔이 한결 줄어듭니다."
  },
  {
    colors: ["white", "green"],
    quote: "아무 생각 없이 멍하니 있는 시간은 멈춘 시간이 아니라, 내 마음의 배터리를 조용히 충전하는 가장 소중한 시간이에요.",
    author: "위클래스 마음 편지",
    methodTitle: "👀 지금 여기에 머무는 '5-4-3-2-1 감각 깨우기'",
    methodDesc: "주변에서 눈에 보이는 것 5가지, 손으로 만져지는 느낌 4가지, 들리는 소리 3가지, 맡아지는 냄새 2가지, 입안의 느낌 1가지를 천천히 찾아보세요. 복잡한 머릿속이 맑아지고 편안함이 찾아옵니다."
  },
  {
    colors: ["red", "orange", "yellow"],
    quote: "오늘 당신의 마음속에 반짝이는 그 따뜻한 에너지가 주변 친구들에게도 기분 좋은 햇살처럼 전해질 거예요!",
    author: "위클래스 마음 편지",
    methodTitle: "📝 행복을 오래 남기는 '감정 저금통 기법'",
    methodDesc: "기분 좋은 일이 있을 때 그 순간의 소리, 풍경, 기분을 머릿속으로 사진 찍듯 5초간 가만히 음미해 보세요. 우리 뇌는 음미한 긍정적 감정을 훨씬 더 깊고 오래 기억한답니다."
  },
  {
    colors: ["all"],
    quote: "세상에 나쁜 감정은 하나도 없어요. 모든 감정은 잠시 머물다 가는 손님일 뿐이니, 있는 그대로 내 마음을 안아주세요.",
    author: "위클래스 마음 약국",
    methodTitle: "🏷️ 감정에 이름표 붙여주기 (Affect Labeling)",
    methodDesc: "마음이 복잡할 때는 '아, 내가 지금 속상하구나', '내가 지금 긴장했구나' 하고 내 감정을 제3자처럼 말로 불러보세요. 감정에 이름표를 붙여주는 것만으로도 뇌의 흥분이 가라앉고 감정을 조절하기 쉬워집니다."
  },
  {
    colors: ["all"],
    quote: "오늘 하루가 완벽하지 않아도 괜찮아요. 숨 쉬고, 느끼고, 이렇게 내 마음을 돌아본 것만으로도 이미 충분히 멋진 하루예요.",
    author: "위클래스 마음 약국",
    methodTitle: "✊ 주먹 쥐었다 펴기 '근육 이완법'",
    methodDesc: "양손 주먹을 5초 동안 온 힘을 다해 꽉 쥐었다가, '툭!' 하고 한 번에 힘을 풀며 손바닥을 펴보세요. 손끝으로 빠져나가는 따뜻한 감각에 집중하면 몸에 쌓인 스트레스가 함께 빠져나갑니다."
  },
  {
    colors: ["blue", "black", "purple"],
    quote: "혼자 감당하기 무거운 마음은 나누면 반이 됩니다. 언제든 위클래스 문을 똑똑 두드려 주세요. 따뜻한 차 한 잔과 함께 기다릴게요.",
    author: "위클래스 선생님",
    methodTitle: "💧 차가운 물 한 모금과 어깨 내리기",
    methodDesc: "자신도 모르게 귀 가까이 올라간 양쪽 어깨를 '후-' 숨을 내쉬며 아래로 툭 떨어뜨려 보세요. 그리고 시원한 물 한 모금을 천천히 마시면 교감신경이 안정되어 감정의 파도가 잔잔해집니다."
  },
  {
    colors: ["yellow", "orange", "green"],
    quote: "네가 웃으면 세상이 환해지고, 네가 평온하면 주변도 따뜻해져. 오늘 찾아온 이 좋은 기분을 마음껏 누리길 바랄게!",
    author: "위클래스 마음 편지",
    methodTitle: "💌 나에게 보내는 한 줄 칭찬 처방",
    methodDesc: "오늘 내가 해낸 아주 사소한 일 하나(제시간에 일어나기, 급식 맛있게 먹기, 마음 색깔 기록하기)를 떠올리고 '나 오늘 참 수고했어!'라고 스스로에게 마음속으로 박수를 보내주세요."
  }
];

function createSampleSvgDataUrl(bgHex, circleHex, emojiText) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <rect width="600" height="450" fill="${bgHex}"/>
    <circle cx="300" cy="210" r="110" fill="${circleHex}" opacity="0.25"/>
    <circle cx="300" cy="210" r="75" fill="${circleHex}" opacity="0.45"/>
    <text x="300" y="232" font-size="72" text-anchor="middle">${emojiText}</text>
    <text x="300" y="370" font-size="22" font-family="sans-serif" fill="#57493f" text-anchor="middle" font-weight="bold">내 마음의 색깔 한 조각</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const SAMPLE_POSTS = [
  {
    id: "sample-1",
    colorId: "yellow",
    emotion: "희망",
    recordDate: "2026-11-17",
    studentId: "20312",
    studentName: "햇살이",
    story: "창가에 놓인 노란색 메모지를 찍었어요! 오늘 수행평가가 끝나서 마음이 노란 개나리처럼 밝고 후련해요.",
    photoUrl: createSampleSvgDataUrl("#fef9c3", "#eab308", "🌼"),
    cheers: 7,
    createdAt: Date.now() - 1000 * 60 * 45
  },
  {
    id: "sample-2",
    colorId: "green",
    emotion: "편안함",
    recordDate: "2026-11-17",
    studentId: "10504",
    studentName: "초록나무",
    story: "위클래스 입구에 있는 초록색 화분을 보니까 복잡했던 마음이 차분해지고 편안해졌어요.",
    photoUrl: createSampleSvgDataUrl("#dcfce7", "#22c55e", "🌿"),
    cheers: 5,
    createdAt: Date.now() - 1000 * 60 * 120
  },
  {
    id: "sample-3",
    colorId: "white",
    emotion: "아무생각 없음",
    recordDate: "2026-11-16",
    studentId: "30121",
    studentName: "구름빵",
    story: "점심 먹고 운동장 위 하얀 구름을 봤어요. 가끔은 아무 생각 없이 멍때리는 시간도 꼭 필요한 것 같아요!",
    photoUrl: createSampleSvgDataUrl("#f1f5f9", "#94a3b8", "☁️"),
    cheers: 9,
    createdAt: Date.now() - 1000 * 60 * 240
  }
];

function getTodayDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

let selectedColor = HEART_COLORS[0];
let selectedEmotion = HEART_COLORS[0].emotions[0];
let compressedPhotoDataUrl = "";
let currentFilter = "all";
let visiblePostLimit = 12;
let isAdminAuthenticated = false;
let firestoreDb = null;
let unsubscribeFirestore = null;
let postsList = [];

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("recordDateInput");
  if (dateInput) dateInput.value = getTodayDateString();
  renderHeartGrid();
  renderFilterBar();
  bindEvents();
  loadLocalFallbackImmediately();
  initDataConnection();
});

function loadLocalFallbackImmediately() {
  const saved = localStorage.getItem(STORAGE_KEY_POSTS);
  if (saved) {
    try {
      postsList = JSON.parse(saved);
    } catch (_) {
      postsList = [...SAMPLE_POSTS];
    }
  } else {
    postsList = [...SAMPLE_POSTS];
  }
  renderFeed();
}

function showStepPage(stepNumber) {
  const page1 = document.getElementById("pageStep1");
  const page2 = document.getElementById("pageStep2");
  if (stepNumber === 2) {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    page2.classList.add("hidden");
    page1.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getHeartSvgMarkup(colorObj) {
  const fill = colorObj.fillHex || colorObj.hex;
  const stroke = colorObj.stroke || colorObj.hex;
  return `
    <svg class="heart-svg" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;
}

function renderHeartGrid() {
  const grid = document.getElementById("heartGrid");
  grid.innerHTML = HEART_COLORS.map((c) => {
    const emotionTags = c.emotions
      .slice(0, 4)
      .map((em) => `<span class="mini-emotion-tag">${em}</span>`)
      .join("");

    return `
      <button
        type="button"
        class="heart-card"
        data-color-id="${c.id}"
        style="--card-accent: ${c.hex}; --card-soft-bg: ${c.softBg};"
      >
        <div class="heart-svg-wrap">
          ${getHeartSvgMarkup(c)}
        </div>
        <div class="heart-info">
          <div class="heart-color-name">
            <span class="heart-color-title">${c.name}</span>
            <span class="heart-go-arrow">기록하기 →</span>
          </div>
          <div class="heart-emotions-list">
            ${emotionTags}
          </div>
        </div>
      </button>
    `;
  }).join("");

  grid.querySelectorAll(".heart-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const colorId = btn.getAttribute("data-color-id");
      selectHeartColorAndOpenPage(colorId);
    });
  });
}

function selectHeartColorAndOpenPage(colorId) {
  const found = HEART_COLORS.find((c) => c.id === colorId);
  if (!found) return;
  selectedColor = found;
  selectedEmotion = found.emotions[0];

  document.documentElement.style.setProperty("--selected-theme", found.hex);
  document.documentElement.style.setProperty("--selected-theme-soft", found.softBg);

  document.getElementById("indicatorHeart").textContent = found.emoji;
  document.getElementById("uploadTitle").textContent = `${found.name}을 고르셨네요! 어떤 감정인가요?`;
  document.getElementById("photoLabelTitle").textContent = `📸 '${found.name}'이 포함된 사진 찍기 / 올리기`;
  document.getElementById("photoGuideMain").textContent = found.guide;

  renderEmotionChips(found);
  showStepPage(2);
}

function renderEmotionChips(colorObj) {
  const chipContainer = document.getElementById("emotionChips");
  const customInput = document.getElementById("customEmotionInput");

  chipContainer.innerHTML = colorObj.emotions
    .map(
      (emotion, idx) => `
      <button
        type="button"
        class="emotion-chip-btn ${idx === 0 ? "selected" : ""}"
        data-emotion="${emotion}"
      >
        #${emotion}
      </button>
    `
    )
    .join("");

  customInput.value = colorObj.emotions[0];

  chipContainer.querySelectorAll(".emotion-chip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      chipContainer.querySelectorAll(".emotion-chip-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      const em = btn.getAttribute("data-emotion");
      selectedEmotion = em;
      customInput.value = em;
    });
  });
}

function handleFileSelect(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("사진(이미지) 파일만 업로드할 수 있어요!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const MAX_SIZE = 720;
      let width = img.width;
      let height = img.height;

      if (width > height && width > MAX_SIZE) {
        height = Math.round((height * MAX_SIZE) / width);
        width = MAX_SIZE;
      } else if (height >= width && height > MAX_SIZE) {
        width = Math.round((width * MAX_SIZE) / height);
        height = MAX_SIZE;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      compressedPhotoDataUrl = canvas.toDataURL("image/jpeg", 0.75);

      const previewImg = document.getElementById("photoPreviewImg");
      previewImg.src = compressedPhotoDataUrl;
      document.getElementById("photoPlaceholder").classList.add("hidden");
      document.getElementById("photoPreviewWrap").classList.remove("hidden");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function parseFirebaseConfigInput(rawText) {
  if (!rawText || !rawText.trim()) return null;
  const keys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"];
  const extracted = {};

  keys.forEach((key) => {
    const regex = new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`);
    const match = rawText.match(regex);
    if (match && match[1]) {
      extracted[key] = match[1].trim();
    }
  });

  if (extracted.apiKey && extracted.projectId) {
    return extracted;
  }

  try {
    const parsed = JSON.parse(rawText);
    if (parsed.apiKey && parsed.projectId) return parsed;
  } catch (_) {}
  return null;
}

function initDataConnection() {
  const savedConfigStr = localStorage.getItem(STORAGE_KEY_FIREBASE);
  if (savedConfigStr) {
    try {
      const configObj = JSON.parse(savedConfigStr);
      connectToFirebase(configObj);
      return;
    } catch (e) {
      console.warn("저장된 Firebase 설정 오류:", e);
    }
  }
  if (DEFAULT_FIREBASE_CONFIG && DEFAULT_FIREBASE_CONFIG.apiKey) {
    connectToFirebase(DEFAULT_FIREBASE_CONFIG);
    return;
  }
  useLocalDemoMode();
}

function connectToFirebase(configObj) {
  try {
    if (!window.firebase) {
      showToast("Firebase SDK를 불러오지 못해 체험 모드로 작동합니다.");
      useLocalDemoMode();
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(configObj);
    }
    firestoreDb = firebase.firestore();

    if (unsubscribeFirestore) unsubscribeFirestore();

    unsubscribeFirestore = firestoreDb
      .collection("weeHeartPosts")
      .orderBy("createdAt", "desc")
      .limit(100)
      .onSnapshot(
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          postsList = items;
          updateConnectionIndicator(true);
          renderFeed();
        },
        (error) => {
          console.error("Firestore 실시간 구독 오류:", error);
          showToast("⚠️ 파이어베이스 Firestore 데이터베이스 생성 및 규칙(Rules)을 확인해 주세요!");
          useLocalDemoMode();
        }
      );
  } catch (err) {
    console.error("Firebase 연결 실패:", err);
    useLocalDemoMode();
  }
}

function useLocalDemoMode() {
  firestoreDb = null;
  if (unsubscribeFirestore) {
    unsubscribeFirestore();
    unsubscribeFirestore = null;
  }
  updateConnectionIndicator(false);

  const saved = localStorage.getItem(STORAGE_KEY_POSTS);
  if (saved) {
    try {
      postsList = JSON.parse(saved);
    } catch (_) {
      postsList = [...SAMPLE_POSTS];
    }
  } else {
    postsList = [...SAMPLE_POSTS];
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(postsList));
  }
  renderFeed();
}

function updateConnectionIndicator(isOnline) {
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  if (isOnline) {
    dot.classList.add("online");
    text.textContent = "실시간 연동 중 (모두에게 공유됨)";
  } else {
    dot.classList.remove("online");
    text.textContent = "체험 모드 (Firestore 규칙 확인 필요)";
  }
}

async function submitMindPost(e) {
  e.preventDefault();

  const emotionVal = document.getElementById("customEmotionInput").value.trim() || selectedEmotion;
  const recordDateVal = document.getElementById("recordDateInput").value || getTodayDateString();
  const studentIdVal = document.getElementById("studentIdInput").value.trim();
  const studentNameVal = document.getElementById("studentNameInput").value.trim();
  const storyVal = document.getElementById("storyInput").value.trim();

  if (!compressedPhotoDataUrl) {
    showToast(`📸 '${selectedColor.name}'이 포함된 사진을 먼저 찍거나 골라주세요!`);
    document.getElementById("photoUploadArea").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "마음을 업로드하는 중이에요... 🌱";

  const newPost = {
    colorId: selectedColor.id,
    emotion: emotionVal,
    recordDate: recordDateVal,
    studentId: studentIdVal,
    studentName: studentNameVal,
    story: storyVal,
    photoUrl: compressedPhotoDataUrl,
    cheers: 1,
    createdAt: Date.now()
  };

  try {
    if (firestoreDb) {
      await firestoreDb.collection("weeHeartPosts").add(newPost);
    } else {
      const localPost = { id: "post-" + Date.now(), ...newPost };
      postsList.unshift(localPost);
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(postsList));
      renderFeed();
    }

    document.getElementById("storyInput").value = "";
    compressedPhotoDataUrl = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("photoPlaceholder").classList.remove("hidden");
    document.getElementById("photoPreviewWrap").classList.add("hidden");

    showToast("💖 내 마음 색깔이 따뜻하게 등록되었어요!");
    openPrescriptionModal(selectedColor, emotionVal, studentNameVal);
  } catch (err) {
    console.error("업로드 오류:", err);
    showToast("업로드 중 오류가 발생했어요. 다시 시도해 주세요.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "<span>🌱 내 마음 색깔 업로드하고 마음 처방전 받기</span>";
  }
}

async function handleCheerPost(postId) {
  const target = postsList.find((p) => p.id === postId);
  if (!target) return;
  const nextCheers = (target.cheers || 0) + 1;

  if (firestoreDb) {
    try {
      await firestoreDb.collection("weeHeartPosts").doc(postId).update({
        cheers: nextCheers
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    target.cheers = nextCheers;
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(postsList));
    renderFeed();
  }
  showToast("🥰 따뜻한 공감 하트를 보냈어요!");
}

async function handleDeletePost(postId) {
  if (!isAdminAuthenticated) {
    const inputPin = window.prompt("게시물을 삭제하려면 선생님 비밀번호(7942)를 입력해 주세요:");
    if (inputPin === null) return;
    if (inputPin.trim() !== ADMIN_PIN) {
      showToast("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }
    isAdminAuthenticated = true;
  } else {
    if (!window.confirm("이 게시물을 삭제하시겠습니까?")) return;
  }

  if (firestoreDb) {
    try {
      await firestoreDb.collection("weeHeartPosts").doc(postId).delete();
      showToast("🗑️ 게시물이 삭제되었습니다.");
    } catch (e) {
      console.error("삭제 실패:", e);
      showToast("삭제 중 오류가 발생했습니다.");
    }
  } else {
    postsList = postsList.filter((p) => p.id !== postId);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(postsList));
    renderFeed();
    showToast("🗑️ 게시물이 삭제되었습니다.");
  }
}

function renderFilterBar() {
  const bar = document.getElementById("filterBar");
  const allBtn = `<button type="button" class="filter-btn active" data-filter="all">🌈 전체 보기</button>`;
  const colorBtns = HEART_COLORS.map(
    (c) => `<button type="button" class="filter-btn" data-filter="${c.id}">${c.emoji} ${c.name}</button>`
  ).join("");

  bar.innerHTML = allBtn + colorBtns;

  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      visiblePostLimit = 12;
      renderFeed();
    });
  });
}

function formatPostDate(post) {
  if (post && post.recordDate) {
    const parts = String(post.recordDate).split("-");
    if (parts.length === 3) {
      return `${parts[0]}. ${Number(parts[1])}. ${Number(parts[2])}.`;
    }
    return post.recordDate;
  }
  const timestamp = post ? post.createdAt : null;
  if (!timestamp) return "오늘";
  const d = new Date(timestamp);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFeed() {
  const feedGrid = document.getElementById("feedGrid");
  const totalCountEl = document.getElementById("totalCount");
  const loadMoreWrap = document.getElementById("loadMoreWrap");
  totalCountEl.textContent = postsList.length;

  const filtered =
    currentFilter === "all"
      ? postsList
      : postsList.filter((item) => item.colorId === currentFilter);

  if (filtered.length === 0) {
    loadMoreWrap.classList.add("hidden");
    feedGrid.innerHTML = `
      <div class="empty-feed">
        <p style="font-size: 2rem; margin-bottom: 8px;">🌱</p>
        <p><strong>아직 등록된 마음 기록이 없어요.</strong></p>
        <p>위에서 색깔 하트를 눌러 첫 번째로 오늘 내 마음의 색깔 사진을 올려보세요!</p>
      </div>
    `;
    return;
  }

  const visibleItems = filtered.slice(0, visiblePostLimit);
  if (filtered.length > visiblePostLimit) {
    loadMoreWrap.classList.remove("hidden");
  } else {
    loadMoreWrap.classList.add("hidden");
  }

  feedGrid.innerHTML = visibleItems
    .map((post) => {
      const colorObj = HEART_COLORS.find((c) => c.id === post.colorId) || HEART_COLORS[0];
      return `
        <article class="feed-card">
          <div class="feed-photo-box" data-detail-id="${escapeHtml(post.id)}">
            <img src="${post.photoUrl}" alt="${escapeHtml(colorObj.name)} 사진" loading="lazy" decoding="async" />
            <span class="feed-color-badge">
              ${colorObj.emoji} ${colorObj.name}
            </span>
            <span class="feed-emotion-badge" style="background: ${colorObj.hex};">
              #${escapeHtml(post.emotion)}
            </span>
          </div>
          <div class="feed-body">
            <div class="feed-author-row">
              <div class="feed-author">
                <span class="feed-student-id">${escapeHtml(post.studentId)}</span>
                <span>${escapeHtml(post.studentName)}</span>
              </div>
              <span class="feed-date">📅 ${escapeHtml(formatPostDate(post))}</span>
            </div>
            <p class="feed-story">${escapeHtml(post.story)}</p>
            <div class="feed-footer">
              <button type="button" class="btn-cheer" data-cheer-id="${escapeHtml(post.id)}">
                <span>💗 공감해요</span>
                <strong>${post.cheers || 0}</strong>
              </button>
              <button type="button" class="btn-delete-post" data-delete-id="${escapeHtml(post.id)}" title="선생님 삭제">
                🗑️ 삭제
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  feedGrid.querySelectorAll("[data-cheer-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      handleCheerPost(btn.getAttribute("data-cheer-id"));
    });
  });

  feedGrid.querySelectorAll("[data-delete-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      handleDeletePost(btn.getAttribute("data-delete-id"));
    });
  });

  feedGrid.querySelectorAll("[data-detail-id]").forEach((box) => {
    box.addEventListener("click", () => {
      openDetailModal(box.getAttribute("data-detail-id"));
    });
  });
}

function openPrescriptionModal(colorObj, emotionText, userName) {
  const targetColor = colorObj || selectedColor;
  const matchingPool = PRESCRIPTIONS.filter(
    (p) => p.colors.includes(targetColor.id) || p.colors.includes("all")
  );
  const chosen = matchingPool[Math.floor(Math.random() * matchingPool.length)];

  document.getElementById("prescriptionRibbon").style.background = targetColor.hex;
  document.getElementById("prescriptionTitle").textContent = userName
    ? `${userName}님을 위한 오늘의 마음 처방전`
    : "오늘 당신을 위한 마음 처방전";
  document.getElementById("prescriptionColorPill").innerHTML = `${targetColor.emoji} ${targetColor.name} · #${escapeHtml(emotionText || targetColor.emotions[0])}`;
  document.getElementById("prescriptionColorPill").style.background = targetColor.softBg;
  document.getElementById("prescriptionColorPill").style.color = targetColor.stroke;

  document.getElementById("prescriptionQuote").textContent = chosen.quote;
  document.getElementById("prescriptionAuthor").textContent = `- ${chosen.author} -`;
  document.getElementById("prescriptionMethodTitle").textContent = chosen.methodTitle;
  document.getElementById("prescriptionMethodDesc").textContent = chosen.methodDesc;

  document.getElementById("prescriptionModal").classList.remove("hidden");
}

function openDetailModal(postId) {
  const post = postsList.find((p) => p.id === postId);
  if (!post) return;
  const colorObj = HEART_COLORS.find((c) => c.id === post.colorId) || HEART_COLORS[0];

  const content = document.getElementById("detailModalContent");
  content.innerHTML = `
    <img class="detail-img" src="${post.photoUrl}" alt="상세 사진" />
    <div class="detail-info">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <span style="font-weight:700; font-size:1.05rem;">
          ${colorObj.emoji} ${colorObj.name} · <span style="color:${colorObj.hex}">#${escapeHtml(post.emotion)}</span>
        </span>
        <span style="font-size:0.85rem; color:#7a6c61;">📅 ${escapeHtml(formatPostDate(post))}</span>
      </div>
      <p style="font-weight:700; margin-bottom:8px;">
        <span class="feed-student-id">${escapeHtml(post.studentId)}</span> ${escapeHtml(post.studentName)}
      </p>
      <p style="line-height:1.65; color:#3d332c; white-space:pre-wrap;">${escapeHtml(post.story)}</p>
    </div>
  `;
  document.getElementById("detailModal").classList.remove("hidden");
}

function bindEvents() {
  const photoInput = document.getElementById("photoInput");

  document.getElementById("backToStep1Btn").addEventListener("click", () => {
    showStepPage(1);
  });
  document.getElementById("homeBrandBadge").addEventListener("click", () => {
    showStepPage(1);
  });
  document.getElementById("loadMoreBtn").addEventListener("click", () => {
    visiblePostLimit += 12;
    renderFeed();
  });

  document.getElementById("triggerCameraBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    photoInput.setAttribute("capture", "environment");
    photoInput.click();
  });

  document.getElementById("triggerGalleryBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    photoInput.removeAttribute("capture");
    photoInput.click();
  });

  document.getElementById("photoPlaceholder").addEventListener("click", () => {
    photoInput.removeAttribute("capture");
    photoInput.click();
  });

  document.getElementById("changePhotoBtn").addEventListener("click", () => {
    photoInput.removeAttribute("capture");
    photoInput.click();
  });

  photoInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  });

  document.getElementById("mindForm").addEventListener("submit", submitMindPost);

  document.getElementById("openPrescriptionBtn").addEventListener("click", () => {
    openPrescriptionModal(selectedColor, document.getElementById("customEmotionInput").value, "");
  });

  document.getElementById("anotherPrescriptionBtn").addEventListener("click", () => {
    openPrescriptionModal(selectedColor, document.getElementById("customEmotionInput").value, "");
  });

  document.getElementById("closePrescriptionBtn").addEventListener("click", () => {
    document.getElementById("prescriptionModal").classList.add("hidden");
    showStepPage(1);
    setTimeout(() => {
      document.getElementById("gallerySection").scrollIntoView({ behavior: "smooth" });
    }, 100);
  });

  document.getElementById("closeDetailModalBtn").addEventListener("click", () => {
    document.getElementById("detailModal").classList.add("hidden");
  });

  document.getElementById("openAdminModalBtn").addEventListener("click", () => {
    const savedConfig = localStorage.getItem(STORAGE_KEY_FIREBASE);
    document.getElementById("firebaseConfigTextarea").value =
      savedConfig || JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
    document.getElementById("adminPinInput").value = "";
    document.getElementById("adminPinError").classList.add("hidden");
    updateAdminModalView();
    document.getElementById("adminModal").classList.remove("hidden");
  });

  document.getElementById("closeAdminModalBtn").addEventListener("click", () => {
    document.getElementById("adminModal").classList.add("hidden");
  });

  document.getElementById("verifyAdminPinBtn").addEventListener("click", verifyAdminPin);
  document.getElementById("adminPinInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyAdminPin();
    }
  });

  document.getElementById("logoutAdminBtn").addEventListener("click", () => {
    isAdminAuthenticated = false;
    updateAdminModalView();
    showToast("선생님 관리 모드가 해제되었습니다.");
  });

  document.getElementById("saveFirebaseConfigBtn").addEventListener("click", () => {
    const raw = document.getElementById("firebaseConfigTextarea").value;
    const parsed = parseFirebaseConfigInput(raw);
    if (!parsed) {
      showToast("⚠️ 올바른 firebaseConfig 형식이 아닙니다.");
      return;
    }
    localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(parsed, null, 2));
    connectToFirebase(parsed);
    document.getElementById("adminModal").classList.add("hidden");
    showToast("🔥 파이어베이스 실시간 연동이 완료되었습니다!");
  });

  document.getElementById("clearFirebaseConfigBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY_FIREBASE);
    document.getElementById("firebaseConfigTextarea").value = JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
    connectToFirebase(DEFAULT_FIREBASE_CONFIG);
    showToast("기본 wee-color 연동으로 초기화되었습니다.");
  });

  ["prescriptionModal", "adminModal", "detailModal"].forEach((id) => {
    const modal = document.getElementById(id);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  });
}

function verifyAdminPin() {
  const val = document.getElementById("adminPinInput").value.trim();
  if (val === ADMIN_PIN) {
    isAdminAuthenticated = true;
    document.getElementById("adminPinError").classList.add("hidden");
    updateAdminModalView();
    showToast("✅ 선생님 인증이 완료되었습니다.");
  } else {
    document.getElementById("adminPinError").classList.remove("hidden");
  }
}

function updateAdminModalView() {
  const authStep = document.getElementById("adminAuthStep");
  const configStep = document.getElementById("adminConfigStep");
  if (isAdminAuthenticated) {
    authStep.classList.add("hidden");
    configStep.classList.remove("hidden");
  } else {
    authStep.classList.remove("hidden");
    configStep.classList.add("hidden");
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toastMsg");
  toast.textContent = message;
  toast.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
