--- 
status: publish 
layout: post 
title: !binary | V29yZHByZXNz5a6J6KOF56+H 
--- 

知道WP已经有大半年的时间了，一直神向往之，今天突然心血来潮，准备探索一下Wordpress，在2010年的第一天。 从网上拉了这篇安装篇，以为摘记。 Wordpress安装非常简便，只需六步，还等什么，follow me：

  1. 下载并解压缩WordPress软件包。
  2. 在你的主机上为WordPress建立一个数据库，以及一个具有访问和修改权限的MySQL用户。
  3. 将wp-config-sample.php改名为wp-config.php.
  4. 用你最喜欢的文字编辑器打开wp-config.php，填入你的数据库信息

    1. define('DB_NAME', 'putyourdbnamehere');    // 数据库名
    2. define('DB_USER', 'usernamehere');     // 数据库用户名
    3. define('DB_PASSWORD', 'yourpasswordhere'); //数据库密码
    4. define('DB_HOST', 'localhost');    // 数据库地址

  5. 将WordPress文件上传至你的网站服务器上适当的地方：将解压后的WordPress目录中的所有内容（不包含最外层的WordPress文件夹）上传至你的空间目录。
  6. 在浏览器中访问wp-admin/install.php运行WordPress脚本。如果你将WordPress安装在顶级目录中，你需要访问`http://example.com/wp-admin/install.php`

  如果你将WordPress安装在子目录中，比如blog，你应该访问`http://example.com/blog/wp-admin/install.php`
OK，WordPress已经安装完毕。

  ps：我用的免费域名byethost，数据库地址在phpadmin中的左上角，因为没弄好这个，导致数据库老是无法建立，初学者要注意了。

