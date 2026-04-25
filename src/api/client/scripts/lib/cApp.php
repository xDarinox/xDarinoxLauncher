<?php class App {
	public static function getSaveData() {
		$m_save = explode('; ', $_ENV['HTTP_COOKIE']);
		$result = [];

		foreach ($m_save as $m_value) {
    		list($key, $value) = explode('=', $m_value);
			if($key == 'password') $result['password'] = password_hash($value, PASSWORD_DEFAULT);
    		else $result[$key] = is_numeric($value) ? (int)$value : $value;
		}
		return $result;
	}

	public static function parseKey($key) {
		return hex2bin(zlib_decode(base64_decode(base64_decode(str_replace('-', '=', $key)))));
	}
}