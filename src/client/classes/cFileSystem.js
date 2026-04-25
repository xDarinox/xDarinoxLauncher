import fmt from '../../utils/libfmt.js'
import App from './cApp.js'
import Notification from './cNotification.js'
import WebRequest from './cWebRequest.js'
class FileSystem {
    getLocalHost() {
        return window.location.origin
    }

    openAppFile(fileName) {
        fetch(fmt('../api/client/scripts/cFileSystem.php?folderName=%s&fileFormat=%s&hook=%s', fileName, 'file', 'file_app'))
    }

    openAppFolder(folderName) {
        fetch(fmt('../api/client/scripts/cFileSystem.php?folderName=%s&fileFormat=%s&hook=%s', folderName, 'folder', 'folder_app'))
    }
    
    openPathFolder(path) {
        fetch(fmt('../api/client/scripts/cFileSystem.php?path=%s&fileFormat=%s&hook=%s', path, 'folder', 'folder_path'))
    }
    
    openPathEXE(path) {
        fetch(fmt('%s/api/client/scripts/cFileSystem.php?path=%s&fileFormat=%s&hook=%s&type=%s', this.getLocalHost(), path, 'exe', 'file_path', 'open'))
    }

    o(path) {
        return fmt('%s/api/client/scripts/cFileSystem.php?path=%s&fileFormat=%s&hook=%s&type=%s', this.getLocalHost(), path, 'exe', 'file_path', 'open')
    }

    closePathEXE(path) {
        fetch(fmt('../api/client/scripts/cFileSystem.php?path=%s&fileFormat=%s&hook=%s&type=%s', path, 'exe', 'file_path', 'close'))
    }

    getAppFileInfo(fileName, order) {
        // let response = ''
        // $.ajax({
        //     url: '../api/client/scripts/cFileSystem.php',
        //     method: 'POST',
        //     data: {fileName: fileName, fileFormat: 'file', hook: 'file-info-app', type: 'read'},
        //     async: false,
        //     success: (responseText) => { response = responseText }
        // })
        // console.log(response)
        // return response


        //let m_request = new WebRequest('http://127.0.0.1:5500/api/client/scripts/cFileSystem.php', 'POST').send()

        // fetch(fmt('../api/client/scripts/cFileSystem.php?fileName=%s&fileFormat=%s&hook=%s&type=%s', fileName, 'file', 'file-info-app', 'read'))
        // .then(response => console.warn(response.text()))
        // .then(result => {
        //     console.warn(result)
        // })

        Notification.create('warn', App.getLocalURL(), 5)
        return App.getLocalURL()
    }

    getSaveFile() {
        let m_response = null
        $.ajax({
            url: fmt('%s/api/saves', this.getLocalHost()),
            method: 'GET',
            async: false,
            success: (result) => { m_response = result }
        })
        // Notification.create('success', response, 15)
        return JSON.parse(m_response)
    }
    
    getLogFile() {
        let m_date = new Date()
        let m_response = null

        console.warn(fmt('%s\\..\\logs\\%s.log', this.getLocalURL(), fmt('%02i-%02i-%04i', m_date.getDate(), m_date.getMonth() + 1, m_date.getFullYear())))
        $.ajax({
            url: fmt('..\\logs\\%s.log', fmt('%02i-%02i-%04i', m_date.getDate(), m_date.getMonth() + 1, m_date.getFullYear())),
            method: 'GET',
            async: false,
            success: (result) => { m_response = result }
        })
         Notification.create('success', m_response, 15)
        return JSON.parse(m_response)
    }
}
export default new FileSystem()