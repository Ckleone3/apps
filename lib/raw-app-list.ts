import * as fs from 'fs'
import * as path from 'path'
const yaml = require('yamljs')

export const apps = () =>
  fs.readdirSync(path.join(__dirname, '../apps'))
    .filter(filename => {
      return fs.statSync(path.join(__dirname, `../apps/${filename}`)).isDirectory()
    })
    .sort()
    .map(slug => {
      const yamlFile = path.join(__dirname, `../apps/${slug}/${slug}.yml`)
      const app = Object.assign(
        {
          slug: slug,
          iconPath: path.join(__dirname, `../apps/${slug}/${slug}-icon.png`)
        },
        yaml.load(yamlFile)
      )
      return app
    })
