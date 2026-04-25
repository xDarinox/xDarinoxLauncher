<?php
    include(__DIR__ . '/lib/cApp.php');

    $m_path = isset($_GET['path']) ? $_GET['path'] : __DIR__;
    $m_fileFormat = isset($_GET['fileFormat']) ? $_GET['fileFormat'] : 'exe';
    $m_hook = isset($_GET['hook']) ? $_GET['hook'] : '';
    $m_type = isset($_GET['type']) ? $_GET['type'] : '';
    $m_explorerPath = $_ENV["SYSTEMROOT"] . '\\explorer.exe';
    $m_folderName = isset($_GET['folderName']) ? $_GET['folderName'] : '\\';
    $m_fileName = isset($_GET['fileName']) ? $_GET['fileName'] : 'test.exe';
    $m_folderPath = $_ENV['SERVER_ROOT'] . '\\..\\'. $m_folderName;

    // if($m_type === 'open' && $m_hook === 'file_path') system($m_path);
    // else if($m_type === 'close' && $m_hook === 'file_path' && $m_fileFormat == 'exe') {
    //     $m_file = end(explode('/', $m_path));
    //     $process = proc_open($m_file, [], $pipes);
    //     if(is_resource($process)) {
    //         proc_terminate($process);
    //         proc_close($process);
    //     }
    //     exec('taskkill /F /IM '.escapeshellarg($m_file), $output, $returnVar);
    //     exit;
    // } else if($m_type === 'read' && $m_hook === 'file-info-app' && $m_fileFormat == 'file') {
    //     if(!file_exists(sprintf('%s\\..\\..\\..\\..\\logs\\%s.log', __DIR__, date("d-m-Y", time())))) file_put_contents(sprintf('%s\\..\\..\\..\\..\\logs\\%s.log', __DIR__, date("d-m-Y", time())), '');
    //     $m_file = file_get_contents(sprintf('%s\\..\\..\\..\\..\\logs\\%s.log', __DIR__, date("d-m-Y", time())));
    //     exit($m_file);
    // } else if($m_hook === 'folder_app' && $m_fileFormat === 'folder') shell_exec("$m_explorerPath /n,/e, $m_folderPath");

    shell_exec($m_path);

// $appPath = 'C:\\Program Files\\AppName\\app.exe'; // Используйте двойные слэши для Windows

// if (file_exists($appPath)) {
//     echo "Приложение установлено.";
// } else {
//     echo "Приложение не найдено.";
// }