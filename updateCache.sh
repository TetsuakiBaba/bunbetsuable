#!/bin/bash

# Array of URLs
urls=(
   'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004822.html'  # あ
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004823.html' # か
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004824.html' # さ
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004825.html' # た
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004826.html' # な
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004827.html' # は
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004828.html' # ま
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004829.html' # や
    'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004830.html' # ら
)

# Directory to save the downloaded files
save_dir="./cache"

# Loop through the URLs and download the files
for url in "${urls[@]}"; do
  # Extract the filename from the URL
  filename=$(basename "$url")

  # Download the file using curl
  curl -o "$save_dir/$filename" "$url"
done