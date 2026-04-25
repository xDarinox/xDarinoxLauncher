<?php class cCompressor {
	public static function codeCompress($filePath) {
		$m_file = file_get_contents($filePath);
        $m_parser = str_replace(['<', '>', '/', '(', ')', '\'', '=', '_', '-', '"'], ['$', '|', '*', '?', '#', '%', '@', '+', '&', '~'], $m_file);
        $m_parser = bin2hex(bin2hex($m_parser));
        $m_parser = zlib_encode($m_parser, ZLIB_ENCODING_GZIP, 9);
        $m_parser = base64_encode($m_parser);
        $m_string = str_replace(['/', '+'], [';', ':'], $m_parser);
		return $m_string;
	}
    
    public static function codeUncompress($m_string) {
		$m_f = str_replace([';', ':'], ['/', '+'], $m_string);
        $m_f = base64_decode($m_f);
        $m_f = zlib_decode($m_f);
        $m_f = hex2bin(hex2bin($m_f));
        $m_f = str_replace(['$', '|', '*', '?', '#', '%', '@', '+', '&', '~'], ['<', '>', '/', '(', ')', '\'', '=', '_', '-', '"'], $m_f);
		return $m_string;
	}
}