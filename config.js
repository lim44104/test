$name_to_search = htmlentities(strtolower($_GET['name'])); // HuLk == hulk

$ts = time();
$public_key = "c9bd7f4fdaa53eaaf8e9601f929b99d9";
$private_key = "b4a68d0f961d62ce4f7f0a2d53917be811e8dccc";
$hash = md5($ts . $private_key . $public_key);

var config = {
    "name" : $name_to_search, // ""
    "orderBy" : "name",
    "limit" : "20",
    'apikey' : $public_key,
    'ts' : $ts,
    'hash' : $hash,
  }