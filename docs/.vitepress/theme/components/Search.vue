<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { useSearch } from './useSearch';

const {
  keyword,
  placeholder,
  keywordHistory,
  useHistory,
  engineList,
  engine,
  useLastEngine,
  useAfterHalfYear,
  search,
  saveUseLastEngine,
} = useSearch();
</script>

<template>
  <div class="search">
    <form @submit.prevent="search()">
      <input
        class="search-input"
        type="text"
        :placeholder="placeholder"
        v-model="keyword"
      />
    </form>

    <section class="search-tool">
      <div class="search-history">
        <span
          v-if="keywordHistory"
          class="search-history-item"
          :title="keywordHistory"
          @click="useHistory()"
          >{{ keywordHistory }}</span
        >
        <span v-else>--</span>
      </div>

      <div class="tool flex-none flex items-center space-x-4">
        <div class="search-tool-item">
          <label for="search-switch-use-last-engine">上次使用</label>
          <SwitchRoot
            id="search-switch-use-last-engine"
            class="search-switch"
            v-model:checked="useLastEngine"
            @update:checked="saveUseLastEngine()"
          >
            <SwitchThumb class="search-switch-thumb" />
          </SwitchRoot>
        </div>

        <div class="search-tool-item">
          <label for="search-switch-use-this-year">近半年</label>
          <SwitchRoot
            id="search-switch-use-this-year"
            class="search-switch"
            v-model:checked="useAfterHalfYear"
          >
            <SwitchThumb class="search-switch-thumb" />
          </SwitchRoot>
        </div>
      </div>
    </section>

    <section>
      <div class="search-engine-list">
        <div
          v-for="item in engineList"
          :class="{
            engine: true,
            active: item.title === engine.title,
          }"
          @click="search(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.search > *:not(:last-child) {
  margin-bottom: 8px;
}

.search .search-input {
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.search .search-input:hover,
.search .search-input:focus {
  border: 1px solid var(--vp-c-brand-1);
}

.search .search-tool {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  line-height: 28px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.search .search-history {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.search .search-history-item:hover {
  color: var(--vp-c-brand-1);
  cursor: pointer;
}

.search .search-tool-item {
  flex: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search .search-switch {
  display: block;
  width: 40px;
  height: 22px;
  position: relative;
  border: 1px solid var(--vp-input-border-color);
  border-radius: 11px;
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s !important;
}

.search .search-switch:hover {
  border-color: var(--vp-c-brand-1);
}

.search .search-switch[data-state='checked'] {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
}

.search .search-switch-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s !important;
}

.search .search-switch-thumb[data-state='checked'] {
  transform: translateX(18px);
}

.search .search-engine-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-left: 0;
}

.search .engine {
  line-height: 24px;
  color: var(--vp-c-text-2);
  list-style-type: none;
  cursor: pointer;
}

.search .engine:hover,
.search .engine.active {
  color: var(--vp-c-brand-1);
}
</style>
