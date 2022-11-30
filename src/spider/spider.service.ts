import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
// const https = require('follow-redirects').https
import { https } from 'follow-redirects'
import axios from 'axios'
@Injectable()
export class SpiderService {
  async findAll() {
    const urls: string[] = []
    const baseUrl = 'https://www.jpmn5.cc'
    const nextText = '下一页'
    let currentPage = 0
    const getCosplay = async () => {
      console.log(currentPage)
      const options = {
        method: 'GET',
        hostname: 'www.jpmn5.cc',
        path: `/Siwameitui/Siwameitui10143${currentPage ? `_${currentPage}` : ''}.html`,
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
          'Accept': '*/*',
          'Host': 'www.jpmn5.cc',
          'Connection': 'keep-alive',
        },
        maxRedirects: 20,
      }

      const body = await this.httpsRequest<string>(options)
      const $ = cheerio.load(body)
      const page = $('.pagination').eq(0).find('a')
      const pageArr = page.map(function () {
        return $(this).text()
      }).toArray()
      if (pageArr.includes(nextText)) {
        $('.article-content p img').each(function () {
          urls.push(baseUrl + $(this).attr('src'))
        })
        currentPage++
        await getCosplay()
      }
      return urls
    }
    await getCosplay()
    this.writeFile(urls)
    return urls
  }

  async writeFile(urls: string[]) {
    fs.mkdirSync(path.join(__dirname, '../cos'))
    urls.forEach(async (url) => {
      const buffer = await axios(url, { responseType: 'arraybuffer' }).then(res => res.data)
      const ws = fs.createWriteStream(path.join(__dirname, `../cos/${new Date().getTime()}.jpg`))
      ws.write(buffer)
    })
  }

  httpsRequest<T>(options: any): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const req = https.request(options, (res) => {
          const chunks = []

          res.on('data', (chunk) => {
            chunks.push(chunk)
          })

          res.on('end', () => {
            const body = Buffer.concat(chunks)
            const html = body.toString() as T
            resolve(html)
            // console.log(body.toString())
          })

          res.on('error', (error) => {
            console.error(error)
          })
        })
        req.on('error', (e) => {
          reject(e)
        })
        req.end()
      }
      catch (e) {
        reject(e)
      }
    })
  }
}

