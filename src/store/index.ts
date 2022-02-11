import { createPinia } from "pinia";
import piniaDPersist from "pinia-d-persist";
import type { App } from "vue";

export const storageKey = "viteSpa";

const store = createPinia();

store.use((piniaInstance) => {
  piniaInstance.store.persistKey = storageKey;

  piniaDPersist(piniaInstance);
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
