# infinite-hearts-discourse-plugin

*As a Discourse user I want to give infinite :heart: to express my appreciation*

```
git clone https://github.com/discourse/discourse.git --depth 1
cd discourse

# add the following line in the file discourse/containers/app.yml ~ line 88 in the plugins list
#          - git clone --branch dev https://github.com/christian-fei/infinite-hearts-discourse-plugin.git

./launcher bootstrap app
./launcher start app
```
