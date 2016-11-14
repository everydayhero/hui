import isObject from 'lodash/isObject'
import get from 'lodash/get'
import format from './format'
import Remarkable from 'remarkable'
const md = new Remarkable({ xhtmlOut: true, breaks: true })

const separator = '.'
const cache = {}

const lookup = (i18n, key, region) => get(
  i18n,
  `${region}${separator}${key}`,
  get(
    i18n,
    `en.${key}`,
    'missing translation'
  )
)

const tm = (str) => <span dangerouslySetInnerHTML={{__html: md.render(str)}} />

export const t = (i18n, key, params, region) => {
  const cacheKey = JSON.stringify(i18n) + key + JSON.stringify(params) + region
  if (cache[cacheKey]) return cache[cacheKey]

  let scope = params && params.scope
  let value = scope && lookup(i18n, `${scope}${separator}${key}`, region) || lookup(i18n, key, region)

  if (params && params.count !== undefined && isObject(value)) {
    let pluralisation = params.count === 1 ? 'one' : 'other'
    value = value[pluralisation]
  }

  cache[cacheKey] = value && format(value, params)
  return cache[cacheKey]
}

export const translate = (i18n, region, key, params) => (
  t(i18n, key, params, region)
)

export const translateMarkdown = (i18n, region, key, params) => (
  tm(t(i18n, key, params, region))
)
