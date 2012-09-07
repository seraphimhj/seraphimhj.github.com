#!/bin/bash
cd _posts/blog;
for file in `ls *.html`
do
    fname=`ls ${file} | awk -F"\." '{print $1}'`
    python ../../script/html2text.py $file > ../${fname}.md
done
