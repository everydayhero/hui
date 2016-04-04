'use strict'

import mapKeys from 'lodash/object/mapKeys'
import kebabCase from 'lodash/string/kebabCase'

export default (props) => mapKeys(props.data, (d, k) => 'data-' + kebabCase(k))
