const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const yaml = require('js-yaml')
const delay = require('delay')

const ymlFileContent = fs.readFileSync('./yes24-book-id.yml', 'utf8')
const json = yaml.safeLoad(ymlFileContent)

const parseYes24BookInfo = async (yes24BookId) => {
  console.log('parse bookId: ' + yes24BookId)
  const r = await axios.request({
    method: 'get',
    url: `http://www.yes24.com/Product/Goods/${yes24BookId}`,
  })
  const $ = cheerio.load(r.data)

  const title = $('#yDetailTopWrap > div.topColRgt > div.gd_infoTop > div > h2').text()
  const subTitle = $('#yDetailTopWrap > div.topColRgt > div.gd_infoTop > div > h3').text()
  const mainImgUrl = $('#yDetailTopWrap > div.topColLft > div.gd_imgArea > span > em > img').attr('src')
  const date = $('#yDetailTopWrap > div.topColRgt > div.gd_infoTop > span.gd_pubArea > span.gd_date').text()
  // TODO: 필요한 정보 더 추가하기

  return {
    title,
    subTitle,
    mainImgUrl,
    date,
  }
}

const runBySingleId = async (yes24BookId) => {
  const parsed = await parseYes24BookInfo(yes24BookId)
  console.log(JSON.stringify(parsed,null,2))
}

const runByYml = async () => {
  const promiseArr = json.map( async (yes24BookId,i) => {
    // 부하를 줄이기 위해 요청당 100ms 의 딜레이를 주고 보냄.
    await delay(i * 100);
    return parseYes24BookInfo(yes24BookId)
  })

  const resultArr = await Promise.all(promiseArr )
  console.log(JSON.stringify(resultArr,null,2))
}

if (require.main === module) {
  const bookIdOrYmlFileName = process.argv[2]
  if (/\.ya?ml$/.test(bookIdOrYmlFileName)) runByYml(bookIdOrYmlFileName)
  else if (/^\d+?$/.test(bookIdOrYmlFileName)) runBySingleId(bookIdOrYmlFileName)
  else throw new Error('Please check README.md')
}
