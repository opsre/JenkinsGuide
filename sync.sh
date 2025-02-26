# 确保脚本抛出遇到的错误
set -e
# 先清空静态文件目录
rm -rf docs/.vitepress/dist
# 编译
make build

# 同步
rsync -az -e 'ssh -p 2023' --delete docs/.vitepress/dist/  \
    root@prod.eryajf.net:/data/www/JenkinsGuide/