import App from '../../lib/classes/App.js'
import fmt from '../utils/libfmt.js';

var _PAGE_INDEX = new URLSearchParams(window.location.search).get('index') !== null ? parseInt(new URLSearchParams(window.location.search).get('index')) : 0
var _PAGE_INIT = document.URL.substring(document.URL.lastIndexOf('/') + 1).split('?')[0]
var _PAGE_PARAM = document.URL.substring(document.URL.lastIndexOf('/') + 1).split('?')[1].split('=')[0]
var _PAGE_PARAM2 = document.URL.substring(document.URL.lastIndexOf('/') + 1).split('?')[1].split('=')[1]
var _DOCS_OPENED = _PAGE_PARAM == 'index' && (_PAGE_PARAM2 >= 1000 && _PAGE_PARAM2 < 2000) ? true : false
var _CLASSES_OPENED = _PAGE_PARAM == 'index' && (_PAGE_PARAM2 >= 2000 && _PAGE_PARAM2 < 3000) ? true : false

if(_PAGE_INIT == 'list-docs.htm') {
    var _PAGE_CELL = document.getElementById(`_cell-${_PAGE_INDEX}`)
    let docsButton = document.getElementById('_api-docs-button-cell')
    let docsArrow = document.getElementById('_api-open-docs-icon')
    let docsList = document.getElementById('_api-list-docs')

    let classesButton = document.getElementById('_api-classes-button-cell')
    let classesArrow = document.getElementById('_api-open-classes-icon')
    let classesList = document.getElementById('_api-list-classes')

    //Check
    if(_DOCS_OPENED) {
        docsArrow.innerHTML = '<path fill="currentColor" d="M13.418 7.859a.695.695 0 0 1 .978 0a.68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969a.695.695 0 0 1 .978 0L10 11z"/>'
        docsList.style['display'] = 'flex'
    } else {
        docsArrow.innerHTML = '<path fill="currentColor" d="M6.582 12.141a.695.695 0 0 1-.978 0a.68.68 0 0 1 0-.969l3.908-3.83a.697.697 0 0 1 .979 0l3.908 3.83a.68.68 0 0 1 0 .969a.697.697 0 0 1-.979 0L10 9z"/>'
        docsList.style['display'] = 'none'
    }

    if(_CLASSES_OPENED) {
        classesArrow.innerHTML = '<path fill="currentColor" d="M13.418 7.859a.695.695 0 0 1 .978 0a.68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969a.695.695 0 0 1 .978 0L10 11z"/>'
        classesList.style['display'] = 'flex'
    } else {
        classesArrow.innerHTML = '<path fill="currentColor" d="M6.582 12.141a.695.695 0 0 1-.978 0a.68.68 0 0 1 0-.969l3.908-3.83a.697.697 0 0 1 .979 0l3.908 3.83a.68.68 0 0 1 0 .969a.697.697 0 0 1-.979 0L10 9z"/>'
        classesList.style['display'] = 'none'
    }

    switch(_PAGE_INDEX) {
        case _PAGE_INDEX: _PAGE_CELL.style['backgroundColor'] = '#7084a740'
    }

    docsButton.addEventListener('click', () => {
        if(!_DOCS_OPENED) {
            _DOCS_OPENED = true
            docsArrow.innerHTML = '<path fill="currentColor" d="M13.418 7.859a.695.695 0 0 1 .978 0a.68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969a.695.695 0 0 1 .978 0L10 11z"/>'
            docsList.style['display'] = 'flex'
        } else {
            _DOCS_OPENED = false
            docsArrow.innerHTML = '<path fill="currentColor" d="M6.582 12.141a.695.695 0 0 1-.978 0a.68.68 0 0 1 0-.969l3.908-3.83a.697.697 0 0 1 .979 0l3.908 3.83a.68.68 0 0 1 0 .969a.697.697 0 0 1-.979 0L10 9z"/>'
            docsList.style['display'] = 'none'
        }
    })

    classesButton.addEventListener('click', () => {
        if(!_CLASSES_OPENED) {
            _CLASSES_OPENED = true
            classesArrow.innerHTML = '<path fill="currentColor" d="M13.418 7.859a.695.695 0 0 1 .978 0a.68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969a.695.695 0 0 1 .978 0L10 11z"/>'
            classesList.style['display'] = 'flex'
        } else {
            _CLASSES_OPENED = false
            classesArrow.innerHTML = '<path fill="currentColor" d="M6.582 12.141a.695.695 0 0 1-.978 0a.68.68 0 0 1 0-.969l3.908-3.83a.697.697 0 0 1 .979 0l3.908 3.83a.68.68 0 0 1 0 .969a.697.697 0 0 1-.979 0L10 9z"/>'
            classesList.style['display'] = 'none'
        }
    })
}

if(_PAGE_INDEX != 0 && _PAGE_INIT != 'list-docs.htm') {
    var _ROOT = document.getElementById('root')
    var _PREPEND = document.getElementById('content-y')
    var _IFRAME = document.getElementById(`-api-viewer-index`)
    _IFRAME.src = `/api/view/list-docs.htm?index=${_PAGE_INDEX}`

    _ROOT.style['height'] = fmt('%ipx', App.getWinSize().height)
    _PREPEND.style['height'] = fmt('%ipx', App.getWinSize().height - (App.getHeaderSize().height))
}