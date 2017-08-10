import React from 'react';
//binds our store to our components from react-redux - this allows us to grab parts of state and pass it to our components through dispatch.
import { connect } from 'react-redux';
import {
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from '../../action/category-actions.js';

import CategoryForm from '../category-form/index.js';

class DashboardContainer extends React.Component {

  componentDidMount () {
      this.props.categoryCreate({ title: 'cool beans' }),
      this.props.categoryCreate({ title: 'brap' }),
      this.props.categoryCreate({ title: 'blap' }),
      this.props.categoryCreate({ title: 'bink' })
  }

  render() {
    console.log('categories', this.props.categories)
    return (
      <main className='dashboard-container'>
        <h2> dashboard </h2>
        <CategoryForm
          buttonText='create category'
          onComplete={ this.props.categoryCreate } />
        { this.props.categories.map((item) =>
          <div key={item.id}>
            <h3> { item.title } </h3>
          </div>
        )}
      </main>
    )
  }
}

//maps state to props of wherever we nest the props
const mapStateToProps = (state) => {
  //whatever we map here gets returned as props
  return {
    categories: state,
  }
}

//when our actions are dispatched, they are passed into the reducer. and that changes the state of the application
//dispatch allows us to pass an action into a reducer.
//getState gets the state from the store
//react redux takes state and map it to props
//mapDispatchToProps gives us access to dispatch and then we can create methods to be this.props.methodName (categoryCreate, categoryUpdate, categoryDelete). these are seen in our this.props.categoryCreate in our componentDidMount
const mapDispatchToProps = (dispatch, getState) => {
  return {
    categoryCreate: (category) => dispatch(categoryCreate(category)),
    categoryUpdate: (category) => dispatch(categoryUpdate(category)),
    categoryDelete: (category) => dispatch(categoryDelete(category)),
  }
}

//we use connect method to allow DashboardContainer to consume mapStateToProps and mapDispatchToProps
export default connect( mapStateToProps, mapDispatchToProps )(DashboardContainer);
