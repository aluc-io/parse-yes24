# parse yes24

[![CircleCI](https://circleci.com/gh/aluc-io/parse-yes24/tree/master.svg?style=svg)](https://circleci.com/gh/aluc-io/parse-yes24/tree/master)


[yes24](http://www.yes24.com) is online bookstore in Korea.

## Parse by single book id
```shell
$ node parse.js <yes24-book-id>
```

If web url is `http://www.yes24.com/Product/Goods/87631628` yes24-book-id is `87631628`

Example:
```shell
$ node parse.js 87631628
parse bookId: 87631628
{
  "title": "공부, 이래도 안되면 포기하세요",
  "subTitle": "무조건 합격을 부르는 최강의 멘탈 솔루션 ",
  "mainImgUrl": "http://image.yes24.com/goods/87631628/800x0"
}
```

## Parse by yaml file (multiple book id)

```
$ node parse.js <filename>
```

Example:

yes24-book-id.yml:
```yml
- 87631628  # 공부, 이래도 안되면 포기하세요
- 65282018  # 하버드 상위 1퍼센트의..
```

```shell
$ node parse.js yes24-book-id.yml
parse bookId: 65282018
parse bookId: 87631628
[
  {
    "title": "공부, 이래도 안되면 포기하세요",
    "subTitle": "무조건 합격을 부르는 최강의 멘탈 솔루션 ",
    "mainImgUrl": "http://image.yes24.com/goods/87631628/800x0"
  },
  {
    "title": "하버드 상위 1퍼센트의 비밀 (리커버 에디션)",
    "subTitle": "신호를 차단하고 깊이 몰입하라 ",
    "mainImgUrl": "http://image.yes24.com/goods/65282018/800x0"
  }
]
```

