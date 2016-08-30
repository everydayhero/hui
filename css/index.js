import cxs from 'cxs'
import prefixer from 'inline-style-prefixer/static'
import merge from 'lodash/merge'
import compact from 'lodash/compact'

export const cssCompact = (...rest) => compact(rest).join(' ')

export default (...rest) => cxs(prefixer(merge({}, ...rest)))
