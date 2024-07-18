interface TimeoutMap {
  [key: string | number]: {
    [key: string]: ReturnType<typeof setTimeout> | null;
  };
}

const timeouts: TimeoutMap = {};

/**
 * Debounce function that will delay the processing of the function until after the set milliseconds have elapsed since the last time this debounced function was invoked.
 * If `immediate` is `true`, the function will be triggered on the leading edge, instead of the trailing.
 * @param {() => void} func - Function to debounce.
 * @param {number} [wait=100] - Number of milliseconds to delay.
 * @param {boolean} [immediate=false] - If `true`, trigger the function on the leading edge, instead of the trailing.
 * @param {string | number} [instance="default"] - Instance identifier to allow having multiple debounced functions.
 * @param {string} [key="default"] - Key identifier to allow having multiple debounced functions within the same instance.
 */
export function debounce(
  func: () => void,
  wait = 100,
  immediate: boolean = false,
  instance: string | number = "default",
  key: string = "default"
): void {
  if (!timeouts[instance]) {
    timeouts[instance] = {};
  }
  const later = () => {
    if (!immediate) {
      func();
    }
    timeouts[instance][key] = null;
  };

  const callNow = immediate && !timeouts[instance][key];

  clearTimeout(timeouts[instance][key] as ReturnType<typeof setTimeout>);
  timeouts[instance][key] = setTimeout(later, wait);

  if (callNow) {
    func();
  }
}
