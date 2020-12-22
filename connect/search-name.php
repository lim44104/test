<?php
//if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest')) {
if (isset($_GET['name'])) {
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

  $name_to_search = htmlentities(strtolower($_GET['name'])); // HuLk == hulk

  $ts = time();
  $public_key = "c9bd7f4fdaa53eaaf8e9601f929b99d9";
  $private_key = "b4a68d0f961d62ce4f7f0a2d53917be811e8dccc";
  $hash = md5($ts . $private_key . $public_key);

  $query = array(
    "name" => $name_to_search, // ""
    "orderBy" => "name",
    "limit" => "20",
    'apikey' => $public_key,
    'ts' => $ts,
    'hash' => $hash,
  );

  $marvel_url = 'https://gateway.marvel.com:443/v1/public/characters?' . http_build_query($query);

  curl_setopt($curl, CURLOPT_URL, $marvel_url);

  $result = json_decode(curl_exec($curl), true);

  curl_close($curl);

  echo json_encode($result);

} else {
  echo "Error: no name given.";
}
//} else {
//  echo "Error: wrong server.";
//}
?>