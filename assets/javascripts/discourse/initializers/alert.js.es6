function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const listeners = []


export default {
  name: 'alert',
  initialize() {
    const apply = debounce(() => {
      console.log('-- ', Date.now())
      const hearts = $('.widget-button.toggle-like')
      console.log('-- hearts', hearts)
      listeners.forEach((listener) => {
        // listener.off('click')
      })
      listeners.length = 0
      hearts.each((heart) => {
        // listeners.push($(heart).on('click', () => {
        //   console.log('-- heart click')
        //   debugger
        // }))
      })
    }, 100)

    $(document).on('scroll', apply)
  }
};
