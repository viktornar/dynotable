export function multipleSort(arr, sortBy) {
  if (Array.isArray(arr)) {
    arr.sort(function(left, right) {
      let i = 0;
      let result = 0;
      while (i < sortBy.length && result === 0) {
        if(left[sortBy[i].prop] < right[sortBy[i].prop]) {
          result = -1;
        }

        if(left[sortBy[i].prop] > right[sortBy[i].prop]) {
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
