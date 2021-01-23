
# 创建文件夹
mkdir 文件夹名称

# 删除文件夹
rm -f 文件夹名称 （-f表示强制删除）
rm -rf 文件夹 (-rb表示递归删除文件夹,并且不能恢复)


# 重命名文件夹
mv 旧文件夹名 新文件夹名

# 解压文件
tar -xf node-v8.11.4-linux-x64.tar
tar -xvf xxx.tar.gz

# 解压zip包(需要安装zip/unzip  yum -y install zip)
unzip mydata.zip -d mydatabak

# 拷贝文件
cp 源文件(source) 目标文件(destination)

# 移动文件
mv source destination

# 查找文件所在位置
whereis nginx.conf

# 更改文件 & 文件夹权限
chmod 777 文件&文件夹名

# 查看网卡等相关配置
ifconfig

# 查看绑定的虚拟ip
ip a