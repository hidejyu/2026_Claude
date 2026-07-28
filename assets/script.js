const STORAGE_PREFIX = "last-visit:";

function formatRelative(ts) {
  const diffMs = Date.now() - ts;
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "たった今確認しました";
  if (diffMin < 60) return `${diffMin}分前に確認しました`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour}時間前に確認しました`;
  const diffDay = Math.round(diffHour / 24);
  return `${diffDay}日前に確認しました`;
}

function renderLastVisit(key) {
  const stored = localStorage.getItem(STORAGE_PREFIX + key);
  const el = document.querySelector(`.last-visit[data-key="${key}"]`);
  if (!el) return;
  el.textContent = stored ? formatRelative(Number(stored)) : "まだ確認していません";
}

document.querySelectorAll(".btn[data-key]").forEach((link) => {
  const key = link.dataset.key;
  renderLastVisit(key);
  link.addEventListener("click", () => {
    localStorage.setItem(STORAGE_PREFIX + key, String(Date.now()));
    setTimeout(() => renderLastVisit(key), 100);
  });
});

function tickClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const now = new Date();
  el.textContent = "現在時刻: " + now.toLocaleString("ja-JP");
}

tickClock();
setInterval(tickClock, 1000);
