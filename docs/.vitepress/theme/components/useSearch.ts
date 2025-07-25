import { ref, shallowRef } from 'vue';

interface SearchEngineItem {
  title: string;
  url: string;
}

export const useSearch = () => {
  const keyword = ref('');
  const placeholder = ref('搜点什么呢');
  const keywordHistory = ref('');

  const engineList: SearchEngineItem[] = [
    { title: '秘塔', url: 'https://metaso.cn/?q=%s' },
    { title: 'Felo', url: 'https://felo.ai/search?q=%s' },
    { title: '必应', url: 'https://www.bing.com/search?q=%s' },
    {
      title: 'V2EX',
      url: `https://www.google.com/search?q=%s${encodeURIComponent(' site:v2ex.com')}`,
    },
    { title: 'Luxirty', url: 'https://search.luxirty.com/search?q=%s' },
    { title: 'Google', url: 'https://www.google.com/search?q=%s' },
    { title: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=%s' },
    {
      title: 'GitHub',
      url: 'https://github.com/search?q=%s&type=repositories',
    },
    { title: 'MDN', url: 'https://developer.mozilla.org/en-US/search?q=%s' },
    { title: 'CanIUse', url: 'https://caniuse.com/?search=%s' },
    { title: 'LONGMAN', url: 'https://www.ldoceonline.com/dictionary/%s' },
    {
      title: 'DeepL',
      url: 'https://www.deepl.com/en/translator#en/zh-hans/%s',
    },
    {
      title: 'GoogleTranslate',
      url: 'https://translate.google.com/?sl=auto&tl=zh-CN&text=%s&op=translate',
    },
    {
      title: '百度翻译',
      url: 'https://fanyi.baidu.com/mtpe-individual/multimodal?query=%s',
    },
    { title: '欧路', url: 'https://dict.eudic.net/dicts/en/%s' },
    { title: '掘金', url: 'https://juejin.cn/search?query=%s' },
    { title: '知乎', url: 'https://www.zhihu.com/search?type=content&q=%s' },
    { title: '哔哩哔哩', url: 'https://search.bilibili.com/all?keyword=%s' },
    {
      title: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=%s',
    },
  ];

  const engine = shallowRef(engineList[0]);
  const useLastEngine = ref(false);
  const ENGINE_KEY = 'lb_search_engine';
  const SEARCH_HISTORY_KEY = 'lb_search_history';
  const USE_LAST_ENGINE_KEY = 'lb_search_engine_switch';

  const useAfterHalfYear = ref(false);

  const updateEngine = (newEngine: SearchEngineItem) => {
    if (!useLastEngine.value) {
      return;
    }
    engine.value = newEngine;
    localStorage.setItem(ENGINE_KEY, newEngine.title);
  };

  const loadEngine = () => {
    if (!useLastEngine.value) {
      return;
    }
    const engineTitle = localStorage.getItem(ENGINE_KEY) ?? '';
    const lastEngine = engineList.find((item) => item.title === engineTitle);
    if (lastEngine) {
      engine.value = lastEngine;
    }
  };

  const saveHistory = () => {
    const value = keyword.value.trim();
    if (value) {
      keywordHistory.value = value;
      localStorage.setItem(SEARCH_HISTORY_KEY, value);
    }
  };

  const loadHistory = () => {
    const value = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (value) {
      keywordHistory.value = value;
    }
  };

  const useHistory = () => {
    keyword.value = keywordHistory.value;
  };

  const saveUseLastEngine = () => {
    localStorage.setItem(USE_LAST_ENGINE_KEY, String(useLastEngine.value));
    engine.value = engineList[0];
  };

  const loadUseLastEngine = () => {
    const isLastOff = localStorage.getItem(USE_LAST_ENGINE_KEY) === 'false';
    useLastEngine.value = !isLastOff;
  };

  const search = (targetEngine = engine.value) => {
    updateEngine(targetEngine);

    if (!keyword.value) {
      placeholder.value = '输入关键词后才能搜索~';
      return;
    }

    let text = keyword.value;
    if (useAfterHalfYear.value) {
      const date = new Date();
      date.setMonth(date.getMonth() - 6);
      const y = date.getFullYear();
      const m = date.getMonth();
      const afterHalfYear = `after:${y}-${m + 1}-01`;
      text = `${text} ${afterHalfYear}`;
    }

    saveHistory();
    const url = targetEngine.url.replace(
      '%s',
      encodeURIComponent(text),
    );
    const w = window.open(url, '_self', 'noopener,noreferrer');
    if (w) {
      w.opener = null;
    }
  };

  loadUseLastEngine();
  loadEngine();
  loadHistory();

  return {
    keyword,
    placeholder,
    keywordHistory,
    useHistory,
    engineList,
    engine,
    search,
    useLastEngine,
    useAfterHalfYear,
    saveUseLastEngine,
  };
};
