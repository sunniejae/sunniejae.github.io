// Minimal element SDK for theming & toasts
window.elementSdk = {
  init: function(config) {
    if (config.onConfigChange) config.onConfigChange(config.defaultConfig);
  },

  showToast: function(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-6 glass-effect px-6 py-3 rounded-xl z-50';
    toast.style.fontSize = '0.875rem';
    toast.style.color = 'var(--accent)';
    toast.style.background = 'rgba(0,0,0,0.7)';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  setConfig: function(config) {
    // Can be used for live theme updates
    if (config.background_color) document.getElementById('app').style.background = config.background_color;
  }
};
