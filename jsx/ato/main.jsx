import React from 'react'
import ATO from './ato'
import New from './new'
import {fetchATOs} from 'redux/actions/ato'
import {connect} from 'react-redux'
import $ from 'jquery'

class main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      add: false
    }
    this.list = this.list.bind(this)
  }

  componentDidMount () {
    this.props.fetchATOs()
  }

  list () {
    var list = []
    var index = 0
    $.each(this.props.atos, function (k, v) {
      list.push(
        <div key={k} className='row list-group-item'>
          <ATO data={v} upateHook={this.props.fetchATOs} />
        </div>
      )
      index = index + 1
    }.bind(this))
    return list
  }

  render () {
    return (
      <div className='container'>
        <ul className='list-group list-group-flush'>
          {this.list()}
        </ul>
        <New />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    atos: state.atos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchATOs: () => dispatch(fetchATOs())
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(main)
export default Main
