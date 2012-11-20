#!/bin/bash
cd todo_html;
for file in `ls *.html`
do
    fname=`ls ${file} | awk -F"\." '{print $1}'`
    python ../script/html2text.py $file > ../todo_md/${fname}.md
done
