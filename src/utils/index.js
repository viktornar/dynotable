export function multipleSort(arr, sortBy) {
  if (Array.isArray(arr)) {
    arr.sort(function(left, right) {
      let i = 0;
      let result = 0;
      while (i < sortBy.length && result === 0) {
        if (left[sortBy[i].prop] < right[sortBy[i].prop]) {
          result = -1;
        }

        if (left[sortBy[i].prop] > right[sortBy[i].prop]) {
          result = 1;
        }

        result = result * sortBy[i].direction;
        i++;
      }
      return result;
    });
  } else {
    throw new Error("Unsupported type for first argument");
  }
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export function sliceByRange(arr, index, range) {
  if (!Array.isArray(arr)) {
    throw new Error("Unsupported data type");
  }

  if (index <= 0) {
    throw new Error("Index must be not null and not negative");
  }

  return arr.slice((index - 1) * range, index * range);
}

export function sliceAndAddByRange(arr, index, range) {
  if (!Array.isArray(arr)) {
    throw new Error("Unsupported data type");
  }

  if (index <= 0) {
    return [];
  }

  return [...sliceAndAddByRange(arr, index - 1, range),...sliceByRange(arr, index, range)];
}
