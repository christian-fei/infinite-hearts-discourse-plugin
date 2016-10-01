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

let delayedHeartLikes = []

export default {
  name: 'alert',
  initialize() {
    const apply = debounce(() => {
      const hearts = $('.widget-button.toggle-like')
      hearts.each((_, heart) => {
        const $heart = $(heart)
        if(isDisabled($heart)) {
          heart.removeAttribute('disabled')
          $heart.data('was-disabled', true)  
        }
        $heart.data('timeout-id', Date.now())
        $heart.off('click', onClick)
        $heart.on('click', onClick)
        $heart.off('dblclick', onDblClick)
        $heart.on('dblclick', onDblClick)
      })
    }, 250)

    $(document).on('scroll', apply)
  }
};

function isDisabled($heart) {
  return !!($heart.attr('disabled') || $heart.data('was-disabled'))
}

function getTimeoutId($heart) {
  return $heart.data('timeout-id')
}

function onClick(event) {
  const $heart = $(event.currentTarget)
  console.log('-- heart click: isTrigger', event.isTrigger)
  if(event.isTrigger !== undefined) {
    return true
  }

  if(!delayedHeartLikeRegisteredFor($heart)) {
    delayedHeartLikes.push({element: $heart, timeoutId: setTimeout(() => {
      console.log('-- delayed heart like')  
    //  $heart.click()
    }, 1000)})
  }

  return false
}

function onDblClick(event) {
  const $heart = $(event.currentTarget)
  console.log('-- heart dblclick')
  console.log('-- delayed heart like cancelled')
  return false // remove
  const tuple = delayedHeartLikeRegisteredFor($heart)
  if(tuple) {
    const timeoutId = tuple.timeoutId
    clearTimeout(timeoutId)
    removeDelayedHeartLikeFor($heart)
  }
  if(isDisabled($heart)) {
    return false
  }
}

function delayedHeartLikeRegisteredFor($heart) {
  return delayedHeartLikes.filter(x => x.element === $heart)[0]
}

function removeDelayedHeartLikeFor($heart) {
  delayedHeartLikes = delayedHeartLikes.filter(x => x.element !== $heart)
}
