for file in /home/relh/Code/sun_site/images/yearputs/field/*.jpg ; do
    new=${file%.jpg}_thumb.jpg
    convert "$file" -resize 2048x2048 "$new"
done

for file in /home/relh/Code/sun_site/images/monthputs/field/*.jpg ; do
    new=${file%.jpg}_thumb.jpg
    convert "$file" -resize 2048x2048 "$new"
done
