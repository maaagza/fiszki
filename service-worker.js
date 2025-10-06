const CACHE_NAME = "quiz-app-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/quiz.html",
  "/style.css",
  "/style2.css",
  "/converter.html",
  "/manifest.json"
];

// Instalacja – zapisuje pliki do cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch – obsługuje żądania z cache, a jak nie ma, to pobiera z sieci
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Aktywacja – usuwa stare cache, jeśli zmienisz wersję
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
