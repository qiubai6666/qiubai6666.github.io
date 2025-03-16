// 合并所有需要在页面加载完成后执行的逻辑
window.addEventListener('load', function () {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
        // 若不是移动设备，显示提示信息并阻止后续操作
        const body = document.querySelector('body');
        body.innerHTML = '<p style="text-align: center; margin-top: 50px;">此页面仅支持手机端访问，请使用手机打开。</p>';
        return;
    }

    // 检查抓包工具
    function checkForPacketCapture() {
        if (window.performance.timing.redirectStart - window.performance.timing.fetchStart > 100) {
            // 可能存在抓包工具，进行处理
            window.location.href = 'http://example.com/no-capture.html';
        }
    }
    checkForPacketCapture();

    // 生成动态代码
    function generateDynamicCode() {
        const script = document.createElement('script');
        script.textContent = `
        function dynamicFunction() {
            console.log('This is a dynamically generated function.');
        }
        dynamicFunction();
    `;
        document.head.appendChild(script);
    }
    generateDynamicCode();

    // 屏蔽键盘事件
    document.onkeydown = function () {
        var e = window.event || arguments[0];
        // F12
        if (e.keyCode == 123) {
            return false;
            // Ctrl+Shift+I
        } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
            return false;
            // Shift+F10
        } else if ((e.shiftKey) && (e.keyCode == 121)) {
            return false;
            // Ctrl+U
        } else if ((e.ctrlKey) && (e.keyCode == 85)) {
            return false;
        }
    };

    // 屏蔽鼠标右键
    document.oncontextmenu = function () {
        return false;
    };

    // 监听开发者工具打开事件
    setInterval(function () {
        if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
            window.location.reload();
        }
    }, 100);
});

if (window.location.href.indexOf("view-source:") > -1) {
    window.location.href = "http://example.com/no-view-source.html";
}

// 监听窗口大小变化，防止通过调整窗口打开开发者工具
window.addEventListener('resize', function () {
    if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
        window.location.reload();
    }
});
