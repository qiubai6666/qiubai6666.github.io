self.onmessage = function(e) {
    if (e.data.action === 'start') {
        const duration = e.data.duration;
        setTimeout(() => {
            self.postMessage('timeout');
        }, duration);
    }
};