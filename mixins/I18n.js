import {translate, translateMarkdown} from '../lib/i18n'

export default {
  t (key, params) {
    return translate(this.constructor.i18n, this.props.region, key, params)
  },
  tm (key, params) {
    return translateMarkdown(this.constructor.i18n, this.props.region, key, params)
  }
}
