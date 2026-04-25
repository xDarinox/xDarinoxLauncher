//import data from '../../data.json' with { type: 'json' }
import app from './App.js'
import Animation from '../../api/client/classes/cAnimation.js'
import Element from '../../api/client/classes/cElement.js'
import Save from './Save.js'

let Main = class {
    onDocs() {
        top.location.href = 'api/get-started.htm?index=1'
    }

    onSettings(isOpen) {
        let m_layer = new Element().getElementByID('m_settingsLayer')
        let m_node = new Element().getElementByID('m_settingsLayerNode')
        
        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeOutScale(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInScale(), 'linear', 0.15)
            this.onSettingsMenu()
        }
    }

    onSettingsMenu(tag) {
        let m_accountTab = new Element().getElementByID('m_app-settings-account')
        let m_mainTab = new Element().getElementByID('m_app-settings-main')
        let m_gdTab = new Element().getElementByID('m_app-settings-gd')

        let m_accountView = new Element().getElementByID('m_settingsAccountView')
        let m_mainView = new Element().getElementByID('m_settingsMainView')
        let m_gdView = new Element().getElementByID('m_settingsGDView')

        switch(tag) {
            case 1000:
                m_accountTab.setBackgroundColor('#222222')
                m_mainTab.setBackgroundColor('#00000000')
                m_gdTab.setBackgroundColor('#00000000')

                m_accountView.setVisible(true)
                m_mainView.setVisible(false)
                m_gdView.setVisible(false)
                break
            case 1001:
                m_accountTab.setBackgroundColor('#00000000')
                m_mainTab.setBackgroundColor('#222222')
                m_gdTab.setBackgroundColor('#00000000')

                m_accountView.setVisible(false)
                m_mainView.setVisible(true)
                m_gdView.setVisible(false)
                break
            case 1002:
                m_accountTab.setBackgroundColor('#00000000')
                m_mainTab.setBackgroundColor('#00000000')
                m_gdTab.setBackgroundColor('#222222')

                m_accountView.setVisible(false)
                m_mainView.setVisible(false)
                m_gdView.setVisible(true)
                break
            default:
                m_accountTab.setBackgroundColor('#222222')
                m_mainTab.setBackgroundColor('#00000000')
                m_gdTab.setBackgroundColor('#00000000')

                m_accountView.setVisible(true)
                m_mainView.setVisible(false)
                m_gdView.setVisible(false)
                break
        }
    }

    onPreview (isOpen)  {
        let m_layer = new Element().getElementByID('m_serverLayer')
        let m_node = new Element().getElementByID('m_serverLayerNode')
    
        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeOutScale(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInScale(), 'linear', 0.15)
        }
    }
    
    onConsole (isOpen)  {
        let m_layer = new Element().getElementByID('m_consoleLayer')
        let m_node = new Element().getElementByID('m_consoleLayerNode')
    
        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeOutScale(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInScale(), 'linear', 0.15)
        }
    }

    onChangeUsername(isOpen) {
        let m_layer = new Element().getElementByID('m_changeUsernameLayer')
        let m_node = new Element().getElementByID('m_changeUsernameLayerNode')
        new Element().getElementByID('m_newUsername').setValue(data.save.user.uname)

        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeOutScale(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInScale(), 'linear', 0.15)
        }
    }

    onChangePassword(isOpen) {
        
        let m_layer = new Element().getElementByID('m_changePasswordLayer')
        let m_node = new Element().getElementByID('m_changePasswordLayerNode')
       // new Element().getElementByID('m_newPassword').setValue(data.save.username)

        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeOutScale(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInScale(), 'linear', 0.15)
        }
    }

    onMenu(isOpen) {
        let m_layer = new Element().getElementByID('m_menuLayer')
        let m_node = new Element().getElementByID('m_menuLayerNode')

        console.warn(m_layer)

        if(!isOpen) {
            m_layer.setAnimation(Animation.fadeOutColor(), 'linear', 0.15)
            m_layer.removeClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInToLeft(), 'linear', 0.15)
        } else {
            m_layer.setAnimation(Animation.fadeInColor(), 'linear', 0.15)
            m_layer.addClass('m_pointerEventsAll')
            m_node.setAnimation(Animation.fadeInFromLeft(), 'linear', 0.15)
        }
    }

    onSaveUsername() {
        let m_passwordCurrent = data.save.password
        let m_passwordNew = new Element().getElementByID('m_currentPassword')
        let m_newUsername = new Element().getElementByID('m_newUsername')
        if(m_passwordCurrent === btoa(m_passwordNew.getValue())) {
            m_passwordNew.setValue('')
            m_newUsername.setValue(m_newUsername.getValue())
            App.updateSettings('_account::newUsername', m_newUsername.getValue())
            new Element().getElementByID('m_setting-value-1001').setText(m_newUsername.getValue())
            //this.onChangeUsername(false)
        } else m_passwordNew.addClass('m_errorInput')
    }
}
export default new Main