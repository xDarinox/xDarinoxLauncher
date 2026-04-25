import fmt from '../../utils/libfmt.js'
import Element from './cElement.js'
import FileSystem from './cFileSystem.js'
import Notification from './cNotification.js'
import WebRequest from './cWebRequest.js'

let m_saves = FileSystem.getSaveFile()
let _TOTAL_IN_GAME_SECONDS = m_saves.save.game.seconds != 0 ? m_saves.save.game.seconds : 0
let _TOTAL_IN_GAME_POINTS = m_saves.save.game.points != 0 ? m_saves.save.game.points : 0
let _TOTAL_IN_GAME_SESSIONS = m_saves.save.game.sessions != 0 ? m_saves.save.game.sessions : 0
let _CURRENT_IN_GAME_SECONDS = 0
let _CURRENT_IN_GAME_MINUTES = 0
let _CURRENT_IN_GAME_HOURS = 0
let _SESSION_IN_GAME_SECONDS = 0
let _SESSION_IN_GAME_POINTS = 0
let _POINTS_PER_HOUR = 100000
let _INTERVAL_COUNTER = null

class App {
    checkUpdates() {
        //Common values: "json", "xml", "html", or "text".
        let m_request = new WebRequest('https://api.xdarinox.dev/v1/client/getInfo', 'POST', {
                requestType: 'checkUpdates',
                version: m_saves.config.version,
                platform: m_saves.config.platform,
                key: 'H4sIAAAAAAACCjNNMzc1STQ1NzMzNjAxNbcEspKMLY3NzC3Mjc3NAXcjuIIeAAAA'
            }).send()
            
        if(m_request === 'no-updates') this.load()
        else if(m_request === 'new-update') this.update()
    }


    load() {
        window.onload = () => {
            Notification.create('error',FileSystem.o(m_saves.config.gamePathEXE), 7)


            new Element().getElementByID('m_y-windowsize-slider').setValue(m_saves.settings.windowSizes[1])
            new Element().getElementByID('m_y-windowsize-label').setText(m_saves.settings.windowSizes[1])
            new Element().getElementByID('m_full-screen-window-checkbox').setClick(m_saves.settings.isFullscreen || m_saves.settings.isMaximumSize)
            new Element().getElementByID('m_top-window-checkbox').setClick(m_saves.settings.isLaunchOnTop)
            new Element().getElementByID('m_center-window-checkbox').setClick(m_saves.settings.isCenterLaunch)
            new Element().getElementByID('m_enable-maximize-button-window-checkbox').setClick(m_saves.settings.isDisableMaximizeButton)
            new Element().getElementByID('m_load').addClass('m_disabled-loading')
            new Element().getElementByID('m_user-points-value').setText(m_saves.save.game.points)
            new Element().getElementByID('m_serverLayer-zcx-full-label').setText(fmt('Общее время в игре:%s%s%s',
                Math.floor(_TOTAL_IN_GAME_SECONDS / 3600) != 0 ? fmt(' %iч.', Math.floor(_TOTAL_IN_GAME_SECONDS / 3600)) : '',
                Math.floor((_TOTAL_IN_GAME_SECONDS % 3600) / 60) != 0 ? fmt(' %iмин.', Math.floor((_TOTAL_IN_GAME_SECONDS % 3600) / 60)) : '',
                _TOTAL_IN_GAME_SECONDS % 60 != 0 ? fmt(' %iсек.', _TOTAL_IN_GAME_SECONDS % 60) : ' --:--:--'
            ))
        }
    }

    update() {
        //console.warn(FileSystem.getLogFile())
    }

    launchGame() {
        _INTERVAL_COUNTER = setInterval(this.inGameUpdater, 1000)
        //Notification.create('success', 'Сервер запущен! Приятной игры :)', 3)
        new Element().getElementByID('m_app-launch-gdps').addClass('m_hideElement')
        new Element().getElementByID('m_app-launch-gdps').removeClass('m_showElement')
        new Element().getElementByID('m_app-stop-gdps').addClass('m_showElement')
        new Element().getElementByID('m_serverLayer-timer-label').setText('00:00:00')
        FileSystem.openPathEXE(m_saves.config.gamePathEXE)
        //this.setLog(this.getFormatLogString(this.constructor.name, fmt('Launched GDPS \'%s\'', m_saves.config.game_exe_path)))
        Notification.create('success', m_saves.config.gamePathEXE, 3)
    }
    
    exitGame() {
        clearInterval(_INTERVAL_COUNTER)
        let s = _TOTAL_IN_GAME_POINTS + _SESSION_IN_GAME_POINTS
        _CURRENT_IN_GAME_SECONDS = 0
        _SESSION_IN_GAME_SECONDS = 0
        _SESSION_IN_GAME_POINTS = 0

        new Element().getElementByID('m_user-points-value').setText(s)

        new Element().getElementByID('m_app-launch-gdps').addClass('m_showElement')
        new Element().getElementByID('m_app-stop-gdps').removeClass('m_showElement')
        new Element().getElementByID('m_app-stop-gdps').addClass('m_hideElement')
        FileSystem.closePathEXE(m_saves.config.gamePathEXE)

        Notification.create('warn', m_saves.config.gamePathEXE, 10)


       // this.setLog(this.getFormatLogString(this.constructor.name, fmt('Closed GDPS \'%s\'', m_saves.config.game_exe_path)))

        new Element().getElementByID('m_serverLayer-zcx-full-label').setText(fmt('Общее время в игре:%s%s%s',
            Math.floor(_TOTAL_IN_GAME_SECONDS / 3600) != 0 ? fmt(' %iч.', Math.floor(_TOTAL_IN_GAME_SECONDS / 3600)) : '',
            Math.floor((_TOTAL_IN_GAME_SECONDS % 3600) / 60) != 0 ? fmt(' %iмин.', Math.floor((_TOTAL_IN_GAME_SECONDS % 3600) / 60)) : '',
            _TOTAL_IN_GAME_SECONDS % 60 != 0 ? fmt(' %iсек.', _TOTAL_IN_GAME_SECONDS % 60) : ' --:--:--'
        ))
        new Element().getElementByID('m_user-points-value2').setText(_SESSION_IN_GAME_POINTS)
        new Element().getElementByID('m_serverLayer-timer-label').setText('')

        this.settings().set('secondsInGame', _TOTAL_IN_GAME_SECONDS)
        this.settings().set('pointsInGame', s)
        this.settings().set('sessionsInGame', 222)
    }

    inGameUpdater() {
        _CURRENT_IN_GAME_SECONDS++
        _TOTAL_IN_GAME_SECONDS++
        _SESSION_IN_GAME_SECONDS++
        _SESSION_IN_GAME_POINTS = (_POINTS_PER_HOUR * _SESSION_IN_GAME_SECONDS) / 86400

        console.warn(_SESSION_IN_GAME_POINTS)
        new Element().getElementByID('m_user-points-value2').setText(_SESSION_IN_GAME_POINTS)
    
        if(_CURRENT_IN_GAME_SECONDS > 59) {
            _CURRENT_IN_GAME_SECONDS = 0
            _CURRENT_IN_GAME_MINUTES++
        }
    
        if(_CURRENT_IN_GAME_MINUTES > 59) {
            _CURRENT_IN_GAME_MINUTES = 0
            _CURRENT_IN_GAME_HOURS++
        }
        new Element().getElementByID('m_serverLayer-timer-label').setText(fmt('%02i:%02i:%02i', _CURRENT_IN_GAME_HOURS, _CURRENT_IN_GAME_MINUTES, _CURRENT_IN_GAME_SECONDS))
    }

    settings() {
        return {
            get: (value = '') => {
                var response = ''
                $.ajax({
                    url: '/../data.json',
                    method: 'GET',
                    data: {},
                    async: false,
                    success: (responseText) => {response = responseText}
                })
    
                if(value === '') return response
            },
    
            set: (key = '', value = '') => {
                if(key != '' && value != '') {
                    var data = {}
                    data[key] = value
    
                    fetch(fmt('%s/api/client/scripts/cUpdateAppData.php?%s&key=%s', FileSystem.getLocalHost(), new URLSearchParams(data).toString(), 'SDRzSUFBQUFBQUFDQ2pOTk16YzFTVFExTnpNek5qQXhOYmNFc3BLTUxZM056QzNNamMzTkFYY2p1SUllQUFBQQ--'))
                    this.setLog(this.getFormatLogString(this.constructor.name, fmt('Update setting value: %s', new URLSearchParams(data).toString())))
                }
            }
        }
    }

    setLog(data) {
            let m_logger = document.getElementById('m_consoleLayer-log-field')
            m_logger.style['textAlign'] = 'left'
            m_logger.style['alignContent'] = 'flex-start'
            m_logger.value += fmt('%s\n', data)
            m_logger.scrollTop = m_logger.scrollHeight
    }
    
    saveLog(value) {
        const data = { m_data: value, m_folder: 'logs', m_type: '.log' };
        const url = fmt('../cSaveLog.php?%s', new URLSearchParams(data).toString())
        fetch(url).then(response => response.text())
        .then(result => {
            this.setLog(this.getFormatLogString(this.constructor.name, 'Лог сохранен в папку \'logs\''))
        })
    }
    
    getFormatLogString(type, text) {
        let date = new Date()
        return fmt('[%s][%s] %s', fmt('%02i.%02i.%04i|%02i:%02i:%02i', date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()), type.toUpperCase(), text)
    }

    refresh() {
        window.location.href = fmt('%s?t=%i', window.location.pathname, Date.now())
    }

    reload() {
        window.close()
        FileSystem.openPathEXE(m_saves.config.appPathEXE)
    }

    quit() {
        window.close()
    }
    
    getLocalHost() {
        return window.location.origin
    }

}
export default new App()