import axios from "axios";
import { isRef, ref, watchEffect, unref } from "vue";

export default function useDataFetch(url) {
  const data = ref(null);
  const axiosError = ref(null);
  function doDataFetch() {
    data.value = null;
    axiosError.value = null;
    axios
      .get(unref(url))
      .then((res) => {
        data.value = res.data;
      })
      .catch((e) => {
        axiosError.value = e;
      });
  }
  if (isRef(url)) {
    watchEffect(doDataFetch);
  } else {
    doDataFetch();
  }
  return { data, axiosError };
}
