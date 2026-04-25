<?php
    include(__DIR__ . '/lib/cApp.php');
    if(isset($_GET['key']) && App::parseKey($_GET['key']) === '_uJWf0EyWk96xsw') {
        $m_userAgent = explode(' ', $_ENV['HTTP_USER_AGENT']);
        if(file_exists(sprintf('%s/../../saves', __DIR__))) {

            // Значения настроек передаваемые с помощью $_GET параметров
            $serverName = 'xDarinoxGDPS';
            $saves = json_decode(file_get_contents(sprintf('%s/../../saves', __DIR__)), true);
            $secondsInGame = isset($_GET['secondsInGame']) ? $_GET['secondsInGame'] : $saves['save']['game']['seconds'];
            $pointsInGame = isset($_GET['pointsInGame']) ? $_GET['pointsInGame'] : $saves['save']['game']['points'];
            $sessionsInGame = isset($_GET['sessionsInGame']) ? $_GET['sessionsInGame'] : $saves['save']['game']['sessions'];
            $windowSizeX = isset($_GET['windowSizeX']) ? $_GET['windowSizeX'] : $saves['settings']['window-sizes'][0];
            $windowSizeY = isset($_GET['windowSizeY']) ? $_GET['windowSizeY'] : $saves['settings']['window-sizes'][1];
            $isLaunchOnTop = isset($_GET['isLaunchOnTop']) ? (($_GET['isLaunchOnTop'] != 'false') ? true : false) : $saves['settings']['isLaunchOnTop'];
            $isCenterLaunch = isset($_GET['isCenterLaunch']) ? (($_GET['isCenterLaunch'] != 'false') ? true : false) : $saves['settings']['isCenterLaunch'];
            $isFullscreen = isset($_GET['isFullscreen']) ? (($_GET['isFullscreen'] != 'false') ? true : false) : $saves['settings']['isFullscreen'];
            $isDisableMaximizeButton = isset($_GET['isDisableMaximizeButton']) ? (($_GET['isDisableMaximizeButton'] != 'false') ? true : false) : $saves['settings']['isDisableMaximizeButton'];
            $isDevTools = isset($_GET['isDevTools']) ? (($_GET['isDevTools'] != 'false') ? true : false) : $saves['settings']['isDevTools'];

            $m_data['save'] = App::getSaveData();
            $m_data['save']['game'] = [
                'seconds' => (int)$secondsInGame,
                'points' => (int)$pointsInGame,
                'sessions' => (int)$sessionsInGame,
                'total-points-collected' => (int)1
            ];
            $m_data['config'] = [
                'name' => 'xDarinox Launcher',
                'developer' => 'xDarinox',
	            'version' => '1.0.0-alpha',
	            'platform' => str_replace('"', '', $_ENV['HTTP_SEC_CH_UA_PLATFORM']),
                'pc-name' => $_ENV['COMPUTERNAME'],
                'pc-username' => $_ENV['USERNAME'],
                'architecture' => str_replace(')', '', $m_userAgent[5]),
                'platform-version' => (int)sprintf('%d', explode('.', str_replace(';', '', $m_userAgent[3]))[0]),
                'php-parser-path' => 'src\\api\\client\\scripts\\parser.exe',
                'app-root-path' => str_replace('\\src', '', $_ENV['SERVER_ROOT']),
                'appPathEXE' => str_replace(['src', 'test'], '', $_ENV['SERVER_ROOT']) . 'xDarinoxLauncher.exe',
                'gamePathEXE' => sprintf('%sgame\\%s.exe', str_replace(['src', 'test'], '', $_ENV['SERVER_ROOT']), $serverName),
                'game-data-folder-path' => sprintf('%s\\%s', $_ENV['LOCALAPPDATA'], $serverName)
            ];
            $m_data['config']['command_line_switches'] = [
                'disable-gpu' => ''
            ];
            $m_data['settings'] = [
                'windowSizes' => [(int)$windowSizeX, (int)$windowSizeY],
                'minimum-size' => [(int)$windowSizeX, (int)$windowSizeY],
                'maximum-size' => ($isFullscreen || !$isDisableMaximizeButton) ? [0, 0] : [(int)$windowSizeX, (int)$windowSizeY],
                'isDisableMaximizeButton' => $isDisableMaximizeButton,
                'isCenterLaunch' => $isCenterLaunch,
                'isFullscreen' => $isFullscreen,
                'isMaximumSize' => $isFullscreen,
                'isLaunchOnTop' => $isLaunchOnTop,
                'interface-font' => '-',
                'isDevTools' => $isDevTools
            ];
        } else {
            $m_data['save']['user'] = [];
            $m_data['save']['game'] = [
                'time_in_game' => (int)0,
                'points' => (int)0
            ];
            $m_data['config'] = [
                'name' => 'xDarinox Launcher',
                'developer' => 'xDarinox',
	            'version' => '1.0.0-alpha',
	            'platform' => str_replace('"', '', $_ENV['HTTP_SEC_CH_UA_PLATFORM']),
                'pc-name' => $_ENV['COMPUTERNAME'],
                'pc-username' => $_ENV['USERNAME'],
                'architecture' => str_replace(')', '', $m_userAgent[5]),
                'platform-version' => (int)sprintf('%d', explode('.', str_replace(';', '', $m_userAgent[3]))[0]),
                'php-parser-path' => 'src\\api\\client\\scripts\\parser.exe',
                'app-root-path' => str_replace('\\src', '', $_ENV['SERVER_ROOT']),
                'appPathEXE' => str_replace('src', '', $_ENV['SERVER_ROOT']) . 'xDarinoxLauncher.exe',
                'gamePathEXE' => 'C:\\Users\\Kirill\\Downloads\\xDarinox-Manger-v1.00\\src\\gd\\xDarinoxGDPS.exe',
                'game-data-folder-path' => sprintf('%s\\%s', $_ENV['LOCALAPPDATA'], 'xDarinoxGDPS')
            ];
            $m_data['config']['command_line_switches'] = [
                'disable-gpu' => ''
            ];
            $m_data['settings'] = [
                'windowSizes' => [1400, 800],
                'minimum-size' => [1400, 800],
                'maximum-size' => [1400, 800],
                'isDisableMaximizeButton' => true,
                'isCenterLaunch' => true,
                'isFullscreen' => false,
                'isMaximumSize' => false,
                'isLaunchOnTop' => false,
                'interface-font' => '-',
                'isDevTools' => false
            ];
        }
        file_put_contents(sprintf('%s/../../saves', __DIR__), json_encode($m_data,JSON_PRETTY_PRINT)); // JSON_PRETTY_PRINT

        exit('Настройки успешно обновлены.');
    } else exit('Неверный ключ доступа.');

// $exePath = 'C:\\Program Files\\App\\app.exe';
// $iconSavePath = 'C:\\inetpub\\wwwroot\\icons\\app.ico';
// $reshackerPath = 'C:\\PathTo\\ResHacker.exe';

// // Команда для извлечения иконки (Resource Hacker)
// $cmd = "\"$reshackerPath\" -action extract -res \"$iconSavePath\" -mask ICONGROUP,, -exe \"$exePath\"";

// exec($cmd, $output, $returnCode);

// if ($returnCode === 0) {
//     echo "Иконка успешно извлечена: $iconSavePath";
// } else {
//     echo "Ошибка при извлечении иконки.";
// }
