//鼠标拖动时移动窗口跟随鼠标
move (id, evt, fn) {
    let dragListener = () => {
        return false;
    };
    //TODO 拖动选中文本 处理优化
    document.body.onselectstart = document.body.ondrag = dragListener;
    document.body.onmouseup = () => {
        document.body.onselectstart = document.body.ondrag = null;
    };
    let index = GlobalConfig.backendZIndex + 2;
    GlobalConfig.backendZIndex = index;
    $('#' + id).css('z-index', index);
    let evtVal = evt || window.event;
    let element = document.getElementById(id);
    let disX = evtVal.clientX - element.offsetLeft;
    let disY = evtVal.clientY - element.offsetTop;
    let position = [];
    document.onmousemove = (e) => {
        e = e || window.event;
        // 横轴坐标
        let leftX = e.clientX - disX;
        // 纵轴坐标
        let topY = e.clientY - disY;
        if (leftX < 0) {
            leftX = 0;
        } else if (leftX > document.documentElement.clientWidth - element.offsetWidth) {
            // 获取浏览器视口大小 document.document.documentElement.clientWidth
            leftX = document.documentElement.clientWidth - element.offsetWidth;
        }

        if (topY < 0) {
            topY = 0;
        } else if (topY > document.documentElement.clientHeight - element.offsetHeight) {
            topY = document.documentElement.clientHeight - element.offsetHeight;
        }
        element.style.left = leftX + 'px';
        element.style.top = topY + 'px';
        position[0] = leftX;
        position[1] = topY;
    };
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (position[1] !== undefined && position[0] !== undefined) {
            if (fn && typeof fn === 'function') {
                fn(position);
            }
        }
    };
},

//鼠标拖动窗口方法，并记录窗口位置，以备下次打开初始化记录位置
executeMove (id, e, nameX, nameY) {
    let that = this;

    let saveToStorage = (position) => {
        nameX = that.userId + nameX;
        nameY = that.userId + nameY;
        localStorage.setItem(nameX, position[0] + 'px');
        localStorage.setItem(nameY, position[1] + 'px');
    };

    this.move(id, e, saveToStorage);
},
