for file in /home/relh/Code/sun_site/images/**/*.jpg ; do
    new=${file%.jpg}_thumb.jpg
    convert "$file" -resize 2048x2048 "$new"
done
