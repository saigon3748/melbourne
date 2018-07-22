const _ = require('lodash');
const Promise = require('bluebird');
const querystring = require('querystring');
const moment = require('moment');

const keywords = ['select', 'populate', 'sort', 'limit', 'skip', 'offset', 'page', 'text']
const operators = ['=^', '=$', '=~', '>=', '<=', '>', '<', '!=', '=']

module.exports = class QueryHelper {

  static parseUrl(url, opts) {
    if (url.indexOf('?') < 0) {
      return {
        query: {},
        options: null
      }
    }

    return QueryHelper.parse(querystring.unescape(url.substring(url.indexOf('?') + 1)), opts)
  }

  static parse(queryString, opts) {
    let query = {}
    let options = {}
    let subQueries = []

    let symbol = '&'
    let andIndex = queryString.indexOf('&')
    let orIndex = queryString.indexOf('|')

    if (orIndex >= 0 && andIndex >= 0) {
      if (orIndex < andIndex) {
        symbol = '|'
      } else {
        symbol = '&'
      }
    }

    if (orIndex >= 0 && andIndex < 0) {
      symbol = '|'
    }

    if (andIndex >= 0 && orIndex < 0) {
      symbol = '&'
    }

    while (queryString.length > 0) {
      if (queryString[0] === '(') {
        let index = queryString.indexOf(')')
        let result = QueryHelper.parse(queryString.substring(1, index), opts)
        subQueries.push(result.query)
        options = _.assign(options, result.options)
        queryString = queryString.substring(index + 1)
      } else {
        let subQuery = {}
        let index = -1
        let andIndex = queryString.indexOf('&')
        let orIndex = queryString.indexOf('|')

        if (orIndex >= 0 && andIndex >= 0) {
          if (orIndex < andIndex) {
            index = orIndex
          } else {
            index = andIndex
          }
        }

        if (orIndex >= 0 && andIndex < 0) {
          index = orIndex
        }

        if (andIndex >= 0 && orIndex < 0) {
          index = andIndex
        }

        let nextQuery = ''
        let statement = queryString

        if (index >= 0) {
          statement = queryString.substring(0, index)
          nextQuery = queryString.substring(index + 1)
        }

        for (let i = 0; i < operators.length; i++) {
          let operatorIndex = statement.indexOf(operators[i])
          if (operatorIndex >= 0) {
            let key = statement.substring(0, operatorIndex)
            let value = statement.substring(operatorIndex + operators[i].length)

            if (opts && _.includes(opts.excludes, key)) break;

            switch (operators[i]) {
              case '=^':
                subQuery[key] = { $regex: '^' + value, $options: "i" }
                break;
              case '=$':
                subQuery[key] = { $regex: value + '$', $options: "i" }
                break;
              case '=~':
                subQuery[key] = { $regex: value, $options: "i" }
                break;
              case '>=':
                subQuery[key] = { $gte: value }
                break;
              case '<=':
                subQuery[key] = { $lte: value }
                break;
              case '>':
                subQuery[key] = { $gt: value }
                break;
              case '<':
                subQuery[key] = { $lt: value }
                break;
              case '!=':
                subQuery[key] = { $ne: value }
                break;
              case '=':
                if (keywords.indexOf(key) >= 0) {
                  switch (key) {
                    case 'text':
                      subQuery['$text'] = { $search: value }
                      options['score'] = { $meta: "textScore" }
                      break;
                    case 'select':
                    case 'populate':
                    case 'sort':
                      options[key] = value
                      break;
                    case 'limit':
                    case 'skip':
                    case 'offset':
                    case 'page':
                      options[key] = _.toNumber(value)
                      break;
                  }
                } else {
                  if (value[0] === '[' && value[value.length - 1] === ']') {
                    subQuery[key] = { $in: value.substring(1, value.length - 1).split(',') }
                  } else {
                    subQuery[key] = { $eq: value }
                  }
                }
                break;
            }

            break;
          }
        }

        queryString = nextQuery
        if (Object.keys(subQuery).length > 0) {
          subQueries.push(subQuery)
        }
      }
    }

    if (subQueries.length > 0) {
      switch (symbol) {
        case '&':
          query = _.assign(query, { $and: subQueries })
          break;
        case '|':
          query = _.assign(query, { $or: subQueries })
          break;
      }
    }


    return {
      query: query,
      options: options
    }
  }
}