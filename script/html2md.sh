#!/bin/bash
cd _posts;
for file in `ls *.html`
do
    fname=`ls ${file} | awk -F"\." '{print $1}'`
    python ../html2text.py $file > ${fname}.md
done
