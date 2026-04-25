<?php
    $m_data = $_GET['m_data'];
    $m_folder = $_GET['m_folder'];
    $m_type = $_GET['m_type'];
    file_put_contents(__DIR__ . "/../$m_folder/" . date("d-m-Y", time()) . $m_type, $m_data);