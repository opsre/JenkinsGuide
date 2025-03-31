import { inBrowser } from "vitepress";

export const useFooterRuntime = () => {
  const startTime = new Date("2025-02-12 00:00:00"); // 替换为你的网站启动时间
  let runtimeElement: HTMLElement | null = null;
  let intervalId: NodeJS.Timeout | null = null;

  const updateFooterRuntime = () => {
    if (!runtimeElement) return;

    const now = new Date();
    const diff = now.getTime() - startTime.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    runtimeElement.innerHTML = `<span style="color: #FFA500">${days}</span> 天 <span style="color: #1DBF97">${hours}</span> 时 <span style="color: #8A2BE2">${minutes}</span> 分 <span style="color: #007EC6">${seconds}</span> 秒`;
  };

  const start = () => {
    if (!inBrowser) return;

    runtimeElement = document.getElementById("footer-runtime");

    if (runtimeElement) {
      // 初始化显示
      updateFooterRuntime();
      intervalId = setInterval(updateFooterRuntime, 1000);
    }
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  return { start, stop };
};
