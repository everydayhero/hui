'use strict'

import mapKeys from 'lodash/mapKeys'
import kebabCase from 'lodash/kebabCase'

export default (props) => mapKeys(props.data, (d, k) => 'data-' + kebabCase(k))
