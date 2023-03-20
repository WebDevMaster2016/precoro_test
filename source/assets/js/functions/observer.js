export default (block, callback) => {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            lazyImageObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 50px 0px' },
    );
    lazyImageObserver.observe(block);
  } else {
    callback();
  }
};
