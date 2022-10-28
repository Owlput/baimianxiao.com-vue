import { ref, watch } from "vue";
import useDataFetch from "./useDataFetch";

export default function useWatchParams(route, endpoint) {
  const apiEndpoint = ref(endpoint + route.params.id);
  const { data, axiosError } = useDataFetch(apiEndpoint);
  watch(
    () => route.params.id,
    (next, prev) => {
      if (!next) return;
      apiEndpoint.value = endpoint + next;
    },
    { deep: true }
  );
  return { data, axiosError, apiEndpoint };
}
