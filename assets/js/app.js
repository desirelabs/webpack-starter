import axios from 'axios'
import _ from 'lodash'
import test from 'toto'

axios.get('http://localhost:8080/assets/data.json').then(response => {
  _.each(response.data, value => console.log(value))
})


