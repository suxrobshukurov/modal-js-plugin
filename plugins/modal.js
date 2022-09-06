function _createModal(options) {
    const DEFAUL_WIDTH = '500px'
    const modal = document.createElement('div');
    modal.classList.add('smodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="${options.closable || false}">
            <div class="modal-window" style="width: ${options.width || DEFAUL_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Modal title'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="${options.closable}">&times;</span>` : ''}
                </div>
                <div class="modal-body">
                    ${options.content || ''}
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(modal)
    return modal;
}

$.modal = function (options){
    const $modal = _createModal(options);
    const ANIMATED_SPEED = 200;
    let closed = false;
    let destroyed = false;
    const modal = {
        open() {
            !closed && $modal.classList.add('open');
        },
        close() {
            closed = true
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setInterval(() => {
                $modal.classList.remove('hide');
                closed = false
            }, ANIMATED_SPEED)
        },
        onOpen() {
            this.open()
        },
        onClose() {
            this.close()
        },
        setContent(htmlEl) {
            this.options.content = htmlEl
        },
        beforeClose() {}
    }
    $modal.addEventListener('click', event => {
        if(options.closable && event.target.dataset.close === 'true') {
            modal.close()
        }
    })

    return {
        ...modal,
        destroy() {
            $modal.parentNode.removeChild($modal);
            destroyed = true
        }
    }
}