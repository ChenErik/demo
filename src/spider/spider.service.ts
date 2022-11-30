import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as cheerio from 'cheerio'
@Injectable()
export class SpiderService {
  async findAll() {
    const getCosplay = async () => {
      const body = await axios({
        url: 'https://www.jb51.net/article/253208.htm',
      }).then((res) => {
        return res.data
      })
      const $ = cheerio.load(body)
      const titles = $($('.title')[0]).text()
      return titles
    }
    const body = await getCosplay()
    return body
  }
}
