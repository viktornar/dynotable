# DynoTable
This is a fun challenge for implementing table that can display for user a big amount of data without visible performance issues from user perspective ([demo](https://viktornar.github.io/dynotable)). Right now, table loads more than 5000 records from  [https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json](https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json). By default data is paged and there are also a toggle button that can switch for a full view of all data.
![Paged view](https://raw.githubusercontent.com/viktornar/dynotable/master/data/paged.png) 
![Full view](https://raw.githubusercontent.com/viktornar/dynotable/master/data/full.png) 
# What libraries was used?
I tried to minimise using of libraries. ReactJS as view library, axios for data fetch and classnames for easer work with classes was used in this project.
I have decided to use ReactJS instead of Angular or VueJS since it much easer to use it in rapid development (prototyping). It doesn't mean that code base is easier to maintain later, but for a quick POC it do the job. It would be nice to implement a similiar approach that was used with ReactJS in VueJS or Angular.
# What techniques was used for increasing performace (UI response time for user actions)?
* debouncing;
* lazy loading;
* infinity scroll;
# How to run
```
yarn install
yarn start
```




