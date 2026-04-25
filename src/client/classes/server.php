<?php
// Get raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // Process data and return a JSON response
    echo json_encode([
        "status" => "success",
        "received" => $data['name']
    ]);
}
?>
