import App from '../client/classes/cApp.js';
import Element from './classes/cElement.js';
import FileSystem from './classes/cFileSystem.js'
import Main from '../../lib/classes/Main.js';
import Notification from '../../lib/classes/Notification.js';
import Save from '../../lib/classes/Save.js';
import Popup from './classes/cPopup.js';

hljs.highlightAll()
App.checkUpdates()

var m_popup = new Popup()

// Инициализированные стандартные значения
//m_data.settings.launch_on_top
var _SETTING_LAUNCH_ON_TOP = true
var _USERNAME_PASSWORD_SHOWED = false


// Скрытие/Показ пароля
let m_currentPasswordIcon = new Element().getElementByID('m_show-password-icon')
m_currentPasswordIcon.setFunction('click', () => {
let m_currentPassword = new Element().getElementByID('m_currentPassword')

if(!_USERNAME_PASSWORD_SHOWED) {
    _USERNAME_PASSWORD_SHOWED = true
    m_currentPassword.setTextVisibleWithIcon(true, m_currentPasswordIcon)
} else {
    _USERNAME_PASSWORD_SHOWED = false
    m_currentPassword.setTextVisibleWithIcon(false, m_currentPasswordIcon)
    }
})




// События для меню настроек
new Element().getElementByID('m_app-menu-in').setFunction('click', () => Main.onMenu(true))
new Element().getElementByID('m_app-menu-out').setFunction('click', () => Main.onMenu(false))
new Element().getElementByID('m_app-game-pre-launch-in').setFunction('click', () => Main.onPreview(true))
new Element().getElementByID('m_app-game-pre-launch-out').setFunction('click', () => Main.onPreview(false))
new Element().getElementByID('m_app-hooks').setFunction('click', () => FileSystem.openAppFolder('hooks'))
new Element().getElementByID('m_app-logs').setFunction('click', () => FileSystem.openAppFolder('logs'))
new Element().getElementByID('m_app-stop-gdps').setFunction('click', () => App.exitGame())
new Element().getElementByID('m_app-launch-gdps').setFunction('click', () => App.launchGame())
new Element().getElementByID('m_appRefresh').setFunction('click', () => App.refresh())
new Element().getElementByID('m_app-reload').setFunction('click', () => App.reload())
new Element().getElementByID('m_app-quit').setFunction('click', () => App.quit())
new Element().getElementByID('m_app-setting-change-uname-in').setFunction('click', () => Main.onChangeUsername(true))
new Element().getElementByID('m_app-setting-change-uname-out').setFunction('click', () => Main.onChangeUsername(false))
new Element().getElementByID('m_app-setting-change-pass-in').setFunction('click', () => Main.onChangePassword(true))
new Element().getElementByID('m_app-setting-change-pass-out').setFunction('click', () => Main.onChangePassword(false))
new Element().getElementByID('m_app-setting-change-uname-save').setFunction('click', () => Main.onSaveUsername())
new Element().getElementByID('m_currentPassword').setFunction('click', () => new Element().getElementByID('m_currentPassword').removeClass('m_errorInput'))
new Element().getElementByID('m_app-settings-in').setFunction('click', () => Main.onSettings(true))
new Element().getElementByID('m_app-settings-out').setFunction('click', () => Main.onSettings(false))
new Element().getElementByID('m_app-settings-account').setFunction('click', () => Main.onSettingsMenu(1000))
new Element().getElementByID('m_app-settings-main').setFunction('click', () => Main.onSettingsMenu(1001))
new Element().getElementByID('m_app-settings-gd').setFunction('click', () => Main.onSettingsMenu(1002))

// Open events
new Element().getElementByID('m_app-console-in').setFunction('click', () => Main.onConsole(true))
new Element().getElementByID('m_app-console-out').setFunction('click', () => Main.onConsole(false))

new Element().getElementByID('m_setting-value-1004').setFunction('click', () => m_popup.create())


// Настройка 'Размер окна по горизонтали'
let m_xWindowSlider = new Element().getElementByID('m_x-windowsize-slider')
m_xWindowSlider.setFunction('input', () => new Element().getElementByID('m_x-windowsize-label').setText(m_xWindowSlider.getValue()))
m_xWindowSlider.setFunction('mouseup', () => app.settings().set('settings->main::window-x', m_xWindowSlider.getValue()))

// Настройка 'Размер окна по вертикали'
let m_yWindowSlider = new Element().getElementByID('m_y-windowsize-slider')
m_yWindowSlider.setFunction('input', () => new Element().getElementByID('m_y-windowsize-label').setText(m_yWindowSlider.getValue()))
m_yWindowSlider.setFunction('mouseup', () => app.settings().set('settings->main::window-y', m_yWindowSlider.getValue()))

// Настройка 'Полноэкранный режим'
let m_fullScreenWindowCheckbox = new Element().getElementByID('m_full-screen-window-checkbox')
m_fullScreenWindowCheckbox.setFunction('click', () => {
    let m_clicked = m_fullScreenWindowCheckbox.getClicked()
    if(!m_clicked) {
        new Element().getElementByID('m_app-setting-x-win').removeClass('m_disabled-setting')
        new Element().getElementByID('m_app-setting-y-win').removeClass('m_disabled-setting')
        app.settings().set('settings->::main::launch-on-full-screen', 'false')  
    } else {
        new Element().getElementByID('m_app-setting-x-win').addClass('m_disabled-setting')
        new Element().getElementByID('m_app-setting-y-win').addClass('m_disabled-setting')
        app.settings().set('settings->::main::launch-on-full-screen', 'true')
    }
})

// Настройка 'Поверх всех окон'
let m_topWindowCheckbox = new Element().getElementByID('m_top-window-checkbox')
m_topWindowCheckbox.setFunction('click', () => {
    let m_clicked = m_topWindowCheckbox.getClicked()
    if(!m_clicked) app.settings().set('settings->::main::launch-on-top', 'false')  
    else app.settings().set('settings->::main::launch-on-top', 'true')
})

// Настройка 'Запуск окна по центру'
let m_launchCentrizeWindowCheckbox = new Element().getElementByID('m_center-window-checkbox')
m_launchCentrizeWindowCheckbox.setFunction('click', () => {
    let m_clicked = m_launchCentrizeWindowCheckbox.getClicked()
    if(!m_clicked) app.settings().set('settings->::main::launch-on-center', 'false')  
    else app.settings().set('settings->::main::launch-on-center', 'true')
})

// Настройка 'Включить '
let m_enableMaximizeWindowCheckbox = new Element().getElementByID('m_enable-maximize-button-window-checkbox')
m_enableMaximizeWindowCheckbox.setFunction('click', () => {
    let m_clicked = m_enableMaximizeWindowCheckbox.getClicked()
    if(!m_clicked) app.settings().set('settings->::main::disable-maximize-button', 'false')  
    else app.settings().set('settings->::main::disable-maximize-button', 'true')
})